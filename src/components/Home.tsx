import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // 현재 서치 파라미터를 유지하면서 리다이렉트
        navigate({
            pathname: '/onetwo',
            search: searchParams.toString(),
        });
    }, [navigate, searchParams]);

    return <StyledHome></StyledHome>;
};

const StyledHome = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 330px;
    overflow-y: scroll;
`;

export default Home;
