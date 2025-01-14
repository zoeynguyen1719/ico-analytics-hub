import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";

interface ResearchReport {
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
}

interface ResearchListProps {
  reports: ResearchReport[];
}

const ResearchList: React.FC<ResearchListProps> = ({ reports }) => {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card 
          key={report.id} 
          className="group bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-all duration-300"
        >
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-crypto-gray">
                {report.thumbnail_url ? (
                  <img
                    src={report.thumbnail_url}
                    alt={report.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-8 h-8 text-crypto-blue" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-crypto-blue transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                  {report.pdf_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-crypto-blue hover:text-white hover:bg-crypto-blue flex-shrink-0"
                      onClick={() => window.open(report.pdf_url!, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-xs text-crypto-blue bg-crypto-gray px-3 py-1 rounded-full">
                    {report.category}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResearchList;