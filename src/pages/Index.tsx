import DashboardLayout from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { useICOProjects } from "@/services/icoService";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import DashboardTabs from "@/components/tabs/DashboardTabs";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Index = () => {
  const [activeSection, setActiveSection] = useState<"INTRODUCTION" | "OVERVIEW" | "ACTIVE" | "UPCOMING" | "ENDED">("INTRODUCTION");
  const { data: icoProjects, isLoading, error } = useICOProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (!session && ["ACTIVE", "UPCOMING", "ENDED"].includes(activeSection)) {
        setActiveSection("INTRODUCTION");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthed = !!session;
      setIsAuthenticated(isAuthed);
      
      if (!isAuthed && ["ACTIVE", "UPCOMING", "ENDED"].includes(activeSection)) {
        setActiveSection("INTRODUCTION");
      }
    });

    return () => subscription.unsubscribe();
  }, [activeSection]);

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
        <DashboardTabs 
          activeSection={activeSection}
          isAuthenticated={isAuthenticated}
          onValueChange={(value) => setActiveSection(value as typeof activeSection)}
        />

        <div className="grid grid-cols-1">
          <DashboardContent 
            activeSection={activeSection}
            isAuthenticated={isAuthenticated}
            sections={sections}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;