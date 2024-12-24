import { useQuery } from "@tanstack/react-query";

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

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

export const fetchICOProjects = async (): Promise<ICOProject[]> => {
  try {
    const response = await fetch(`${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=id_asc&per_page=100&page=1&sparkline=false`);
    const data = await response.json();
    
    // Transform CoinGecko data to match our ICOProject interface
    return data.map((coin: any) => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      category: "Cryptocurrency",
      type: "Public Sale",
      value: `$${coin.current_price.toLocaleString()}`,
      logo: coin.image,
      isNew: coin.price_change_percentage_24h > 10, // Mark as new if price increased >10% in 24h
      isHighlighted: coin.price_change_percentage_24h > 5, // Highlight if price increased >5% in 24h
    }));
  } catch (error) {
    console.error("Error fetching ICO projects:", error);
    return [];
  }
}

export const useICOProjects = () => {
  return useQuery({
    queryKey: ['ico-projects'],
    queryFn: fetchICOProjects,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};