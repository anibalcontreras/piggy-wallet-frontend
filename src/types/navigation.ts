/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Entypo } from '@expo/vector-icons';
import type { Expense } from './components';

export const enum Tab {
  Home = 'HOME_SCREEN',
  Expenses = 'EXPENSES_SCREEN',
  Debts = 'DEBTS_SCREEN',
  Profile = 'PROFILE_SCREEN',
}

export type TabValue = (typeof Tab)[keyof typeof Tab];
export type BottomTabRouteMap = Record<TabValue, string>;
export type BottomTabIconMap = Record<TabValue, keyof typeof Entypo.glyphMap>;

export type RootStackParamsList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  AppNavigator: undefined;
  Settings: undefined;
};

export type HomeStackParamsList = {
  Home: undefined;
  Budget: undefined;
};

export type ExpensesStackParamsList = {
  Expenses: undefined;
  AddExpense: { onAddExpense: (newExpense: any) => void };
  EditExpense: { expense: Expense; onSave: (updatedExpense: Expense) => void };
  Amount: { onSave: (amount: string) => void };
  ExpenseType: { onSave: (type: string) => void };
  Category: { onSave: (category: string) => void };
  Description: { onSave: (description: string) => void };
  SharedExpenseDetails: { onSave: (sharedWith: any) => void };
  ExpenseDetails: { expense: Expense };
};

export type DebtsStackParamsList = {
  Debts: undefined;
};

export type ProfileStackParamsList = {
  Profile: undefined;
  AddPiggy: undefined;
  EditProfile: undefined;
};

export type LandingNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Landing'>;
export type LoginNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type RegisterNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;

export type HomeNavigationProps = NativeStackScreenProps<HomeStackParamsList, 'Home'>;
export type BudgetNavigationProps = NativeStackScreenProps<HomeStackParamsList, 'Budget'>;

export type ExpensesNavigationProps = NativeStackScreenProps<ExpensesStackParamsList, 'Expenses'>;
export type AmountNavigationProps = NativeStackScreenProps<ExpensesStackParamsList, 'Amount'>;
export type ExpenseTypeNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'ExpenseType'
>;
export type CategoryNavigationProps = NativeStackScreenProps<ExpensesStackParamsList, 'Category'>;
export type DescriptionNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'Description'
>;
export type SharedExpenseDetailsNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'SharedExpenseDetails'
>;
export type AddExpenseNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'AddExpense'
>;

export type DebtsNavigationProps = NativeStackScreenProps<DebtsStackParamsList, 'Debts'>;

export type ProfileNavigationProps = NativeStackScreenProps<ProfileStackParamsList, 'Profile'>;
export type AddPiggyNavigationProps = NativeStackScreenProps<ProfileStackParamsList, 'AddPiggy'>;
export type EditExpenseNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'EditExpense'
>;
export type ExpenseDetailsNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'ExpenseDetails'
>;
