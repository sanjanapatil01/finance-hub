import { useFinance } from "@/context/FinanceContext";
import { formatCurrency } from "@/utils/finance";
import { EXPENSE_CATEGORIES } from "@/data/transactions";
import { Target, Edit2, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DEFAULT_BUDGETS: Record<string, number> = {
  "Food & Dining": 300,
  "Transportation": 200,
  "Shopping": 400,
  "Entertainment": 150,
  "Bills & Utilities": 500,
  "Healthcare": 300,
  "Education": 200,
  "Rent": 1600,
  "Groceries": 400,
};

export function BudgetGoals() {
  const { transactions, budgets, setBudgets, role } = useFinance();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const currentMonth = new Date().toISOString().substring(0, 7);
  const monthlyExpenses: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(currentMonth))
    .forEach((t) => {
      monthlyExpenses[t.category] = (monthlyExpenses[t.category] || 0) + t.amount;
    });

  // Also show categories with spending even if no budget set
  const allExpenseMonths = transactions
    .filter((t) => t.type === "expense")
    .map((t) => t.date.substring(0, 7));
  const latestMonth = allExpenseMonths.sort().pop() || currentMonth;

  const latestExpenses: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense" && t.date.startsWith(latestMonth))
    .forEach((t) => {
      latestExpenses[t.category] = (latestExpenses[t.category] || 0) + t.amount;
    });

  const activeBudgets = budgets || DEFAULT_BUDGETS;
  const categories = EXPENSE_CATEGORIES.filter(
    (c) => activeBudgets[c] || latestExpenses[c]
  );

  const handleSave = (category: string) => {
    const val = parseFloat(editValue);
    if (val > 0) {
      setBudgets({ ...activeBudgets, [category]: val });
    }
    setEditingCategory(null);
  };

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Monthly Budget Goals</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          {latestMonth === currentMonth ? "This month" : latestMonth}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => {
          const spent = latestExpenses[category] || 0;
          const budget = activeBudgets[category] || 0;
          const percent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
          const isOver = spent > budget && budget > 0;

          return (
            <div key={category} className="space-y-1.5 animate-fade-in">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category}</span>
                <div className="flex items-center gap-2">
                  {editingCategory === category ? (
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-6 w-20 text-xs"
                        autoFocus
                      />
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleSave(category)}>
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setEditingCategory(null)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <span className={`text-xs ${isOver ? "text-destructive font-semibold" : "text-muted-foreground"}`}>
                        {formatCurrency(spent)} / {formatCurrency(budget)}
                      </span>
                      {role === "admin" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            setEditingCategory(category);
                            setEditValue(budget.toString());
                          }}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
              <Progress
                value={percent}
                className={`h-2 ${isOver ? "[&>div]:bg-destructive" : "[&>div]:bg-primary"}`}
              />
            </div>
          );
        })}
        {categories.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No expenses this month</p>
        )}
      </CardContent>
    </Card>
  );
}
