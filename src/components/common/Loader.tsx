import styled, { keyframes } from 'styled-components';

const Loader = () => {
    return (
        <StyledLoader>
            <Dot $delay="0s" />
            <Dot $delay="0.1s" />
            <Dot $delay="0.2s" />
        </StyledLoader>
    );
};

const bounce = keyframes`
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
`;

const StyledLoader = styled.div`
    height: 100%;
    margin: auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
`;

interface DotProps {
    $delay: string;
}

const Dot = styled.div<DotProps>`
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out;
    animation-delay: ${({ $delay }) => $delay};
`;

export default Loader;
