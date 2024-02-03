/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum Tab {
  Home = 'HOME_SCREEN',
  Expenses = 'EXPENSES_SCREEN',
}

export type TabValue = (typeof Tab)[keyof typeof Tab];

export type RootStackParamsList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  AppNavigator: undefined;
};

export type ExpensesStackParamsList = {
  Expenses: undefined;
  AddExpense: undefined;
};

export type HomeStackParamsList = {
  Home: undefined;
};

export type LandingNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Landing'>;
export type LoginNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type RegisterNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;
export type AppNavigatorNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'AppNavigator'
>;

export type ExpensesNavigationProps = NativeStackScreenProps<ExpensesStackParamsList, 'Expenses'>;
export type AddExpenseNavigationProps = NativeStackScreenProps<
  ExpensesStackParamsList,
  'AddExpense'
>;

export type HomeNavigationProps = NativeStackScreenProps<HomeStackParamsList, 'Home'>;
