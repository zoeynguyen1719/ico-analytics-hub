
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MarketChartsProps {
  pieChartData: Array<{ name: string; value: number }>;
  barChartData: any[];
}

const COLORS = ['#6FD5FF', '#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B'];

const MarketCharts = ({ pieChartData, barChartData }: MarketChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h3 className="text-lg font-semibold text-white mb-4">Sector Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h3 className="text-lg font-semibold text-white mb-4">Market Cap Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="Project Name" stroke="#6FD5FF" />
              <YAxis stroke="#6FD5FF" />
              <Tooltip />
              <Bar dataKey="value" fill="#4BA3CC">
                {barChartData.map((entry, index) => (
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
