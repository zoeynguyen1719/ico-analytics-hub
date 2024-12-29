import DashboardLayout from "@/components/DashboardLayout";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useICOProjects } from "@/services/icoService";
import { Card } from "@/components/ui/card";
import OverviewStats from "@/components/overview/OverviewStats";
import IntroductionSection from "@/components/introduction/IntroductionSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"INTRODUCTION" | "OVERVIEW" | "ACTIVE" | "UPCOMING" | "ENDED">("INTRODUCTION");
  const { data: icoProjects, isLoading, error } = useICOProjects();

  // Categorize projects based on certain criteria
  const categorizedProjects = {
    active: icoProjects?.filter(p => p.isHighlighted) || [],
    upcoming: icoProjects?.filter(p => p.isNew && !p.isHighlighted) || [],
    ended: icoProjects?.filter(p => !p.isNew && !p.isHighlighted) || []
  };

  const sections = {
    ACTIVE: { title: "ACTIVE", count: categorizedProjects.active.length, projects: categorizedProjects.active },
    UPCOMING: { title: "UPCOMING", count: categorizedProjects.upcoming.length, projects: categorizedProjects.upcoming },
    ENDED: { title: "ENDED", count: categorizedProjects.ended.length, projects: categorizedProjects.ended }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <Card className="p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-600 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Card className="p-6 text-red-500">
          Error loading ICO projects. Please try again later.
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ToggleGroup
          type="single"
          value={activeSection}
          onValueChange={(value) => {
            if (value) setActiveSection(value as "INTRODUCTION" | "OVERVIEW" | "ACTIVE" | "UPCOMING" | "ENDED");
          }}
          className="justify-start"
        >
          <ToggleGroupItem value="INTRODUCTION" aria-label="Show introduction">
            Introduction
          </ToggleGroupItem>
          <ToggleGroupItem value="OVERVIEW" aria-label="Show overview">
            Overview
          </ToggleGroupItem>
          <ToggleGroupItem value="ACTIVE" aria-label="Show active projects">
            Active
          </ToggleGroupItem>
          <ToggleGroupItem value="UPCOMING" aria-label="Show upcoming projects">
            Upcoming
          </ToggleGroupItem>
          <ToggleGroupItem value="ENDED" aria-label="Show ended projects">
            Ended
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="grid grid-cols-1">
          {activeSection === "INTRODUCTION" ? (
            <IntroductionSection />
          ) : activeSection === "OVERVIEW" ? (
            <OverviewStats />
          ) : (
            <ProjectSection 
              title={sections[activeSection].title}
              count={sections[activeSection].count}
              projects={sections[activeSection].projects}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;