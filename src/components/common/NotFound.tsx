import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <StyledNotFound>
            <h2>404</h2>
            <p>해당 페이지를 찾을 수 없습니다.</p>
            <Link to="/">홈으로 바로가기</Link>
        </StyledNotFound>
    );
};

const StyledNotFound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    h2 {
        text-align: center;
        font-size: 6rem;
        color: ${({ theme }) => theme.colors.blue};
    }

    p {
        text-align: center;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.text};
    }

    a {
        margin-top: 20px;
        padding: 10px 20px;
        color: ${({ theme }) => theme.colors.blue};
        text-decoration: none;
        font-size: 1rem;

        &:hover {
            text-decoration: underline;
        }
    }
`;

export default NotFound;
