import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { UserExpenseType } from '@/types/backend';

interface UseUserExpenseTypesResult {
  userExpenseTypes: UserExpenseType[];
  error: boolean;
  loading: boolean;
}

const useUserExpenseTypes = (): UseUserExpenseTypesResult => {
  const [userExpenseTypes, setUserExpenseTypes] = useState<UserExpenseType[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserExpenseTypes = async (): Promise<void> => {
    setError(false);
    setLoading(true);

    try {
      const response = await httpService.get(END_POINT.userExpenseTypes);
      setUserExpenseTypes(response.data as UserExpenseType[]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserExpenseTypes();
  }, []);

  return { userExpenseTypes, error, loading };
};

export default useUserExpenseTypes;
