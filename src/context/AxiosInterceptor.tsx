import { useEffect } from 'react';
import type { AxiosResponse, AxiosError } from 'axios';
import { useAuth } from './AuthContext';
import httpService from '@/service/api';

const AxiosInterceptor = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { onLogout, refreshAccessToken, authState } = useAuth();

  useEffect(() => {
    const resInterceptor = (
      response: any
    ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
      return response;
    };

    const errInterceptor = async (error: AxiosError): Promise<any> => {
      if (error.response?.status === 403) {
        // if (error.response?.status === 403) {
        console.log('Logramos simular el flujo');
        try {
          const newAccessToken = refreshAccessToken && (await refreshAccessToken()); // WTF?
          if (newAccessToken) {
            console.log('New access token:', newAccessToken);
            console.log('error.config:', error.config);
            console.log('error.config?.method:', error.config?.method);
            console.log('error.config?.url:', error.config?.url);
            console.log('error.config?.data:', error.config?.data);
            return await httpService.request(
              error.config?.method,
              error.config?.url || '',
              error.config?.data
            );
          }
        } catch (refreshError) {
          console.error('Error during token refresh:', refreshError);
          if (onLogout) {
            await onLogout();
          }
        }
      }
      return await Promise.reject(error);
    };

    const interceptor = httpService.axiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      httpService.axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [authState]);

  return <>{children}</>;
};

export default AxiosInterceptor;
