import { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import ErrorBox from '../Common/ErrorBox';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useTypedSelector } from '../../hooks/redux';

type CategoryCode =
    | ''
    | 'MT1'
    | 'CS2'
    | 'PS3'
    | 'SC4'
    | 'AC5'
    | 'PK6'
    | 'OL7'
    | 'SW8'
    | 'BK9'
    | 'CT1'
    | 'AG2'
    | 'PO3'
    | 'AT4'
    | 'AD5'
    | 'FD6'
    | 'CE7'
    | 'HP8'
    | 'PM9';

interface Category {
    id: CategoryCode;
    name: string;
    order: number;
}

// 은행을 눌렀는 데 자꾸 주유소가 표시가 됨
const categories: Category[] = [
    { id: 'BK9', name: '은행', order: 0 },
    { id: 'MT1', name: '마트', order: 1 },
    { id: 'PM9', name: '약국', order: 2 },
    { id: 'SW8', name: '지하철', order: 3 },
    { id: 'PO3', name: '관공서', order: 4 },
    { id: 'CS2', name: '편의점', order: 5 },
];

interface PlacesSearchResultItem {
    id: string;
    place_name: string;
    category_name: string;
    category_group_code?: `${CategoryCode}` | `${Exclude<CategoryCode, ''>}`[];
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    x: string;
    y: string;
    place_url: string;
    distance: string;
}

type PlacesSearchResult = PlacesSearchResultItem[];

export enum Status {
    ERROR = 'ERROR',
    OK = 'OK',
    ZERO_RESULT = 'ZERO_RESULT',
}

const DetailNeighbor = () => {
    const { detailInfo } = useTypedSelector((state) => state.detail);
    const position = { lat: detailInfo!.y, lng: detailInfo!.x };
    const [currCategory, setCurrCategory] = useState<CategoryCode>('BK9');
    const [data, setData] = useState<PlacesSearchResult>([]);
    const [order, setOrder] = useState<number>(0);
    const [infoOpen, setInfoOpen] = useState<string>('');

    useEffect(() => {
        const ps = new kakao.maps.services.Places();

        const placesSearchCB = (data: PlacesSearchResult, status: Status) => {
            if (status === Status.OK) {
                setData(data);
            } else {
                setData([]);
            }
        };

        ps.categorySearch(currCategory, placesSearchCB, {
            location: new kakao.maps.LatLng(position.lat, position.lng),
            useMapBounds: true,
        });
    }, [currCategory]);

    const markerImageSrc = '/places_category.png';
    const imageSize = { width: 27, height: 28 };
    const spriteSize = { width: 72, height: 208 };
    const offset = { x: 11, y: 28 };

    const clickCategory = (cat: Category) => {
        setCurrCategory(cat.id);
        setOrder(cat.order);
    };

    const clickMarker = (id: string) => {
        if (infoOpen === id) {
            setInfoOpen('');
        } else {
            setInfoOpen(id);
        }
    };

    return (
        <DetailNeighborStyle>
            <h2>주변 시설</h2>
            {!data ? (
                <>
                    <ErrorBox
                        message="주변 정보 검색에 실패했습니다"
                        height={300}
                    />
                </>
            ) : (
                <>
                    <Map
                        center={position}
                        style={{ width: '100%', height: '300px' }}
                        level={4}
                        zoomable={false}
                    >
                        <MapMarker position={position} />
                        {data.map((item) => (
                            <Fragment key={item.id}>
                                <MapMarker
                                    onClick={() => clickMarker(item.id)}
                                    position={{
                                        lat: parseFloat(item.y),
                                        lng: parseFloat(item.x),
                                    }}
                                    image={{
                                        src: markerImageSrc,
                                        size: imageSize,
                                        options: {
                                            spriteSize,
                                            spriteOrigin: {
                                                x: 46,
                                                y: order * 36,
                                            },
                                            offset,
                                        },
                                    }}
                                ></MapMarker>
                                <CustomOverlayMap
                                    position={{
                                        lat: parseFloat(item.y),
                                        lng: parseFloat(item.x),
                                    }}
                                    yAnchor={1}
                                    xAnchor={0.5}
                                >
                                    {infoOpen === item.id ? (
                                        <div className="info">
                                            <span>{item.place_name} </span>
                                            <br />
                                            <span>{item.distance} m </span>
                                        </div>
                                    ) : null}
                                </CustomOverlayMap>
                            </Fragment>
                        ))}
                    </Map>
                </>
            )}

            <CategoryList>
                {categories.map((category) => (
                    <li
                        data-order={category.order}
                        key={category.id}
                        className={currCategory === category.id ? 'active' : ''}
                        onClick={() => clickCategory(category)}
                    >
                        {category.name}
                    </li>
                ))}
            </CategoryList>
        </DetailNeighborStyle>
    );
};

const DetailNeighborStyle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h2 {
        padding: 0 10px;
        padding-bottom: 10px;
    }

    .info {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        font-size: 12px;
        width: fit-content;
        text-align: center;
        padding: 2px 4px;
        font-weight: 700;
        border-radius: 4px;
        z-index: 2000;
    }
`;

interface CategoryItemProps {
    $active?: boolean;
}

const CategoryList = styled.ul<CategoryItemProps>`
    list-style: none;
    margin: 0;
    display: flex;
    gap: 8px;
    background: white;
    padding: 8px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    li {
        font-size: 12px;
        padding: 4px 8px;
        cursor: pointer;
        border-radius: 4px;
        background: white;
        transition: all 0.2s;

        &:hover {
            background: ${({ $active, theme }) =>
                $active ? `${theme.colors.blue}` : `${theme.colors.gray}`};
        }

        &.active {
            background: ${({ theme }) => theme.colors.blue};
            color: white;
        }
    }
`;

export default DetailNeighbor;
