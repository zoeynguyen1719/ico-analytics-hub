import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import Footer from "./Footer";
import AIChatBox from "./chat/AIChatBox";
import { supabase } from "@/integrations/supabase/client";
import TopNav from "./navigation/TopNav";
import MainMenu, { mainMenuItems, toolMenuItems } from "./navigation/MainMenu";
import ToolsMenu from "./navigation/ToolsMenu";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => supabase.auth.getUser());

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black text-white">
        <TopNav user={user} />

        {/* Main Menu */}
        <MainMenu />

        {/* Tools Menu */}
        <ToolsMenu />

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sidebar className="border-r border-crypto-gray">
            <SidebarContent>
              <nav className="mt-6">
                {[...mainMenuItems, ...toolMenuItems].map((item) => (
                  <a
                    key={item.label}
                    href={item.path}
                    className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-crypto-gray hover:text-crypto-blue transition-colors group"
                  >
                    <item.icon size={20} className="group-hover:text-crypto-blue transition-colors" />
                    <span className="uppercase tracking-wider">{item.label}</span>
                  </a>
                ))}
              </nav>
            </SidebarContent>
          </Sidebar>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Chat Box */}
        <AIChatBox />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;