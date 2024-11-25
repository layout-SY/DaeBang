import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SiseOfBuildingWithXy } from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { WIDTH } from '../utils/constants';
import LoadingSpinner from './common/LoadingSpinner';

const SiseList2 = () => {
    const { data, isLoading } = useSiseWithReactQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const [detailInfo, setDetailInfo] = useState<SiseOfBuildingWithXy | null>();

    const detailId = searchParams.get('detail_id');

    const openDetail = (house: SiseOfBuildingWithXy) => {
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
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                data?.map((house, index) => (
                    <SideBarItem
                        key={house.jibun + house.mhouseNm}
                        house={house}
                        index={index}
                        onClick={() => openDetail(house)}
                    />
                ))
            )}

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
    width: ${WIDTH};
    overflow-y: scroll;
`;

export default SiseList2;
