import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingPieChart } from "@/components/dashboard/SpendingPieChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { BudgetGoals } from "@/components/dashboard/BudgetGoals";
import { RecurringTransactions } from "@/components/dashboard/RecurringTransactions";
import { FinancialCalendar } from "@/components/dashboard/FinancialCalendar";

const Index = () => {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <DashboardHeader />
        <SummaryCards />
        <QuickStats />
        <InsightsSection />
        <div className="grid gap-6 lg:grid-cols-2">
          <BalanceChart />
          <SpendingPieChart />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <BudgetGoals />
          <RecurringTransactions />
        </div>
        <FinancialCalendar />
        <TransactionsTable />
        <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
          <p>FinanceFlow Dashboard &middot; Your data is stored locally in your browser</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
