import { Home, Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen, LineChart } from "lucide-react";

export const mainMenuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Research", path: "/research" },
  { icon: LineChart, label: "Analytics", path: "/analytics" },
  { icon: Newspaper, label: "News", path: "/news" },
  { icon: Crown, label: "Subscription", path: "/subscription" },
  { icon: Gamepad2, label: "Games", path: "/games" },
];

export const toolMenuItems = [
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: BarChart2, label: "Compare", path: "/compare" },
];

const MainMenu = () => null;

export default MainMenu;