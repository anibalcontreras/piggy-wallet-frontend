import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { Backend, Hooks } from '@/types';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useExpensesGroups = (): Hooks.UseExpensesGroups => {
  const isFocused = useIsFocused();

  const [allExpensesByCategories, setAllExpensesByCategories] = useState<Backend.ExpensesGroup>({});
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExpensesGroup = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.expensesByCategories);
      const data: Record<string, any> = await response.data;
      setAllExpensesByCategories(data as Backend.ExpensesGroup);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpensesGroup();
  }, [isFocused]);

  return { error, loading, allExpensesByCategories };
};

export default useExpensesGroups;
