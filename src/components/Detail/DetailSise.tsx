import React from 'react';
import styled from 'styled-components';
import { groupSiseByUmdnumWithAverages } from '../../utils/sortUtils';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';

interface DetailSiseProps {
    detailInfo?: SiseOfBuildingWithXy;
}

const DetailSise = ({ detailInfo }: DetailSiseProps) => {
    return <div>DetailSise</div>;
};

const DetailSiseStyle = styled.div``;

export default DetailSise;
