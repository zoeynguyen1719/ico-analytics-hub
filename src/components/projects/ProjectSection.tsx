import { Card } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";

interface ProjectSectionProps {
  title: string;
  count: number;
  projects: any[];
}

export const ProjectSection = ({ title, count, projects }: ProjectSectionProps) => {
  return (
    <Card className="p-6 bg-crypto-gray border-crypto-blue">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <span className="text-sm text-gray-400">{count}</span>
        </div>
      </div>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </Card>
  );
};