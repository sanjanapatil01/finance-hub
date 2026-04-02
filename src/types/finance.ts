export type TransactionType = "income" | "expense";
export type UserRole = "admin" | "viewer";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface Filters {
  search: string;
  type: TransactionType | "all";
  sortBy: "date" | "amount" | "category";
  sortOrder: "asc" | "desc";
}
