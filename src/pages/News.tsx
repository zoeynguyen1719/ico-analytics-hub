import DashboardLayout from "@/components/DashboardLayout";
import { useCryptoNews } from "@/services/newsService";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { format } from "date-fns";

const News = () => {
  const { data: news, isLoading, error } = useCryptoNews();

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Latest Crypto News</h1>
        <div className="grid gap-6">
          {news?.map((item) => (
            <Card 
              key={item.id} 
              className="p-6 bg-crypto-gray border-crypto-blue hover:border-crypto-green transition-colors"
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
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {item.title}
                    </h2>
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
                    className="inline-flex items-center gap-2 text-crypto-blue hover:text-crypto-green transition-colors"
                  >
                    Read more <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;