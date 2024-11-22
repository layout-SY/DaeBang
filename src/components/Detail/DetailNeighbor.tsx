import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Position } from './DetailList';

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
    { id: 'MT1', name: '마트', order: 1 },
    { id: 'PM9', name: '약국', order: 2 },
    { id: 'BK9', name: '은행', order: 3 }, // 주유소로 표기가 됨 ...
    { id: 'CE7', name: '카페', order: 4 },
    { id: 'CS2', name: '편의점', order: 5 },
    { id: 'SW8', name: '지하철', order: 6 },
];

interface PlacesSearchResultItem {
    /**
     * 장소 ID
     */
    id: string;

    /**
     * 장소명, 업체명
     */
    place_name: string;

    /**
     * 카테고리 이름
     * 예) 음식점 > 치킨
     */
    category_name: string;

    /**
     * 중요 카테고리만 그룹핑한 카테고리 그룹 코드
     * 예) FD6
     */
    category_group_code?: `${CategoryCode}` | `${Exclude<CategoryCode, ''>}`[];

    /**
     * 중요 카테고리만 그룹핑한 카테고리 그룹명
     * 예) 음식점
     */
    category_group_name: string;

    /**
     * 전화번호
     */
    phone: string;

    /**
     * 전체 지번 주소
     */
    address_name: string;

    /**
     * 전체 도로명 주소
     */
    road_address_name: string;

    /**
     * X 좌표값 혹은 longitude
     */
    x: string;

    /**
     * Y 좌표값 혹은 latitude
     */
    y: string;

    /**
     * 장소 상세페이지 URL
     */
    place_url: string;

    /**
     * 중심좌표까지의 거리(x,y 파라미터를 준 경우에만 존재). 단위 meter
     */
    distance: string;
}
type PlacesSearchResult = PlacesSearchResultItem[];

export enum Status {
    /**
     * 서버 응답에 문제가 있는 경우
     */
    ERROR = 'ERROR',

    /**
     * 검색 결과 있음
     */
    OK = 'OK',

    /**
     * 정상적으로 응답 받았으나 검색 결과는 없음
     */
    ZERO_RESULT = 'ZERO_RESULT',
}

const DetailNeighbor = ({ position }: Props) => {
    const [currCategory, setCurrCategory] = useState<CategoryCode>();
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
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

        const content = `
            <div class="placeinfo">
                <a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}">${place.place_name}</a>
                ${
                    place.road_address_name
                        ? `<span title="${place.road_address_name}">${place.road_address_name}</span>
                     <span class="jibun" title="${place.address_name}">(지번 : ${place.address_name})</span>`
                        : `<span title="${place.address_name}">${place.address_name}</span>`
                }
                <span class="tel">${place.phone}</span>
            </div>
            <div class="after"></div>
        `;

        contentNodeRef.current.innerHTML = content;
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
            <div ref={mapRef} className="map-container" />
            <div
                ref={contentNodeRef}
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                className="placeinfo_wrap"
            />
            <ul className="category-list">
                {categories.map((category) => (
                    <CategoryItem
                        key={category.id}
                        $active={currCategory === category.id}
                        onClick={() => setCurrCategory(category.id)}
                    >
                        {category.name}
                    </CategoryItem>
                ))}
            </ul>
        </DetailNeighborStyle>
    );
};

const DetailNeighborStyle = styled.div`
    width: 100%;
    overflow: hidden;

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
    }

    .category-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 8px;
        background: white;
        padding: 8px;
        border-radius: 6px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
        padding: 0 10px;
        padding-bottom: 10px;
    }

    .placeinfo_wrap {
        position: absolute;
        bottom: 28px;
        left: -150px;
        width: 300px;
    }
    .placeinfo {
        position: relative;
        width: 100%;
        border-radius: 6px;
        border: 1px solid #ccc;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        background: #fff;
    }
    .placeinfo:nth-of-type(n) {
        border: 0;
        box-shadow: 0px 1px 2px #888;
    }
    .placeinfo_wrap .after {
        content: '';
        position: relative;
        margin-left: -12px;
        left: 50%;
        width: 22px;
        height: 12px;
        background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
    }
    .placeinfo a,
    .placeinfo a:hover,
    .placeinfo a:active {
        color: #fff;
        text-decoration: none;
    }
    .placeinfo a,
    .placeinfo span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .placeinfo span {
        margin: 5px 5px 0 5px;
        cursor: default;
        font-size: 13px;
    }
    .placeinfo .title {
        font-weight: bold;
        font-size: 14px;
        border-radius: 6px 6px 0 0;
        margin: -1px -1px 0 -1px;
        padding: 10px;
        color: #fff;
        background: #d95050;
        background: #d95050
            url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
            no-repeat right 14px center;
    }
    .placeinfo .tel {
        color: #0f7833;
    }
    .placeinfo .jibun {
        color: #999;
        font-size: 11px;
        margin-top: 0;
    }
`;

interface CategoryItemProps {
    $active?: boolean;
}

const CategoryItem = styled.li<CategoryItemProps>`
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
    background: ${(props) => (props.$active ? '#007AFF' : 'transparent')};
    color: ${(props) => (props.$active ? 'white' : 'black')};
    transition: all 0.2s;

    &:hover {
        background: ${(props) => (props.$active ? '#007AFF' : '#f0f0f0')};
    }
`;

export default DetailNeighbor;
