import React, { useState } from 'react';
import { Sise, SiseOfBuilding } from '../../models/Sise.model';
import SiseList2 from '../SiseList2';
import styled from 'styled-components';

interface IcompareData {
    leftData: SiseOfBuilding[];
    rightData: SiseOfBuilding[];
}

const CompareSise = () => {
    const [comparedData, setComparedData] = useState<IcompareData>({
        leftData: [],
        rightData: [],
    });
    const [isSiseListOpened, setIsSiseListOpened] = useState<boolean>(false);

    const handleCompareData = (data: SiseOfBuilding[]) => {
        if (data.length === 2) {
            setComparedData({
                leftData: [data[0]],
                rightData: [data[1]],
            });
            setIsSiseListOpened(false);
        }
    };

    return (
        <CompareSiseContainer>
            {isSiseListOpened && (
                <SiseListContainer>
                    <SiseList2
                        isCompareMode={true}
                        onCompareComplete={handleCompareData}
                    />
                </SiseListContainer>
            )}

            <CompareSiseBuildingNameContainer>
                <div className="comparison-section">
                    <div className="building-name-box">
                        <h4>
                            {comparedData.leftData[0]?.mhouseNm || '건물명1'}
                        </h4>
                    </div>
                    <button
                        onClick={() => setIsSiseListOpened(!isSiseListOpened)}
                    >
                        시세 목록 열기
                    </button>
                    <div className="building-name-box">
                        <h4>
                            {comparedData.rightData[0]?.mhouseNm || '건물명2'}
                        </h4>
                    </div>
                </div>
            </CompareSiseBuildingNameContainer>

            <CompareSiseGraphContainer>
                <table>
                    <thead>
                        <tr>
                            <th>항목</th>
                            <th>{comparedData.leftData[0]?.mhouseNm || '-'}</th>
                            <th>
                                {comparedData.rightData[0]?.mhouseNm || '-'}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>건축년도</td>
                            <td>
                                {comparedData.leftData[0]?.buildYear || '-'}
                            </td>
                            <td>
                                {comparedData.rightData[0]?.buildYear || '-'}
                            </td>
                        </tr>
                        <tr>
                            <td>층수</td>
                            <td>
                                {comparedData.leftData[0]?.contracts[0].floor ||
                                    '-'}
                            </td>
                            <td>
                                {comparedData.rightData[0]?.contracts[0]
                                    .floor || '-'}
                            </td>
                        </tr>
                        <tr>
                            <td>면적</td>
                            <td>
                                {comparedData.leftData[0]?.contracts[0]
                                    .excluUseAr || '-'}
                                ㎡
                            </td>
                            <td>
                                {comparedData.rightData[0]?.contracts[0]
                                    .excluUseAr || '-'}
                                ㎡
                            </td>
                        </tr>
                        <tr>
                            <td>보증금</td>
                            <td>
                                {comparedData.leftData[0]?.contracts[0]
                                    .deposit || '-'}
                                만원
                            </td>
                            <td>
                                {comparedData.rightData[0]?.contracts[0]
                                    .deposit || '-'}
                                만원
                            </td>
                        </tr>
                        <tr>
                            <td>월세 금액</td>
                            <td>
                                {comparedData.leftData[0]?.contracts[0]
                                    .monthlyRent || '-'}
                                만원
                            </td>
                            <td>
                                {comparedData.rightData[0]?.contracts[0]
                                    .monthlyRent || '-'}
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
    width: 1100px;
    overflow-y: scroll;
`;

const SiseListContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 330px;
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
            background-color: #005977;
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

        button {
            align-self: center;
            padding: 10px 20px;
            background-color: #005977;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: -50px;

            &:hover {
                background-color: #004a66;
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
            background-color: #005977;
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
