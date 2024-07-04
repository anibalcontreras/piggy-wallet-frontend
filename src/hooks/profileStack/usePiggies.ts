import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { Backend, Hooks } from '@/types';
import { snakeToCamel } from '@/utils';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const usePiggies = (): Hooks.UsePiggies => {
  const isFocused = useIsFocused();

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
  }, [isFocused]);

  return { error, loading, piggies };
};

export default usePiggies;
