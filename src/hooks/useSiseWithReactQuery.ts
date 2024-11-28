import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTypedSelector } from '../hooks/redux';
import {
    fetchOneTwoSiseData,
    fetchOfficetelSiseData,
    fetchAptSiseData,
} from '../api/Sise.api';
import { groupSiseByAddress } from '../utils/sort';
import { addXyToSiseOfBuilding } from '../utils/adress';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    SiseCategory,
    OneTwoSise,
    OfficetelSise,
    AptSise,
} from '../models/Sise.model';

const useSiseWithReactQuery = () => {
    const [searchParams] = useSearchParams();
    const filters = useTypedSelector((state) => state.filters);
    const regionCode = parseInt(searchParams.get('region') || '0', 10);
    const queryClient = useQueryClient();
    const { category } = useParams<{ category: SiseCategory }>();

    //기본 필터링 상태를 "월세"로 설정
    const activeFilters = filters.filters;
    const slectedYYYYMMM = filters.year + filters.month;

    // 새 요청이 발생할 때 이전 요청 취소
    useEffect(() => {
        return () => {
            queryClient.cancelQueries({
                queryKey: [category, regionCode, slectedYYYYMMM, activeFilters],
            });
        };
    }, [category, regionCode, queryClient, slectedYYYYMMM, activeFilters]);

    const { data, isPending, isError, error } = useQuery({
        queryKey: [category, regionCode, slectedYYYYMMM, activeFilters],
        queryFn: async ({ signal }) => {
            let data;
            let items;
            if (category === 'onetwo') {
                data = await fetchOneTwoSiseData(
                    {
                        LAWD_CD: regionCode,
                        DEAL_YMD: Number(slectedYYYYMMM),
                        pageNo: 1,
                        numOfRows: 1000,
                    },
                    signal,
                );
                items = data.response.body.items.item;

                if (!Array.isArray(items)) {
                    items = [items];
                }
            } else if (category === 'officetel') {
                data = await fetchOfficetelSiseData(
                    {
                        LAWD_CD: regionCode,
                        DEAL_YMD: Number(slectedYYYYMMM),
                        pageNo: 1,
                        numOfRows: 1000,
                    },
                    signal,
                );
                items = data.response.body.items.item;

                if (!Array.isArray(items)) {
                    items = [items];
                }
            } else if (category === 'apt') {
                data = await fetchAptSiseData(
                    {
                        LAWD_CD: regionCode,
                        DEAL_YMD: Number(slectedYYYYMMM),
                        pageNo: 1,
                        numOfRows: 1000,
                    },
                    signal,
                );
                items = data.response.body.items.item;

                if (!Array.isArray(items)) {
                    items = [items];
                }
            } else {
                return [];
            }

            items = items as (OneTwoSise | OfficetelSise | AptSise)[];

            // 필터 적용
            const filteredItems = items.filter((item) => {
                const isJeonse = item.monthlyRent === 0; // 전세 조건
                const isWolse = item.monthlyRent > 0; // 월세 조건

                // activeFilters에 따라 데이터 필터링
                if (activeFilters.includes('전세') && isJeonse) return true;
                if (activeFilters.includes('월세') && isWolse) return true;
                return false;
            });

            // 그룹화 및 좌표 추가
            const groupedByAddress = groupSiseByAddress(filteredItems);

            const result = await addXyToSiseOfBuilding(
                groupedByAddress,
                signal,
            );

            return result;
        },
    });

    return { data, isPending, isError, error };
};

export default useSiseWithReactQuery;
