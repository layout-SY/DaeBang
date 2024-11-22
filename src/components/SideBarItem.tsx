import React from 'react';
import styled from 'styled-components';
import { Sise } from '../models/Sise.model';

interface Props {
    house: Sise;
    index?: number;
    onClick: (house: Sise) => void;
}

const SideBarItem = ({ house, index, onClick }: Props) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        onClick(house);
    };
    return (
        <SideBarItemStyle onClick={handleClick}>
            <img
                src={`https://picsum.photos/id/${index}/100/100`}
                alt={house.mhouseNm}
            />

            <div className="content">
                <h3>
                    {house.monthlyRent === 0
                        ? `전세 ${house.deposit}`
                        : `월세 ${house.deposit}/${house.monthlyRent}`}
                </h3>
                <span>{house.mhouseNm}</span>
                <span>{house.houseType}</span>
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
