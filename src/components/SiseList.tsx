import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SiseOfBuilding, SiseOfBuildingWithXy } from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { setDetail, setDetailOpen } from '../store/slice/DetailSlice';

interface SiseListProps {
    isCompareMode?: boolean;
    onCompareComplete?: (compareData: SiseOfBuilding[]) => void;
}

const SiseList = ({ isCompareMode, onCompareComplete }: SiseListProps) => {
    const { data } = useSiseWithReactQuery();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();
    const [visibleData, setVisibleData] = useState<SiseOfBuildingWithXy[]>([]);
    const [compareData, setCompareData] = useState<SiseOfBuilding[]>([]);

    // 첫 렌더링 및 data 변경 시 visibleData 초기화
    useEffect(() => {
        if (data) {
            setVisibleData(data.slice(0, 10));
        }
    }, [data]);

    const loadMoreData = () => {
        if (data && visibleData.length < data.length) {
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

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
    };

    const closeDetail = () => {
        dispatch(setDetailOpen(false));
    };

    const handleSelectForCompare = (house: SiseOfBuilding) => {
        if (compareData.length < 2) {
            setCompareData((prev) => [...prev, house]);
        }

        if (compareData.length + 1 === 2 && onCompareComplete) {
            onCompareComplete([...compareData, house]);
        }
    };

    return (
        <StyledSiseList onScroll={handleScroll}>
            {visibleData.map((house, index) => (
                <SideBarItem
                    key={`${house.umdNum}-${index}`}
                    house={house}
                    index={index}
                    onClick={
                        isCompareMode
                            ? () => handleSelectForCompare(house)
                            : () => openDetail(house)
                    }
                />
            ))}
            {!isCompareMode && detailOpen && (
                <DetailList closeDetail={closeDetail} />
            )}
        </StyledSiseList>
    );
};

const StyledSiseList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 330px;
    overflow-y: scroll;
`;

export default SiseList;
