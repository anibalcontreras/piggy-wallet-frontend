export interface ButtonProps {
  variant?: 'standard' | 'fullWidth';
  onPress?: () => void;
  children: string | string[];
}
