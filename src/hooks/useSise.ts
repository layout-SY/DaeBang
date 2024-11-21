import { useState, useEffect } from 'react';
import { Sise } from '../models/Sise.model';
import { fetchSiseDataForPastMonths } from '../components/Sise/SiseServices';
import { useSearchParams } from 'react-router-dom';

export const useSise = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    const [siseData, setSiseData] = useState<Sise[]>([]); // 초기값: 빈 배열
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSiseDataForPastMonths(regionCode);
                setSiseData(data);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [regionCode]);

    return { siseData, error, isLoading };
};
