/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Entypo } from '@expo/vector-icons';

export const enum Tab {
  Home = 'HOME_SCREEN',
  Expenses = 'EXPENSES_SCREEN',
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

export type ExpensesStackParamsList = {
  Expenses: undefined;
  AddExpense: undefined;
};

export type HomeStackParamsList = {
  Home: undefined;
  Budget: undefined;
};

export type LandingNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Landing'>;
export type LoginNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type RegisterNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;

export type ExpensesNavigationProps = NativeStackScreenProps<ExpensesStackParamsList, 'Expenses'>;

export type HomeNavigationProps = NativeStackScreenProps<HomeStackParamsList, 'Home'>;
