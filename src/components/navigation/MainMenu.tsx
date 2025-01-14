import { Home, Info, Mail, BookOpen, LineChart, Newspaper, Gamepad2, BookText } from "lucide-react";

export const mainMenuItems = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: Mail,
  },
  {
    label: "Research Library",
    path: "/research-library",
    icon: BookOpen,
  },
];

export const toolMenuItems = [
  {
    label: "Analytics",
    path: "/analytics",
    icon: LineChart,
  },
  {
    label: "News",
    path: "/news",
    icon: Newspaper,
  },
  {
    label: "Games",
    path: "/games",
    icon: Gamepad2,
  },
  {
    label: "Research",
    path: "/research",
    icon: BookText,
  },
];