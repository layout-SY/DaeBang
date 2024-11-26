import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useState } from 'react';
import { SiseOfBuilding, SiseOfBuildingWithXy } from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { setDetail, setDetailOpen } from '../store/slice/DetailSlice';

interface SiseList2Props {
    isCompareMode?: boolean;
    onCompareComplete?: (compareData: SiseOfBuilding[]) => void;
}

const SiseList2 = ({ isCompareMode, onCompareComplete }: SiseList2Props) => {
    const { data } = useSiseWithReactQuery();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();
    const [compareData, setCompareData] = useState<SiseOfBuilding[]>([]);

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetail(house));
        dispatch(setDetailOpen(true));
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
        <StyledSiseList2>
            {data?.map((house, index) => (
                <SideBarItem
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
        </StyledSiseList2>
    );
};

const StyledSiseList2 = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 330px;
    overflow-y: scroll;
`;

export default SiseList2;
