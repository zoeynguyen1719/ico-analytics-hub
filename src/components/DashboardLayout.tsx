import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Home, PieChart, Calculator, BarChart2, Newspaper, Crown } from "lucide-react";

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
            <div className="p-4">
              <h1 className="text-xl font-bold text-crypto-green">CryptoICO Dashboard</h1>
            </div>
            <nav className="mt-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-crypto-gray hover:text-crypto-green transition-colors"
                >
                  <item.icon size={20} />
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