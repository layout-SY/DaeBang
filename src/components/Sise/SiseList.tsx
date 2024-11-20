import styled from 'styled-components';
import { useSise } from '../../hooks/useSise';

const SiseList = ({ lawdCd }: { lawdCd: number }) => {
    const { siseData, error, isLoading } = useSise(lawdCd);

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
                        <strong>House Name:</strong> {data.mhouseNm}
                    </p>
                    <p>
                        <strong>Build Year:</strong> {data.buildYear}
                    </p>
                    <p>
                        <strong>Monthly Rent:</strong> {data.monthlyRent}
                    </p>
                    <p>
                        <strong>Deposit:</strong> {data.deposit}
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
