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
  firstName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
}
