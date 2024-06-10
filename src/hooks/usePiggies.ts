import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend } from '@/types';
import type { UsePiggies } from '@/types/hooks';
import { snakeToCamel } from '@/utils/userBudget';
import { useEffect, useState } from 'react';

const usePiggies = (): UsePiggies => {
  const [piggies, setPiggies] = useState<Backend.User[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPiggies = async (): Promise<void> => {
    setError(false);
    setLoading(true);
    try {
      const response = await httpService.get(END_POINT.piggies);
      const data = await response.data;
      const camelCaseData: Backend.User[] = data.map((obj: Record<string, any>) =>
        snakeToCamel(obj)
      ) as Backend.User[];
      setPiggies(camelCaseData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPiggies();
  }, []);

  return { error, loading, piggies };
};

export default usePiggies;
