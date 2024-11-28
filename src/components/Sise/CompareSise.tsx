import React, { useState } from 'react';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import styled from 'styled-components';
import BookmarkCompareList from '../Bookmark/BookmarkCompareList';

const CompareSise = () => {
    const [comparedData, setComparedData] = useState<SiseOfBuildingWithXy[]>(
        [],
    );
    const [isCompareListOpened, setIsCompareListOpened] =
        useState<boolean>(false);

    const handleReset = () => {
        setComparedData([]);
    };

    return (
        <CompareSiseContainer>
            {isCompareListOpened && (
                <BookmarkCompareList
                    comparedData={comparedData}
                    setComparedData={setComparedData}
                />
            )}

            <CompareSiseBuildingNameContainer>
                <div className="comparison-section">
                    <div className="building-name-box">
                        <h4>{comparedData[0]?.mhouseNm || '건물명1'}</h4>
                    </div>
                    <div className="button-container">
                        <button
                            onClick={() =>
                                setIsCompareListOpened(!isCompareListOpened)
                            }
                        >
                            시세 목록 열기
                        </button>
                        <button onClick={handleReset}>초기화</button>
                    </div>
                    <div className="building-name-box">
                        <h4>{comparedData[1]?.mhouseNm || '건물명2'}</h4>
                    </div>
                </div>
            </CompareSiseBuildingNameContainer>

            <CompareSiseGraphContainer>
                <table>
                    <thead>
                        <tr>
                            <th>항목</th>
                            <th>{comparedData[0]?.mhouseNm || '-'}</th>
                            <th>{comparedData[1]?.mhouseNm || '-'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>건축년도</td>
                            <td>{comparedData[0]?.buildYear || '-'}</td>
                            <td>{comparedData[1]?.buildYear || '-'}</td>
                        </tr>
                        <tr>
                            <td>층수</td>
                            <td>
                                {comparedData[0]?.contracts[0]?.floor || '-'}
                            </td>
                            <td>
                                {comparedData[1]?.contracts[0]?.floor || '-'}
                            </td>
                        </tr>
                        <tr>
                            <td>면적</td>
                            <td>
                                {comparedData[0]?.contracts[0]?.excluUseAr ||
                                    '-'}
                                ㎡
                            </td>
                            <td>
                                {comparedData[1]?.contracts[0]?.excluUseAr ||
                                    '-'}
                                ㎡
                            </td>
                        </tr>
                        <tr>
                            <td>보증금</td>
                            <td>
                                {comparedData[0]?.contracts[0]?.deposit || '-'}
                                만원
                            </td>
                            <td>
                                {comparedData[1]?.contracts[0]?.deposit || '-'}
                                만원
                            </td>
                        </tr>
                        <tr>
                            <td>월세 금액</td>
                            <td>
                                {comparedData[0]?.contracts[0]?.monthlyRent ||
                                    '-'}
                                만원
                            </td>
                            <td>
                                {comparedData[1]?.contracts[0]?.monthlyRent ||
                                    '-'}
                                만원
                            </td>
                        </tr>
                    </tbody>
                </table>
            </CompareSiseGraphContainer>
        </CompareSiseContainer>
    );
};

const CompareSiseContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 900px;
    overflow-y: scroll;
`;

const CompareSiseBuildingNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;

    .comparison-section {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin-top: 20px;

        .building-name-box {
            width: 150px;
            height: 150px;
            background-color: ${({ theme }) => theme.colors.blue};
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

            h4 {
                font-size: 18px;
                margin: 0;
                word-break: break-word;
            }
        }

        .button-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            button {
                padding: 10px 20px;
                background-color: ${({ theme }) => theme.colors.blue};
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;

                &:hover {
                    background-color: #004a66;
                }
            }
        }
    }
`;

const CompareSiseGraphContainer = styled.div`
    width: 90%;
    margin-top: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed; /* 균등한 너비 배분 */

        thead {
            background-color: ${({ theme }) => theme.colors.blue};
            color: white;
            text-align: center;

            th {
                padding: 12px 15px;
                font-size: 16px;
                font-weight: bold;
                white-space: nowrap;
            }
        }

        tbody {
            td {
                border: 1px solid #d0d0d0;
                padding: 10px 15px;
                text-align: center;
                font-size: 14px;
                white-space: nowrap;
            }

            tr:nth-child(even) {
                background-color: #e0e0e0;
            }

            tr:nth-child(odd) {
                background-color: #ffffff;
            }
        }

        /* 첫 번째 컬럼(항목)과 두 데이터 컬럼 비율 조정 */
        td:first-child,
        th:first-child {
            width: 25%; /* 항목 컬럼을 약간 더 좁게 */
        }

        td:nth-child(2),
        th:nth-child(2),
        td:nth-child(3),
        th:nth-child(3) {
            width: 37.5%; /* 데이터 컬럼을 축소하여 균형 조정 */
        }
    }
`;

export default CompareSise;
