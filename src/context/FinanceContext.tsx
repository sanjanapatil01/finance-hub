import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction, Filters, UserRole } from "@/types/finance";
import { mockTransactions } from "@/data/transactions";
import { generateId } from "@/utils/finance";

interface FinanceContextType {
  transactions: Transaction[];
  filters: Filters;
  role: UserRole;
  darkMode: boolean;
  setFilters: (filters: Filters) => void;
  setRole: (role: UserRole) => void;
  setDarkMode: (dark: boolean) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
}

const FinanceContext = createContext<FinanceContextType | null>(null);

const STORAGE_KEY = "finance-dashboard-data";

function loadFromStorage(): { transactions: Transaction[]; darkMode: boolean } | null {
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ transactions, darkMode }));
  }, [transactions, darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...tx, id: generateId() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <FinanceContext.Provider
      value={{ transactions, filters, role, darkMode, setFilters, setRole, setDarkMode, addTransaction, deleteTransaction }}
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
