import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import DetailRoadView from './DetailRoadView';
import DetailNeighbor from './DetailNeighbor';
import { WIDTH } from '../../utils/constants';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import DetailViewOnMapButton from './DetailViewOnMapButton';
import { removeDetail, setDetailOpen } from '../../store/slice/DetailSlice';
import DetailBookMarkButton from './DetailBookmarkButton';

const DetailList = () => {
    const dispatch = useTypedDispatch();
    const { detailInfo } = useTypedSelector((state) => state.detail);
    const position = { lat: detailInfo!.y, lng: detailInfo!.x };

    const wrapper = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        dispatch(removeDetail());
        dispatch(setDetailOpen(false));
    };

    return (
        <TEST>
            <DetailListStyle ref={wrapper} className="detailList">
                <div className="detail_header">
                    <h2>상세 정보</h2>
                    <div className="header_button_container">
                        <DetailViewOnMapButton position={position} />
                        <DetailBookMarkButton />
                        <button className="close" onClick={handleClose}>
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div className="detail_content">
                    <DetailRoadView />

                    <h2>
                        {detailInfo!.contracts[0].monthlyRent === 0
                            ? `전세 ${detailInfo!.contracts[0].deposit}`
                            : `월세 ${detailInfo!.contracts[0].deposit}/${detailInfo!.contracts[0].monthlyRent}`}
                    </h2>
                    <div className="grid">
                        <div>
                            <span>건물명 : {detailInfo!.mhouseNm}</span>
                        </div>
                        <div>
                            <span>종류 : {detailInfo!.houseType} </span>
                        </div>
                        <div>
                            <span>
                                면적 : {detailInfo!.contracts[0].excluUseAr} ㎡
                            </span>
                        </div>
                        <div>
                            <span>층 : {detailInfo!.contracts[0].floor}</span>
                        </div>
                    </div>
                </div>

                <div className="detail_neighbor">
                    <DetailNeighbor />
                </div>
            </DetailListStyle>
        </TEST>
    );
};

const TEST = styled.div``;

const DetailListStyle = styled.div`
    position: fixed;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    top: 0;
    left: calc(20px + ${WIDTH});
    display: flex;
    flex-direction: column;
    overflow: scroll;
    gap: 30px;
    height: 100%;
    width: ${WIDTH};
    z-index: 1001;
    padding: 20px 0;
    background: #fff;
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    border-left: 1px solid ${({ theme }) => theme.colors.border};

    h2 {
        margin: 0;
    }

    .detail_header {
        padding: 0 10px;
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

    .detail_content {
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

    .detail_neighbor {
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

export default DetailList;
