import styled from 'styled-components';
import CategoryBar from './CategoryBar';
import Loader from './Common/Loader';
import Sidebar from './Sidebar';

const LoadingLayout = () => {
    return (
        <StyledLoadingLayout>
            <CategoryBar />
            <main className="sidebar-layout">
                <Sidebar>
                    <Loader />
                </Sidebar>
                <Loader />
            </main>
        </StyledLoadingLayout>
    );
};

const StyledLoadingLayout = styled.div`
    display: flex;
    height: 100%;

    .sidebar-layout {
        flex: 1 1;
    }
`;

export default LoadingLayout;
