import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  Search, Filter, TrendingUp, Activity, BarChart2, 
  Download, Crown, ChevronRight, Globe, Zap
} from "lucide-react";
import { useState } from "react";

const mockTrendData = [
  { month: 'Jan', value: 2400 },
  { month: 'Feb', value: 1398 },
  { month: 'Mar', value: 9800 },
  { month: 'Apr', value: 3908 },
  { month: 'May', value: 4800 },
  { month: 'Jun', value: 3800 },
];

const industryData = [
  { name: 'DeFi', value: 400 },
  { name: 'Gaming', value: 300 },
  { name: 'AI', value: 300 },
  { name: 'Infrastructure', value: 200 },
];

const COLORS = ['#6FD5FF', '#4BA3CC', '#1A3B47', '#2A4B57'];

const Analytics = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">ICO Analytics</h1>
              <p className="text-gray-400 mt-1">Uncover trends and insights powered by AI</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Input
                  type="text"
                  placeholder="Search ICO projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-crypto-dark border-crypto-gray"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Button variant="outline" className="bg-crypto-dark border-crypto-gray hover:bg-crypto-gray">
                <Filter className="mr-2 h-4 w-4" /> Advanced Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Total ICOs", value: "156", change: "+12%", icon: BarChart2, color: "text-crypto-blue" },
            { title: "Success Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "text-green-500" },
            { title: "Market Sentiment", value: "Positive", change: "+8%", icon: Activity, color: "text-crypto-blue" },
            { title: "Active Industry", value: "DeFi", change: "+15%", icon: Zap, color: "text-yellow-500" },
          ].map((stat, index) => (
            <Card key={index} className="p-6 bg-crypto-dark border-crypto-gray hover:border-crypto-blue transition-all">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-opacity-20 ${stat.color}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-green-500 text-sm">{stat.change}</span>
                <span className="text-gray-400 text-sm ml-2">vs last month</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funding Trends */}
          <Card className="p-6 bg-crypto-dark border-crypto-gray">
            <h3 className="text-lg font-semibold text-white mb-4">ICO Funding Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A4B57" />
                  <XAxis dataKey="month" stroke="#4BA3CC" />
                  <YAxis stroke="#4BA3CC" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A3B47',
                      border: '1px solid #2A4B57',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6FD5FF"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Industry Distribution */}
          <Card className="p-6 bg-crypto-dark border-crypto-gray">
            <h3 className="text-lg font-semibold text-white mb-4">Industry Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A3B47',
                      border: '1px solid #2A4B57',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-crypto-dark border-t border-crypto-gray p-4">
          <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
            <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-white">
              <Crown className="mr-2 h-4 w-4" /> Subscribe for Advanced Analytics
            </Button>
            <Button variant="outline" className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10">
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;