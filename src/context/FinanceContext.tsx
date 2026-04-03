import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction, Filters, UserRole, RecurringTransaction } from "@/types/finance";
import { mockTransactions } from "@/data/transactions";
import { generateId } from "@/utils/finance";

interface FinanceContextType {
  transactions: Transaction[];
  filters: Filters;
  role: UserRole;
  darkMode: boolean;
  budgets: Record<string, number>;
  recurringTransactions: RecurringTransaction[];
  setFilters: (filters: Filters) => void;
  setRole: (role: UserRole) => void;
  setDarkMode: (dark: boolean) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  setBudgets: (budgets: Record<string, number>) => void;
  addRecurring: (r: Omit<RecurringTransaction, "id">) => void;
  removeRecurring: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

const STORAGE_KEY = "finance-dashboard-data";

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const stored = loadFromStorage();

  const [transactions, setTransactions] = useState<Transaction[]>(stored?.transactions ?? mockTransactions);
  const [filters, setFilters] = useState<Filters>({ search: "", type: "all", sortBy: "date", sortOrder: "desc" });
  const [role, setRole] = useState<UserRole>("admin");
  const [darkMode, setDarkMode] = useState(stored?.darkMode ?? false);
  const [budgets, setBudgets] = useState<Record<string, number>>(stored?.budgets ?? {});
  const [recurringTransactions, setRecurring] = useState<RecurringTransaction[]>(stored?.recurringTransactions ?? []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, darkMode, budgets, recurringTransactions }));
  }, [transactions, darkMode, budgets, recurringTransactions]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...tx, id: generateId() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addRecurring = useCallback((r: Omit<RecurringTransaction, "id">) => {
    setRecurring((prev) => [{ ...r, id: generateId() }, ...prev]);
  }, []);

  const removeRecurring = useCallback((id: string) => {
    setRecurring((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <FinanceContext.Provider
      value={{ transactions, filters, role, darkMode, budgets, recurringTransactions, setFilters, setRole, setDarkMode, addTransaction, deleteTransaction, setBudgets, addRecurring, removeRecurring }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
