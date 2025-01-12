import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Coins, Shield, Globe, FileText } from "lucide-react";

const ProjectDetails = () => {
  const { slug } = useParams();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ICO')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="p-6 text-red-500">
          Error loading project details. Please try again later.
        </Card>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout>
        <Card className="p-6">
          Project not found.
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{project["Project Name"]}</h1>
            <div className="flex gap-2">
              {project.Platform && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                  {project.Platform}
                </Badge>
              )}
              {project.kyc_required && (
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  KYC Required
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {project.website_url && (
              <a
                href={project.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crypto-blue hover:text-crypto-blue/80"
              >
                <Globe className="w-6 h-6" />
              </a>
            )}
            {project.whitepaper_url && (
              <a
                href={project.whitepaper_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crypto-blue hover:text-crypto-blue/80"
              >
                <FileText className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>

        {/* Project Overview */}
        <Card className="p-6 bg-crypto-dark border-none">
          <h2 className="text-xl font-semibold mb-4 text-white">Project Overview</h2>
          <p className="text-gray-300">{project.description}</p>
        </Card>

        {/* Token Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-crypto-dark border-none">
            <h2 className="text-xl font-semibold mb-4 text-white">Token Details</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Type</span>
                <span className="text-white">{project.token_type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-white">{project.token_price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Supply</span>
                <span className="text-white">{project.token_supply?.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Hard Cap</span>
                <span className="text-white">{project.hard_cap}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-crypto-dark border-none">
            <h2 className="text-xl font-semibold mb-4 text-white">Distribution</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Distributed</span>
                <span className="text-white">{project.distributed_percentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sale Price</span>
                <span className="text-white">${project["Sale Price"]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">ROI</span>
                <span className="text-crypto-green">{project.ROI}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">ATH ROI</span>
                <span className="text-crypto-green">{project["ATH ROI"]}%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Information */}
        {(project.team_members || project.roadmap || project.token_metrics) && (
          <div className="grid grid-cols-1 gap-6">
            {project.team_members && (
              <Card className="p-6 bg-crypto-dark border-none">
                <h2 className="text-xl font-semibold mb-4 text-white">Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(project.team_members).map(([name, role]) => (
                    <div key={name} className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-crypto-blue" />
                      <div>
                        <p className="text-white font-medium">{name}</p>
                        <p className="text-gray-400 text-sm">{role as string}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {project.roadmap && (
              <Card className="p-6 bg-crypto-dark border-none">
                <h2 className="text-xl font-semibold mb-4 text-white">Roadmap</h2>
                <div className="space-y-4">
                  {Object.entries(project.roadmap).map(([phase, details]) => (
                    <div key={phase} className="border-l-2 border-crypto-blue pl-4">
                      <h3 className="text-white font-medium">{phase}</h3>
                      <p className="text-gray-400">{details as string}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {project.token_metrics && (
              <Card className="p-6 bg-crypto-dark border-none">
                <h2 className="text-xl font-semibold mb-4 text-white">Token Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(project.token_metrics).map(([metric, value]) => (
                    <div key={metric} className="flex items-center gap-3">
                      <Coins className="w-5 h-5 text-crypto-blue" />
                      <div>
                        <p className="text-gray-400 text-sm">{metric}</p>
                        <p className="text-white font-medium">{value as string}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetails;