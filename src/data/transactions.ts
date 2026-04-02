import { Transaction } from "@/types/finance";

export const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Education",
  "Salary",
  "Freelance",
  "Investment",
  "Rent",
  "Groceries",
] as const;

export const EXPENSE_CATEGORIES = CATEGORIES.filter(
  (c) => !["Salary", "Freelance", "Investment"].includes(c)
);
export const INCOME_CATEGORIES = ["Salary", "Freelance", "Investment"] as const;

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2025-01-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary" },
  { id: "2", date: "2025-01-07", amount: 45.5, category: "Food & Dining", type: "expense", description: "Restaurant dinner" },
  { id: "3", date: "2025-01-10", amount: 120, category: "Bills & Utilities", type: "expense", description: "Electricity bill" },
  { id: "4", date: "2025-01-12", amount: 35, category: "Transportation", type: "expense", description: "Gas station" },
  { id: "5", date: "2025-01-15", amount: 800, category: "Freelance", type: "income", description: "Freelance project" },
  { id: "6", date: "2025-01-18", amount: 250, category: "Shopping", type: "expense", description: "New shoes" },
  { id: "7", date: "2025-01-20", amount: 15.99, category: "Entertainment", type: "expense", description: "Netflix subscription" },
  { id: "8", date: "2025-01-22", amount: 85, category: "Groceries", type: "expense", description: "Weekly groceries" },
  { id: "9", date: "2025-01-25", amount: 1500, category: "Rent", type: "expense", description: "Monthly rent" },
  { id: "10", date: "2025-01-28", amount: 200, category: "Healthcare", type: "expense", description: "Doctor visit" },
  { id: "11", date: "2025-02-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary" },
  { id: "12", date: "2025-02-08", amount: 62, category: "Food & Dining", type: "expense", description: "Date night" },
  { id: "13", date: "2025-02-10", amount: 95, category: "Bills & Utilities", type: "expense", description: "Internet bill" },
  { id: "14", date: "2025-02-14", amount: 150, category: "Shopping", type: "expense", description: "Valentine's gift" },
  { id: "15", date: "2025-02-16", amount: 500, category: "Investment", type: "income", description: "Dividend income" },
  { id: "16", date: "2025-02-18", amount: 42, category: "Transportation", type: "expense", description: "Uber rides" },
  { id: "17", date: "2025-02-20", amount: 1500, category: "Rent", type: "expense", description: "Monthly rent" },
  { id: "18", date: "2025-02-22", amount: 110, category: "Groceries", type: "expense", description: "Grocery shopping" },
  { id: "19", date: "2025-02-25", amount: 75, category: "Entertainment", type: "expense", description: "Concert tickets" },
  { id: "20", date: "2025-02-28", amount: 300, category: "Education", type: "expense", description: "Online course" },
  { id: "21", date: "2025-03-05", amount: 5200, category: "Salary", type: "income", description: "Monthly salary" },
  { id: "22", date: "2025-03-08", amount: 38, category: "Food & Dining", type: "expense", description: "Lunch with friends" },
  { id: "23", date: "2025-03-10", amount: 130, category: "Bills & Utilities", type: "expense", description: "Phone bill" },
  { id: "24", date: "2025-03-12", amount: 1200, category: "Freelance", type: "income", description: "Web design project" },
  { id: "25", date: "2025-03-15", amount: 90, category: "Groceries", type: "expense", description: "Weekly groceries" },
  { id: "26", date: "2025-03-18", amount: 55, category: "Healthcare", type: "expense", description: "Pharmacy" },
  { id: "27", date: "2025-03-20", amount: 1500, category: "Rent", type: "expense", description: "Monthly rent" },
  { id: "28", date: "2025-03-22", amount: 180, category: "Shopping", type: "expense", description: "Electronics" },
  { id: "29", date: "2025-03-25", amount: 25, category: "Entertainment", type: "expense", description: "Movie tickets" },
  { id: "30", date: "2025-03-28", amount: 48, category: "Transportation", type: "expense", description: "Train tickets" },
];
