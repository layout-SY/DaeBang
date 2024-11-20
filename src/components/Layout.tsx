import styled from 'styled-components';
import CategoryBar from './CategoryBar';
import SidebarLayout from './SidebarLayout';

const Layout = () => {
    return (
        <StyledLayout>
            <CategoryBar />
            <SidebarLayout />
        </StyledLayout>
    );
};

const StyledLayout = styled.div`
    display: flex;
    height: 100%;
`;

export default Layout;
