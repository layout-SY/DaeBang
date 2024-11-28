import styled from 'styled-components';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';
import { formatPrice } from '../../utils/format';

interface Props {
    house: SiseOfBuildingWithXy;
    index: number;
    onClick: (house: SiseOfBuildingWithXy) => void;
}

const SiseListItem = ({ house, index, onClick }: Props) => {
    return (
        <SiseListItemStyle onClick={() => onClick(house)}>
            <img
                src={`/dummyImg/dummy_${index % 20}.jpeg`}
                alt={house.mhouseNm}
                width={100}
                height={100}
            />
            <div className="content">
                <h3>
                    {house.contracts[0].monthlyRent === 0
                        ? `전세 ${formatPrice(house.contracts[0].deposit)}`
                        : `월세 ${formatPrice(house.contracts[0].deposit)}/${formatPrice(house.contracts[0].monthlyRent)}`}
                </h3>
                <span>{house.mhouseNm}</span>
                <span>{house.houseType}</span>
            </div>
        </SiseListItemStyle>
    );
};

export const SiseListItemStyle = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    &:hover {
        background: ${({ theme }) => theme.colors.hover};
    }

    img {
        width: 100px;
        height: 100px;
    }

    .content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.text};

        h3 {
            margin: 0;
        }
        span {
            font-size: 0.875rem;
        }
    }
`;

export default SiseListItem;
