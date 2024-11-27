import React from 'react';
import styled from 'styled-components';
import { Sise, SiseOfBuildingWithXy } from '../../models/Sise.model';
import { useSise } from '../../hooks/useSise';
interface DetailSiseProps {
    detailInfo?: SiseOfBuildingWithXy;
}

const DetailSise = ({ detailInfo }: DetailSiseProps) => {
    const { groupedByAddrSiseData } = useSise();

    // detailInfo에서 동 지번 정보를 가져옵니다.
    const targetKey = `${detailInfo?.umdNum} ${detailInfo?.jibun}`;

    // groupedByAddrSiseData에서 targetKey와 일치하는 items를 찾습니다.
    const sise = groupedByAddrSiseData?.find(
        (group) => group.key === targetKey,
    )?.items;

    console.log(groupedByAddrSiseData);

    return (
        <DetailSiseStyle>
            {/* 데이터를 확인하거나 렌더링 */}
            {sise ? (
                <ul>
                    {sise.map((item, index) => (
                        <li key={index}>
                            {item.mhouseNm} - 월세: {item.monthlyRent}, 전세:{' '}
                            {item.deposit}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>데이터가 없습니다.</p>
            )}
        </DetailSiseStyle>
    );
};

const DetailSiseStyle = styled.div`
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

export default DetailSise;
