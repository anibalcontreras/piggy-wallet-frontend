import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend } from '@/types';
import type { UseUser } from '@/types/hooks';
import { snakeToCamel } from '@/utils';
import { useEffect, useState } from 'react';

const useUser = (): UseUser => {
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
