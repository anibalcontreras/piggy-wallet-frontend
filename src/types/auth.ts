import type { AxiosResponse } from 'axios';

export interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (userRegister: UserRegister) => Promise<AxiosResponse | ServiceError>;
  onLogin?: (email: string, password: string) => Promise<AxiosResponse | ServiceError>;
  onLogout?: () => Promise<void>;
  refreshAccessToken?: () => Promise<string | ServiceError>;
}

export interface ServiceError {
  error: boolean;
  msg: string;
}

export interface UserRegister {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
}
