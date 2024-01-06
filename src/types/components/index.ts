export interface ButtonProps {
  variant?: 'contained' | 'fullWidth' | 'text';
  onPress?: () => void;
  disabled?: boolean;
  children: string | string[];
}
