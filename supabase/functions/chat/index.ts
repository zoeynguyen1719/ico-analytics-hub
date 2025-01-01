import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface ChatRequest {
  message: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate request body
    const requestData = await req.json().catch((error) => {
      console.error('Error parsing request JSON:', error);
      throw new Error('Invalid JSON in request body');
    });

    const { message } = requestData as ChatRequest;
    console.log('Received message:', message);

    if (!message) {
      throw new Error('Message is required');
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    console.log('Making request to OpenAI API...');
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant knowledgeable about cryptocurrency and ICO projects.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    const responseData = await openAIResponse.json().catch(() => ({ error: 'Failed to parse OpenAI response' }));

    if (!openAIResponse.ok) {
      console.error('OpenAI API error:', responseData);
      
      // Check for quota exceeded error
      if (responseData.error?.message?.includes('exceeded your current quota')) {
        throw new Error('API quota exceeded. Please try again later or contact support.');
      }
      
      throw new Error(responseData.error?.message || 'Failed to get response from OpenAI');
    }

    console.log('Successfully received OpenAI response');

    return new Response(
      JSON.stringify({
        generatedText: responseData.choices[0].message.content,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});