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
    const { priceId, userId } = await req.json();
    
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

    console.log('Initializing Stripe...');
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

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

    console.log('User validated successfully:', userEmail);

    // Validate price ID with Stripe
    try {
      console.log('Validating price ID:', priceId);
      const price = await stripe.prices.retrieve(priceId);
      if (!price.active) {
        return new Response(
          JSON.stringify({ error: 'Invalid or inactive price ID' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        );
      }
    } catch (error) {
      console.error('Error validating price:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid price ID provided' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

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
    } else {
      console.log('No existing customer found, will create new');
    }

    // Create checkout session with enhanced error handling
    console.log('Creating checkout session...');
    try {
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
      console.error('Error creating checkout session:', error);
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
  } catch (error) {
    console.error('Unexpected error in checkout process:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again later.',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});