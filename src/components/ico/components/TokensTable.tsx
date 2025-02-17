
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ICOProject } from "@/types/ico";

interface TokensTableProps {
  projects: ICOProject[];
  onSelectProject: (project: ICOProject) => void;
}

const TokensTable = ({ projects, onSelectProject }: TokensTableProps) => {
  return (
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
            {projects.map((project, index) => (
              <TableRow 
                key={index} 
                className="cursor-pointer hover:bg-crypto-gray/10" 
                onClick={() => onSelectProject(project)}
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
  );
};

export default TokensTable;
