import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

// Type for our research report
type ResearchReport = {
  id: string;
  category: string;
  title: string;
  description: string;
  document_name: string;
  document_url: string | null;
  icon: string;
};

// Function to get icon component based on string name
const getIconComponent = (iconName: string) => {
  const icons = {
    Shield,
    BookOpen,
    DollarSign,
  };
  return icons[iconName as keyof typeof icons] || BookOpen;
};

const Research = () => {
  // Fetch reports from Supabase
  const { data: reports, isLoading } = useQuery({
    queryKey: ['research-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('research_reports')
        .select('*')
        .order('category');
      
      if (error) throw error;
      return data as ResearchReport[];
    },
  });

  // Group reports by category
  const groupedReports = reports?.reduce((acc, report) => {
    if (!acc[report.category]) {
      acc[report.category] = [];
    }
    acc[report.category].push(report);
    return acc;
  }, {} as Record<string, ResearchReport[]>) || {};

  // Description mapping for categories
  const categoryDescriptions = {
    'Security Analysis': 'Comprehensive security reports and audits for crypto projects',
    'ICO Project Research': 'Detailed analysis and evaluation of upcoming and active ICOs',
    'Investment Reports': 'Strategic investment insights and market analysis',
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-white">Research Reports</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-crypto-dark border-crypto-blue">
                <CardContent className="p-6">
                  <Skeleton className="h-32 w-full bg-crypto-gray" />
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
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Research Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedReports).map(([category, categoryReports]) => {
            const description = categoryDescriptions[category as keyof typeof categoryDescriptions] || '';
            const IconComponent = getIconComponent(categoryReports[0]?.icon || 'BookOpen');
            
            return (
              <Card key={category} className="bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-crypto-gray rounded-lg">
                      <IconComponent className="w-6 h-6 text-crypto-blue" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">{category}</h2>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{description}</p>
                  
                  <div className="space-y-2">
                    {categoryReports.map((report) => (
                      <div 
                        key={report.id}
                        className="flex items-center gap-2 p-2 bg-crypto-gray rounded cursor-pointer hover:bg-opacity-75 transition-colors"
                      >
                        <BookOpen className="w-4 h-4 text-crypto-blue" />
                        <span className="text-sm text-gray-300">{report.document_name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Research;