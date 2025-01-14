import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Download, Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Type for our research report
type ResearchReport = {
  id: string;
  category: string;
  title: string;
  description: string;
  document_name: string;
  document_url: string | null;
  icon: string;
  pdf_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
};

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch reports from Supabase
  const { data: reports, isLoading } = useQuery({
    queryKey: ['research-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_reports')
        .select('*')
        .order('created_at', { ascending: sortOrder === 'asc' });
      
      if (error) throw error;
      return data as ResearchReport[];
    },
  });

  // Filter and sort reports
  const filteredReports = reports?.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(reports?.map(report => report.category) || [])];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">Research Library</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Access our comprehensive collection of research reports and analysis on various crypto projects and market trends.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-crypto-dark border-crypto-blue">
                <CardContent className="p-6">
                  <Skeleton className="h-48 w-full bg-crypto-gray rounded-lg" />
                  <Skeleton className="h-6 w-3/4 mt-4 bg-crypto-gray" />
                  <Skeleton className="h-4 w-full mt-2 bg-crypto-gray" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Research Library</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access our comprehensive collection of research reports and analysis on various crypto projects and market trends.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-crypto-dark p-4 rounded-lg">
          <div className="flex-1 w-full md:w-auto">
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-crypto-gray border-crypto-blue text-white"
              icon={<Search className="text-crypto-blue" />}
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-crypto-gray border-crypto-blue text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-crypto-dark border-crypto-blue">
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="w-full md:w-[180px] bg-crypto-gray border-crypto-blue text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-crypto-dark border-crypto-blue">
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports?.map((report) => (
            <Card 
              key={report.id} 
              className="group bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-all duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-6 space-y-4">
                {/* Thumbnail */}
                <div className="relative aspect-video rounded-lg overflow-hidden bg-crypto-gray">
                  {report.thumbnail_url ? (
                    <img
                      src={report.thumbnail_url}
                      alt={report.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <BookOpen className="w-12 h-12 text-crypto-blue" />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-crypto-blue transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {report.description}
                  </p>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs text-crypto-blue bg-crypto-gray px-3 py-1 rounded-full">
                    {report.category}
                  </span>
                  {report.pdf_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-crypto-blue hover:text-white hover:bg-crypto-blue"
                      onClick={() => window.open(report.pdf_url!, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button (if needed) */}
        {filteredReports && filteredReports.length > 0 && (
          <div className="flex justify-center pt-8">
            <Button
              variant="outline"
              className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue hover:text-white"
            >
              Load More Reports
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Research;