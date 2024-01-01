export interface ButtonProps {
  variant?: 'contained' | 'fullWidth' | 'text';
  onPress?: () => void;
  children: string | string[];
}
