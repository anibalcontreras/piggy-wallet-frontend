import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { Backend } from '@/types';
import type { UserUserDebtsHistory } from '@/types/hooks';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import { snakeToCamel } from '@/utils';

// Duda interface
const useUserDebtsHistory = (debtorId: string): UserUserDebtsHistory => {
  const isFocused = useIsFocused();

  const [userDebtsHistory, setUserDebtshistory] = useState<Backend.DebtsTransactions>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserDebtsHistory = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(`${END_POINT.userDebtsHistory}${debtorId}/`);
      const data: Record<string, any> = await response.data;

      const camelCaseData: Backend.DebtsTransactions = {
        presentWeek: data.present_week.map((obj: Record<string, any>) =>
          snakeToCamel(obj)
        ) as Backend.DebtTransaction[],
        lastWeek: data.last_week.map((obj: Record<string, any>) =>
          snakeToCamel(obj)
        ) as Backend.DebtTransaction[],
        previousWeeks: data.previous_weeks.map((obj: Record<string, any>) =>
          snakeToCamel(obj)
        ) as Backend.DebtTransaction[],
      };

      setUserDebtshistory(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserDebtsHistory();
  }, [isFocused]);

  return { error, loading, userDebtsHistory };
};

export default useUserDebtsHistory;
