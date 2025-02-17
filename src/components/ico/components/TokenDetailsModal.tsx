import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Globe, Loader2, MessageCircle, TrendingDown, TrendingUp, Twitter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ICOProject } from "@/types/ico";

interface TokenDetailsModalProps {
  selectedProject: ICOProject | null;
  onClose: () => void;
}

const TokenDetailsModal = ({ selectedProject, onClose }: TokenDetailsModalProps) => {
  if (!selectedProject) return null;

  return (
    <Dialog open={!!selectedProject} onOpenChange={onClose}>
      <DialogContent className="bg-crypto-dark border-crypto-blue text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            {selectedProject["Project Name"]}
            {selectedProject.isHighlighted && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300">Current Price</h4>
              <p className="text-xl font-bold text-white">{selectedProject.value}</p>
              <span className={`text-sm flex items-center gap-1 ${
                selectedProject.isHighlighted ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedProject.isHighlighted ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {selectedProject.ROI ? `${selectedProject.ROI}%` : 'N/A'}
              </span>
            </Card>
            
            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300">Market Cap</h4>
              <p className="text-xl font-bold text-white">
                ${parseFloat(selectedProject.value?.replace('$', '').replace(',', '') || '0').toLocaleString()}
              </p>
              <span className="text-sm text-gray-300">
                Rank #{selectedProject.id || 'N/A'}
              </span>
            </Card>
            
            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300">24h Volume</h4>
              <p className="text-xl font-bold text-white">
                ${((selectedProject.token_metrics as any)?.volume || 0).toLocaleString()}
              </p>
              <span className="text-sm text-gray-300">
                {selectedProject.Platform || 'Unknown'} Network
              </span>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300 mb-2">Price History</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { value: selectedProject.value, date: 'Now' },
                    { value: selectedProject["Sale Price"], date: 'ICO' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#6FD5FF" />
                    <YAxis stroke="#6FD5FF" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4BA3CC" strokeWidth={2} dot={{ fill: '#4BA3CC' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300 mb-2">Token Distribution</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Distributed', value: selectedProject.distributed_percentage || 0 },
                        { name: 'Remaining', value: 100 - (selectedProject.distributed_percentage || 0) }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#4BA3CC" />
                      <Cell fill="#1a2e44" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Token Info */}
          <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-300">Token Type</h4>
                  <p className="text-lg text-white">{selectedProject.token_type || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-300">Hard Cap</h4>
                  <p className="text-lg text-white">{selectedProject.hard_cap || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-300">Token Supply</h4>
                  <p className="text-lg text-white">{selectedProject.token_supply?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-gray-300">Platform</h4>
                  <p className="text-lg text-white">{selectedProject.Platform || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-300">ICO Date</h4>
                  <p className="text-lg text-white">{selectedProject["ICO date"] || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-300">KYC Required</h4>
                  <p className="text-lg text-white">{selectedProject.kyc_required ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* External Links */}
          <div className="flex flex-wrap gap-2">
            {selectedProject.website_url && (
              <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={selectedProject.website_url} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" /> Website
                </a>
              </Button>
            )}
            {selectedProject.whitepaper_url && (
              <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={selectedProject.whitepaper_url} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> Whitepaper
                </a>
              </Button>
            )}
            {(selectedProject.social_links as any)?.twitter && (
              <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={(selectedProject.social_links as any).twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-2" /> Twitter
                </a>
              </Button>
            )}
            {(selectedProject.social_links as any)?.telegram && (
              <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={(selectedProject.social_links as any).telegram} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" /> Telegram
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenDetailsModal;
