import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSiseDataThatThrowsError } from '../api/Sise.api';

const useSiseWithReactQuery = () => {
    const [searchParams] = useSearchParams();
    const regionCode = parseInt(searchParams.get('region') || '0', 10);

    const currentYYYYMM = new Date().toISOString().slice(0, 7).replace('-', '');

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['siseData', regionCode],
        queryFn: async () => {
            console.log('fetching sise data');
            return await fetchSiseDataThatThrowsError({
                LAWD_CD: regionCode,
                DEAL_YMD: Number(currentYYYYMM),
                pageNo: 1,
                numOfRows: 1000,
            });
        },
    });

    return { data, isPending, isError, error };
};

export default useSiseWithReactQuery;
