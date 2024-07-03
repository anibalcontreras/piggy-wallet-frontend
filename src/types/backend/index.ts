export interface User {
  id: string;
  fullName: string;
}

export interface Expense {
  id: number;
  username: string;
  user_expense_type: number;
  category: number | null;
  bankcard_id: number;
  amount: number;
  description: string;
}

export interface UserExpenseType {
  id: number;
  username: string;
  name: string;
  description: string;
  set_by_user: boolean;
}
