export interface User {
  userId: string;
  firstName: string;
  email?: string;
}

export interface Balance {
  balance: number;
}

export interface DebtTransaction {
  id: number;
  user: User;
  debtor: User;
  amount: number;
  description?: string;
  isPaid: boolean;
  createdAt: string;
}

export interface DebtsTransactions {
  presentWeek: DebtTransaction[];
  lastWeek: DebtTransaction[];
  previousWeeks: DebtTransaction[];
}

export interface Expense {
  id: number;
  username: string;
  userExpenseType: number;
  category?: number | null;
  bankcardId: number;
  amount: number;
  description: string;
  createdAt?: string;
}

export interface UserExpenseType {
  id: number;
  username: string;
  name: string;
  description: string;
  setByUser: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface BankCard {
  id: number;
  userId: string;
  accountNumber: number;
  bankName: string;
  cardType: string;
}
export interface Budget {
  amount: number | null;
}

export type ExpensesGroup = Record<string, Record<string, number>>;
