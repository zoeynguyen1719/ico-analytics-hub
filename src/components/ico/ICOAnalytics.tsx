import { Card } from "@/components/ui/card";
import { useICOProjects } from "@/services/icoService";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Loader2, TrendingUp, TrendingDown, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ICOAnalytics = () => {
  const { data: projects, isLoading } = useICOProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
      </div>
    );
  }

  // Filter and sort projects
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project["Project Name"]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = !selectedSector || project.Platform === selectedSector;
    return matchesSearch && matchesSector;
  }) || [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" 
      ? (aValue > bValue ? 1 : -1)
      : (aValue < bValue ? 1 : -1);
  });

  // Calculate statistics
  const totalProjects = projects?.length || 0;
  const activeProjects = projects?.filter(p => p.isHighlighted)?.length || 0;
  const avgValue = projects?.reduce((acc, curr) => acc + (parseFloat(curr.value?.replace('$', '').replace(',', '') || '0')), 0) / totalProjects || 0;

  // Prepare data for charts
  const platformData = projects?.reduce((acc: any, curr) => {
    if (curr.Platform) {
      acc[curr.Platform] = (acc[curr.Platform] || 0) + 1;
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(platformData || {}).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#6FD5FF', '#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-crypto-dark p-4 border border-crypto-blue rounded-lg shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-crypto-blue">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-crypto-dark border-crypto-gray"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[180px] bg-crypto-dark border-crypto-gray">
              <SelectValue placeholder="Filter by Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {Object.keys(platformData || {}).map(platform => (
                <SelectItem key={platform} value={platform}>{platform}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-crypto-blue">{totalProjects}</p>
        </Card>
        <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-crypto-blue">{activeProjects}</p>
        </Card>
        <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-2">Average Value</h3>
          <p className="text-3xl font-bold text-crypto-blue">${avgValue.toFixed(2)}</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h3 className="text-lg font-semibold text-white mb-4">Projects by Platform</h3>
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
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h3 className="text-lg font-semibold text-white mb-4">Project Values Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedProjects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="Project Name" stroke="#6FD5FF" />
                <YAxis stroke="#6FD5FF" />
                <Tooltip content={<CustomTooltip />} />
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

      {/* Projects Table */}
      <Card className="p-6 bg-crypto-dark border-crypto-blue">
        <h3 className="text-lg font-semibold text-white mb-4">ICO Projects Overview</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
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
                  <TableCell>{project.Platform}</TableCell>
                  <TableCell>{project.value}</TableCell>
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

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-crypto-dark border-crypto-blue text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedProject?.["Project Name"]}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm text-gray-400">Platform</h4>
                <p className="text-lg">{selectedProject?.Platform}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-400">Value</h4>
                <p className="text-lg">{selectedProject?.value}</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-400">Status</h4>
                <p className="text-lg">
                  {selectedProject?.isHighlighted ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </p>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{ value: selectedProject?.value }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#6FD5FF" />
                  <YAxis stroke="#6FD5FF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke="#4BA3CC" fill="#4BA3CC" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ICOAnalytics;