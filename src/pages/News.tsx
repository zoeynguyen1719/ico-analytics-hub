import { useEffect, useState } from "react";
import { useCryptoNews } from "@/services/newsService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import NewsFilters from "@/components/news/NewsFilters";
import NewsCard from "@/components/news/NewsCard";

const News = () => {
  const { data: newsData, isLoading, error } = useCryptoNews();
  const [news, setNews] = useState<any[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const cryptoMentions = Array.from(
    new Set(
      newsData?.flatMap(item => 
        (item.categories || "").split("|").map(cat => cat.trim())
      ).filter(Boolean) || []
    )
  );

  useEffect(() => {
    if (newsData) {
      let filteredNews = [...newsData];
      
      if (selectedCrypto !== "all") {
        filteredNews = filteredNews.filter(item => 
          item.categories?.toLowerCase().includes(selectedCrypto.toLowerCase())
        );
      }
      
      if (selectedDate) {
        filteredNews = filteredNews.filter(item => {
          const newsDate = new Date(item.publishedAt * 1000);
          return newsDate.toDateString() === selectedDate.toDateString();
        });
      }
      
      setNews(filteredNews);
    }
  }, [newsData, selectedCrypto, selectedDate]);

  const positive = news.filter(item => {
    const positiveKeywords = ['surge', 'bull', 'grow', 'gain', 'profit', 'rise', 'up', 'high', 'success'];
    return positiveKeywords.some(keyword => 
      item.title.toLowerCase().includes(keyword) || 
      item.body.toLowerCase().includes(keyword)
    );
  });

  const negative = news.filter(item => {
    const negativeKeywords = ['crash', 'bear', 'drop', 'loss', 'down', 'fall', 'low', 'fail'];
    return negativeKeywords.some(keyword => 
      item.title.toLowerCase().includes(keyword) || 
      item.body.toLowerCase().includes(keyword)
    );
  });

  const renderNews = (newsItems: any[], sentiment: 'positive' | 'negative') => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {newsItems.map((item) => (
        <NewsCard key={item.id} item={item} sentiment={sentiment} />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-crypto-gray rounded w-1/4"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-crypto-gray rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Error loading news. Please try again later.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-white">Latest Crypto News</h1>
        
        <NewsFilters
          cryptoMentions={cryptoMentions}
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <Tabs defaultValue="positive" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-crypto-dark">
            <TabsTrigger 
              value="positive"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 text-gray-300"
            >
              Positive News ({positive.length})
            </TabsTrigger>
            <TabsTrigger 
              value="negative"
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 text-gray-300"
            >
              Negative News ({negative.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="positive" className="mt-0">
            {renderNews(positive, 'positive')}
          </TabsContent>
          
          <TabsContent value="negative" className="mt-0">
            {renderNews(negative, 'negative')}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default News;