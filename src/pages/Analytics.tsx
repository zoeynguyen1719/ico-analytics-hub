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
  Download, Crown, ChevronRight, Globe, Zap, Signal,
  Database, AlertCircle, RefreshCw
} from "lucide-react";
import { useState } from "react";
import { useICOProjects } from "@/services/icoService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICOProject } from "@/types/ico";

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
  const { data: icoProjects, isLoading } = useICOProjects();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">ICO Analytics & Data Integration</h1>
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

        {/* API Status Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 bg-black border-crypto-gray text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-crypto-blue" />
                <h3 className="text-lg font-semibold">CoinGecko API Status</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">Connected</span>
                <RefreshCw className="h-4 w-4 text-crypto-blue cursor-pointer" />
              </div>
            </div>
            <p className="text-gray-400">Rate Limit: 75/100 calls remaining</p>
          </Card>

          <Card className="p-6 bg-black border-crypto-gray text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-crypto-blue" />
                <h3 className="text-lg font-semibold">CryptoRank API Status</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">Connected</span>
                <RefreshCw className="h-4 w-4 text-crypto-blue cursor-pointer" />
              </div>
            </div>
            <p className="text-gray-400">Rate Limit: 88/100 calls remaining</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Funding Trends */}
          <Card className="p-6 bg-black border-crypto-gray text-white">
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
          <Card className="p-6 bg-black border-crypto-gray text-white">
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

        {/* ICO Projects List */}
        <Card className="p-6 bg-black border-crypto-gray text-white">
          <h3 className="text-lg font-semibold text-white mb-4">ICO Projects Overview</h3>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>ICO Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading projects...</TableCell>
                  </TableRow>
                ) : icoProjects && icoProjects.length > 0 ? (
                  icoProjects.map((project: ICOProject, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{project["Project Name"] || "Unknown"}</TableCell>
                      <TableCell>{project["Platform"] || "N/A"}</TableCell>
                      <TableCell>${project["Price"]?.toLocaleString() || "N/A"}</TableCell>
                      <TableCell>
                        {project["ROI"] ? (
                          <span className={project["ROI"] > 0 ? "text-green-500" : "text-red-500"}>
                            {project["ROI"]}%
                          </span>
                        ) : "N/A"}
                      </TableCell>
                      <TableCell>{project["ICO date"] || "N/A"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No projects found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

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