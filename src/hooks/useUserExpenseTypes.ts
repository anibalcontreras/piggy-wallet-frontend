import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { UseUserExpenseTypes, UserExpense } from '@/types/hooks';

const useUserExpenseTypes = (): UseUserExpenseTypes => {
  const isFocused = useIsFocused();

  const [expenseType, setExpenseType] = useState<UserExpense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserExpenseTypes = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.userExpenseTypes);
      const data: UserExpense[] = (await response.data) as UserExpense[];

      const records: string[] = [];

      for (let i = 0; i < data.length; i++) {
        records.push(data[i].name);
      }

      setCategories(records);
      setExpenseType(data);
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
