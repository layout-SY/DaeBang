import { useState, useEffect } from 'react';
import { Sise } from '../models/Sise.model';
import { fetchSiseDataForPastMonths } from '../components/Sise/SiseServices';
import { useSearchParams } from 'react-router-dom';

export const useSise = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    const [siseData, setSiseData] = useState<Sise[]>([]);
    const [groupedByAddrSiseData, setGroupedByAddrSiseData] = useState<
        { key: string; items: Sise[] }[]
    >([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSiseDataForPastMonths(regionCode);

                const map = new Map<string, Sise[]>();

                data.forEach((item) => {
                    const key = `${item.umdNm} ${item.jibun}`;
                    if (!map.has(key)) {
                        map.set(key, []);
                    }
                    map.get(key)!.push(item);
                });

                // Map 객체를 배열 형식으로 변환 후 해당 데이터들 최신 날짜 형태로 정렬
                const grouped = Array.from(map.entries()).map(
                    ([key, items]) => ({
                        key,
                        items: items.sort((a, b) => {
                            const dateA = new Date(
                                a.dealYear,
                                a.dealMonth - 1,
                                a.dealDay,
                            );
                            const dateB = new Date(
                                b.dealYear,
                                b.dealMonth - 1,
                                b.dealDay,
                            );
                            return dateB.getTime() - dateA.getTime(); // 최신 데이터 우선
                        }),
                    }),
                );
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
