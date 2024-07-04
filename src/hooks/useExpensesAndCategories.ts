import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Category } from '@/types/components';
import type { Expense } from '@/types/backend';

interface UseExpensesAndCategories {
  expenses: Expense[];
  categories: Category[];
  loading: boolean;
  error: boolean;
  fetchExpensesAndCategories: () => Promise<void>;
}

const useExpensesAndCategories = (): UseExpensesAndCategories => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchExpensesAndCategories = async (): Promise<void> => {
    setLoading(true);
    setError(false);
    try {
      const expensesResponse = await httpService.get(END_POINT.expenses);
      const categoriesResponse = await httpService.get(END_POINT.categories);
      setExpenses(expensesResponse.data as Expense[]);
      setCategories(categoriesResponse.data as Category[]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpensesAndCategories();
  }, []);

  return { expenses, categories, loading, error, fetchExpensesAndCategories };
};

export default useExpensesAndCategories;
