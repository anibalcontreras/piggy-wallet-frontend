import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { Backend, Hooks } from '@/types';
import { snakeToCamel } from '@/utils';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useUserExpenseTypes = (): Hooks.UseUserExpenseTypes => {
  const isFocused = useIsFocused();

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userExpenseTypes, setExpenseType] = useState<Backend.UserExpenseType[]>([]);

  const fetchUserExpenseTypes = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.userExpenseTypes);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.UserExpenseType[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.UserExpenseType[];
      setExpenseType(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserExpenseTypes();
  }, [isFocused]);

  return { error, loading, userExpenseTypes };
};

export default useUserExpenseTypes;
