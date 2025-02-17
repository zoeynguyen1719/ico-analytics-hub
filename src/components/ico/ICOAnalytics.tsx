
import { useState } from "react";
import { useICOProjects } from "@/services/icoService";
import { Loader2 } from "lucide-react";
import SearchAndFilter from "./components/SearchAndFilter";
import MarketStats from "./components/MarketStats";
import MarketCharts from "./components/MarketCharts";
import TokensTable from "./components/TokensTable";
import TokenDetailsModal from "./components/TokenDetailsModal";
import { ICOProject } from "@/types/ico";

const ICOAnalytics = () => {
  const { data: projects, isLoading } = useICOProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedProject, setSelectedProject] = useState<ICOProject | null>(null);

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-crypto-blue" />
    </div>;
  }

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project["Project Name"]?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === "all" || project.Platform === selectedSector;
    return matchesSearch && matchesSector;
  }) || [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
  });

  // Market statistics calculations
  const totalMarketCap = projects?.reduce((acc, curr) => acc + parseFloat(curr.value?.replace('$', '').replace(',', '') || '0'), 0) || 0;
  const totalVolume = projects?.reduce((acc, curr) => {
    const metrics = curr.token_metrics as { volume?: number } || {};
    return acc + (metrics.volume || 0);
  }, 0) || 0;
  const averagePrice = totalMarketCap / (projects?.length || 1);

  // Platform/Sector distribution data
  const platformData = projects?.reduce((acc: Record<string, number>, curr) => {
    if (curr.Platform) {
      acc[curr.Platform] = (acc[curr.Platform] || 0) + parseFloat(curr.value?.replace('$', '').replace(',', '') || '0');
    }
    return acc;
  }, {});

  const pieChartData = Object.entries(platformData || {}).map(([name, value]) => ({
    name,
    value: value as number
  }));

  return (
    <div className="space-y-6">
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        platforms={Object.keys(platformData || {})}
      />

      <MarketStats
        totalMarketCap={totalMarketCap}
        totalVolume={totalVolume}
        averagePrice={averagePrice}
      />

      <MarketCharts
        pieChartData={pieChartData}
        barChartData={sortedProjects}
      />

      <TokensTable
        projects={sortedProjects}
        onSelectProject={setSelectedProject}
      />

      <TokenDetailsModal
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default ICOAnalytics;
