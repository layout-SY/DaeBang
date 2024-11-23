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
    position: relative;
    bottom: 50px;
    width: 300px;
    display: flex;
    margin: 0 auto;
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #3b82f6;
    color: white;
    z-index: 60;
`;

export default LocationPopup;
