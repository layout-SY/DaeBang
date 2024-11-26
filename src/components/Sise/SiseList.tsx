import styled from 'styled-components';
import { useSise } from '../../hooks/useSise';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Sise } from '../../models/Sise.model';

interface SiseListProps {
    onClick: (house: Sise) => void;
}

const SiseList = ({ onClick }: SiseListProps) => {
    const { groupedByAddrSiseData, error, isLoading } = useSise();
    const [ref, inView] = useInView({
        threshold: 0.5, // 화면의 50%가 보일 때 감지
    });

    const handleClick = (house: Sise) => {
        onClick(house);
    };

    useEffect(() => {
        if (inView) {
            console.log('요소가 화면에 보입니다!');
        }
    }, [inView]);

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
        <SiseListStyle ref={ref}>
            {groupedByAddrSiseData.map((page) => (
                <div key={page.index}>
                    {page.data.map((data) => (
                        <div
                            key={data.key}
                            onClick={() => handleClick(data.items[0])}
                        >
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
                        </div>
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
