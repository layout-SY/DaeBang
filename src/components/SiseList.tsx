import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
    GroupedSiseDataWithAverage,
    SiseOfBuildingWithXy,
} from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { setDetail, setDetailOpen } from '../store/slice/DetailSlice';
import SiseItemSkeleton from './Sise/SiseItemSkeleton';
import { useParams } from 'react-router';
import NotFound from './common/NotFound';
import { groupSiseByUmdnumWithAverages } from '../utils/sortUtils';
import { formatPrice } from '../utils/formatUtils';
import { WIDTH } from '../utils/constants';

const SiseList = () => {
    const { data, isPending } = useSiseWithReactQuery();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();
    const [visibleData, setVisibleData] = useState<SiseOfBuildingWithXy[]>([]);
    const { category } = useParams();
    const [filteredData, setFilteredData] =
        useState<GroupedSiseDataWithAverage[]>();
    const [activeKey, setActiveKey] = useState<string>('전체');

    useEffect(() => {
        if (data) {
            const grouped = groupSiseByUmdnumWithAverages(data);
            setFilteredData(grouped);
            setVisibleData(data.slice(0, 10));
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
        if (data && visibleData.length < data.length && activeKey === '전체') {
            const currentLength = visibleData.length;
            const nextData = data.slice(currentLength, currentLength + 10);
            setVisibleData((prev) => [...prev, ...nextData]);
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
        } else {
            const selectedGroup = filteredData?.find(
                (group) => group.key === key,
            );
            if (selectedGroup) {
                setVisibleData(selectedGroup.SiseData);
            }
        }
    };

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
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

    return (
        <>
            <ButtonContainer>
                <ButtonScrollContainer>
                    <FilterButton
                        isActive={activeKey === '전체'}
                        onClick={() => handleFilter('전체')}
                    >
                        전체
                    </FilterButton>
                    {filteredData?.map((group) => (
                        <FilterButton
                            key={group.key}
                            isActive={activeKey === group.key}
                            onClick={() => handleFilter(group.key)}
                        >
                            {group.key}
                        </FilterButton>
                    ))}
                </ButtonScrollContainer>
            </ButtonContainer>
            <AveragePriceContainer>
                {activeKey === '전체' ? (
                    <AveragePriceText>평균 월세와 전세 데이터</AveragePriceText>
                ) : (
                    filteredData
                        ?.filter((group) => group.key === activeKey)
                        .map((group) => (
                            <AveragePriceText key={group.key}>
                                {`${group.key}: 평균 월세 ${formatPrice(
                                    group.averageMonthlyRent,
                                )}, 평균 보증금 ${formatPrice(
                                    group.averageDeposit,
                                )}`}
                            </AveragePriceText>
                        ))
                )}
            </AveragePriceContainer>
            <StyledSiseList onScroll={handleScroll}>
                {visibleData.map((house, index) => (
                    <SideBarItem
                        key={`${house.umdNum}-${index}`}
                        house={house}
                        index={index}
                        onClick={() => openDetail(house)}
                    />
                ))}
                {detailOpen && <DetailList />}
            </StyledSiseList>
        </>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    overflow-x: scroll;
    padding: 0.5rem 0.5rem;
    width: ${WIDTH};
`;

const ButtonScrollContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    overflow-x: auto;
    width: 100%;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        height: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #007bff;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
    }
`;

const FilterButton = styled.button<{ isActive: boolean }>`
    flex: 0 0 auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${({ isActive }) => (isActive ? '#007bff' : '#e0e0e0')};
    color: ${({ isActive }) => (isActive ? 'white' : '#333')};
    font-weight: bold;

    &:hover {
        background-color: #0056b3;
        color: white;
    }
`;

const AveragePriceContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
    background-color: #f9f9f9;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
`;

const AveragePriceText = styled.div`
    font-size: 0.9rem;
    font-weight: bold;
    color: #555;
`;

export const StyledSiseList = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 120px); /* 버튼 영역과 평균 영역 포함 */
    width: ${WIDTH};
    overflow-y: scroll;
`;

export default SiseList;
