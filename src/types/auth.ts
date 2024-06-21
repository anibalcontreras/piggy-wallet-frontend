export interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (userRegister: UserRegister) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
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
