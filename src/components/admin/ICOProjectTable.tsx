import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ICOProject } from "@/types/ico";

interface ICOProjectTableProps {
  projects: ICOProject[];
  onEdit: (project: ICOProject) => void;
  onDelete: (id: number) => void;
}

const ICOProjectTable = ({ projects, onEdit, onDelete }: ICOProjectTableProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>ICO Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project["Project Name"]}</TableCell>
              <TableCell>{project["Price"]}</TableCell>
              <TableCell>{project["Platform"]}</TableCell>
              <TableCell>{project["ICO date"]}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => project.id && onDelete(project.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ICOProjectTable;