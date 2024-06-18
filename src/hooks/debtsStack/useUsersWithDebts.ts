import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend } from '@/types';
import type { UseUsersWithDebts } from '@/types/hooks';
import { snakeToCamel } from '@/utils';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const useUsersWithDebts = (): UseUsersWithDebts => {
  const isFocused = useIsFocused();

  const [usersWithDebts, setUsersWithDebts] = useState<Backend.User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsersWithDebts = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.usersWithDebts);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.User[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.User[];
      setUsersWithDebts(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUsersWithDebts();
  }, [isFocused]);

  return { error, loading, usersWithDebts };
};

export default useUsersWithDebts;
