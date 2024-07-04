import { useEffect, useState } from 'react';
import type { Backend, Hooks } from '@/types';
import { snakeToCamel } from '@/utils';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useUser = (): Hooks.UseUser => {
  const [user, setUser] = useState<Backend.User>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUser = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.profile);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.User = snakeToCamel(data) as Backend.User;
      setUser(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUser();
  }, []);

  return { error, loading, user };
};

export default useUser;
