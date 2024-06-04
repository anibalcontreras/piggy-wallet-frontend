import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import type { AxiosResponse } from 'axios';
import type { Authorization } from '../types';
import httpService from '../service/api';
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
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token !== null) {
          httpService.setAuthorizationHeader(token);
          setAuthState({
            token,
            authenticated: true,
          });
        }
      } catch (error) {
        console.error('Error loading token', error);
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
      return await httpService.post(END_POINT.register, {
        firstName,
        lastName,
        secondLastName,
        email,
        password,
      });
      // return await axiosInstance.request({
      //   method: 'POST',
      //   url: END_POINT.register,
      //   data: {
      //     firstName,
      //     lastName,
      //     secondLastName,
      //     email,
      //     password,
      //   },
      // });
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AxiosResponse | Authorization.ServiceError> => {
    try {
      const result = await httpService.post(END_POINT.login, { email, password });
      // const result = await axiosInstance.request({
      //   method: 'POST',
      //   url: END_POINT.login,
      //   data: {
      //     email,
      //     password,
      //   },
      // });

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      httpService.setAuthorizationHeader(result.data.token as string);
      // axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`; // Revisar header y Bearer

      await SecureStore.setItemAsync(TOKEN_KEY, String(result.data.token));

      return result;
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    httpService.setAuthorizationHeader(null);
    // axios.defaults.headers.common.Authorization = ''; // Revisar Header

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
