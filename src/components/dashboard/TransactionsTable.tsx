import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { filterTransactions, formatCurrency } from "@/utils/finance";
import { exportTransactionsCSV } from "@/utils/exportCSV";
import { Trash2, Search, ArrowUpDown, Plus, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddTransactionModal } from "./AddTransactionModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TransactionsTable() {
  const { transactions, filters, setFilters, role, deleteTransaction } = useFinance();
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = filterTransactions(transactions, filters);

  const toggleSort = (field: "date" | "amount" | "category") => {
    if (filters.sortBy === field) {
      setFilters({ ...filters, sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
    } else {
      setFilters({ ...filters, sortBy: field, sortOrder: "desc" });
    }
  };

  return (
    <>
      <Card className="animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Recent Transactions</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">{filtered.length} transaction{filtered.length !== 1 ? "s" : ""} found</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search category..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="h-9 pl-9 w-full sm:w-48"
              />
            </div>
            <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v as any })}>
              <SelectTrigger className="h-9 w-full sm:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportTransactionsCSV(filtered)}
              className="gap-1.5"
              disabled={filtered.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
            {role === "admin" && (
              <Button size="sm" onClick={() => setModalOpen(true)} className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="flex flex-col h-32 items-center justify-center text-sm text-muted-foreground gap-2 animate-fade-in">
              <p className="font-medium">No transactions found</p>
              <p className="text-xs">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button onClick={() => toggleSort("date")} className="inline-flex items-center gap-1 text-xs font-medium hover:text-foreground transition-colors">
                        Date <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>
                      <button onClick={() => toggleSort("category")} className="inline-flex items-center gap-1 text-xs font-medium hover:text-foreground transition-colors">
                        Category <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">
                      <button onClick={() => toggleSort("amount")} className="inline-flex items-center gap-1 text-xs font-medium hover:text-foreground transition-colors">
                        Amount <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    {role === "admin" && <TableHead className="w-12" />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((tx, i) => (
                    <TableRow
                      key={tx.id}
                      className="animate-fade-in transition-colors hover:bg-muted/50"
                      style={{ animationDelay: `${i * 30}ms`, animationFillMode: "both" }}
                    >
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </TableCell>
                      <TableCell className="text-sm font-medium">{tx.description}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs font-normal">{tx.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={tx.type === "income" ? "default" : "destructive"} className="text-xs capitalize">
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right text-sm font-semibold ${tx.type === "income" ? "text-success" : "text-destructive"}`}>
                        {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                      </TableCell>
                      {role === "admin" && (
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                            onClick={() => deleteTransaction(tx.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <AddTransactionModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
