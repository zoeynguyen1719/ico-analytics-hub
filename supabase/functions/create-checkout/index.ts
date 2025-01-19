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
    const { priceId, userId } = await req.json();
    
    if (!userId) {
      console.error('No userId provided');
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      );
    }

    console.log('Processing checkout for user:', userId);
    
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Create Supabase admin client
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

    // Get user email using admin API
    console.log('Fetching user details...');
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (userError || !userData?.user) {
      console.error('Error fetching user:', userError || 'User not found');
      return new Response(
        JSON.stringify({ error: `Error fetching user: ${userError?.message || 'User not found'}` }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    const userEmail = userData.user.email;
    if (!userEmail) {
      console.error('No user email found for ID:', userId);
      return new Response(
        JSON.stringify({ error: 'User email not found' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      );
    }

    console.log('User found:', userEmail);

    // Check if customer already exists
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

    console.log('Checkout session created:', session.id);
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
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});