import { useState, useEffect } from 'react';
import { Sise } from '../models/Sise.model';
import { fetchSiseDataForPastMonths } from '../components/Sise/SiseServices';

export const useSise = (lawdCd: number) => {
    const [siseData, setSiseData] = useState<Sise[]>([]); // 초기값: 빈 배열
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSiseDataForPastMonths(lawdCd);
                setSiseData(data);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [lawdCd]);

    return { siseData, error, isLoading };
};
