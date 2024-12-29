import DashboardLayout from "@/components/DashboardLayout";
import { useCryptoNews } from "@/services/newsService";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";

const News = () => {
  const { data: news, isLoading, error } = useCryptoNews();

  // Keywords for sentiment analysis
  const positiveKeywords = ['surge', 'gain', 'bull', 'rise', 'growth', 'profit', 'success', 'boost', 'high', 'up'];
  const negativeKeywords = ['crash', 'drop', 'bear', 'fall', 'decline', 'loss', 'fail', 'down', 'low', 'risk'];

  const categorizeNews = (newsItems = []) => {
    return newsItems.reduce((acc, item) => {
      const text = (item.title + ' ' + item.body).toLowerCase();
      
      const positiveCount = positiveKeywords.filter(word => text.includes(word)).length;
      const negativeCount = negativeKeywords.filter(word => text.includes(word)).length;

      if (positiveCount > negativeCount) {
        acc.positive.push(item);
      } else if (negativeCount > positiveCount) {
        acc.negative.push(item);
      } else {
        // In case of tie or no sentiment, put in positive (neutral news usually good)
        acc.positive.push(item);
      }
      
      return acc;
    }, { positive: [], negative: [] });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 bg-crypto-gray animate-pulse">
              <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-600 rounded w-1/2"></div>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="p-6 bg-crypto-gray text-red-500">
          Error loading crypto news. Please try again later.
        </Card>
      </DashboardLayout>
    );
  }

  const { positive, negative } = categorizeNews(news);

  const NewsSection = ({ title, news, sentiment }) => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        {title}
        <span className={`text-sm px-2 py-1 rounded ${
          sentiment === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {news.length} articles
        </span>
      </h2>
      {news.map((item) => (
        <Card 
          key={item.id} 
          className={`p-6 bg-crypto-gray border-2 ${
            sentiment === 'positive' 
              ? 'border-green-500/20 hover:border-green-500/40' 
              : 'border-red-500/20 hover:border-red-500/40'
          } transition-colors`}
        >
          <div className="flex flex-col md:flex-row gap-6">
            {item.imageUrl && (
              <div className="w-full md:w-48 h-48 flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 line-clamp-3">{item.body}</p>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Source: {item.source}</span>
                <span>
                  {format(new Date(Number(item.publishedAt) * 1000), 'PPP')}
                </span>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${
                  sentiment === 'positive' 
                    ? 'text-green-400 hover:text-green-300' 
                    : 'text-red-400 hover:text-red-300'
                } transition-colors`}
              >
                Read more <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-white">Latest Crypto News</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <NewsSection 
            title="Positive News" 
            news={positive} 
            sentiment="positive"
          />
          <NewsSection 
            title="Negative News" 
            news={negative} 
            sentiment="negative"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;