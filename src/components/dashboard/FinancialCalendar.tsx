import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { formatCurrency } from "@/utils/finance";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FinancialCalendar() {
  const { transactions } = useFinance();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Group transactions by date
  const txByDate: Record<string, typeof transactions> = {};
  transactions.forEach((t) => {
    if (!txByDate[t.date]) txByDate[t.date] = [];
    txByDate[t.date].push(t);
  });

  const dateHasTransaction = (date: Date) => {
    const key = date.toISOString().split("T")[0];
    return !!txByDate[key];
  };

  const selectedKey = selectedDate?.toISOString().split("T")[0] || "";
  const selectedTx = txByDate[selectedKey] || [];

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Financial Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-4">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("p-3 pointer-events-auto rounded-md border")}
            modifiers={{ hasTransaction: (date) => dateHasTransaction(date) }}
            modifiersClassNames={{ hasTransaction: "bg-primary/20 font-bold text-primary" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          {selectedDate ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
              {selectedTx.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No transactions on this date</p>
              ) : (
                selectedTx.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border p-3 animate-fade-in hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <Badge variant="secondary" className="text-xs mt-0.5">{tx.category}</Badge>
                    </div>
                    <span className={`text-sm font-semibold ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                      {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-8 text-center">Select a date to view transactions</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
