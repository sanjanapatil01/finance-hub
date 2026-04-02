import { useFinance } from "@/context/FinanceContext";
import { getInsights, formatCurrency } from "@/utils/finance";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from "lucide-react";

export function InsightsSection() {
  const { transactions } = useFinance();
  const { highestCategory, monthlyComparison } = getInsights(transactions);

  if (!highestCategory && !monthlyComparison) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex h-24 items-center justify-center text-sm text-muted-foreground gap-2">
          <Lightbulb className="h-4 w-4" />
          Add more transactions to unlock financial insights
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {highestCategory && (
        <Card className="group animate-slide-up transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
          <CardContent className="flex items-start gap-4 p-5">
            <div className="rounded-xl bg-warning/10 p-3 text-warning transition-transform duration-300 group-hover:scale-110">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Highest Spending Category</p>
              <p className="text-xl font-bold text-card-foreground mt-1">{highestCategory.name}</p>
              <p className="text-sm text-muted-foreground">{formatCurrency(highestCategory.value)} total spent</p>
            </div>
          </CardContent>
        </Card>
      )}
      {monthlyComparison && (
        <Card className="group animate-slide-up transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
          <CardContent className="flex items-start gap-4 p-5">
            <div className={`rounded-xl p-3 transition-transform duration-300 group-hover:scale-110 ${monthlyComparison.change > 0 ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"}`}>
              {monthlyComparison.change > 0 ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Monthly Spending Trend</p>
              <p className="text-xl font-bold text-card-foreground mt-1">
                {monthlyComparison.change > 0 ? "+" : ""}{formatCurrency(monthlyComparison.change)}
              </p>
              <p className="text-sm text-muted-foreground">
                {monthlyComparison.changePercent > 0 ? "↑" : "↓"} {Math.abs(monthlyComparison.changePercent).toFixed(1)}% compared to previous month
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
