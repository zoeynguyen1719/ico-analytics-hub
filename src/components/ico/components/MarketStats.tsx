
import { Card } from "@/components/ui/card";

interface MarketStatsProps {
  totalMarketCap: number;
  totalVolume: number;
  averagePrice: number;
}

const MarketStats = ({ totalMarketCap, totalVolume, averagePrice }: MarketStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
        <h3 className="text-lg font-semibold text-white mb-2">Total Market Cap</h3>
        <p className="text-3xl font-bold text-crypto-blue">${totalMarketCap.toLocaleString()}</p>
      </Card>
      <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
        <h3 className="text-lg font-semibold text-white mb-2">24h Volume</h3>
        <p className="text-3xl font-bold text-crypto-blue">${totalVolume.toLocaleString()}</p>
      </Card>
      <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
        <h3 className="text-lg font-semibold text-white mb-2">Average Token Price</h3>
        <p className="text-3xl font-bold text-crypto-blue">${averagePrice.toFixed(2)}</p>
      </Card>
    </div>
  );
};

export default MarketStats;
