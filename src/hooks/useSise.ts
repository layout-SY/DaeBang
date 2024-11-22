import { useState, useEffect } from 'react';
import { paginateByKeyResultProps, Sise } from '../models/Sise.model';
import { fetchSiseDataForPastMonths } from '../components/Sise/SiseServices';
import { useSearchParams } from 'react-router-dom';
import { groupAndSortByDate, paginateByKey } from '../utils/sortUtils';

export const useSise = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    const [siseData, setSiseData] = useState<Sise[]>([]);
    const [groupedByAddrSiseData, setGroupedByAddrSiseData] = useState<
        paginateByKeyResultProps[]
    >([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const pageNo = 1;
    const numOfRows = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSiseDataForPastMonths(
                    regionCode,
                    pageNo,
                    numOfRows,
                );

                // 그룹화 및 정렬
                const grouped = groupAndSortByDate(data);

                // 그룹 데이터 -> 페이지네이션
                const pagedGrouped = paginateByKey(grouped, 10);

                setSiseData(data);
                setGroupedByAddrSiseData(pagedGrouped);
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
