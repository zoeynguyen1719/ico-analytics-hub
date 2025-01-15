import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ResearchHeader from "@/components/research/ResearchHeader";
import ResearchFilters from "@/components/research/ResearchFilters";
import ResearchList from "@/components/research/ResearchList";

export type ResearchReport = {
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

  const handleSearch = () => {
    // Implement search logic here if needed
    console.log('Searching for:', searchQuery);
  };

  const filteredReports = reports?.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(reports?.map(report => report.category) || [])];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-8">
          <ResearchHeader />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full bg-crypto-gray rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <ResearchHeader />
        
        <ResearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          categories={categories}
          onSearch={handleSearch}
        />

        <ResearchList reports={filteredReports || []} />

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