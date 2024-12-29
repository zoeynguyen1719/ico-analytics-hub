import { useEffect, useState } from "react";
import { useCryptoNews } from "@/services/newsService";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/DashboardLayout";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const News = () => {
  const { data: newsData, isLoading, error } = useCryptoNews();
  const [news, setNews] = useState<any[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  // Get unique cryptocurrencies mentioned in news
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
      
      // Apply cryptocurrency filter
      if (selectedCrypto !== "all") {
        filteredNews = filteredNews.filter(item => 
          item.categories?.toLowerCase().includes(selectedCrypto.toLowerCase())
        );
      }
      
      // Apply date filter
      if (selectedDate) {
        filteredNews = filteredNews.filter(item => {
          const newsDate = new Date(item.publishedAt * 1000);
          return newsDate.toDateString() === selectedDate.toDateString();
        });
      }
      
      setNews(filteredNews);
    }
  }, [newsData, selectedCrypto, selectedDate]);

  // Separate positive and negative news
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
        <Card 
          key={item.id} 
          className={`p-6 bg-crypto-dark border-2 ${
            sentiment === 'positive' 
              ? 'border-green-500/20 hover:border-green-500/40' 
              : 'border-red-500/20 hover:border-red-500/40'
          } transition-colors`}
        >
          <a 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="aspect-video mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 line-clamp-3">{item.body}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Source: {item.source}</span>
                <span>
                  {format(new Date(item.publishedAt * 1000), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </a>
        </Card>
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
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger className="w-[200px] bg-crypto-dark text-white">
              <SelectValue placeholder="Select cryptocurrency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cryptocurrencies</SelectItem>
              {cryptoMentions.map((crypto) => (
                <SelectItem key={crypto} value={crypto.toLowerCase()}>
                  {crypto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[200px] justify-start text-left font-normal bg-crypto-dark text-white",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {(selectedCrypto !== "all" || selectedDate) && (
            <Button 
              variant="outline" 
              className="bg-crypto-dark text-white"
              onClick={() => {
                setSelectedCrypto("all");
                setSelectedDate(undefined);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

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