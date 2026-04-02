import { useFinance } from "@/context/FinanceContext";
import { useAuth } from "@/context/AuthContext";
import { Moon, Sun, Shield, Eye, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { role, setRole, darkMode, setDarkMode } = useFinance();
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Finance Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your income, expenses, and financial insights
        </p>
      </div>
      <div className="flex items-center gap-2">
        {user && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-medium text-card-foreground">{user.name}</span>
          </div>
        )}
        <div className="flex items-center rounded-lg border border-border bg-card p-1">
          <Button
            variant={role === "admin" ? "default" : "ghost"}
            size="sm"
            onClick={() => setRole("admin")}
            className="gap-1.5 text-xs"
          >
            <Shield className="h-3.5 w-3.5" />
            Admin
          </Button>
          <Button
            variant={role === "viewer" ? "default" : "ghost"}
            size="sm"
            onClick={() => setRole("viewer")}
            className="gap-1.5 text-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            Viewer
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          className="shrink-0"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={logout}
          className="shrink-0"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
