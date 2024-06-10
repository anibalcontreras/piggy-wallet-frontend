import type { Backend } from '..';

interface UseHookBase {
  error: boolean;
  loading: boolean;
}

export interface UsePiggies extends UseHookBase {
  piggies: Backend.User[];
}
export interface UseUser extends UseHookBase {
  user?: Backend.User;
}
