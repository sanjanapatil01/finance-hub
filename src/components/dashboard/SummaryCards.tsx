import { useFinance } from "@/context/FinanceContext";
import { calculateTotals, formatCurrency } from "@/utils/finance";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cards = [
  { key: "balance" as const, label: "Total Balance", icon: DollarSign, color: "text-primary" },
  { key: "income" as const, label: "Total Income", icon: TrendingUp, color: "text-success" },
  { key: "expenses" as const, label: "Total Expenses", icon: TrendingDown, color: "text-destructive" },
];

export function SummaryCards() {
  const { transactions } = useFinance();
  const totals = calculateTotals(transactions);

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <Card key={key} className="animate-slide-up">
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`rounded-xl bg-muted p-3 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="text-xl font-semibold tracking-tight text-card-foreground">
                {formatCurrency(totals[key])}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
