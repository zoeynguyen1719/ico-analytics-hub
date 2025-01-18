import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import AIChatBox from "./chat/AIChatBox";
import { supabase } from "@/integrations/supabase/client";
import { mainMenuItems, toolMenuItems } from "./navigation/MainMenu";
import ToolsMenu from "./navigation/ToolsMenu";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [user, setUser] = useState(() => supabase.auth.getUser());
  const location = useLocation();
  const isRootRoute = location.pathname === "/";

  return (
    <div className="min-h-screen bg-crypto-dark">
      <SidebarProvider>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar>
            <SidebarTrigger />
            <SidebarContent>
              {/* Main Menu */}
              <nav className="space-y-4">
                {mainMenuItems.map((item) => (
                  <div key={item.href} className="px-3">
                    {item.content}
                  </div>
                ))}
              </nav>

              {/* Tools Menu */}
              <ToolsMenu items={toolMenuItems} />
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 pt-32 p-8">
            {children || <Outlet />}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </SidebarProvider>

      {/* Chat Box */}
      <AIChatBox />
    </div>
  );
};

export default DashboardLayout;