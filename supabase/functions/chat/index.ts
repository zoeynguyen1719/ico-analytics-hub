import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

interface ChatRequest {
  message: string;
}

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

async function handleChatRequest(message: string): Promise<string> {
  const response = await fetchOpenAIResponse(message);
  const data = await handleOpenAIResponse(response);
  return extractGeneratedText(data);
}

async function fetchOpenAIResponse(message: string): Promise<Response> {
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant knowledgeable about cryptocurrency and ICO projects.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('OpenAI API error:', errorData);
    throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
  }

  return response;
}

async function handleOpenAIResponse(response: Response): Promise<OpenAIResponse> {
  const data = await response.json();
  console.log('OpenAI API response:', data);
  return data;
}

function extractGeneratedText(data: OpenAIResponse): string {
  if (!data.choices?.[0]?.message?.content) {
    throw new Error('Invalid response format from OpenAI API');
  }
  return data.choices[0].message.content;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message } = await req.json() as ChatRequest;

    if (!message) {
      throw new Error("Message is required");
    }

    const generatedText = await handleChatRequest(message);

    return new Response(
      JSON.stringify({
        generatedText,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});