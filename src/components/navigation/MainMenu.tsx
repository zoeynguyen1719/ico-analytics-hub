import { Home, Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen } from "lucide-react";

export const mainMenuItems = [
  { icon: Home, label: "Overview", path: "/" },
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

export const toolMenuItems = [
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
];

const MainMenu = () => {
  return (
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
  );
};

export default MainMenu;