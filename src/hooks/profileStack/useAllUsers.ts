import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend } from '@/types';
import type { UseAllUsers } from '@/types/hooks';
import { snakeToCamel } from '@/utils';
import { useEffect, useState } from 'react';

const useAllUsers = (): UseAllUsers => {
  const [allUsers, setAllUsers] = useState<Backend.User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllUsers = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.allUsers);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.User[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.User[];
      setAllUsers(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAllUsers();
  }, []);

  return { error, loading, allUsers };
};

export default useAllUsers;
