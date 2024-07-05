import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { Backend, Hooks } from '@/types';
import { snakeToCamel } from '@/utils';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useExpenses = (start?: Date, end?: Date): Hooks.UseExpenses => {
  const isFocused = useIsFocused();

  const [expenses, setExpenses] = useState<Backend.Expense[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  let endpoint = END_POINT.expenses;

  if (start !== undefined && end !== undefined) {
    endpoint += `?start_date=${start.toISOString().substring(0, 10)}&end_date=${end
      .toISOString()
      .substring(0, 10)}`;
  }

  const fetchExpenses = async (startDate?: Date, endDate?: Date): Promise<void> => {
    if (startDate !== undefined && endDate !== undefined) {
      endpoint =
        END_POINT.expenses +
        `?start_date=${startDate.toISOString().substring(0, 10)}&end_date=${endDate
          .toISOString()
          .substring(0, 10)}`;
    }
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(endpoint);
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

  return { error, loading, expenses, fetchExpenses };
};

export default useExpenses;
