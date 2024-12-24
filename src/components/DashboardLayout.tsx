import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, PieChart, Calculator, BarChart2, Newspaper, Crown, Coins } from "lucide-react";

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
      <div className="min-h-screen flex w-full bg-crypto-dark text-white">
        <Sidebar className="border-r border-crypto-gray">
          <SidebarContent>
            <div className="p-6 border-b border-crypto-gray">
              <div className="flex items-center gap-3">
                <Coins className="w-8 h-8 text-crypto-green" />
                <div>
                  <h1 className="text-xl font-bold text-crypto-green">CryptoICO</h1>
                  <p className="text-xs text-gray-400">Analytics Dashboard</p>
                </div>
              </div>
            </div>
            <nav className="mt-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-crypto-gray hover:text-crypto-green transition-colors group"
                >
                  <item.icon size={20} className="group-hover:text-crypto-green transition-colors" />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;