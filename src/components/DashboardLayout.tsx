import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen, Shield } from "lucide-react";
import { useState } from "react";
import Footer from "./Footer";

const mainMenuItems = [
  { icon: Home, label: "Overview", path: "/" },
  { icon: Shield, label: "Basic Tier", path: "/basic" },
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

const toolMenuItems = [
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [showTools, setShowTools] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black text-white">
        {/* Top Navigation Bar */}
        <header className="w-full bg-black border-b border-crypto-gray">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png" 
                  alt="Mericulum Logo" 
                  className="h-12 w-auto"
                />
              </div>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-8">
                {mainMenuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.path}
                    className="flex items-center gap-2 text-gray-300 hover:text-crypto-blue transition-colors group py-2"
                  >
                    <item.icon size={18} className="group-hover:text-crypto-blue transition-colors" />
                    <span className="font-medium uppercase tracking-wider text-sm">{item.label}</span>
                  </a>
                ))}
              </nav>

              {/* Tools Section */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={() => setShowTools(!showTools)}
                  className="text-gray-300 hover:text-crypto-blue p-2 transition-colors"
                  aria-label="Toggle tools"
                >
                  Tools
                </button>
                {showTools && (
                  <div className="flex items-center gap-4 ml-4">
                    {toolMenuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.path}
                        className="text-gray-300 hover:text-crypto-blue transition-colors"
                        title={item.label}
                      >
                        <item.icon size={20} />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Trigger */}
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
            </div>
          </div>
        </header>

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
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;