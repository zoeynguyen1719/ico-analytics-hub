import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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
      .from('ico_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (supabaseError) {
      console.error('Error fetching from Supabase:', supabaseError);
      return fetchFromCoinGecko();
    }

    if (supabaseData && supabaseData.length > 0) {
      return supabaseData.map((project: any) => ({
        name: project.name,
        symbol: project.symbol,
        category: project.category || "Cryptocurrency",
        type: project.type || "Public Sale",
        value: project.value ? `$${project.value}` : undefined,
        logo: project.logo,
        isNew: project.is_new,
        isHighlighted: project.is_highlighted,
        isAd: project.is_ad,
        platform: project.platform,
        timeLeft: project.time_left,
        date: project.date,
        participants: project.participants
      }));
    }

    // If no data in Supabase, fetch from CoinGecko
    const coinGeckoData = await fetchFromCoinGecko();
    
    // Store CoinGecko data in Supabase for future use
    if (coinGeckoData.length > 0) {
      const { error: insertError } = await supabase
        .from('ico_projects')
        .insert(
          coinGeckoData.map(project => ({
            name: project.name,
            symbol: project.symbol,
            category: project.category,
            type: project.type,
            value: parseFloat(project.value?.replace('$', '').replace(',', '') || '0'),
            logo: project.logo,
            is_new: project.isNew,
            is_highlighted: project.isHighlighted,
          }))
        );

      if (insertError) {
        console.error('Error storing CoinGecko data in Supabase:', insertError);
      }
    }

    return coinGeckoData;
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