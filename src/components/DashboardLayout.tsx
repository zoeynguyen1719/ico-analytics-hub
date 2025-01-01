import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen } from "lucide-react";
import { useState } from "react";
import Footer from "./Footer";

const mainMenuItems = [
  { icon: Home, label: "Overview", path: "/" },
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
  const [showTools, setShowTools] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-black text-white">
        {/* Top Navigation Bar */}
        <header className="w-full bg-black border-b border-crypto-gray">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png" 
                  alt="Mericulum Logo" 
                  className="h-12 w-auto"
                />
              </div>

              {/* Navigation Menu - Now centered */}
              <nav className="hidden md:flex items-center justify-center flex-1 mx-4">
                <div className="flex items-center space-x-8">
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
                </div>
              </nav>

              {/* Tools Section - Redesigned for better visual appeal */}
              <div 
                className="hidden md:flex items-center fixed right-0 top-20 bg-gradient-to-l from-crypto-dark to-[#2A4B57] px-6 py-3 rounded-l-xl transition-all duration-300 hover:translate-x-0 translate-x-[calc(100%-48px)] group shadow-xl border-l border-t border-b border-crypto-blue/20"
                onMouseEnter={() => setShowTools(true)}
                onMouseLeave={() => setShowTools(false)}
              >
                <div className="flex items-center">
                  <span className="text-crypto-blue font-bold rotate-90 transform origin-left translate-y-[-50%] group-hover:opacity-0 transition-opacity absolute left-6 tracking-widest uppercase text-sm bg-crypto-dark/50 px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                    Tools
                  </span>
                  <div className="flex items-center gap-6 pl-10">
                    {toolMenuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.path}
                        className="relative group/tool"
                        title={item.label}
                      >
                        <item.icon 
                          size={22} 
                          className="text-crypto-blue hover:text-white transition-all duration-300 transform hover:scale-110" 
                        />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-crypto-blue text-crypto-dark px-2 py-1 rounded text-xs font-medium opacity-0 group-hover/tool:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
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