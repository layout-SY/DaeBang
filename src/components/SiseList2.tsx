import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { SiseOfBuildingWithXy } from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { WIDTH } from '../utils/constants';
import LoadingSpinner from './common/LoadingSpinner';
import { setDetail, setDetailOpen } from '../store/slice/DetailSlice';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';

const SiseList2 = () => {
    const { data, isLoading } = useSiseWithReactQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();

    const openDetail = (house: SiseOfBuildingWithXy) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('detail_id', 'open');
        setSearchParams(newSearchParams);
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
    };

    const closeDetail = () => {
        searchParams.delete('detail_id');
        dispatch(setDetailOpen(false));
        setSearchParams(searchParams);
    };

    return (
        <StyledSiseList2>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                data?.map((house, index) => (
                    <div key={house.jibun + house.mhouseNm}>
                        <SideBarItem
                            house={house}
                            index={index}
                            onClick={() => openDetail(house)}
                        />
                    </div>
                ))
            )}
            {detailOpen && <DetailList closeDetail={closeDetail} />}
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
