import { useSise } from '../hooks/useSise';
import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sise } from '../models/Sise.model';
import DetailList from './Detail/DetailList';

interface SiseList2Props {
    isCompareMode?: boolean;
    onCompareComplete?: (compareData: Sise[]) => void;
}

const SiseList2 = ({ isCompareMode, onCompareComplete }: SiseList2Props) => {
    const { siseData } = useSise();
    const [searchParams, setSearchParams] = useSearchParams();
    const [detailInfo, setDetailInfo] = useState<Sise | null>();
    const [compareData, setCompareData] = useState<Sise[]>([]);

    const detailId = searchParams.get('detail_id');

    const openDetail = (house: Sise) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('detail_id', 'open');
        setSearchParams(newSearchParams);
        setDetailInfo(house);
    };

    const closeDetail = () => {
        searchParams.delete('detail_id');
        setSearchParams(searchParams);
    };

    const handleSelectForCompare = (house: Sise) => {
        if (compareData.length < 2) {
            setCompareData((prev) => [...prev, house]);
        }

        if (compareData.length + 1 === 2 && onCompareComplete) {
            onCompareComplete([...compareData, house]);
        }
    };

    return (
        <StyledSiseList2>
            {siseData.map((house, index) => (
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
            {!isCompareMode && detailId && detailInfo && (
                <DetailList house={detailInfo} closeDetail={closeDetail} />
            )}
        </StyledSiseList2>
    );
};

// 현재는 네이버 지도처럼 팝업으로 띄우는 레이아웃으로 해보았습니다. (하드코딩되는 부분없이 비율로만 조정해보려고 했는데 어려운 부분이 있네요)
// 다방처럼 사이드바가 늘어나면서 상세정보가 나오게 하고 싶다면
// 아래와 같이 변경하고 이 컴포넌트와 DetailList 컴포넌트 스타일을 조정하면 가능합니다.

{
    /* <현재컴포넌트 style={
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
}>
    <시세 목록 컴포넌트/>
    <상세정보 컴포넌트/>
</현재컴포넌트> */
}

const StyledSiseList2 = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 330px;
    overflow-y: scroll;
`;

export default SiseList2;
