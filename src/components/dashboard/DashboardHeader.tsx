import { useFinance } from "@/context/FinanceContext";
import { Moon, Sun, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { role, setRole, darkMode, setDarkMode } = useFinance();

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
      </div>
    </header>
  );
}
