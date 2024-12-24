import DashboardLayout from "@/components/DashboardLayout";
import { ProjectSection } from "@/components/projects/ProjectSection";

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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProjectSection 
            title="ACTIVE" 
            count={228} 
            projects={projects.active} 
          />
          <ProjectSection 
            title="UPCOMING" 
            count={664} 
            projects={projects.upcoming} 
          />
          <ProjectSection 
            title="ENDED" 
            count={1847} 
            projects={projects.ended} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
