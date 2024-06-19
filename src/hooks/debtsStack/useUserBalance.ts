import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend } from '@/types';
import type { UseUserBalance } from '@/types/hooks';
import { snakeToCamel } from '@/utils';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const userUserBalance = (debtorId: string): UseUserBalance => {
  const isFocused = useIsFocused();

  const [userBalance, setUserBalance] = useState<Backend.Balance>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserBalance = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(`${END_POINT.userBalance}${debtorId}/`);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.Balance = snakeToCamel(data) as Backend.Balance;
      setUserBalance(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserBalance();
  }, [isFocused]);

  return { error, loading, userBalance };
};

export default userUserBalance;