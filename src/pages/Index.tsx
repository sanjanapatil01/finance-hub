import { useState, useRef } from "react";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingPieChart } from "@/components/dashboard/SpendingPieChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { BudgetGoals } from "@/components/dashboard/BudgetGoals";
import { RecurringTransactions } from "@/components/dashboard/RecurringTransactions";
import { FinancialCalendar } from "@/components/dashboard/FinancialCalendar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { user } = useAuth();

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeSection={activeSection} onSectionChange={scrollToSection} />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/95 backdrop-blur px-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Welcome back{user ? `, ${user.name}` : ""}
              </h1>
              <p className="text-xs text-muted-foreground">
                Here's an overview of your financial activity
              </p>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 space-y-6">
              <div id="section-overview">
                <SummaryCards />
              </div>
              <QuickStats />
              <InsightsSection />
              <div id="section-analytics" className="grid gap-6 lg:grid-cols-2">
                <BalanceChart />
                <SpendingPieChart />
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div id="section-budgets">
                  <BudgetGoals />
                </div>
                <div id="section-recurring">
                  <RecurringTransactions />
                </div>
              </div>
              <div id="section-calendar">
                <FinancialCalendar />
              </div>
              <div id="section-transactions">
                <TransactionsTable />
              </div>
              <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
                <p>FinanceFlow Dashboard &middot; Your data is stored locally in your browser</p>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
