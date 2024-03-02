import type { FieldProps } from 'formik';
import type { StyleProp, PressableProps, TextInputProps, ViewStyle } from 'react-native';
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Entypo } from '@expo/vector-icons';

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

export interface DonutChartProps {
  donutPercentage: number;
  userBudget: number;
}
