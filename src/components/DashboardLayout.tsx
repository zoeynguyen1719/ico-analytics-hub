import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, PieChart, Calculator, BarChart2, Newspaper, Crown } from "lucide-react";
import Footer from "./Footer";

const menuItems = [
  { icon: Home, label: "Overview", path: "/" },
  { icon: PieChart, label: "Portfolio", path: "/portfolio" },
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-crypto-dark text-white">
        {/* Top Navigation Bar */}
        <header className="w-full bg-crypto-dark border-b border-crypto-gray">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo Section */}
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/e9b77ead-4371-450c-9bd5-3c816f6fe9dd.png" 
                  alt="Mericulum Logo" 
                  className="h-12 w-auto"
                />
              </div>

              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
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
                {menuItems.map((item) => (
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