import React, { useState } from 'react';
import styled from 'styled-components';
import { SiseOfBuildingWithXy } from '../models/Sise.model';
import ErrorBox from './common/ErrorBox';

interface Props {
    house: SiseOfBuildingWithXy;
    index?: number;
    onClick: (house: SiseOfBuildingWithXy) => void;
}

const SideBarItem = ({ house, index, onClick }: Props) => {
    const [imageError, setImageError] = useState(false);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onClick(house);
    };
    return (
        <SideBarItemStyle onClick={handleClick}>
            {imageError ? (
                <ErrorBox
                    message="이미지 로드에 실패했습니다"
                    height={100}
                    width={100}
                />
            ) : (
                <img
                    src={`https://picsum.photos/id/${index}/100/100`}
                    alt={house.mhouseNm}
                    onError={() => setImageError(true)}
                />
            )}

            <div className="content">
                <h3>
                    {house.contracts[0].monthlyRent === 0
                        ? `전세 ${house.contracts[0].deposit}`
                        : `월세 ${house.contracts[0].deposit}/${house.contracts[0].monthlyRent}`}
                </h3>
                <span>{house.mhouseNm}</span>
                <span>{house.huseType}</span>
            </div>
        </SideBarItemStyle>
    );
};

const SideBarItemStyle = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    &:hover {
        background: ${({ theme }) => theme.colors.hover};
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.text};

        h3 {
            margin: 0;
        }
        span {
            font-size: 0.875rem;
        }
    }
`;
export default SideBarItem;
