import type { FieldProps } from 'formik';
import type { StyleProp, PressableProps, TextInputProps, ViewStyle } from 'react-native';
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Entypo } from '@expo/vector-icons';
import type { VictoryTooltipProps } from 'victory-tooltip';
import type { Backend } from '@/types';

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
  userExpenseTypes: Backend.UserExpenseType[];
  expensesByExpenseType: DonutChartValue[];
  expensesByCategory: DonutChartValue[][];
}

export interface UserBudgetProps {
  budget: Backend.Budget;
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

export interface DebtTransactionProps {
  title: string;
  transactions: Backend.DebtTransaction[];
  onSettleDebtClick: (debtId: number) => void;
}

export interface ExpenseCardProps {
  expense: Backend.Expense;
  categories: Backend.Category[];
  onDelete: (expense: Backend.Expense) => void;
  onEdit: (expense: Backend.Expense) => void;
  onLook: (expense: Backend.Expense) => void;
}

export interface TimeSelectionProps {
  startDate: Date;
  selectedTab: number;
  timeOffset: number;
  setTimeOffset: (t: number) => void;
}
