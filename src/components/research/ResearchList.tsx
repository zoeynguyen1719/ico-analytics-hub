import { Card } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { ResearchReport } from "@/pages/Research";
import { Button } from "@/components/ui/button";

interface ResearchListProps {
  reports: ResearchReport[];
}

const ResearchList = ({ reports }: ResearchListProps) => {
  const handleDownload = async (pdfUrl: string | null, documentName: string) => {
    if (!pdfUrl) return;
    
    try {
      const { data, error } = await supabase.storage
        .from('research_reports')
        .download(pdfUrl);
        
      if (error) throw error;
      
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card 
            key={report.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-crypto-dark border-crypto-blue"
          >
            <div className="aspect-w-3 aspect-h-4 relative">
              {report.thumbnail_url ? (
                <img
                  src={`${supabase.storage.from('research_reports').getPublicUrl(report.thumbnail_url).data.publicUrl}`}
                  alt={report.title}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              ) : (
                <div className="w-full h-48 bg-crypto-gray flex items-center justify-center">
                  <FileText className="w-16 h-16 text-crypto-blue opacity-50" />
                </div>
              )}
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2 hover:text-crypto-blue transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-crypto-blue mb-2">{report.category}</p>
                <p className="text-sm text-gray-400 line-clamp-2">{report.description}</p>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-400">
                  Added {new Date(report.created_at).toLocaleDateString()}
                </span>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-crypto-blue hover:text-white hover:bg-crypto-blue/20"
                    onClick={() => window.open(supabase.storage.from('research_reports').getPublicUrl(report.pdf_url || '').data.publicUrl, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  
                  {report.pdf_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-crypto-blue hover:text-white hover:bg-crypto-blue/20"
                      onClick={() => handleDownload(report.pdf_url, report.document_name)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {reports.length === 0 && (
        <div className="text-center py-12 bg-crypto-dark rounded-lg border border-crypto-blue">
          <FileText className="w-12 h-12 text-crypto-blue mx-auto mb-4 opacity-50" />
          <p className="text-gray-400">No research reports found.</p>
        </div>
      )}
    </div>
  );
};

export default ResearchList;