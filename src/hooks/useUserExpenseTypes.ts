import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { Backend, Hooks } from '@/types';
import { snakeToCamel } from '@/utils';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useUserExpenseTypes = (): Hooks.UseUserExpenseTypes => {
  const isFocused = useIsFocused();

  const [expenseType, setExpenseType] = useState<Backend.UserExpenseType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserExpenseTypes = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.userExpenseTypes);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.UserExpenseType[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.UserExpenseType[];

      const records: string[] = [];

      for (let i = 0; i < data.length; i++) {
        records.push(data[i].name);
      }

      setCategories(records);
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

  return { categories, error, loading, expenseType };
};

export default useUserExpenseTypes;
