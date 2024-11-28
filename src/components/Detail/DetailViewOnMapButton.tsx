import styled from 'styled-components';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Position } from '../Map';

interface DetailViewOnMapButtonProps {
    position: Position;
}

const DetailViewOnMapButton = ({ position }: DetailViewOnMapButtonProps) => {
    const handleClick = () => {
        const mapInstance = (window as any).mapInstance;
        if (mapInstance) {
            mapInstance.pantoAndZoom(position.lat, position.lng);
        }
    };

    return (
        <StyledDetailViewOnMapButton
            onClick={handleClick}
            aria-label="지도에서 보기"
        >
            <FaMapMarkedAlt />
        </StyledDetailViewOnMapButton>
    );
};

const StyledDetailViewOnMapButton = styled.button`
    position: relative;
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
            fill: ${({ theme }) => theme.colors.blue};
        }
    }
`;

export default DetailViewOnMapButton;
