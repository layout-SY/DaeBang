import React from 'react';
import styled from 'styled-components';
import { SideBarItemStyle } from '../SideBarItem';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';

interface Props {
    house: SiseOfBuildingWithXy;
    index?: number;
    onClick: (house: SiseOfBuildingWithXy) => void;
}

const BookmarkItem = ({ house, index, onClick }: Props) => {
    return (
        <BookmarkItemStyle onClick={() => onClick(house)}>
            <img
                src={`https://picsum.photos/id/${index}/100/100`}
                alt={house.mhouseNm}
            />
            <div className="content">
                <h3>
                    {house.contracts[0].monthlyRent === 0
                        ? `전세 ${house.contracts[0].deposit}`
                        : `월세 ${house.contracts[0].deposit}/${house.contracts[0].monthlyRent}`}
                </h3>
                <span>{house.mhouseNm}</span>
                <span>{house.houseType}</span>
            </div>
        </BookmarkItemStyle>
    );
};
const BookmarkItemStyle = SideBarItemStyle;
export default BookmarkItem;
