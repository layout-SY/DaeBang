import SiseLisItem from './SiseListItem';
import styled from 'styled-components';
import { useEffect, useState, Suspense, lazy, useRef } from 'react';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import useSiseWithReactQuery from '../../hooks/useSiseWithReactQuery';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { setDetail, setDetailOpen } from '../../store/slice/DetailSlice';
import SiseItemSkeleton from '../Sise/SiseItemSkeleton';
import { useParams } from 'react-router';
import NotFound from '../common/NotFound';

import { WIDTH } from '../../utils/constants';
import DongSelect from './DongSelect';

const DetailList = lazy(() => import('../Detail/DetailList'));

const SiseList = () => {
    const { data, isPending } = useSiseWithReactQuery();
    const { detailOpen } = useTypedSelector((state) => state.detail);
    const { depositRange, rentRange, areaRange } = useTypedSelector(
        (state) => state.filters,
    );
    const dispatch = useTypedDispatch();
    const { category } = useParams();
    const [page, setPage] = useState(1); // 무한 스크롤을 위한 페이지, 1페이지부터 시작 하여 10개씩 더 보여줌
    const observerRef = useRef<HTMLDivElement | null>(null);
    const [seledctedDongs, setSelectedDongs] = useState<string[]>([]); // 선택된 동 이름의 리스트, 최초에는 선택된 동이 없으므로 전체 데이터를 보여줌

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0,
            },
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            if (observerRef.current) {
                observer.unobserve(observerRef.current);
            }
        };
    }, []);

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

    const openDetail = (house: SiseOfBuildingWithXy) => {
        dispatch(setDetailOpen(true));
        dispatch(setDetail(house));
    };

    return (
        <>
            <DongSelect
                data={data as SiseOfBuildingWithXy[]}
                selectedDongs={seledctedDongs}
                setSelectedDongs={setSelectedDongs}
            />
            {/* <AveragePriceContainer>
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
            </AveragePriceContainer> */}
            <StyledSiseList>
                {data
                    ?.filter(
                        (house) =>
                            seledctedDongs.length === 0 ||
                            seledctedDongs.includes(house.umdNum),
                    )
                    .filter((house) => {
                        const depositString = house.contracts[0].deposit;
                        const deposit =
                            typeof depositString === 'string'
                                ? Number(depositString.replace(/,/g, ''))
                                : Number(depositString);

                        return (
                            deposit >= depositRange[0] &&
                            deposit <= depositRange[1] &&
                            house.contracts[0].monthlyRent >= rentRange[0] &&
                            house.contracts[0].monthlyRent <= rentRange[1] &&
                            house.contracts[0].excluUseAr >= areaRange[0] &&
                            house.contracts[0].excluUseAr <= areaRange[1]
                        );
                    })
                    .slice(0, page * 10)
                    .map((house, index) => (
                        <SiseLisItem
                            key={`${house.umdNum}-${index}`}
                            house={house}
                            index={index}
                            onClick={() => openDetail(house)}
                        />
                    ))}
                <div ref={observerRef} />
                {detailOpen && (
                    <Suspense fallback={<></>}>
                        <DetailList />
                    </Suspense>
                )}
            </StyledSiseList>
        </>
    );
};

export const StyledSiseList = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 120px); /* 버튼 영역과 평균 영역 포함 */
    width: ${WIDTH};
    overflow-y: scroll;
`;

export default SiseList;
