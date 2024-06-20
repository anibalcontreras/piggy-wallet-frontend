import { useEffect, useState } from 'react';
import httpService from '@/service/api';
import { END_POINT } from '@/service/constant';
import type { UserExpense, UseUserExpenseTypes } from '@/types/hooks';

const useUserExpenseTypes = (): UseUserExpenseTypes  => {
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserExpenseTypes = async (): Promise<void> => {
        setError(false);
        setLoading(true);

        try {
            const response = await httpService.get(END_POINT.userExpenseTypes);
            const data: UserExpense[] = await response.data as UserExpense[];

            const records: string[] = [];

            for (let i = 0; i < data.length; i++) {
                records.push(data[i].name);
            }

            setCategories(records);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchUserExpenseTypes();
    }, []);

    return { error, loading, categories };
};

export default useUserExpenseTypes;
