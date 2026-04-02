import { useFinance } from "@/context/FinanceContext";
import { calculateTotals, formatCurrency } from "@/utils/finance";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  { key: "balance" as const, label: "Total Balance", subtitle: "Net worth overview", icon: Wallet, colorClass: "bg-primary/10 text-primary" },
  { key: "income" as const, label: "Total Income", subtitle: "All earnings", icon: TrendingUp, colorClass: "bg-success/10 text-success" },
  { key: "expenses" as const, label: "Total Expenses", subtitle: "All spending", icon: TrendingDown, colorClass: "bg-destructive/10 text-destructive" },
];

export function SummaryCards() {
  const { transactions } = useFinance();
  const totals = calculateTotals(transactions);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ key, label, subtitle, icon: Icon, colorClass }, i) => (
        <Card
          key={key}
          className="group animate-slide-up transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
        >
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="text-2xl font-bold tracking-tight text-card-foreground animate-count-up">
                {formatCurrency(totals[key])}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
