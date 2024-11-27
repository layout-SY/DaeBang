import SideBarItem from './SideBarItem';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SiseOfBuildingWithXy } from '../models/Sise.model';
import DetailList from './Detail/DetailList';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { setDetail, setDetailOpen } from '../store/slice/DetailSlice';
import SiseItemSkeleton from './Sise/SiseItemSkeleton';
import { useParams } from 'react-router';
import NotFound from './common/NotFound';

const SiseList = () => {
    const { data, isPending } = useSiseWithReactQuery();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const dispatch = useTypedDispatch();
    const [visibleData, setVisibleData] = useState<SiseOfBuildingWithXy[]>([]);
    const { category } = useParams();

    // 첫 렌더링 및 data 변경 시 visibleData 초기화
    useEffect(() => {
        if (data) {
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
        <StyledSiseList onScroll={handleScroll}>
            {visibleData.map((house, index) => (
                <SideBarItem
                    key={`${house.umdNum}-${index}`}
                    house={house}
                    index={index}
                    onClick={() => openDetail(house)}
                />
            ))}
            {detailOpen && <DetailList closeDetail={closeDetail} />}
        </StyledSiseList>
    );
};

export const StyledSiseList = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 330px;
    overflow-y: scroll;
`;

export default SiseList;
