import { Card } from "@/components/ui/card";
import { useICOProjects } from "@/services/icoService";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Loader2 } from "lucide-react";

const ICOAnalytics = () => {
  const { data: projects, isLoading } = useICOProjects();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
      </div>
    );
  }

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

  const COLORS = ['#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B', '#EC4899'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h3 className="text-lg font-semibold text-white mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-crypto-blue">{totalProjects}</p>
        </Card>
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h3 className="text-lg font-semibold text-white mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-crypto-blue">{activeProjects}</p>
        </Card>
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h3 className="text-lg font-semibold text-white mb-2">Average Value</h3>
          <p className="text-3xl font-bold text-crypto-blue">${avgValue.toFixed(2)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-crypto-dark border-crypto-blue">
          <h3 className="text-lg font-semibold text-white mb-4">Projects by Platform</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
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
          <h3 className="text-lg font-semibold text-white mb-4">Project Values Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projects}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Project Name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4BA3CC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ICOAnalytics;