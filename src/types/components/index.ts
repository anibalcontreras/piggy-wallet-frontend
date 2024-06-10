import type { FieldProps } from 'formik';
import type { StyleProp, PressableProps, TextInputProps, ViewStyle } from 'react-native';
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Entypo } from '@expo/vector-icons';
import type { VictoryTooltipProps } from 'victory-tooltip';

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
