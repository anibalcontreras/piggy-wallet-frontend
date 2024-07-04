import { useEffect, useState } from 'react';
import type { Backend, Hooks } from '@/types';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';

const useCategories = (): Hooks.UseCategories => {
  const [categories, setCategories] = useState<Backend.Category[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.categories);
      setCategories(response.data as Backend.Category[]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCategories();
  }, []);

  return { error, loading, categories };
};

export default useCategories;
