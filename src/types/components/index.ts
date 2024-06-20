import type { FieldProps } from 'formik';
import type { StyleProp, PressableProps, TextInputProps, ViewStyle } from 'react-native';
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Entypo } from '@expo/vector-icons';
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

export interface DonutChartProps {
  donutPercentage: number;
  userBudget: number;
  marginTop?: number;
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
  searchPhrase: string;
  data?: Backend.User[];
  onPiggyAdded: (user: Backend.User) => void;
}

export interface DebtorsListProps {
  debtors: Backend.User[];
  onUserPress: (user: Backend.User) => void;
}

export interface UserBalanceProps {
  userBalance?: Backend.Balance; // Duplicada con Backend.Balance
}
