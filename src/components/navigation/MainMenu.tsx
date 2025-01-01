import { Home, Calculator, BarChart2, Newspaper, Crown, Gamepad2, BookOpen } from "lucide-react";

export const mainMenuItems = [
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
  return null; // We no longer need this component to render anything
};

export default MainMenu;