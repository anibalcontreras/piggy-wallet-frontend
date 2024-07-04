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

export interface UseExpensesGroups extends UseHookBase {
  allExpensesByCategories: Backend.ExpensesGroup;
}

export interface UseUserExpenseTypes extends UseHookBase {
  userExpenseTypes: Backend.UserExpenseType[];
}

export interface UseBudget extends UseHookBase {
  budget: Backend.Budget;
}

export interface UseUserBankCards extends UseHookBase {
  userBankCards: Backend.BankCard[];
}

export interface UseExpenses extends UseHookBase {
  expenses: Backend.Expense[];
}

export interface UseCategories extends UseHookBase {
  categories: Backend.Category[];
}
