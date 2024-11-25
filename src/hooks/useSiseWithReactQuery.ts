import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSiseDataThatThrowsError } from '../api/Sise.api';
import { groupSiseByAddress } from '../utils/sortUtils';
import { addXyToSiseOfBuilding } from '../utils/adress';
import { useEffect } from 'react';

// 이 훅을 사용하면 앱에서 데이터를 쉽게 공유할 수 있습니다.
const useSiseWithReactQuery = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    // 현재 월의 데이터를 조회합니다.
    const currentYYYYMM = new Date().toISOString().slice(0, 7).replace('-', '');

    const {
        data,
        isPending,
        isError,
        error,
        isFetching,
        isLoading,
        dataUpdatedAt,
    } = useQuery({
        queryKey: ['siseData', regionCode],
        queryFn: async () => {
            const startTime = performance.now();
            console.log(
                `[${regionCode}]🔄 새로운 데이터 fetch 요청 발생 [${new Date().toLocaleTimeString()}]`,
            );
            const data = await fetchSiseDataThatThrowsError({
                LAWD_CD: regionCode,
                DEAL_YMD: Number(currentYYYYMM),
                pageNo: 1,
                numOfRows: 1000,
            });

            let item = data.response.body.items.item;

            if (!Array.isArray(item)) {
                item = [item];
            }
            const groupedByAdressItems = groupSiseByAddress(item);
            const result = await addXyToSiseOfBuilding(groupedByAdressItems);

            const endTime = performance.now();
            console.log(
                `[${regionCode} ${result.length}건]  데이터 로딩 시간: ${(endTime - startTime).toFixed(2)}ms`,
            );

            return result;
        },
    });

    // 캐시된 데이터 사용 여부를 확인하고 로깅
    useEffect(() => {
        if (data) {
            const isFromCache = !isFetching && !isLoading;
            const consoleMessage = isFromCache
                ? '📦 캐시된 데이터 사용'
                : '🔄 새로운 데이터 수신';
            console.log(
                `[${regionCode}] ${consoleMessage} [${new Date().toLocaleTimeString()}]`,
            );
        }
    }, [data, isFetching, isLoading, regionCode, dataUpdatedAt]);

    return { data, isPending, isError, error, isLoading };
};

export default useSiseWithReactQuery;
