import type { Backend } from '@/types';

interface UseHookBase {
  error: boolean;
  loading: boolean;
}

export interface UsePiggies extends UseHookBase {
  piggies: Backend.User[];
}
export interface UseUser extends UseHookBase {
  user?: Backend.User;
}

export interface UseAllUsers extends UseHookBase {
  allUsers: Backend.User[];
}

export interface UseUsersWithDebts extends UseHookBase {
  usersWithDebts: Backend.User[];
}

export interface UseUserBalance extends UseHookBase {
  userBalance?: Backend.Balance;
}

export interface UserUserDebtsHistory extends UseHookBase {
  userDebtsHistory?: Backend.DebtsTransactions;
}

export type ExpensesGroup = Record<string, Record<string, number>>;

export interface UseExpensesGroups extends UseHookBase {
  allExpensesByCategories: ExpensesGroup;
}

export interface UserExpense {
  id: number;
  name: string;
}

export interface UseUserExpenseTypes extends UseHookBase {
  categories: string[];
}

export interface Budget {
  amount: number | null;
}

export interface UseBudget extends UseHookBase {
  budget: Budget;
}
