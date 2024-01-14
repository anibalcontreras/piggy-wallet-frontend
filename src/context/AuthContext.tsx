import { createContext, useContext, useEffect, useState } from 'react';
import axios, { type AxiosResponse } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { type Authorization } from '../types';
import { axiosInstance } from '../service/api';
import { END_POINT } from '../service/constant';

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? '';
const AuthContext = createContext<Authorization.AuthProps>({});

export const useAuth = (): Authorization.AuthProps => {
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
    userRegister: Authorization.UserRegister
  ): Promise<AxiosResponse | Authorization.ServiceError> => {
    try {
      const { firstName, lastName, secondLastName, email, password } = userRegister;
      return await axiosInstance.request({
        method: 'POST',
        url: END_POINT.register,
        data: {
          firstName,
          lastName,
          secondLastName,
          email,
          password,
        },
      });
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse | Authorization.ServiceError> => {
    try {
      const result = await axiosInstance.request({
        method: 'POST',
        url: END_POINT.login,
        data: {
          email,
          password,
        },
      });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`; // Revisar header y Bearer

      await SecureStore.setItemAsync(TOKEN_KEY, String(result.data.token));

      return result;
    } catch (error) {
      return { error: true, msg: (error as Error).message };
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
