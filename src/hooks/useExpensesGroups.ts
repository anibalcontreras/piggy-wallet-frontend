import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { ExpensesGroup, UseExpensesGroups } from '@/types/hooks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useExpensesGroups = (navigation: NativeStackNavigationProp<any, string, undefined>): UseExpensesGroups => {
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
    const unsubscribe = navigation.addListener('focus', () => {
      void fetchExpensesGroup();
    });

    void fetchExpensesGroup();

    return unsubscribe;
  }, []);

  return { error, loading, allExpensesByCategories };
};

export default useExpensesGroups;
