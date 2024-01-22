import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamsList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  LayoutTab: undefined; // Eliminar
  AppNavigator: undefined;
  AddExpense: undefined;
};

export type HomeNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Home'>;
export type LoginNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Login'>;
export type RegisterNavigationProps = NativeStackScreenProps<RootStackParamsList, 'Register'>;
export type LayoutTabNavigationProps = NativeStackScreenProps<RootStackParamsList, 'LayoutTab'>; // Eliminar
export type AppNavigatorNavigationProps = NativeStackScreenProps<
  RootStackParamsList,
  'AppNavigator'
>;
export type AddExpenseNavigationProps = NativeStackScreenProps<RootStackParamsList, 'AddExpense'>;
