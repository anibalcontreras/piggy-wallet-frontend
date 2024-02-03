import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum Screen {
  Home = 'HOME_SCREEN',
  Expenses = 'EXPENSES_SCREEN',
}

export type ScreenValue = (typeof Screen)[keyof typeof Screen];

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamsList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  AppNavigator: undefined;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ExpensesStackParamsList = {
  Expenses: undefined;
  AddExpense: undefined;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
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
