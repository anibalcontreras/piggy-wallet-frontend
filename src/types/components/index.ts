import { type FieldProps } from 'formik';
import { type TextInputProps } from 'react-native';

export interface ButtonProps {
  variant?: 'contained' | 'fullWidth' | 'text';
  onPress?: () => void;
  disabled?: boolean;
  children: string | string[];
}

export interface CustomTextInputProps extends TextInputProps {
  field: FieldProps['field'];
  form: {
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    setFieldTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  };
}
