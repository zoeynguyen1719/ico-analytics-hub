import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: {
    name: string;
    symbol: string;
    category: string;
    type: string;
    endDate?: string;
    startDate?: string;
    value?: string;
    logo: string;
    isHighlighted?: boolean;
    isAd?: boolean;
    isNew?: boolean;
    platform?: string;
    timeLeft?: string;
    date?: string;
    participants?: number;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="p-4 bg-crypto-dark rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img src={project.logo} alt={project.name} className="w-8 h-8 rounded-full" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">{project.name}</h3>
              <span className="text-xs text-gray-400">{project.symbol}</span>
              {project.isHighlighted && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500 text-xs">
                  HIGH
                </Badge>
              )}
              {project.isAd && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 text-xs">
                  AD
                </Badge>
              )}
              {project.isNew && (
                <Badge className="bg-blue-500 text-white text-xs">NEW</Badge>
              )}
            </div>
            <p className="text-xs text-gray-400">{project.category}</p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-crypto-gray px-2 py-1 rounded">
            {project.type} {project.platform ? `on ${project.platform}` : ''}
          </span>
          <span className="text-xs text-gray-400">
            {project.endDate || project.startDate || project.timeLeft || project.date}
          </span>
        </div>
        {project.value ? (
          <span className="text-xs text-crypto-green font-semibold">{project.value}</span>
        ) : (
          <span className="text-xs text-gray-400">No Data</span>
        )}
      </div>
    </div>
  );
};