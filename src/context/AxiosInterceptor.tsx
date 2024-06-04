import { useEffect } from 'react';
import httpService from '../service/api';
import { useAuth } from './AuthContext';
import type { AxiosResponse } from 'axios';

const AxiosInterceptor = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { onLogout } = useAuth();

  useEffect(() => {
    const resInterceptor = (
      response: any
    ): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
      return response;
    };

    const errInterceptor = async (error: any): Promise<any> => {
      switch (error.response?.status) {
        case 401: {
          if (onLogout != null) {
            try {
              await onLogout();
            } catch (logoutError) {
              console.error('Error during logout ofr unauthorized request:', logoutError);
            }
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
  }, []);

  return <>{children}</>;
};

export default AxiosInterceptor;
