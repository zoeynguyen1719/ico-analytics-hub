import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ICOProject {
  name: string;
  symbol: string;
  category: string;
  type: string;
  endDate?: string;
  startDate?: string;
  value?: string;
  logo: string;
  isHighlighted?: boolean;
  isAd?: boolean;
  isNew?: boolean;
  platform?: string;
  timeLeft?: string;
  date?: string;
  participants?: number;
  "Project Name"?: string;
  "Platform"?: string;
  "Price"?: number;
  "ROI"?: number;
  "ICO date"?: string;
}

const fetchFromCryptorank = async (): Promise<ICOProject[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scrape-ico`
    );
    
    if (!response.ok) {
      throw new Error(`Cryptorank scraping error: ${response.status}`);
    }
    
    const { data } = await response.json();
    return data;
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
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      category: "Cryptocurrency",
      type: "Public Sale",
      value: coin.current_price ? `$${coin.current_price.toLocaleString()}` : undefined,
      logo: coin.image || "/placeholder.svg",
      isNew: coin.price_change_percentage_24h > 10,
      isHighlighted: coin.price_change_percentage_24h > 5,
    }));
  } catch (error) {
    console.error("Error fetching from CoinGecko:", error);
    // Return empty array as fallback
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
        name: project["Project Name"] || "Unknown Project",
        symbol: project.symbol || "N/A",
        category: project.category || "Cryptocurrency",
        type: project.type || "Public Sale",
        value: project.Price ? `$${project.Price}` : undefined,
        logo: project.logo || "/placeholder.svg",
        isNew: project["ICO date"] ? new Date(project["ICO date"]) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : false,
        isHighlighted: project.ROI ? project.ROI > 100 : false,
        platform: project.Platform,
        date: project["ICO date"],
        "Project Name": project["Project Name"],
        "Platform": project.Platform,
        "Price": project.Price,
        "ROI": project.ROI,
        "ICO date": project["ICO date"],
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