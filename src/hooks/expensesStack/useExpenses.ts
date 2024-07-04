import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { Backend, Hooks } from '@/types';
import { snakeToCamel } from '@/utils';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useExpenses = (): Hooks.UseExpenses => {
  const isFocused = useIsFocused();

  const [expenses, setExpenses] = useState<Backend.Expense[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExpenses = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.expenses);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.Expense[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.Expense[];
      setExpenses(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpenses();
  }, [isFocused]);

  return { error, loading, expenses };
};

export default useExpenses;
