import styled from 'styled-components';
import Map from './Map';
import Sidebar from './Sidebar';

const SidebarLayout = () => {
    return (
        <StyledSidebarLayout>
            <Sidebar></Sidebar>
            <Map />
        </StyledSidebarLayout>
    );
};

const StyledSidebarLayout = styled.div`
    flex: 1 1;
`;

export default SidebarLayout;
