import { useFinance } from "@/context/FinanceContext";
import { getInsights, formatCurrency } from "@/utils/finance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

export function InsightsSection() {
  const { transactions } = useFinance();
  const { highestCategory, monthlyComparison } = getInsights(transactions);

  if (!highestCategory && !monthlyComparison) {
    return (
      <Card>
        <CardHeader><CardTitle className="text-base">Insights</CardTitle></CardHeader>
        <CardContent className="flex h-24 items-center justify-center text-sm text-muted-foreground">
          Add more transactions to see insights
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {highestCategory && (
        <Card className="animate-slide-up">
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-xl bg-warning/10 p-3 text-warning">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">Highest Spending</p>
              <p className="text-lg font-semibold text-card-foreground">{highestCategory.name}</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(highestCategory.value)} total</p>
            </div>
          </CardContent>
        </Card>
      )}
      {monthlyComparison && (
        <Card className="animate-slide-up">
          <CardContent className="flex items-start gap-4 p-5">
            <div className={`rounded-xl p-3 ${monthlyComparison.change > 0 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
              {monthlyComparison.change > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">Monthly Comparison</p>
              <p className="text-lg font-semibold text-card-foreground">
                {monthlyComparison.change > 0 ? "+" : ""}{formatCurrency(monthlyComparison.change)}
              </p>
              <p className="text-sm text-muted-foreground">
                {monthlyComparison.changePercent > 0 ? "+" : ""}{monthlyComparison.changePercent.toFixed(1)}% vs last month
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
