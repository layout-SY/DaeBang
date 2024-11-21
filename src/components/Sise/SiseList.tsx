import styled from 'styled-components';
import { useSise } from '../../hooks/useSise';

const SiseList = () => {
    const { siseData, error, isLoading } = useSise();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!siseData.length) {
        return <div>No data available.</div>;
    }

    return (
        <SiseListStyle>
            {siseData.map((data, index) => (
                <li key={index}>
                    <p>
                        <strong>{`건물명 : ${data.mhouseNm} `}</strong>
                    </p>
                    <p>
                        <strong>Build Year:</strong> {data.buildYear}
                    </p>
                    <p>
                        <strong>
                            {data.monthlyRent === 0
                                ? '전세'
                                : `월세 금액 : ${data.monthlyRent} 만원`}
                        </strong>
                    </p>
                    <p>
                        <strong>{`계약금 : ${data.deposit} 만원`}</strong>
                    </p>
                    <p>
                        <strong>{`지번 : ${data.jibun}`}</strong>
                    </p>
                </li>
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
