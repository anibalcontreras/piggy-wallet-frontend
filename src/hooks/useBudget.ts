import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Budget, UseBudget } from '@/types/hooks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const useBudget = (navigation: NativeStackNavigationProp<any, string, undefined>): UseBudget => {
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
    const unsubscribe = navigation.addListener('focus', () => {
      void fetchBudget();
    });

    void fetchBudget();

    return unsubscribe;
  }, [navigation]);

  return { error, loading, budget };
};

export default useBudget;
