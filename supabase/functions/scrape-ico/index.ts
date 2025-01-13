import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const response = await fetch('https://cryptorank.io/ico');
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    if (!doc) {
      throw new Error('Failed to parse HTML');
    }

    // Find the table rows containing ICO data
    const rows = doc.querySelectorAll('table tbody tr');
    const projects = [];

    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 5) {
        const project = {
          "Project Name": cells[0]?.textContent?.trim() || '',
          "Platform": cells[1]?.textContent?.trim() || '',
          "Price": parseFloat(cells[2]?.textContent?.replace('$', '').trim()) || null,
          "ROI": parseFloat(cells[3]?.textContent?.replace('%', '').trim()) || null,
          "ICO date": cells[4]?.textContent?.trim() || null,
        };
        projects.push(project);
      }
    }

    return new Response(
      JSON.stringify({ data: projects }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    )
  }
})