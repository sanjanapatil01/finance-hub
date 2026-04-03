import { useFinance } from "@/context/FinanceContext";
import { formatCurrency } from "@/utils/finance";
import { AlertTriangle, TrendingDown, Flame, PiggyBank, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function QuickStats() {
  const { transactions } = useFinance();

  // Savings rate
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Largest single expense
  const largestExpense = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  // Average daily spending
  const uniqueDays = new Set(transactions.filter((t) => t.type === "expense").map((t) => t.date)).size;
  const avgDailySpending = uniqueDays > 0 ? totalExpenses / uniqueDays : 0;

  // Spending streak (consecutive days with expenses)
  const expenseDates = [...new Set(transactions.filter((t) => t.type === "expense").map((t) => t.date))].sort();
  let streak = 0;
  if (expenseDates.length > 0) {
    streak = 1;
    for (let i = expenseDates.length - 1; i > 0; i--) {
      const d1 = new Date(expenseDates[i]);
      const d2 = new Date(expenseDates[i - 1]);
      const diff = (d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24);
      if (diff === 1) streak++;
      else break;
    }
  }

  // Over-spending categories (above average)
  const categorySpending: Record<string, number[]> = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    const month = t.date.substring(0, 7);
    const key = `${t.category}-${month}`;
    if (!categorySpending[t.category]) categorySpending[t.category] = [];
  });

  const alerts: { icon: React.ReactNode; text: string; type: "warning" | "success" | "info" }[] = [];

  if (savingsRate < 10 && totalIncome > 0) {
    alerts.push({ icon: <AlertTriangle className="h-4 w-4" />, text: `Low savings rate: ${savingsRate.toFixed(1)}%. Aim for at least 20%.`, type: "warning" });
  } else if (savingsRate >= 20) {
    alerts.push({ icon: <PiggyBank className="h-4 w-4" />, text: `Great savings rate: ${savingsRate.toFixed(1)}%! Keep it up.`, type: "success" });
  }

  if (largestExpense && largestExpense.amount > totalExpenses * 0.3) {
    alerts.push({ icon: <TrendingDown className="h-4 w-4" />, text: `"${largestExpense.description}" is ${((largestExpense.amount / totalExpenses) * 100).toFixed(0)}% of total spending.`, type: "warning" });
  }

  if (streak >= 5) {
    alerts.push({ icon: <Flame className="h-4 w-4" />, text: `${streak}-day spending streak! Consider a no-spend day.`, type: "info" });
  }

  const stats = [
    { label: "Savings Rate", value: `${savingsRate.toFixed(1)}%`, icon: <PiggyBank className="h-4 w-4" />, color: savingsRate >= 20 ? "text-success" : savingsRate >= 10 ? "text-warning" : "text-destructive" },
    { label: "Avg. Daily Spending", value: formatCurrency(avgDailySpending), icon: <ArrowDownRight className="h-4 w-4" />, color: "text-muted-foreground" },
    { label: "Largest Expense", value: largestExpense ? formatCurrency(largestExpense.amount) : "N/A", icon: <ArrowUpRight className="h-4 w-4" />, color: "text-destructive" },
    { label: "Spending Streak", value: `${streak} day${streak !== 1 ? "s" : ""}`, icon: <Flame className="h-4 w-4" />, color: streak >= 5 ? "text-warning" : "text-muted-foreground" },
  ];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "50ms", animationFillMode: "both" }}>
      <CardHeader>
        <CardTitle className="text-base">Quick Stats & Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border p-3 text-center hover:bg-muted/50 transition-colors animate-fade-in">
              <div className={`mx-auto mb-1 ${stat.color}`}>{stat.icon}</div>
              <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg p-3 text-sm animate-fade-in ${
                  alert.type === "warning" ? "bg-warning/10 text-warning" :
                  alert.type === "success" ? "bg-success/10 text-success" :
                  "bg-primary/10 text-primary"
                }`}
              >
                {alert.icon}
                <span>{alert.text}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
