
import { Card } from "@/components/ui/card";
import { useICOProjects } from "@/services/icoService";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Loader2, TrendingUp, TrendingDown, Filter, Search, Globe, FileText, Twitter, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ICOAnalytics = () => {
  const { data: projects, isLoading } = useICOProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
    </div>;
  }

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project["Project Name"]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !selectedSector || project.Platform === selectedSector;
    return matchesSearch && matchesSector;
  }) || [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
  });

  // Market statistics
  const totalMarketCap = projects?.reduce((acc, curr) => acc + parseFloat(curr.value?.replace('$', '').replace(',', '') || '0'), 0) || 0;
  const totalVolume = projects?.reduce((acc, curr) => acc + (curr.volume || 0), 0) || 0;
  const averagePrice = totalMarketCap / (projects?.length || 1);

  // Platform/Sector distribution data
  const platformData = projects?.reduce((acc: any, curr) => {
    if (curr.Platform) {
      acc[curr.Platform] = (acc[curr.Platform] || 0) + parseFloat(curr.value?.replace('$', '').replace(',', '') || '0');
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(platformData || {}).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#6FD5FF', '#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B'];

  return <div className="space-y-6">
    {/* Search and Filter Section */}
    <Card className="p-6 bg-zinc-800/50 backdrop-blur-sm border-crypto-blue">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Input 
            type="text" 
            placeholder="Search tokens..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            className="pl-10 bg-zinc-700 border-crypto-gray text-white placeholder:text-zinc-400 hover:bg-zinc-600 focus:bg-zinc-600 transition-colors" 
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
        </div>
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="w-[180px] bg-zinc-700 border-crypto-gray text-white">
            <SelectValue placeholder="Filter by Sector" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-800 border-crypto-gray">
            <SelectItem value="" className="text-white hover:bg-zinc-700">All Sectors</SelectItem>
            {Object.keys(platformData || {}).map(platform => (
              <SelectItem key={platform} value={platform} className="text-white hover:bg-zinc-700">
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>

    {/* Market Overview Cards */}
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

    {/* Charts Section */}
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
            <BarChart data={sortedProjects}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="Project Name" stroke="#6FD5FF" />
              <YAxis stroke="#6FD5FF" />
              <Tooltip />
              <Bar dataKey="value" fill="#4BA3CC">
                {sortedProjects.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>

    {/* Tokens Table */}
    <Card className="p-6 bg-crypto-dark border-crypto-blue">
      <h3 className="text-lg font-semibold text-white mb-4">Token Overview</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-zinc-800 text-white">Token</TableHead>
              <TableHead className="bg-zinc-800 text-white">Platform</TableHead>
              <TableHead className="bg-zinc-800 text-white">Price</TableHead>
              <TableHead className="bg-zinc-800 text-white">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project, index) => (
              <TableRow 
                key={index} 
                className="cursor-pointer hover:bg-crypto-gray/10" 
                onClick={() => setSelectedProject(project)}
              >
                <TableCell className="font-medium text-white">{project["Project Name"]}</TableCell>
                <TableCell className="text-white">{project.Platform}</TableCell>
                <TableCell className="text-white">{project.value}</TableCell>
                <TableCell>
                  {project.isHighlighted ? (
                    <span className="text-green-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" /> Active
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <TrendingDown className="h-4 w-4" /> Inactive
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>

    {/* Token Detail Modal */}
    <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
      <DialogContent className="bg-crypto-dark border-crypto-blue text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {selectedProject?.["Project Name"]}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Token Info */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-400">Platform</h4>
              <p className="text-lg">{selectedProject?.Platform}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Price</h4>
              <p className="text-lg">{selectedProject?.value}</p>
            </div>
            <div>
              <h4 className="text-sm text-gray-400">Status</h4>
              <p className="text-lg">
                {selectedProject?.isHighlighted ? 
                  <span className="text-green-500">Active</span> : 
                  <span className="text-red-500">Inactive</span>
                }
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-2 pt-4">
              {selectedProject?.website_url && (
                <Button size="icon" variant="outline" asChild>
                  <a href={selectedProject.website_url} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {selectedProject?.whitepaper_url && (
                <Button size="icon" variant="outline" asChild>
                  <a href={selectedProject.whitepaper_url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {selectedProject?.social_links?.twitter && (
                <Button size="icon" variant="outline" asChild>
                  <a href={selectedProject.social_links.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {selectedProject?.social_links?.telegram && (
                <Button size="icon" variant="outline" asChild>
                  <a href={selectedProject.social_links.telegram} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Price Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[{ value: selectedProject?.value }]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#6FD5FF" />
                <YAxis stroke="#6FD5FF" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4BA3CC" fill="#4BA3CC" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>;
};

export default ICOAnalytics;
