import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend } from '@/types';
import type { UseUserBankCards } from '@/types/hooks';
import { snakeToCamel } from '@/utils';
import { useEffect, useState } from 'react';

const useUserBankCards = (): UseUserBankCards => {
  const [userBankCards, setUserBankCards] = useState<Backend.BankCard[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserBankCards = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.bankCards);
      const data: Record<string, any> = await response.data;
      const camelCaseData: Backend.BankCard[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.BankCard[];
      setUserBankCards(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserBankCards();
  }, []);

  return { error, loading, userBankCards };
};

export default useUserBankCards;
