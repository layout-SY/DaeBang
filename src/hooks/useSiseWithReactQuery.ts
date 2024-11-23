import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSiseDataThatThrowsError } from '../api/Sise.api';

// 이 훅을 사용하면 앱에서 데이터를 쉽게 공유할 수 있습니다.
const useSiseWithReactQuery = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    // 현재 월의 데이터를 조회합니다.
    const currentYYYYMM = new Date().toISOString().slice(0, 7).replace('-', '');

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['siseData', regionCode],
        queryFn: async () => {
            return await fetchSiseDataThatThrowsError({
                LAWD_CD: regionCode,
                DEAL_YMD: Number(currentYYYYMM),
                pageNo: 1,
                numOfRows: 1000,
            });
        },
        select: (data) => data.response.body.items,
        // slect에서 data를 가공할 수 있습니다.
    });

    return { data, isPending, isError, error };
};

export default useSiseWithReactQuery;
