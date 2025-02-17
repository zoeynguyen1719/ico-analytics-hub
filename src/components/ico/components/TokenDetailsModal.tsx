import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Globe, MessageCircle, TrendingDown, TrendingUp, Twitter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ICOProject } from "@/types/ico";
interface TokenDetailsModalProps {
  selectedProject: ICOProject | null;
  onClose: () => void;
}
const marketTrendData = [{
  date: 'Jan',
  value: 1000
}, {
  date: 'Feb',
  value: 1200
}, {
  date: 'Mar',
  value: 900
}, {
  date: 'Apr',
  value: 1500
}, {
  date: 'May',
  value: 2000
}];
const whaleActivityData = [{
  date: 'Jan',
  transactions: 5
}, {
  date: 'Feb',
  transactions: 8
}, {
  date: 'Mar',
  transactions: 12
}, {
  date: 'Apr',
  transactions: 7
}, {
  date: 'May',
  transactions: 15
}];
const sectorAllocationData = [{
  name: 'DeFi',
  value: 35
}, {
  name: 'Gaming',
  value: 25
}, {
  name: 'Infrastructure',
  value: 20
}, {
  name: 'NFT',
  value: 15
}, {
  name: 'Other',
  value: 5
}];
const sentimentData = [{
  date: 'Jan',
  positive: 65,
  negative: 35
}, {
  date: 'Feb',
  positive: 70,
  negative: 30
}, {
  date: 'Mar',
  positive: 55,
  negative: 45
}, {
  date: 'Apr',
  positive: 80,
  negative: 20
}, {
  date: 'May',
  positive: 75,
  negative: 25
}];
const COLORS = ['#4BA3CC', '#34D399', '#8B5CF6', '#F59E0B', '#EC4899'];
const TokenDetailsModal = ({
  selectedProject,
  onClose
}: TokenDetailsModalProps) => {
  if (!selectedProject) return null;
  return <Dialog open={!!selectedProject} onOpenChange={onClose}>
      <DialogContent className="bg-crypto-dark border-crypto-blue text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            {selectedProject["Project Name"]}
            {selectedProject.isHighlighted && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Active</span>}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300">Current Price</h4>
              <p className="text-xl font-bold text-white">{selectedProject.value}</p>
              <span className={`text-sm flex items-center gap-1 ${selectedProject.isHighlighted ? 'text-green-400' : 'text-red-400'}`}>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300 mb-2">Market Trend</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketTrendData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4BA3CC" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4BA3CC" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#6FD5FF" />
                    <YAxis stroke="#6FD5FF" />
                    <Tooltip contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #4BA3CC'
                  }} />
                    <Area type="monotone" dataKey="value" stroke="#4BA3CC" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-zinc-900/90 p-4 border-crypto-blue px-px">
              <h4 className="text-sm text-gray-300 mb-2">Sector Allocation</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sectorAllocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label={({
                    name,
                    percent
                  }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                      {sectorAllocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #4BA3CC'
                  }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300 mb-2">Whale Activity</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={whaleActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#6FD5FF" />
                    <YAxis stroke="#6FD5FF" />
                    <Tooltip contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #4BA3CC'
                  }} />
                    <Bar dataKey="transactions" fill="#4BA3CC" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-zinc-900/90 p-4 border-crypto-blue">
              <h4 className="text-sm text-gray-300 mb-2">Social Sentiment</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentData}>
                    <defs>
                      <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="#6FD5FF" />
                    <YAxis stroke="#6FD5FF" />
                    <Tooltip contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #4BA3CC'
                  }} />
                    <Area type="monotone" dataKey="positive" stroke="#34D399" fillOpacity={1} fill="url(#colorPositive)" stackId="1" />
                    <Area type="monotone" dataKey="negative" stroke="#EF4444" fillOpacity={1} fill="url(#colorNegative)" stackId="1" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

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

          <div className="flex flex-wrap gap-2">
            {selectedProject.website_url && <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={selectedProject.website_url} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" /> Website
                </a>
              </Button>}
            {selectedProject.whitepaper_url && <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={selectedProject.whitepaper_url} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" /> Whitepaper
                </a>
              </Button>}
            {(selectedProject.social_links as any)?.twitter && <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={(selectedProject.social_links as any).twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-2" /> Twitter
                </a>
              </Button>}
            {(selectedProject.social_links as any)?.telegram && <Button variant="outline" size="sm" className="text-gray-200 hover:text-crypto-blue bg-zinc-900/90" asChild>
                <a href={(selectedProject.social_links as any).telegram} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" /> Telegram
                </a>
              </Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default TokenDetailsModal;