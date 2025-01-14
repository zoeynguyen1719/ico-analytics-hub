import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Starting ICO data scraping...');
    const response = await fetch('https://cryptorank.io/ico');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    if (!doc) {
      throw new Error('Failed to parse HTML');
    }

    console.log('Successfully fetched and parsed HTML');
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
          "social_links": {},
          "team_members": {},
          "roadmap": {},
          "token_metrics": {},
          "isHighlighted": false,
          "isNew": true,
          "value": "$0",
          "description": null,
          "website_url": null,
          "whitepaper_url": null,
          "token_type": null,
          "token_price": null,
          "token_supply": null,
          "hard_cap": null,
          "distributed_percentage": null,
          "kyc_required": false,
          "restricted_countries": [],
          "slug": null
        };
        projects.push(project);
      }
    }

    console.log(`Scraped ${projects.length} ICO projects`);
    return new Response(
      JSON.stringify(projects),
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