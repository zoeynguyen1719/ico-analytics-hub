import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { ResearchReport } from "@/pages/Research";

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
      
      // Create a download link
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
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            {report.thumbnail_url ? (
              <img
                src={`${supabase.storage.from('research_reports').getPublicUrl(report.thumbnail_url).data.publicUrl}`}
                alt={report.title}
                className="w-24 h-24 object-cover rounded"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{report.title}</h3>
                  <p className="text-sm text-gray-500">{report.category}</p>
                  <p className="mt-2 text-sm text-gray-600">{report.description}</p>
                </div>
                
                {report.pdf_url && (
                  <button
                    onClick={() => handleDownload(report.pdf_url, report.document_name)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-crypto-blue hover:bg-crypto-blue/10 rounded transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                )}
              </div>
              
              <div className="mt-2 text-sm text-gray-400">
                Added {new Date(report.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {reports.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No research reports found.
        </div>
      )}
    </div>
  );
};

export default ResearchList;