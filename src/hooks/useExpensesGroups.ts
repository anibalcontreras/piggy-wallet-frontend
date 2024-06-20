import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { ExpensesGroup, UseExpensesGroups } from '@/types/hooks';

const useExpensesGroups = (): UseExpensesGroups => {
  const [allExpensesByCategories, setAllExpensesByCategories] = useState<ExpensesGroup>({});
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExpensesGroup = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.expensesByCategories);
      const data: Record<string, any> = await response.data;
      setAllExpensesByCategories(data as ExpensesGroup);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpensesGroup();
  }, []);

  return { error, loading, allExpensesByCategories };
};

export default useExpensesGroups;
