import { Card } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <h3 className="text-gray-400 mb-2">Portfolio Value</h3>
            <p className="text-2xl font-bold text-crypto-green">$25,420.65</p>
            <span className="text-sm text-green-500">+5.25%</span>
          </Card>
          
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <h3 className="text-gray-400 mb-2">Active ICOs</h3>
            <p className="text-2xl font-bold text-crypto-blue">24</p>
            <span className="text-sm text-blue-500">+3 this week</span>
          </Card>
          
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <h3 className="text-gray-400 mb-2">Watchlist</h3>
            <p className="text-2xl font-bold text-crypto-green">12</p>
            <span className="text-sm text-gray-400">Projects tracked</span>
          </Card>
        </div>

        <Card className="p-6 bg-crypto-gray border-crypto-blue">
          <h3 className="text-xl font-bold mb-4">Portfolio Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #0066FF',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00FF88" 
                  strokeWidth={2}
                  dot={{ fill: '#00FF88' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <h3 className="text-xl font-bold mb-4">Latest News</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-crypto-gray pb-4">
                  <h4 className="font-medium text-crypto-blue">New ICO Launch Announcement</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <h3 className="text-xl font-bold mb-4">Top Performing ICOs</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-crypto-gray pb-4">
                  <div>
                    <h4 className="font-medium">Project {i}</h4>
                    <p className="text-sm text-gray-400">ICO ends in 3 days</p>
                  </div>
                  <span className="text-crypto-green">+125%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;