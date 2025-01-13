import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import {
  Search, Filter, TrendingUp, Activity, BarChart2, 
  Download, Crown, ChevronRight, Globe, Zap, Signal,
  Database, AlertCircle, RefreshCw, ArrowUpDown
} from "lucide-react";
import { useState, useMemo } from "react";
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
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState("");
  const [filterROIRange, setFilterROIRange] = useState("");
  const [filterICODate, setFilterICODate] = useState("");
  const [sortField, setSortField] = useState<keyof ICOProject | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const { data: icoProjects, isLoading } = useICOProjects();

  const filteredAndSortedProjects = useMemo(() => {
    if (!icoProjects) return [];

    let filtered = icoProjects.filter(project => {
      const matchesSearch = project["Project Name"]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project["Platform"]?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPlatform = !filterPlatform || project["Platform"] === filterPlatform;
      
      const matchesPriceRange = !filterPriceRange || (() => {
        const price = project["Price"];
        if (!price) return false;
        switch (filterPriceRange) {
          case "0-100": return price <= 100;
          case "100-1000": return price > 100 && price <= 1000;
          case "1000+": return price > 1000;
          default: return true;
        }
      })();

      const matchesROIRange = !filterROIRange || (() => {
        const roi = project["ROI"];
        if (!roi) return false;
        switch (filterROIRange) {
          case "negative": return roi < 0;
          case "0-100": return roi >= 0 && roi <= 100;
          case "100+": return roi > 100;
          default: return true;
        }
      })();

      return matchesSearch && matchesPlatform && matchesPriceRange && matchesROIRange;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [icoProjects, searchQuery, filterPlatform, filterPriceRange, filterROIRange, sortField, sortDirection]);

  const handleSort = (field: keyof ICOProject) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-crypto-dark border-crypto-gray hover:bg-crypto-gray">
                    <Filter className="mr-2 h-4 w-4" /> Advanced Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-crypto-dark border-crypto-gray text-white">
                  <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Platform</label>
                      <Select value={filterPlatform} onValueChange={setFilterPlatform}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Platforms</SelectItem>
                          <SelectItem value="Ethereum">Ethereum</SelectItem>
                          <SelectItem value="Binance">Binance</SelectItem>
                          <SelectItem value="Solana">Solana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price Range</label>
                      <Select value={filterPriceRange} onValueChange={setFilterPriceRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Price Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Prices</SelectItem>
                          <SelectItem value="0-100">$0 - $100</SelectItem>
                          <SelectItem value="100-1000">$100 - $1000</SelectItem>
                          <SelectItem value="1000+">$1000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">ROI Range</label>
                      <Select value={filterROIRange} onValueChange={setFilterROIRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ROI Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All ROI</SelectItem>
                          <SelectItem value="negative">Negative ROI</SelectItem>
                          <SelectItem value="0-100">0% - 100%</SelectItem>
                          <SelectItem value="100+">100%+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <TableHead onClick={() => handleSort("Project Name")} className="cursor-pointer">
                    Project Name <ArrowUpDown className="inline ml-1 h-4 w-4" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("Platform")} className="cursor-pointer">
                    Platform <ArrowUpDown className="inline ml-1 h-4 w-4" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("Price")} className="cursor-pointer">
                    Price <ArrowUpDown className="inline ml-1 h-4 w-4" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("ROI")} className="cursor-pointer">
                    ROI <ArrowUpDown className="inline ml-1 h-4 w-4" />
                  </TableHead>
                  <TableHead onClick={() => handleSort("ICO date")} className="cursor-pointer">
                    ICO Date <ArrowUpDown className="inline ml-1 h-4 w-4" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading projects...</TableCell>
                  </TableRow>
                ) : filteredAndSortedProjects.length > 0 ? (
                  filteredAndSortedProjects.map((project: ICOProject, index: number) => (
                    <TableRow key={project.id || index}>
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
