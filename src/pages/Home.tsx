import styled from 'styled-components';
import Map from '../components/Map';
import CategoryBar from '../components/CategoryBar';

// 임시 페이지입니다.
const Home = () => {
    return (
        <StyledHome>
            <CategoryBar />
            <Map />
        </StyledHome>
    );
};

const StyledHome = styled.main`
    display: flex;
    height: 100vh;
`;

export default Home;
