import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { notifications } from "@/data/mockData";
import { Bell, Search, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

export function TopNav() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const initials = user?.fullName?.split(" ").map((n) => n[0]).join("") || "U";

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      </div>

      <div className="flex-1 max-w-md hidden md:block">
        {searchOpen ? (
          <Input
            placeholder="Search vehicles, drivers..."
            className="bg-secondary/50 h-8 text-sm"
            autoFocus
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => setSearchOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const query = searchValue.trim().toLowerCase();
                if (query) {
                  // Route to relevant page based on keywords
                  const routeMap: { keywords: string[]; path: string }[] = [
                    { keywords: ["vehicle", "car", "truck", "bus", "van", "automobile"], path: "/vehicles" },
                    { keywords: ["driver", "operator", "pilot", "chauffeur", "staff", "crew"], path: "/drivers" },
                    { keywords: ["ai", "insight", "analytics", "predict", "analysis", "intelligence", "ml", "forecast"], path: "/ai-insights" },
                    { keywords: ["fleet", "manage", "management", "dispatch", "route", "tracking", "gps", "location"], path: "/fleet" },
                    { keywords: ["report", "export", "summary", "stats", "statistics", "data", "chart", "graph", "log"], path: "/reports" },
                    { keywords: ["dashboard", "overview", "home", "main", "summary"], path: "/" },
                    { keywords: ["profile", "account", "user", "me", "my"], path: "/profile" },
                    { keywords: ["setting", "config", "preference", "theme", "appearance"], path: "/settings" },
                  ];

                  const matched = routeMap.find(({ keywords }) =>
                    keywords.some((kw) => query.includes(kw))
                  );

                  const destination = matched ? matched.path : "/fleet";
                  navigate(`${destination}?search=${encodeURIComponent(searchValue.trim())}`);
                }
                setSearchOpen(false);
              }
            }}
          />
        ) : (
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-4 w-4" /> <span>Search...</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-card border-border" align="end">
            <div className="p-3 border-b border-border">
              <h4 className="font-semibold text-sm">Notifications</h4>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="px-3 py-2.5 border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === "danger" ? "bg-destructive" : n.type === "warning" ? "bg-warning" : n.type === "success" ? "bg-success" : "bg-primary"}`} />
                    <div>
                      <p className="text-sm text-foreground">{n.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-secondary/50 rounded-lg px-2 py-1 transition-colors">
              <Avatar className="h-8 w-8 bg-primary/20 border border-primary/30">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.fullName} className="h-full w-full rounded-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">{initials}</AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm font-medium hidden md:block">{user?.fullName}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border">
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer"><User className="h-4 w-4 mr-2" /> Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer"><Settings className="h-4 w-4 mr-2" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { signOut(); navigate("/signin"); }} className="cursor-pointer text-destructive"><LogOut className="h-4 w-4 mr-2" /> Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
