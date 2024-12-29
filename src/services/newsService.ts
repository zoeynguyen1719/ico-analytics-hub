import { useQuery } from "@tanstack/react-query";

export interface NewsItem {
  id: string;
  title: string;
  body: string;
  categories: string;
  url: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
}

export const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(
      'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular'
    );
    const data = await response.json();
    
    return data.Data.map((item: any) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      categories: item.categories,
      url: item.url,
      imageUrl: item.imageurl,
      source: item.source,
      publishedAt: item.published_on
    }));
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return [];
  }
};

export const useCryptoNews = () => {
  return useQuery({
    queryKey: ['crypto-news'],
    queryFn: fetchCryptoNews,
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};