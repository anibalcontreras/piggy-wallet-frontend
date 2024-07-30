import { createContext, useContext, useEffect, useState } from 'react';
import { type JwtPayload, jwtDecode } from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import type { AxiosResponse } from 'axios';
import type { Authorization } from '@/types';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY ?? '';
const REFRESH_TOKEN_KEY = process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY ?? '';
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
      const { fullName, phoneNumber, email, password } = userRegister;
      return await httpService.post(END_POINT.register, {
        name: fullName,
        phone: phoneNumber,
        email,
        password,
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
      const result = await httpService.post(END_POINT.login, { email, password });
      const { access_token: accessToken, refresh_token: refreshToken } = result.data; // No se llama refresh_token
      setAuthState({
        token: accessToken,
        authenticated: true,
      });
      httpService.setAuthorizationHeader(String(accessToken));
      await SecureStore.setItemAsync(TOKEN_KEY, String(accessToken));
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, String(refreshToken)); // No se llama refresh_token

      return result;
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

  const logout = async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    httpService.setAuthorizationHeader(null);

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const refreshAccessToken = async (): Promise<string | Authorization.ServiceError> => {
    try {
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (refreshToken !== null) throw new Error('No refresh token found');

      const expiredAccessToken = await SecureStore.getItemAsync(TOKEN_KEY);
      const payload = jwtDecode<JwtPayload>(expiredAccessToken || '');
      console.log('Payload:', payload);
      const userSub = payload.sub;
      console.log('User sub:', userSub);

      const response = await httpService.post('/auth/refresh-token/', {
        refresh_token: refreshToken,
        user_sub: userSub,
      });
      const accessToken: string = response.data.access_token; // Comprobar si efectivamente con esto accedo correctamente al access_token

      await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      httpService.setAuthorizationHeader(accessToken);
      setAuthState((prevState) => ({
        ...prevState,
        token: accessToken,
      }));
      return accessToken;
    } catch (error) {
      return { error: true, msg: (error as Error).message };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    refreshAccessToken,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
