import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ICOProject } from "@/types/ico";

const fetchFromCryptorank = async (): Promise<ICOProject[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scrape-ico`
    );
    
    if (!response.ok) {
      throw new Error(`Cryptorank scraping error: ${response.status}`);
    }
    
    const { data } = await response.json();
    return data.map((item: any) => ({
      "Project Name": item["Project Name"] || "Unknown Project",
      "Platform": item.Platform || null,
      "Price": item.Price || null,
      "ROI": item.ROI || null,
      "ICO date": item["ICO date"] || null
    }));
  } catch (error) {
    console.error("Error fetching from Cryptorank:", error);
    return [];
  }
};

const fetchFromCoinGecko = async (): Promise<ICOProject[]> => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((coin: any) => ({
      "Project Name": coin.name,
      "Platform": "CoinGecko",
      "Price": coin.current_price,
      "ROI": coin.price_change_percentage_24h,
      "ICO date": null
    }));
  } catch (error) {
    console.error("Error fetching from CoinGecko:", error);
    return [];
  }
};

export const fetchICOProjects = async (): Promise<ICOProject[]> => {
  try {
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('ICO')
      .select('*')
      .order('created_at', { ascending: false });

    if (supabaseError) {
      console.error('Error fetching from Supabase:', supabaseError);
      const [cryptorankData, coingeckoData] = await Promise.all([
        fetchFromCryptorank(),
        fetchFromCoinGecko()
      ]);
      return [...cryptorankData, ...coingeckoData];
    }

    if (supabaseData && supabaseData.length > 0) {
      return supabaseData.map((project: any) => ({
        "Project Name": project["Project Name"] || "Unknown Project",
        "Platform": project.Platform || null,
        "Price": project.Price || null,
        "ROI": project.ROI || null,
        "ICO date": project["ICO date"] || null,
        ...project
      }));
    }

    console.log('No data in Supabase, fetching from external sources');
    const [cryptorankData, coingeckoData] = await Promise.all([
      fetchFromCryptorank(),
      fetchFromCoinGecko()
    ]);
    return [...cryptorankData, ...coingeckoData];
  } catch (error) {
    console.error("Error fetching ICO projects:", error);
    return [];
  }
};

export const useICOProjects = () => {
  return useQuery({
    queryKey: ['ico-projects'],
    queryFn: fetchICOProjects,
    refetchInterval: 300000, // Refetch every 5 minutes
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};