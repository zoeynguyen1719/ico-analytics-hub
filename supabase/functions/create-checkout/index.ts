import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { priceId, userId } = await req.json()
    
    if (!userId) {
      console.error('No userId provided');
      throw new Error('User ID is required');
    }

    console.log('Processing checkout for user:', userId);
    
    // Initialize Stripe with the secret key from environment variables
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    // Create Supabase client with service role key for admin access
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get user email for the customer creation
    console.log('Fetching user details...');
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUser(userId)
    
    if (userError) {
      console.error('Error fetching user:', userError);
      throw new Error('Error fetching user details');
    }

    if (!user?.user?.email) {
      console.error('User email not found');
      throw new Error('User email not found');
    }

    console.log('User found:', user.user.email);

    // Check if customer already exists
    console.log('Checking for existing Stripe customer...');
    const customers = await stripe.customers.list({
      email: user.user.email,
      limit: 1
    })

    let customerId = undefined
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
      console.log('Existing customer found:', customerId);
    } else {
      console.log('No existing customer found, will create new');
    }

    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/checkout?payment=success`,
      cancel_url: `${req.headers.get('origin')}/checkout?payment=cancelled`,
    })

    console.log('Checkout session created:', session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})