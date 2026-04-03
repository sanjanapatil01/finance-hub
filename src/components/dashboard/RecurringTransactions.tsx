import { useFinance } from "@/context/FinanceContext";
import { formatCurrency } from "@/utils/finance";
import { RefreshCw, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/data/transactions";
import { RecurringTransaction } from "@/types/finance";

export function RecurringTransactions() {
  const { recurringTransactions, addRecurring, removeRecurring, role } = useFinance();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ description: "", amount: "", category: "", type: "expense" as "income" | "expense", frequency: "monthly" as "monthly" | "weekly" });

  const handleAdd = () => {
    if (!form.description || !form.amount || !form.category) return;
    addRecurring({
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      frequency: form.frequency,
    });
    setForm({ description: "", amount: "", category: "", type: "expense", frequency: "monthly" });
    setOpen(false);
  };

  const categories = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const totalMonthly = recurringTransactions.reduce((sum, r) => {
    const amt = r.frequency === "weekly" ? r.amount * 4 : r.amount;
    return r.type === "income" ? sum + amt : sum - amt;
  }, 0);

  return (
    <Card className="animate-slide-up" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Recurring Transactions</CardTitle>
        </div>
        {role === "admin" && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Recurring Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="e.g., Netflix subscription" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as any, category: "" })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="income">Income</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select value={form.frequency} onValueChange={(v) => setForm({ ...form, frequency: v as any })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Amount ($)</Label>
                    <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAdd} className="w-full">Add Recurring</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>
        {recurringTransactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No recurring transactions set up</p>
        ) : (
          <div className="space-y-3">
            {recurringTransactions.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3 animate-fade-in hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium">{r.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-xs">{r.category}</Badge>
                      <Badge variant="outline" className="text-xs capitalize">{r.frequency}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${r.type === "income" ? "text-success" : "text-destructive"}`}>
                    {r.type === "income" ? "+" : "-"}{formatCurrency(r.amount)}
                  </span>
                  {role === "admin" && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeRecurring(r.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2 border-t border-border text-sm">
              <span className="text-muted-foreground">Est. monthly net impact</span>
              <span className={`font-semibold ${totalMonthly >= 0 ? "text-success" : "text-destructive"}`}>
                {totalMonthly >= 0 ? "+" : ""}{formatCurrency(totalMonthly)}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
