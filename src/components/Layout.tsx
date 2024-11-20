import styled from 'styled-components';
import CategoryBar from './CategoryBar';
import SidbarLayout from './SidbarLayout';

const Layout = () => {
    return (
        <StyledLayout>
            <CategoryBar />
            <SidbarLayout />
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    display: flex;
    height: 100%;
`;

export default Layout;
