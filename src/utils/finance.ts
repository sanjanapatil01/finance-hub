import { Transaction, Filters } from "@/types/finance";

export function filterTransactions(transactions: Transaction[], filters: Filters): Transaction[] {
  let result = [...transactions];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    );
  }

  if (filters.type !== "all") {
    result = result.filter((t) => t.type === filters.type);
  }

  result.sort((a, b) => {
    let cmp = 0;
    if (filters.sortBy === "date") cmp = a.date.localeCompare(b.date);
    else if (filters.sortBy === "amount") cmp = a.amount - b.amount;
    else cmp = a.category.localeCompare(b.category);
    return filters.sortOrder === "asc" ? cmp : -cmp;
  });

  return result;
}

export function calculateTotals(transactions: Transaction[]) {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}

export function getCategorySpending(transactions: Transaction[]) {
  const map: Record<string, number> = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getBalanceTrend(transactions: Transaction[]) {
  const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
  const monthMap: Record<string, { income: number; expenses: number }> = {};

  sorted.forEach((t) => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!monthMap[month]) monthMap[month] = { income: 0, expenses: 0 };
    if (t.type === "income") monthMap[month].income += t.amount;
    else monthMap[month].expenses += t.amount;
  });

  let balance = 0;
  return Object.entries(monthMap).map(([month, data]) => {
    balance += data.income - data.expenses;
    return {
      month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
      balance,
      income: data.income,
      expenses: data.expenses,
    };
  });
}

export function getInsights(transactions: Transaction[]) {
  const categorySpending = getCategorySpending(transactions);
  const highestCategory = categorySpending[0] || null;

  const monthlySpending: Record<string, number> = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    const month = t.date.substring(0, 7);
    monthlySpending[month] = (monthlySpending[month] || 0) + t.amount;
  });

  const months = Object.entries(monthlySpending).sort((a, b) => a[0].localeCompare(b[0]));
  const monthlyComparison = months.length >= 2
    ? {
        current: { month: months[months.length - 1][0], amount: months[months.length - 1][1] },
        previous: { month: months[months.length - 2][0], amount: months[months.length - 2][1] },
        change: months[months.length - 1][1] - months[months.length - 2][1],
        changePercent: ((months[months.length - 1][1] - months[months.length - 2][1]) / months[months.length - 2][1]) * 100,
      }
    : null;

  return { highestCategory, monthlyComparison };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
