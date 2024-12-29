import { Card } from "@/components/ui/card";
import { ChartBar, DollarSign, Calendar, Users, Globe, Rocket, Info } from "lucide-react";

const OverviewStats = () => {
  const stats = [
    {
      title: "Total ICOs",
      value: "156",
      change: "+12%",
      icon: ChartBar,
      description: "Active ICO projects"
    },
    {
      title: "Total Raised",
      value: "$2.4M",
      change: "+8.2%",
      icon: DollarSign,
      description: "Across all projects"
    },
    {
      title: "Average ROI",
      value: "124%",
      change: "+5.4%",
      icon: Rocket,
      description: "Return on investment"
    },
    {
      title: "Active Users",
      value: "2,845",
      change: "+2.3%",
      icon: Users,
      description: "Platform participants"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-crypto-gray border-crypto-blue hover:border-crypto-green transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
              <div className="p-2 bg-crypto-dark rounded-lg">
                <stat.icon className="w-6 h-6 text-crypto-green" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm ${stat.change.startsWith('+') ? 'text-crypto-green' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-400 ml-2">vs last month</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">{stat.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="p-6 bg-crypto-gray border-crypto-blue">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <Calendar className="w-5 h-5 text-crypto-green" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-crypto-dark">
                <div>
                  <p className="text-sm font-medium text-white">New ICO Listed</p>
                  <p className="text-xs text-gray-400">Metaverse Project</p>
                </div>
                <span className="text-xs text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-crypto-gray border-crypto-blue">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Global Statistics</h3>
            <Globe className="w-5 h-5 text-crypto-green" />
          </div>
          <div className="space-y-4">
            {[
              { label: "Total Market Cap", value: "$1.2B" },
              { label: "24h Volume", value: "$245M" },
              { label: "Active Projects", value: "89" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-crypto-dark">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <span className="text-sm font-medium text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OverviewStats;