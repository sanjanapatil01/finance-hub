import {
  LayoutDashboard,
  Receipt,
  Target,
  RefreshCw,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  Moon,
  Sun,
  Shield,
  Eye,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { title: "Overview", id: "overview", icon: LayoutDashboard },
  { title: "Transactions", id: "transactions", icon: Receipt },
  { title: "Budget Goals", id: "budgets", icon: Target },
  { title: "Recurring", id: "recurring", icon: RefreshCw },
  { title: "Calendar", id: "calendar", icon: CalendarDays },
  { title: "Analytics", id: "analytics", icon: BarChart3 },
];

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { role, setRole, darkMode, setDarkMode } = useFinance();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Brand */}
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            FF
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-foreground">
              FinanceFlow
            </span>
          )}
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.id)}
                    isActive={activeSection === item.id}
                    tooltip={item.title}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setDarkMode(!darkMode)} tooltip={darkMode ? "Light mode" : "Dark mode"}>
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
                  tooltip={`Switch to ${role === "admin" ? "Viewer" : "Admin"}`}
                >
                  {role === "admin" ? <Shield className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {!collapsed && <span>{role === "admin" ? "Admin" : "Viewer"} Mode</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user */}
      <SidebarFooter>
        <div className={`flex items-center gap-3 px-2 py-2 ${collapsed ? "justify-center" : ""}`}>
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={logout}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
