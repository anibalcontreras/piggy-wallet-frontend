import type { Backend } from '@/types';

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

export interface UseAllUsers extends UseHookBase {
  allUsers: Backend.User[];
}

export interface UseUsersWithDebts extends UseHookBase {
  usersWithDebts: Backend.User[];
}

export interface UseUserBalance extends UseHookBase {
  userBalance?: Backend.Balance;
}
