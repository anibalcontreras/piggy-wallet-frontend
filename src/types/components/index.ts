import type { FieldProps } from 'formik';
import type { StyleProp, PressableProps, TextInputProps, ViewStyle } from 'react-native';
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Entypo } from '@expo/vector-icons';
import type { VictoryTooltipProps } from 'victory-tooltip';
import type { Backend } from '@/types';
import { type Budget } from '../hooks';

export interface ButtonProps extends PressableProps {
  variant?: 'contained' | 'fullWidth' | 'text';
  loading?: boolean;
  children?: string | string[];
}

export interface CustomTextInputProps extends TextInputProps {
  variant?: 'primary' | 'secondary';
  field: FieldProps['field'];
  form: {
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  };
}

export interface ErrorTextProps {
  message: string;
}

export type BottomTabBarProps = ReactNavigationBottomTabBarProps;

export interface TabBarIndicatorProps {
  tabCount: number;
  animatedStyle: StyleProp<ViewStyle>;
}

export interface TabBarItemProps {
  title: string;
  iconName: keyof typeof Entypo.glyphMap;
  isSelected: boolean;
  onPress: () => void;
}

export interface DonutChartValue {
  amount: number;
  label: string;
}

export interface DonutChartProps {
  values: DonutChartValue[];
  userBudget: number;
  marginTop?: number;
  disableAvailable?: boolean;
}

export interface FilterComponentProps {
  categories?: string[];
  defaultCategories?: string[];
  selectedTab?: number;
  setSelectedTab?: (tab: number) => void;
  page?: number;
  setPage?: (pg: number) => void;
}

export interface ChartTooltipProps extends VictoryTooltipProps {
  datum?: { x: number; y: number; label: string };
}

export interface UserMonthExpensesProps {
  categories: string[];
  expensesByExpenseType: DonutChartValue[];
  expensesByCategory: DonutChartValue[][];
}

export interface UserBudgetProps {
  budget: Budget;
  allExpenses: DonutChartValue[];
  handleClick: () => void;
}

export interface PiggiesListProps {
  piggies: Backend.User[];
}

export interface ProfileProps {
  user?: Backend.User;
  handleClick?: () => void;
}

export interface SearchBarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
  setClicked: (clicked: boolean) => void;
}

export interface SearchAllPigiesListProps {
  variant?: 'big' | 'small';
  searchPhrase: string;
  data?: Backend.User[];
  onPiggyAdded: (user: Backend.User) => void;
  showEmail?: boolean;
}

export interface DebtorsListProps {
  debtors: Backend.User[];
  onUserPress: (user: Backend.User) => void;
}

export interface UserBalanceProps {
  userBalance?: Backend.Balance;
}

export interface Expense {
  id: number;
  user_id: number;
  userexpensetype_id: number;
  category_id: number;
  bankcard_id: number;
  amount: number;
  created_at: string;
  updated_at: string;
  description: string;
}

export interface UserExpenseType {
  id: number;
  user_id: number;
  name: string;
  description: string;
  set_by_user: boolean;
  category_name: string;
  created_at: string;
  updated_at: string;
}

export interface DebtTransactionProps {
  title: string;
  transactions: Backend.DebtTransaction[];
  onSettleDebtClick: (debtId: number) => void;
}
