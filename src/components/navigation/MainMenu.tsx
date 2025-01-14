import { Library, Home, Info, Phone, ChartBar, Wallet, LineChart } from "lucide-react";

export const mainMenuItems = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Research",
    path: "/research-library",
    icon: Library,
  },
  {
    label: "About",
    path: "/about",
    icon: Info,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: Phone,
  },
];

export const toolMenuItems = [
  {
    label: "Analytics",
    path: "/analytics",
    icon: ChartBar,
  },
  {
    label: "Portfolio",
    path: "/portfolio",
    icon: Wallet,
  },
  {
    label: "Trading",
    path: "/trading",
    icon: LineChart,
  },
];