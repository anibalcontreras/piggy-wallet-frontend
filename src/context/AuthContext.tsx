import { createContext, useContext, useEffect, useState } from 'react';
import axios, { type AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    firstName: string,
    lastName: string,
    secondLastName: string,
    email: string,
    password: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

interface ServiceError {
  error: boolean;
  msg: string;
}

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? '';
export const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext<AuthProps>({});

export const useAuth = (): AuthProps => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async (): Promise<void> => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log('stored:', token);

      if (token !== null) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`; // Revisar header

        setAuthState({
          token,
          authenticated: true,
        });
      }
    };
    loadToken().then(
      () => {},
      () => {}
    );
  }, []);

  const register = async (
    firstName: string,
    lastName: string,
    secondLastName: string,
    email: string,
    password: string
  ): Promise<AxiosResponse | ServiceError> => {
    try {
      return await axios.post(`${API_URL}/users`, {
        firstName,
        lastName,
        secondLastName,
        email,
        password,
      });
    } catch (error) {
      return { error: true, msg: (error as Error).message }; // (error as any).response.data.msg
    }
  };

  const login = async (email: string, password: string): Promise<AxiosResponse | ServiceError> => {
    try {
      const result = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth`, {
        email,
        password,
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`; // Revisar header y Bearer

      await SecureStore.setItemAsync(TOKEN_KEY, String(result.data.token));

      return result;
    } catch (error) {
      return { error: true, msg: (error as Error).message }; // (error as any).response.data.msg
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common.Authorization = ''; // Revisar Header

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
