import SiseLisItem from './SiseListItem';
import styled from 'styled-components';
import { useEffect, useState, Suspense, lazy } from 'react';
import {
    GroupedSiseDataWithAverage,
    SiseOfBuildingWithXy,
} from '../../models/Sise.model';
import useSiseWithReactQuery from '../../hooks/useSiseWithReactQuery';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setDetail, setDetailOpen } from '../../store/slice/DetailSlice';
import SiseItemSkeleton from '../Sise/SiseItemSkeleton';
import { useParams } from 'react-router';
import NotFound from '../Common/NotFound';
import { groupSiseByUmdnumWithAverages } from '../../utils/sort';
import { formatPrice } from '../../utils/format';
import { WIDTH } from '../../utils/constants';

const DetailList = lazy(() => import('../Detail/DetailList'));

const SiseList = () => {
    const { data, isPending } = useSiseWithReactQuery();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();
    const [visibleData, setVisibleData] = useState<SiseOfBuildingWithXy[]>([]);
    const [filteredVisibleData, setFilteredVisibleData] = useState<
        SiseOfBuildingWithXy[]
    >([]);
    const { category } = useParams();
    const [filteredData, setFilteredData] =
        useState<GroupedSiseDataWithAverage[]>();
    const [activeKey, setActiveKey] = useState<string>('전체');
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (data) {
            const grouped = groupSiseByUmdnumWithAverages(data);
            setActiveKey('전체');
            setFilteredData(grouped);

            // '전체'의 경우, 초기 10개 데이터만 visibleData에 설정
            setVisibleData(data.slice(0, 10));
            setFilteredVisibleData([]); // 초기화
        }
    }, [data]);

    if (
        category !== 'apt' &&
        category !== 'officetel' &&
        category !== 'onetwo'
    ) {
        return (
            <StyledSiseList>
                <NotFound />
            </StyledSiseList>
        );
    }

    const loadMoreData = () => {
        if (activeKey === '전체' && data && visibleData.length < data.length) {
            const currentLength = visibleData.length;
            const nextData = data.slice(currentLength, currentLength + 10);
            setVisibleData((prev) => [...prev, ...nextData]);
        } else if (activeKey !== '전체') {
            const selectedGroup = filteredData?.find(
                (group) => group.key === activeKey,
            );
            if (selectedGroup) {
                const currentLength = filteredVisibleData.length;
                const nextData = selectedGroup.SiseData.slice(
                    currentLength,
                    currentLength + 10,
                );
                setFilteredVisibleData((prev) => [...prev, ...nextData]);
            }
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 5) {
            loadMoreData();
        }
    };

    const handleFilter = (key: string) => {
        setActiveKey(key);

        if (key === '전체' && data) {
            setVisibleData(data.slice(0, 10));
            setFilteredVisibleData([]); // 필터링 데이터 초기화
        } else {
            const selectedGroup = filteredData?.find(
                (group) => group.key === key,
            );
            if (selectedGroup) {
                setFilteredVisibleData(selectedGroup.SiseData.slice(0, 10));
                setVisibleData([]); // 전체 데이터 초기화
            }
        }
    };

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
    };

    const handleShowAll = () => {
        setShowAll(!showAll);
    };

    if (isPending) {
        return (
            <StyledSiseList>
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
                <SiseItemSkeleton />
            </StyledSiseList>
        );
    }

    const displayedData =
        activeKey === '전체' ? visibleData : filteredVisibleData;

    return (
        <>
            <ButtonContainer>
                <FilterButton
                    isActive={activeKey === '전체'}
                    onClick={() => handleFilter('전체')}
                >
                    전체
                </FilterButton>
                {filteredData
                    ?.slice(0, showAll ? filteredData.length : 6)
                    .map((group) => (
                        <FilterButton
                            key={group.key}
                            isActive={activeKey === group.key}
                            onClick={() => handleFilter(group.key)}
                        >
                            {group.key}
                        </FilterButton>
                    ))}

                {filteredData && filteredData.length > 6 && (
                    <MoreButton onClick={handleShowAll}>
                        {showAll ? '접기' : '더보기'}
                    </MoreButton>
                )}
            </ButtonContainer>
            <AveragePriceContainer>
                {activeKey === '전체' ? (
                    <AveragePriceText>전체보기</AveragePriceText>
                ) : (
                    filteredData
                        ?.filter((group) => group.key === activeKey)
                        .map((group) => (
                            <AveragePriceText key={group.key}>
                                {group.key}: 평균{' '}
                                {formatPrice(group.averageDeposit)}/{' '}
                                {formatPrice(group.averageMonthlyRent)}
                            </AveragePriceText>
                        ))
                )}
            </AveragePriceContainer>
            <StyledSiseList onScroll={handleScroll}>
                {displayedData.map((house, index) => (
                    <SiseLisItem
                        key={`${house.umdNum}-${index}`}
                        house={house}
                        index={index}
                        onClick={() => openDetail(house)}
                    />
                ))}
                {detailOpen && (
                    <Suspense fallback={<></>}>
                        <DetailList />
                    </Suspense>
                )}
            </StyledSiseList>
        </>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 0.5rem;
    width: ${WIDTH};
    gap: 0.5rem;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ isActive, theme }) =>
        isActive ? theme.colors.blue : '#e0e0e0'};
    color: ${({ isActive }) => (isActive ? 'white' : '#333')};
    font-weight: bold;

    &:hover {
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
    }
`;

const MoreButton = styled.button`
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.blue};
    color: white;
    font-weight: bold;

    &:hover {
        background-color: ${({ theme }) => theme.colors.blue};
        color: white;
    }
`;

const AveragePriceContainer = styled.div`
    display: flex;
    padding: 0.5rem 0;
`;

const AveragePriceText = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
    margin-left: 0.5rem;
    max-width: 100%;
    word-wrap: break-word;
`;

export const StyledSiseList = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 120px); /* 버튼 영역과 평균 영역 포함 */
    width: ${WIDTH};
    overflow-y: scroll;
`;

export default SiseList;
