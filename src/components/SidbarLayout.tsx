import styled from 'styled-components';
import Map from './Map';
import Sidebar from './Sidebar';

const SidbarLayout = () => {
    return (
        <StyledSidbarLayout>
            <Sidebar></Sidebar>
            <Map />
        </StyledSidbarLayout>
    );
};

const StyledSidbarLayout = styled.div`
    flex: 1 1;
`;

export default SidbarLayout;
