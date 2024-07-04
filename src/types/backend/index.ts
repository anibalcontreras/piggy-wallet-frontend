export interface User {
  userId: string;
  firstName: string;
  email?: string;
}

export interface Balance {
  balance: number;
}

export interface DebtsTransactions {
  presentWeek: DebtTransaction[];
  lastWeek: DebtTransaction[];
  previousWeeks: DebtTransaction[];
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

export interface Expense {
  id: number;
  username: string;
  user_expense_type: number;
  category: number | null;
  bankcard_id: number;
  amount: number;
  description: string;
  created_at: string;
}

export interface UserExpenseType {
  id: number;
  username: string;
  name: string;
  description: string;
  set_by_user: boolean;
}

export interface BankCard {
  id: number;
  user_id: string;
  account_number: number;
  bank_name: string;
  card_type: string;
}
