import { useState } from 'react';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import styled from 'styled-components';
import { WIDTH } from '../../utils/constants';
import { getBookMarks } from '../../hooks/bookMark';
import SideBarItem from '../SideBarItem';
import { formatPrice } from '../../utils/format';

const CompareSise = () => {
    const [comparedData, setComparedData] = useState<SiseOfBuildingWithXy[]>(
        [],
    );

    const bookmaredItems = getBookMarks();

    const comparisonFields = [
        {
            label: '건축년도',
            getValue: (item: SiseOfBuildingWithXy) => item.buildYear || '-',
        },
        {
            label: '층수',
            getValue: (item: SiseOfBuildingWithXy) =>
                item.contracts[0]?.floor || '-',
        },
        {
            label: '면적',
            getValue: (item: SiseOfBuildingWithXy) =>
                item.contracts[0]?.excluUseAr
                    ? `${item.contracts[0].excluUseAr}㎡`
                    : '-',
        },
        {
            label: '보증금',
            getValue: (item: SiseOfBuildingWithXy) =>
                item.contracts[0]?.deposit
                    ? `${formatPrice(item.contracts[0].deposit)}`
                    : '-',
        },
        {
            label: '월세',
            getValue: (item: SiseOfBuildingWithXy) =>
                item.contracts[0]?.monthlyRent
                    ? `${formatPrice(item.contracts[0].monthlyRent)}`
                    : '-',
        },
    ];

    return (
        <StyledCompaedSise>
            <section className="boommark-list">
                <h2>비교하기</h2>
                <span className="sub">클릭해서 추가하기</span>
                {bookmaredItems.map((item, index) => (
                    <SideBarItem
                        key={index}
                        house={item}
                        index={index}
                        onClick={(house) => {
                            setComparedData((prev) => {
                                const isAlreadyAdded = prev.some(
                                    (item) => item.mhouseNm === house.mhouseNm,
                                );
                                if (isAlreadyAdded) {
                                    // 이미 추가된 경우 제거
                                    return prev.filter(
                                        (item) =>
                                            item.mhouseNm !== house.mhouseNm,
                                    );
                                } else if (prev.length < 2) {
                                    // 추가되지 않은 경우 추가 (최대 2개)
                                    return [...prev, house];
                                }
                                return prev;
                            });
                        }}
                    />
                ))}
            </section>

            <CompareSiseGraphContainer>
                <table>
                    <thead>
                        <tr>
                            <th>항목</th>
                            <th>
                                {comparedData[0]
                                    ? comparedData[0].mhouseNm
                                    : '-'}
                                {comparedData[0] && (
                                    <RemoveButton
                                        onClick={() =>
                                            setComparedData((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item.mhouseNm !==
                                                        comparedData[0]
                                                            .mhouseNm,
                                                ),
                                            )
                                        }
                                    >
                                        X
                                    </RemoveButton>
                                )}
                            </th>
                            <th>
                                {comparedData[1]
                                    ? comparedData[1].mhouseNm
                                    : '-'}
                                {comparedData[1] && (
                                    <RemoveButton
                                        onClick={() =>
                                            setComparedData((prev) =>
                                                prev.filter(
                                                    (item) =>
                                                        item.mhouseNm !==
                                                        comparedData[1]
                                                            .mhouseNm,
                                                ),
                                            )
                                        }
                                    >
                                        X
                                    </RemoveButton>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {comparisonFields.map((field, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{field.label}</td>
                                <td>
                                    {comparedData[0]
                                        ? field.getValue(comparedData[0])
                                        : '-'}
                                </td>
                                <td>
                                    {comparedData[1]
                                        ? field.getValue(comparedData[1])
                                        : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CompareSiseGraphContainer>
        </StyledCompaedSise>
    );
};

const StyledCompaedSise = styled.div`
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
    width: ${WIDTH};

    h2 {
        margin: 0;
        margin-left: 10px;
    }

    .sub {
        margin-left: 10px;
        font-size: 0.875rem;
    }
`;

const CompareSiseGraphContainer = styled.section`
    position: absolute;
    top: 10%;
    right: -270%;
    width: 250%;
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

const RemoveButton = styled.button`
    margin-left: 5px;
    background: none;
    border: none;
    color: red;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
        color: darkred;
    }
`;

export default CompareSise;
