import { useState, useEffect } from 'react';
import { Sise } from '../models/Sise.model';
import { fetchSiseDataForPastMonths } from '../components/Sise/SiseServices';
import { useSearchParams } from 'react-router-dom';
import { groupAndSortByDate } from '../utils/sortUtils';

export const useSise = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    const [siseData, setSiseData] = useState<Sise[]>([]);
    const [groupedByAddrSiseData, setGroupedByAddrSiseData] = useState<
        {
            key: string;
            items: Sise[];
        }[]
    >([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSiseDataForPastMonths(regionCode);

                // 그룹화 및 정렬
                const grouped = groupAndSortByDate(data);

                setSiseData(data);
                setGroupedByAddrSiseData(grouped);
            } catch (err) {
                setError('Failed to fetch data.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [regionCode]);

    return { siseData, error, isLoading, regionCode, groupedByAddrSiseData };
};
