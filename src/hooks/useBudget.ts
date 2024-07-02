import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Budget, UseBudget } from '@/types/hooks';

const useBudget = (): UseBudget => {
  const isFocused = useIsFocused();

  const [budget, setBudget] = useState<Budget>({ amount: null });
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBudget = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.budget);
      const data: Budget = (await response.data) as Budget;
      setBudget(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBudget();
  }, [isFocused]);

  return { error, loading, budget };
};

export default useBudget;
