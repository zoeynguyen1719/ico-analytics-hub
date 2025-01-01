import { Card } from "@/components/ui/card";
import { ProjectSection } from "@/components/projects/ProjectSection";
import IntroductionSection from "@/components/introduction/IntroductionSection";
import OverviewStats from "@/components/overview/OverviewStats";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardContentProps {
  activeSection: string;
  isAuthenticated: boolean;
  sections: {
    [key: string]: {
      title: string;
      count: number;
      projects: any[];
    };
  };
}

const DashboardContent = ({ activeSection, isAuthenticated, sections }: DashboardContentProps) => {
  const navigate = useNavigate();

  if (!isAuthenticated && ["ACTIVE", "UPCOMING", "ENDED"].includes(activeSection)) {
    return (
      <Card className="p-6 text-center">
        <h3 className="text-lg font-semibold mb-4">Sign up for Basic Tier Access</h3>
        <p className="text-gray-400 mb-4">
          Please sign up for our Basic tier to view ICO projects and analytics.
        </p>
        <Button onClick={() => navigate("/subscription")} className="bg-crypto-blue hover:bg-crypto-blue/90">
          Sign Up Now
        </Button>
      </Card>
    );
  }

  if (activeSection === "INTRODUCTION") {
    return <IntroductionSection />;
  }
  
  if (activeSection === "OVERVIEW") {
    return <OverviewStats />;
  }
  
  return (
    <ProjectSection 
      title={sections[activeSection].title}
      count={sections[activeSection].count}
      projects={sections[activeSection].projects}
    />
  );
};

export default DashboardContent;