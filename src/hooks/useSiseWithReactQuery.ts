import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTypedSelector } from '../hooks/redux';
import {
    fetchOneTwoSiseData,
    fetchOfficetelSiseData,
    fetchAptSiseData,
} from '../api/Sise.api';
import { groupSiseByAddress } from '../utils/sortUtils';
import { addXyToSiseOfBuilding } from '../utils/adress';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SiseCaegory, AnySise } from '../models/Sise.model';

const useSiseWithReactQuery = () => {
    const [searchParams] = useSearchParams();
    // const filters = useTypedSelector((state) => state.filters);
    const regionCode = parseInt(searchParams.get('region') || '0', 10);
    const queryClient = useQueryClient();
    const { category } = useParams<{ category: SiseCaegory }>();

    // 기본 필터링 상태를 "월세"로 설정
    // const activeFilters = filters.length > 0 ? filters : ['월세'];

    // 현재 월의 데이터를 조회합니다.
    const currentYYYYMM = new Date().toISOString().slice(0, 7).replace('-', '');

    // 캐시 초기화
    useEffect(() => {
        return () => {
            queryClient.cancelQueries({
                queryKey: [category, regionCode, currentYYYYMM],
            });
        };
    }, [regionCode, queryClient, currentYYYYMM]);

    const {
        data,
        isPending,
        isError,
        error,
        isFetching,
        isLoading,
        dataUpdatedAt,
    } = useQuery({
        queryKey: [category, regionCode, currentYYYYMM],
        queryFn: async ({ signal }) => {
            const startTime = performance.now();
            console.log(
                `[${regionCode}]🔄 새로운 데이터 fetch 요청 발생 [${new Date().toLocaleTimeString()}]`,
            );

            let data;
            let items;

            if (category === 'onetwo') {
                data = await fetchOneTwoSiseData(
                    {
                        LAWD_CD: regionCode,
                        DEAL_YMD: Number(currentYYYYMM),
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
                        DEAL_YMD: Number(currentYYYYMM),
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
                        DEAL_YMD: Number(currentYYYYMM),
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
                throw new Error('알 수 없는 카테고리입니다.');
            }

            // // 필터 적용
            // const filteredItems = items.filter((item) => {
            //     const isJeonse = item.monthlyRent === 0; // 전세 조건
            //     const isWolse = item.monthlyRent > 0; // 월세 조건

            //     // activeFilters에 따라 데이터 필터링
            //     if (activeFilters.includes('전세') && isJeonse) return true;
            //     if (activeFilters.includes('월세') && isWolse) return true;
            //     return false;
            // });

            // 그룹화 및 좌표 추가
            const groupedByAddress = groupSiseByAddress(items);

            const result = await addXyToSiseOfBuilding(
                groupedByAddress,
                signal,
            );

            const endTime = performance.now();
            console.log(
                `[${result.length}건] 데이터 로딩 시간: ${(endTime - startTime).toFixed(2)}ms`,
            );
            return result;
        },
    });

    // 캐시된 데이터 확인
    useEffect(() => {
        if (data) {
            const isFromCache = !isFetching && !isLoading;
            const consoleMessage = isFromCache
                ? '📦 캐시된 데이터 사용'
                : '🔄 새로운 데이터 수신';
            console.log(
                `[🔍 ${consoleMessage} - ${new Date().toLocaleTimeString()}]`,
            );
        }
    }, [data, isFetching, isLoading, dataUpdatedAt]);

    return { data, isPending, isError, error };
};

export default useSiseWithReactQuery;
