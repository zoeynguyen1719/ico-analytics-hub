import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

// Mock data structure for ICO projects
const projects = {
  active: [
    {
      name: "Zephyr",
      symbol: "ZEFY",
      category: "DeFi",
      type: "Public Sale",
      endDate: "Q1, 2025",
      value: "$561K",
      logo: "/placeholder.svg",
      isHighlighted: true,
      isAd: true
    },
    {
      name: "Beam",
      symbol: "BEAM",
      category: "Gaming",
      type: "Node Sale Round",
      endDate: "Q1, 2025",
      value: "$76.65M",
      logo: "/placeholder.svg",
      isHighlighted: true,
      participants: 8
    },
    {
      name: "Gradient Network",
      symbol: "",
      category: "Infrastructure",
      type: "Airdrop",
      startDate: "Sep 12, 2024",
      logo: "/placeholder.svg",
      isHighlighted: true
    }
  ],
  upcoming: [
    {
      name: "Qorbi World",
      symbol: "QORBI",
      category: "GameFi",
      type: "IDO",
      platform: "Kommunitas",
      timeLeft: "10h",
      logo: "/placeholder.svg",
      isNew: true
    },
    {
      name: "AZCoiner",
      symbol: "AZC",
      category: "Blockchain Service",
      type: "IDO",
      platform: "Kommunitas",
      timeLeft: "34h",
      logo: "/placeholder.svg",
      isNew: true
    },
    {
      name: "Sentient AI",
      symbol: "SETAI",
      category: "Artificial Intelligence (AI)",
      type: "IDO",
      platform: "Polkastarter",
      date: "Dec 27, 2024",
      logo: "/placeholder.svg",
      isNew: true
    }
  ],
  ended: [
    {
      name: "CratD2C",
      symbol: "CRATD2C",
      category: "Blockchain",
      type: "IEO",
      date: "Dec 21, 2024",
      value: "$1.21M",
      logo: "/placeholder.svg"
    },
    {
      name: "Nexade",
      symbol: "NEXD",
      category: "RWA (Real World Assets)",
      type: "SHO",
      platform: "DAO Maker",
      date: "Dec 20, 2024",
      logo: "/placeholder.svg"
    },
    {
      name: "Swing",
      symbol: "SWING",
      category: "DeFi",
      type: "Public Sale",
      date: "Dec 20, 2024",
      value: "$9.75M",
      participants: 7,
      logo: "/placeholder.svg"
    }
  ]
};

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Projects Section */}
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">ACTIVE</h2>
                <span className="text-gray-400">228</span>
              </div>
            </div>
            <div className="space-y-4">
              {projects.active.map((project, index) => (
                <div key={index} className="p-4 bg-crypto-dark rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <img src={project.logo} alt={project.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{project.name}</h3>
                          <span className="text-sm text-gray-400">{project.symbol}</span>
                          {project.isHighlighted && (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              HIGH
                            </Badge>
                          )}
                          {project.isAd && (
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                              AD
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-crypto-gray px-2 py-1 rounded">
                        {project.type}
                      </span>
                      <span className="text-sm text-gray-400">
                        {project.endDate || project.startDate}
                      </span>
                    </div>
                    {project.value && (
                      <span className="text-crypto-green font-semibold">{project.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Projects Section */}
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">UPCOMING</h2>
                <span className="text-gray-400">664</span>
              </div>
            </div>
            <div className="space-y-4">
              {projects.upcoming.map((project, index) => (
                <div key={index} className="p-4 bg-crypto-dark rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <img src={project.logo} alt={project.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{project.name}</h3>
                          <span className="text-sm text-gray-400">{project.symbol}</span>
                          {project.isNew && (
                            <Badge className="bg-blue-500 text-white">NEW</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-crypto-gray px-2 py-1 rounded">
                        {project.type} on {project.platform}
                      </span>
                      <span className="text-sm text-gray-400">
                        {project.timeLeft || project.date}
                      </span>
                    </div>
                    <span className="text-gray-400">No Data</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Ended Projects Section */}
          <Card className="p-6 bg-crypto-gray border-crypto-blue">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">ENDED</h2>
                <span className="text-gray-400">1847</span>
              </div>
            </div>
            <div className="space-y-4">
              {projects.ended.map((project, index) => (
                <div key={index} className="p-4 bg-crypto-dark rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3">
                      <img src={project.logo} alt={project.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{project.name}</h3>
                          <span className="text-sm text-gray-400">{project.symbol}</span>
                        </div>
                        <p className="text-sm text-gray-400">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-crypto-gray px-2 py-1 rounded">
                        {project.type} {project.platform ? `on ${project.platform}` : ''}
                      </span>
                      <span className="text-sm text-gray-400">{project.date}</span>
                    </div>
                    {project.value ? (
                      <span className="text-crypto-green font-semibold">{project.value}</span>
                    ) : (
                      <span className="text-gray-400">No Data</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;