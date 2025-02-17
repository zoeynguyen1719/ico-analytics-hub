
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MarketChartsProps {
  pieChartData: Array<{ name: string; value: number }>;
  barChartData: any[];
}

const COLORS = ['#6FD5FF', '#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B', '#EC4899'];

// Sample sector data - in a real app, this would come from your API or data processing
const sectorData = [
  { name: 'DeFi', value: 35 },
  { name: 'Gaming', value: 25 },
  { name: 'Infrastructure', value: 20 },
  { name: 'NFT/Metaverse', value: 15 },
  { name: 'AI/ML', value: 10 },
  { name: 'Others', value: 5 }
];

// Sample market cap data by sector (in billions)
const marketCapData = [
  { name: 'DeFi', value: 45.5 },
  { name: 'Gaming', value: 32.8 },
  { name: 'Infrastructure', value: 28.3 },
  { name: 'NFT/Metaverse', value: 18.9 },
  { name: 'AI/ML', value: 12.4 },
  { name: 'Others', value: 8.1 }
];

const MarketCharts = ({ pieChartData, barChartData }: MarketChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h3 className="text-lg font-semibold text-white mb-4">Sector Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #4BA3CC',
                  borderRadius: '4px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h3 className="text-lg font-semibold text-white mb-4">Market Cap by Sector (Billions)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketCapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#6FD5FF" />
              <YAxis stroke="#6FD5FF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #4BA3CC',
                  borderRadius: '4px'
                }}
                formatter={(value: number) => [`$${value}B`, 'Market Cap']}
              />
              <Bar dataKey="value" fill="#4BA3CC">
                {marketCapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default MarketCharts;
