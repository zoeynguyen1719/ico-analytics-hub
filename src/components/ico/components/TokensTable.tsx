
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Star } from "lucide-react";
import { ICOProject } from "@/types/ico";
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface TokensTableProps {
  projects: ICOProject[];
  onSelectProject: (project: ICOProject) => void;
}

// Sample data for the mini chart - in a real app, this would come from your API
const generateMockChartData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    value: Math.random() * 100 + 50
  }));
};

const TokensTable = ({ projects, onSelectProject }: TokensTableProps) => {
  return (
    <Card className="p-6 bg-zinc-900/90 border-crypto-blue">
      <h3 className="text-lg font-semibold text-white mb-4">Token Overview</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-zinc-800">
              <TableHead className="bg-zinc-900 text-gray-400 font-medium w-[50px]">#</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium">Name</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Price</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">24h Change</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Market Cap</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Volume (24h)</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium text-right">Status</TableHead>
              <TableHead className="bg-zinc-900 text-gray-400 font-medium w-[150px]">Price Graph</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => {
              const mockChartData = generateMockChartData();
              const isPositive = project.isHighlighted;
              const changePercent = isPositive ? "+2.45%" : "-1.23%";
              
              return (
                <TableRow 
                  key={index} 
                  className="cursor-pointer border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors" 
                  onClick={() => onSelectProject(project)}
                >
                  <TableCell className="font-medium text-gray-300">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-gray-500 hover:text-yellow-500 transition-colors" />
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-crypto-blue to-crypto-green flex items-center justify-center text-xs">
                        {project["Project Name"]?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{project["Project Name"]}</div>
                        <div className="text-sm text-gray-400">{project.Platform}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-white">
                    {project.value}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {changePercent}
                  </TableCell>
                  <TableCell className="text-right font-medium text-white">
                    ${(Math.random() * 1000000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell className="text-right font-medium text-white">
                    ${(Math.random() * 100000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell className="text-right">
                    {project.isHighlighted ? (
                      <span className="inline-flex items-center gap-1 text-green-500">
                        <TrendingUp className="h-4 w-4" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-500">
                        <TrendingDown className="h-4 w-4" /> Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="h-[40px] w-[120px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData}>
                          <defs>
                            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={isPositive ? "#34D399" : "#EF4444"} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={isPositive ? "#34D399" : "#EF4444"} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={isPositive ? "#34D399" : "#EF4444"} 
                            fillOpacity={1} 
                            fill={`url(#gradient-${index})`} 
                            strokeWidth={1.5}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TokensTable;
