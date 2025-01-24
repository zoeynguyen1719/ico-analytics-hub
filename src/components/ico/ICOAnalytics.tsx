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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
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
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="rgba(0,0,0,0.1)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'transparent' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-crypto-dark border-crypto-blue hover:bg-crypto-gray/10 transition-colors">
          <h3 className="text-lg font-semibold text-white mb-4">Project Values Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projects} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="Project Name" 
                  stroke="#6FD5FF"
                  tick={{ fill: '#6FD5FF', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  stroke="#6FD5FF"
                  tick={{ fill: '#6FD5FF', fontSize: 12 }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(111, 213, 255, 0.1)' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#4BA3CC"
                  radius={[4, 4, 0, 0]}
                >
                  {projects?.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ICOAnalytics;