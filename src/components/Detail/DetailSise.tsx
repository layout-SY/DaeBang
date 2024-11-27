import React from 'react';
import styled from 'styled-components';
import { Sise, SiseOfBuildingWithXy } from '../../models/Sise.model';
import { groupSiseByUmdnumWithAverages } from '../../utils/sortUtils';
interface DetailSiseProps {
    detailInfo?: SiseOfBuildingWithXy;
}

const DetailSise = ({ detailInfo }: DetailSiseProps) => {
    const targetKey = `${detailInfo?.umdNum} ${detailInfo?.jibun}`;

    return (
        <DetailSiseStyle>
            <h3>
                <strong>{`${detailInfo?.umdNum}`}</strong> 전/월세 거래정보는?
            </h3>
        </DetailSiseStyle>
    );
};

const DetailSiseStyle = styled.div`
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
`;

export default DetailSise;
