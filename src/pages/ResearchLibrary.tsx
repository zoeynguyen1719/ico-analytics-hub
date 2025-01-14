import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, Search, SortAsc, Calendar } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

type Report = {
  id: string;
  title: string;
  description: string;
  category: string;
  document_url: string;
  thumbnail_url: string;
  created_at: string;
};

const ResearchLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { data: reports, isLoading } = useQuery({
    queryKey: ["research-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("research_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Report[];
    },
  });

  const filteredReports = reports?.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedReports = [...(filteredReports || [])].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    if (sortBy === "oldest") {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const categories = reports
    ? Array.from(new Set(reports.map((report) => report.category)))
    : [];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Research Library</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access our comprehensive collection of research reports, analysis, and insights
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-crypto-dark border-crypto-gray text-white"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-crypto-dark border-crypto-gray text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-crypto-dark border-crypto-gray text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Card
                key={n}
                className="bg-crypto-dark border-crypto-gray animate-pulse h-[400px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedReports.map((report) => (
              <Card
                key={report.id}
                className="bg-crypto-dark border-crypto-gray hover:border-crypto-blue transition-all duration-300 group"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <img
                      src={report.thumbnail_url || "/placeholder.svg"}
                      alt={report.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {report.title}
                  </h3>
                  <p className="text-gray-400 mb-4 flex-grow">
                    {report.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(report.created_at).toLocaleDateString()}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-crypto-blue hover:bg-crypto-blue/80 text-white"
                      onClick={() => window.open(report.document_url, "_blank")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && sortedReports.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No reports found matching your criteria.</p>
          </div>
        )}

        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2024 Mericulum Research Library. All rights reserved.</p>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default ResearchLibrary;