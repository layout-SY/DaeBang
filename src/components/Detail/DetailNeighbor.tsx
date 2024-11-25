import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import ErrorBox from '../common/ErrorBox';
import { Position } from '../Map';

interface Props {
    position: Position;
}

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
    { id: 'PM9', name: '약국', order: 2 }, // 주유소로 표기가 됨 ...
    { id: 'OL7', name: '주유소', order: 3 },
    { id: 'CE7', name: '카페', order: 4 },
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

const DetailNeighbor = ({ position }: Props) => {
    const [currCategory, setCurrCategory] = useState<CategoryCode>();
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
    const [placeInfo, setPlaceInfo] = useState<string>();

    const mapRef = useRef<HTMLDivElement>(null);
    const contentNodeRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<kakao.maps.Map>();
    const placeOverlay = useRef<kakao.maps.CustomOverlay>();
    const placesService = useRef<kakao.maps.services.Places>();
    const currentPosition = new kakao.maps.LatLng(position.lat, position.lng);
    const currentPositionMarker = new kakao.maps.Marker({
        position: currentPosition,
    });

    // 마커 제거 함수
    const removeMarker = () => {
        markers.forEach((marker) => marker.setMap(null));
        setMarkers([]);
    };

    // 장소 정보 표시 함수
    const displayPlaceInfo = (place: PlacesSearchResultItem) => {
        if (
            !contentNodeRef.current ||
            !placeOverlay.current ||
            !mapInstance.current
        )
            return;

        setPlaceInfo(place.place_name);
        placeOverlay.current.setPosition(
            new kakao.maps.LatLng(Number(place.y), Number(place.x)),
        );
        placeOverlay.current.setMap(mapInstance.current);
    };

    // 마커 생성 함수
    const addMarker = (position: kakao.maps.LatLng, order: number) => {
        if (!mapInstance.current) return;

        const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png';
        const imageSize = new kakao.maps.Size(27, 28);
        const imgOptions = {
            spriteSize: new kakao.maps.Size(72, 208),
            spriteOrigin: new kakao.maps.Point(46, order * 36),
            offset: new kakao.maps.Point(11, 28),
        };

        const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions,
        );
        const marker = new kakao.maps.Marker({
            position: position,
            image: markerImage,
        });

        marker.setMap(mapInstance.current);
        setMarkers((prev) => [...prev, marker]);
        return marker;
    };

    useEffect(() => {
        if (!mapRef.current) return;

        // 지도 초기화
        const mapOption = {
            center: new kakao.maps.LatLng(position.lat, position.lng),
            level: 5,
        };

        mapInstance.current = new kakao.maps.Map(mapRef.current, mapOption);
        placeOverlay.current = new kakao.maps.CustomOverlay({
            position: new kakao.maps.LatLng(position.lat, position.lng),
            zIndex: 1,
        });
        placesService.current = new kakao.maps.services.Places(
            mapInstance.current,
        );

        // 현재 건물 위치 표시
        currentPositionMarker.setMap(mapInstance.current);

        // 검색 콜백 함수
        const placesSearchCB = (data: PlacesSearchResult, status: Status) => {
            if (status === Status.OK) {
                const category = categories.find(
                    (cat) => cat.id === currCategory,
                );

                if (!category) return;

                removeMarker();
                data.forEach((place) => {
                    const marker = addMarker(
                        new kakao.maps.LatLng(Number(place.y), Number(place.x)),
                        category.order,
                    );

                    if (marker) {
                        kakao.maps.event.addListener(marker, 'click', () => {
                            displayPlaceInfo(place);
                        });
                    }
                });
            }
        };

        // 검색 실행 함수
        const searchPlaces = () => {
            if (!currCategory || !placesService.current) return;

            if (placeOverlay.current) {
                placeOverlay.current.setMap(null);
            }
            removeMarker();

            placesService.current.categorySearch(currCategory, placesSearchCB, {
                useMapBounds: true,
            });
        };

        // idle 이벤트 등록
        kakao.maps.event.addListener(mapInstance.current, 'idle', searchPlaces);

        return () => {
            removeMarker();
            if (mapInstance.current) {
                kakao.maps.event.removeListener(
                    mapInstance.current,
                    'idle',
                    searchPlaces,
                );
            }
        };
    }, [position]);

    // 카테고리 변경 시 검색 실행
    useEffect(() => {
        if (!placesService.current || !currCategory) return;

        placesService.current.categorySearch(
            currCategory,
            (data: PlacesSearchResult, status: Status) => {
                if (status === Status.OK) {
                    const category = categories.find(
                        (cat) => cat.id === currCategory,
                    );
                    if (!category) return;

                    removeMarker();
                    data.forEach((place) => {
                        const marker = addMarker(
                            new kakao.maps.LatLng(
                                Number(place.y),
                                Number(place.x),
                            ),
                            category.order,
                        );

                        if (marker) {
                            kakao.maps.event.addListener(
                                marker,
                                'click',
                                () => {
                                    displayPlaceInfo(place);
                                },
                            );
                        }
                    });
                }
            },
            {
                useMapBounds: true,
            },
        );
    }, [currCategory, position]);

    return (
        <DetailNeighborStyle>
            <h2>주변 시설</h2>
            {position.lat === -1 ? (
                <>
                    <ErrorBox
                        message="주변 정보 검색에 실패했습니다"
                        height={300}
                    />
                </>
            ) : (
                <>
                    <div ref={mapRef} className="map-container" />
                    <div
                        ref={contentNodeRef}
                        onMouseDown={(e) => e.preventDefault()}
                        onTouchStart={(e) => e.preventDefault()}
                        className="placeinfo_wrap"
                    >
                        <span className="placeInfo">{placeInfo}</span>
                    </div>
                </>
            )}

            <CategoryList>
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className={currCategory === category.id ? 'active' : ''}
                        onClick={() => setCurrCategory(category.id)}
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

    .map-container {
        width: 100%;
        height: 300px;
    }

    .placeinfo_wrap {
        position: absolute;
        bottom: 28px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 6px;
        background: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        border-radius: 4px;
    }

    .placeInfo {
        text-align: center;
        font-size: 12px;
        padding: 4px;
    }

    h2 {
        padding: 0 10px;
        padding-bottom: 10px;
    }
`;

interface CategoryItemProps {
    $active?: boolean;
}

const CategoryList = styled.ul<CategoryItemProps>`
     
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 8px;
        background: white;
        padding: 8px;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    

li{
    font-size: 14px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
    background: 'white';
    color: 'black';
    transition: all 0.2s;

    &:hover {
        background: ${(props) => (props.$active ? '#007AFF' : '#f0f0f0')};
    }

    &.active{
        background :  '#007AFF';
        color : 'white;
    }
`;

export default DetailNeighbor;
