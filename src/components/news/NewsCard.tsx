import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface NewsCardProps {
  item: {
    id: string;
    title: string;
    body: string;
    url: string;
    imageUrl: string;
    source: string;
    publishedAt: number;
  };
  sentiment: 'positive' | 'negative';
}

const NewsCard = ({ item, sentiment }: NewsCardProps) => {
  return (
    <Card 
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
  );
};

export default NewsCard;