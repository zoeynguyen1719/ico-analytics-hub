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
}

export const fetchICOProjects = async (): Promise<ICOProject[]> => {
  try {
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('ICO')
      .select('*')
      .order('created_at', { ascending: false });

    if (supabaseError) {
      console.error('Error fetching from Supabase:', supabaseError);
      return fetchFromCoinGecko();
    }

    if (supabaseData && supabaseData.length > 0) {
      return supabaseData.map((project: any) => ({
        name: project["Project Name"],
        symbol: project.symbol || "N/A",
        category: project.category || "Cryptocurrency",
        type: project.type || "Public Sale",
        value: project.Price ? `$${project.Price}` : undefined,
        logo: project.logo || "/placeholder.svg",
        isNew: project["ICO date"] ? new Date(project["ICO date"]) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) : false,
        isHighlighted: project.ROI ? project.ROI > 100 : false,
        platform: project.Platform,
        date: project["ICO date"],
      }));
    }

    // If no data in Supabase, fetch from CoinGecko
    console.log('No data in Supabase, fetching from CoinGecko');
    return fetchFromCoinGecko();
  } catch (error) {
    console.error("Error fetching ICO projects:", error);
    return [];
  }
};

const fetchFromCoinGecko = async (): Promise<ICOProject[]> => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=1&sparkline=false`);
  const data = await response.json();
  
  return data.map((coin: any) => ({
    name: coin.name,
    symbol: coin.symbol.toUpperCase(),
    category: "Cryptocurrency",
    type: "Public Sale",
    value: coin.current_price ? `$${coin.current_price.toLocaleString()}` : undefined,
    logo: coin.image,
    isNew: coin.price_change_percentage_24h > 10,
    isHighlighted: coin.price_change_percentage_24h > 5,
  }));
};

export const useICOProjects = () => {
  return useQuery({
    queryKey: ['ico-projects'],
    queryFn: fetchICOProjects,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};