import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, DollarSign } from "lucide-react";

const Research = () => {
  const reports = [
    {
      id: 1,
      title: "Security Analysis",
      description: "Comprehensive security reports and audits for crypto projects",
      icon: Shield,
      documents: [
        "Smart Contract Audit Guidelines",
        "Security Best Practices",
        "Risk Assessment Framework"
      ]
    },
    {
      id: 2,
      title: "ICO Project Research",
      description: "Detailed analysis and evaluation of upcoming and active ICOs",
      icon: BookOpen,
      documents: [
        "ICO Evaluation Metrics",
        "Project Viability Analysis",
        "Market Opportunity Assessment"
      ]
    },
    {
      id: 3,
      title: "Investment Reports",
      description: "Strategic investment insights and market analysis",
      icon: DollarSign,
      documents: [
        "Investment Strategy Guide",
        "Risk Management Framework",
        "Portfolio Optimization Tips"
      ]
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Research Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-crypto-gray rounded-lg">
                    <report.icon className="w-6 h-6 text-crypto-blue" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{report.title}</h2>
                </div>
                
                <p className="text-gray-400 mb-4">{report.description}</p>
                
                <div className="space-y-2">
                  {report.documents.map((doc, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-2 bg-crypto-gray rounded cursor-pointer hover:bg-opacity-75 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-crypto-blue" />
                      <span className="text-sm text-gray-300">{doc}</span>
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