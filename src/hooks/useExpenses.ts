import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Expense } from '@/types/backend';

interface UseExpensesResult {
  expenses: Expense[];
  error: boolean;
  loading: boolean;
  fetchExpenses: () => Promise<void>;
}

const useExpenses = (): UseExpensesResult => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchExpenses = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.expenses);
      setExpenses(response.data as Expense[]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpenses();
  }, []);

  return { expenses, error, loading, fetchExpenses };
};

export default useExpenses;
