import styled from 'styled-components';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Position } from '../Map';

interface DetailViewOnMapButtonProps {
    position: Position;
}

const DetailViewOnMapButton = ({ position }: DetailViewOnMapButtonProps) => {
    const handleCick = () => {
        console.log('지도에 위치를 표시합니다.', position);
    };
    return (
        <StyledDetailViewOnMapButton onClick={handleCick}>
            <FaMapMarkedAlt />
        </StyledDetailViewOnMapButton>
    );
};

const StyledDetailViewOnMapButton = styled.button`
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;

    svg {
        font-size: 1.25rem;
        fill: ${({ theme }) => theme.colors.neutralBackground};
    }

    &:hover {
        svg {
            fill: ${({ theme }) => theme.colors.primary};
        }
    }
`;

export default DetailViewOnMapButton;
