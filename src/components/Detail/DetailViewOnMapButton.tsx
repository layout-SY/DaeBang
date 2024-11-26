import styled from 'styled-components';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { Position } from '../Map';
import { useSearchParams } from 'react-router-dom';

interface DetailViewOnMapButtonProps {
    position: Position;
}

const DetailViewOnMapButton = ({ position }: DetailViewOnMapButtonProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // 클릭시 지도에서 해당 위치를 보여줍니다.
    // 부드럽게 움직이기, 줌레벨 조정하기 등은 현재 구조에서는 불가능 하고,
    // 이는 리덕스를 도입하거나 다른 방법을 사용해야 합니다.
    const handleClick = () => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('lat', position.lat.toString());
        newSearchParams.set('lng', position.lng.toString());
        setSearchParams(newSearchParams);
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
