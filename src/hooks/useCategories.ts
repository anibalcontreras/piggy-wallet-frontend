import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Category } from '@/types/components';

interface UseCategoriesResult {
  categories: Category[];
  error: boolean;
  loading: boolean;
}

const useCategories = (): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.categories);
      setCategories(response.data as Category[]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCategories();
  }, []);

  return { categories, error, loading };
};

export default useCategories;
