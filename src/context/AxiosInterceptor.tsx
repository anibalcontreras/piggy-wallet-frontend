import { useEffect } from 'react';
import httpService from '../service/api'; // Importamos la instancia existente de HttpService
import { useAuth } from './AuthContext'; // Importamos el hook useAuth desde tu contexto de autenticación

const AxiosInterceptor = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { onLogout } = useAuth();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const resInterceptor = (response: any) => {
      return response;
    };
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const errInterceptor = async (error: any) => {
      // Implementar switch
      if (error.response?.status === 401) {
        // onLogout();
        if (onLogout != null) {
          // Verificar que onLogout no sea undefined
          try {
            console.log('Llamamos al Logout');
            await onLogout(); // Asegurarnos de que la promesa se maneje correctamente
          } catch (logoutError) {
            console.error('Error during logout:', logoutError);
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
  }, []); // Asegúrate de incluir onLogout en la lista de dependencias

  return <>{children}</>; // Devolvemos los hijos sin ningún cambio
};

export default AxiosInterceptor;
