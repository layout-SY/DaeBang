import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa';
import styled from 'styled-components';
import { WIDTH } from '../../utils/constants';
import { Sise } from '../../models/Sise.model';
import DetailRoadView from './DetailRoadView';
import { useGetPosition } from '../../hooks/useGetPosition';
import DetailNeighbor from './DetailNeighbor';

export interface Position {
    lat: number;
    lng: number;
}

interface Props {
    house: Sise;

    closeDetail: () => void;
}

const DetailList = ({ house, closeDetail }: Props) => {
    const { position } = useGetPosition(house);
    const [bookmarkIndex, setBookMarkIndex] = useState<number>(-1);

    useEffect(() => {
        // 북마크 여부
        const existingBookmarks = JSON.parse(
            localStorage.getItem('bookmark') || '[]',
        ) as any[];
        const index = existingBookmarks.findIndex(
            (bookmark) => bookmark === house,
        );
        setBookMarkIndex(index);
    }, [house]);

    const handleClose = () => {
        closeDetail();
    };

    const handleClickHeart = () => {
        const existingBookmarks = JSON.parse(
            localStorage.getItem('bookmark') || '[]',
        ) as any[];
        let newBookMarks = [];

        if (bookmarkIndex !== -1) {
            newBookMarks = existingBookmarks.splice(bookmarkIndex, 1);
            setBookMarkIndex(-1);
        } else {
            newBookMarks = [...existingBookmarks, house];
            setBookMarkIndex(newBookMarks.length - 1);
        }

        localStorage.setItem('bookmark', JSON.stringify(newBookMarks));
    };

    return (
        <>
            <DetailListStyle>
                <div className="header">
                    <h2>제목</h2>
                    <div className="header_button_container">
                        <button className="bookmark" onClick={handleClickHeart}>
                            {bookmarkIndex !== -1 ? (
                                <FaHeart />
                            ) : (
                                <FaRegHeart />
                            )}
                        </button>
                        <button className="close" onClick={handleClose}>
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div className="content">
                    <DetailRoadView position={position} />

                    <h2>
                        {house.monthlyRent === 0
                            ? `전세 ${house.deposit}`
                            : `월세 ${house.deposit}/${house.monthlyRent}`}
                    </h2>
                    <div className="grid">
                        <div>
                            <span>건물명 : {house.mhouseNm}</span>
                        </div>
                        <div>
                            <span>종류 : {house.houseType} </span>
                        </div>
                        <div>
                            <span>면적 : {house.excluUseAr} ㎡</span>
                        </div>
                        <div>
                            <span>층 : {house.floor}</span>
                        </div>
                    </div>
                </div>

                <div className="neighbor">
                    <DetailNeighbor position={position} />
                </div>

                <div className="graph">
                    <h2>시세 정보</h2>
                </div>

                <div className="navigation">
                    <h2>길찾기</h2>
                </div>
            </DetailListStyle>
            <ToggleButton onClick={handleClose} className="totoggle">
                <FaAngleLeft />
            </ToggleButton>
        </>
    );
};
const DetailListStyle = styled.div`
    padding-top: 10px;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    overflow: scroll;
    height: 100%;
    width: ${WIDTH};
    left: calc(5rem + ${WIDTH});
    z-index: 1000;
    background: #fff;

    border-right: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    flex-direction: column;

    h2 {
        margin: 0;
    }

    .header {
        padding: 0 10px 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            border: none;
            background: transparent;
            outline: none;
            cursor: pointer;

            svg {
                font-size: 1.25rem;
            }
        }

        .close {
            transform: rotate(45deg);
        }
    }

    position: absolute;

    .content {
        padding: 0 10px;

        display: flex;
        flex-direction: column;
        gap: 10px;

        cursor: pointer;

        span {
            font-size: 0.875rem;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

const ToggleButton = styled.button`
    position: absolute;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    left: calc(5rem + ${WIDTH} + ${WIDTH});
    width: 23px;
    height: 46px;
    border: solid 1px ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
    background-color: #fff;
    font-size: 1.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    border-radius: 0 0.5rem 0.5rem 0;
    cursor: pointer;
    z-index: 200;
`;
export default DetailList;
