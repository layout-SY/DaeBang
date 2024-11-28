import { SiseListItemStyle } from '../SiseList/SiseListItem';
import { SiseOfBuildingWithXy } from '../../models/Sise.model';

interface Props {
    house: SiseOfBuildingWithXy;
    index: number;
    onClick: (house: SiseOfBuildingWithXy) => void;
}

const BookmarkItem = ({ house, index, onClick }: Props) => {
    return (
        <BookmarkItemStyle onClick={() => onClick(house)}>
            <img
                src={`/dummyImg/dummy_${index % 20}.jpeg`}
                alt={house.mhouseNm}
            />
            <div className="content">
                <h3>
                    {house.contracts[0].monthlyRent === 0
                        ? `전세 ${house.contracts[0].deposit}`
                        : `월세 ${house.contracts[0].deposit}/${house.contracts[0].monthlyRent}`}
                </h3>
                <span>{house.mhouseNm}</span>
                <span>{house.houseType}</span>
            </div>
        </BookmarkItemStyle>
    );
};
const BookmarkItemStyle = SiseListItemStyle;
export default BookmarkItem;
