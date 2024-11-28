import { FaSadCry } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
    width?: number;
    height?: number;
    message: string;
}
const ErrorBox = ({ height, message, width }: Props) => {
    return (
        <ErrorBoxStyle height={height} width={width}>
            <FaSadCry />
            <span>{message}</span>
        </ErrorBoxStyle>
    );
};

interface ErrorBoxStyleProps {
    height?: number;
    width?: number;
}
const ErrorBoxStyle = styled.div<ErrorBoxStyleProps>`
    width: 100%;
    height: ${({ height }) => (height ? `${height}px` : '100%')};
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    background: ${({ theme }) => theme.colors.border};

    span {
        text-align: center;
    }
`;
export default ErrorBox;
