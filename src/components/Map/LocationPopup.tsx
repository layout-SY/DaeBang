import styled from 'styled-components';

interface LocationPopupProps {
    address: string;
}

// TODO: 이 팝업을 클릭 했을 때, 무슨 액션이 있으면 좋을까요.
const LocationPopup = ({ address }: LocationPopupProps) => {
    return (
        <StyledLocationPopup>
            <span>{address}</span>
        </StyledLocationPopup>
    );
};

const StyledLocationPopup = styled.div`
    display: flex;
    position: absolute;
    bottom: 50px;
    left: 50%;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;

    background-color: #3b82f6;
    color: white;
    z-index: 60;
`;

export default LocationPopup;
