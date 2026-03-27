import { LayoutDashboard, Car, Users, Brain, Truck, FileBarChart, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Vehicles", url: "/vehicles", icon: Car },
  { title: "Drivers", url: "/drivers", icon: Users },
  { title: "AI Insights", url: "/ai-insights", icon: Brain },
  { title: "Fleet Management", url: "/fleet", icon: Truck },
  { title: "Reports", url: "/reports", icon: FileBarChart },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="BluOrbitTech" className="h-10 w-auto shrink-0" />
          {!collapsed && <span className="font-display text-sm font-bold text-primary glow-text tracking-wider">BluOrbitTech</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-widest">{!collapsed && "Navigation"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={isActive(item.url) ? "bg-primary/10 text-primary border-l-2 border-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"}>
                    <NavLink to={item.url} end className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
