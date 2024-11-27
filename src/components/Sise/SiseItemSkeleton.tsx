import styled from 'styled-components';

const SiseItemSkeleton = () => {
    return (
        <StyledSiseItemSkeleton>
            <div className="skeleton-image" />
            <div className="skeleton-content">
                <div className="skeleton-title" />
                <div className="skeleton-text" />
                <div className="skeleton-text" />
            </div>
        </StyledSiseItemSkeleton>
    );
};

const StyledSiseItemSkeleton = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    .skeleton-image {
        width: 100px;
        height: 100px;
        background-color: #e0e0e0;
        border-radius: 4px;
    }

    .skeleton-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .skeleton-title {
            width: 60%;
            height: 20px;
            background-color: #e0e0e0;
            border-radius: 4px;
        }

        .skeleton-text {
            width: 40%;
            height: 0.857rem;
            background-color: #e0e0e0;
            border-radius: 4px;
        }
    }
`;

export default SiseItemSkeleton;
