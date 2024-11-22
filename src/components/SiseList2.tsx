import { useSise } from '../hooks/useSise';
import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sise } from '../models/Sise.model';
import DetailList from './Detail/DetailList';

const SiseList2 = () => {
    const { siseData } = useSise();
    const [searchParams, setSearchParams] = useSearchParams();
    const [detailInfo, setDetailInfo] = useState<Sise | null>();

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
    return (
        <StyledSiseList2>
            {siseData.map((house, index) => (
                <SideBarItem
                    house={house}
                    index={index}
                    key={index}
                    onClick={openDetail}
                />
            ))}
            {detailId && detailInfo && (
                <DetailList house={detailInfo} closeDetail={closeDetail} />
            )}
        </StyledSiseList2>
    );
};

const StyledSiseList2 = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
`;

export default SiseList2;
