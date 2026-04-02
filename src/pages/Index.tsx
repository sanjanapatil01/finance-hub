import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingPieChart } from "@/components/dashboard/SpendingPieChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsSection } from "@/components/dashboard/InsightsSection";

const Index = () => {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <DashboardHeader />
        <SummaryCards />
        <InsightsSection />
        <div className="grid gap-6 lg:grid-cols-2">
          <BalanceChart />
          <SpendingPieChart />
        </div>
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Index;
