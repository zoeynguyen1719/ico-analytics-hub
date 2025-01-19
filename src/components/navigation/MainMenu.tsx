import { Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

export const mainMenuItems = [
  {
    icon: BookOpen,
    label: "Research",
    path: "/research",
    href: "/research",
    content: (
      <Link to="/research" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-crypto-blue transition-colors group">
        <BookOpen size={20} className="group-hover:text-crypto-blue transition-colors" />
        <span className="uppercase tracking-wider">Research</span>
      </Link>
    )
  },
  {
    icon: LineChart,
    label: "Analytics",
    path: "/analytics",
    href: "/analytics",
    content: (
      <Link to="/analytics" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-crypto-blue transition-colors group">
        <LineChart size={20} className="group-hover:text-crypto-blue transition-colors" />
        <span className="uppercase tracking-wider">Analytics</span>
      </Link>
    )
  },
  {
    icon: Newspaper,
    label: "News",
    path: "/news",
    href: "/news",
    content: (
      <Link to="/news" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-crypto-blue transition-colors group">
        <Newspaper size={20} className="group-hover:text-crypto-blue transition-colors" />
        <span className="uppercase tracking-wider">News</span>
      </Link>
    )
  },
  {
    icon: Crown,
    label: "Subscription",
    path: "/subscription",
    href: "/subscription",
    content: (
      <Link to="/subscription" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-crypto-blue transition-colors group">
        <Crown size={20} className="group-hover:text-crypto-blue transition-colors" />
        <span className="uppercase tracking-wider">Subscription</span>
      </Link>
    )
  },
  {
    icon: Gamepad2,
    label: "Games",
    path: "/games",
    href: "/games",
    content: (
      <Link to="/games" className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-white/5 hover:text-crypto-blue transition-colors group">
        <Gamepad2 size={20} className="group-hover:text-crypto-blue transition-colors" />
        <span className="uppercase tracking-wider">Games</span>
      </Link>
    )
  },
];

export const toolMenuItems = [
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
];

const MainMenu = () => null;

export default MainMenu;