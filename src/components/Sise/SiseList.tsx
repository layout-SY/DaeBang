import styled from 'styled-components';
import { useSise } from '../../hooks/useSise';

const SiseList = () => {
    const { groupedByAddrSiseData, error, isLoading } = useSise();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!groupedByAddrSiseData.length) {
        return <div>No data available.</div>;
    }

    return (
        <SiseListStyle>
            {groupedByAddrSiseData.map((page) => (
                <div key={page.index}>
                    <h3>Page {page.index}</h3>
                    {page.data.map((data) => (
                        <li key={data.key}>
                            <p>
                                <strong>{data.key}</strong>
                            </p>
                            <p>
                                <strong>{`최신 갱신 날짜 : ${data.items[0].dealYear}년 ${data.items[0].dealMonth}월 ${data.items[0].dealDay}일`}</strong>
                            </p>
                            <p>{`건물명 : ${data.items[0].mhouseNm} `}</p>
                            <p>{`완공 날짜 : ${data.items[0].buildYear}년`}</p>
                            <p>
                                {data.items[0].monthlyRent === 0
                                    ? '전세'
                                    : `월세 금액 : ${data.items[0].monthlyRent} 만원`}
                            </p>
                            <p>{`계약금 : ${data.items[0].deposit} 만원`}</p>
                        </li>
                    ))}
                </div>
            ))}
        </SiseListStyle>
    );
};

const SiseListStyle = styled.div`
    padding: 20px;
    font-size: 16px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export default SiseList;
