import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting checkout process...');
    const { priceId, userId, existingSubscriptionId } = await req.json();
    
    // Validate required parameters
    if (!userId || !priceId) {
      console.error('Missing required parameters:', { userId, priceId });
      return new Response(
        JSON.stringify({ error: 'User ID and price ID are required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Creating Supabase admin client...');
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false
        }
      }
    );

    // Get user details using admin API with enhanced error handling
    console.log('Fetching user details for ID:', userId);
    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (userError) {
      console.error('Error fetching user:', userError.message);
      return new Response(
        JSON.stringify({ 
          error: 'User not found or could not be retrieved',
          details: userError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }

    if (!user) {
      console.error('No user found for ID:', userId);
      return new Response(
        JSON.stringify({ error: 'User not found or could not be retrieved' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        }
      );
    }

    const userEmail = user.email;
    if (!userEmail) {
      console.error('No email found for user:', userId);
      return new Response(
        JSON.stringify({ error: 'Invalid user data: email is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Initializing Stripe...');
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Check for existing Stripe customer
    console.log('Checking for existing Stripe customer...');
    const { data: customers } = await stripe.customers.list({
      email: userEmail,
      limit: 1
    });

    let customerId = undefined;
    if (customers.length > 0) {
      customerId = customers[0].id;
      console.log('Existing customer found:', customerId);

      // Check existing subscription if ID provided
      if (existingSubscriptionId) {
        try {
          const subscription = await stripe.subscriptions.retrieve(existingSubscriptionId);
          
          if (subscription.status === 'canceled' || subscription.status === 'incomplete_expired') {
            // Reactivate subscription if it's canceled but still within the current period
            if (subscription.current_period_end * 1000 > Date.now()) {
              await stripe.subscriptions.update(existingSubscriptionId, {
                cancel_at_period_end: false,
                items: [{ price: priceId }],
              });
              
              // Update subscription in database
              await supabaseAdmin
                .from('subscriptions')
                .update({
                  status: 'active',
                  updated_at: new Date().toISOString(),
                  cancel_at: null
                })
                .eq('stripe_subscription_id', existingSubscriptionId);

              return new Response(
                JSON.stringify({ message: 'Subscription reactivated successfully' }),
                { 
                  headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                  status: 200,
                }
              );
            }
          }
        } catch (error) {
          console.log('Error retrieving subscription, will create new one:', error);
        }
      }
    }

    // Create new checkout session
    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : userEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/checkout?payment=success`,
      cancel_url: `${req.headers.get('origin')}/checkout?payment=cancelled`,
    });

    console.log('Checkout session created successfully:', session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in checkout process:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create checkout session',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});