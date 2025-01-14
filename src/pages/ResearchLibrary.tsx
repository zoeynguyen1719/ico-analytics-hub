import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type ResearchReport = {
  id: string;
  title: string;
  description: string;
  category: string;
  document_name: string;
  pdf_url: string | null;
  thumbnail_url: string | null;
  created_at: string;
};

const ResearchLibrary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: reports, isLoading } = useQuery({
    queryKey: ['research-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ResearchReport[];
    },
  });

  const filteredReports = reports?.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedReports = filteredReports?.sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const categories = ['Security Analysis', 'ICO Project Research', 'Investment Reports'];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-crypto-blue">Research Library</h1>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-crypto-dark border-crypto-gray text-white"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px] bg-crypto-dark border-crypto-gray text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-crypto-dark border-crypto-gray">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-crypto-dark border-crypto-gray text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-crypto-dark border-crypto-gray">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="alphabetical">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-crypto-dark animate-pulse h-[300px]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedReports?.map((report) => (
                <Card 
                  key={report.id} 
                  className="bg-crypto-dark border-crypto-gray hover:border-crypto-blue transition-colors group"
                >
                  <CardContent className="p-4">
                    <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-crypto-gray">
                      {report.thumbnail_url ? (
                        <img
                          src={report.thumbnail_url}
                          alt={report.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <SlidersHorizontal className="w-12 h-12 text-crypto-blue opacity-50" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{report.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{report.description}</p>
                    {report.pdf_url && (
                      <Button 
                        className="w-full bg-crypto-blue hover:bg-crypto-blue/90"
                        onClick={() => window.open(report.pdf_url!, '_blank')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResearchLibrary;