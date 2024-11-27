import styled from 'styled-components';

const NotFound = () => {
    return (
        <StyledNotFound>
            <Title>404</Title>
            <Message>해당 페이지를 찾을 수 없습니다.</Message>
        </StyledNotFound>
    );
};

const StyledNotFound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 6rem;
    color: #3b82f6;
`;

const Message = styled.p`
    text-align: center;
    font-size: 1.5rem;
    color: #333;
`;

export default NotFound;
