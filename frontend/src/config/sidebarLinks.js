import { 
  Users, 
  Briefcase, 
  Settings, 
  UserCircle, 
  LayoutDashboard 
} from "lucide-react";

export const sidebarLinks = {
  main: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/client", label: "Clients", icon: Users },
    { to: "/service", label: "Services", icon: Briefcase },
    { to: "/team", label: "Team Members", icon: UserCircle },
  ],
  footer: [
    { to: "/settings", label: "Settings", icon: Settings },
  ],
};