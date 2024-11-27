import {
    Map as KakaoMap,
    MapTypeControl,
    ZoomControl,
    CustomOverlayMap,
    MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { useRef, useCallback, useState, useEffect } from 'react';
import { debounce, map } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import LocationPopup from './Map/LocationPopup';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { MAP_CENTER_POSITION, MAP_ZOOM_LEVEL } from '../utils/constants';
import CustomMapMarker from './Map/CustomMapMarker';

export interface Position {
    lat: number;
    lng: number;
}

const Map = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const mapRef = useRef<kakao.maps.Map>(null);
    const [address, setAddress] = useState<string>('');
    const [zoom, setZoom] = useState<number>(MAP_ZOOM_LEVEL);
    const { data, isPending, isError, error } = useSiseWithReactQuery();

    // ref를 전역적으로 접근 가능하게 만들기
    useEffect(() => {
        if (mapRef.current) {
            (window as any).mapInstance = mapRef.current;
        }
    }, [mapRef.current]);

    // 좌표를 받아서 서치파람에 저장하고
    // 주소를 검색해서
    // 주소이름을 업데이트하고
    // URLSearchParams에 구코드를 저장합니다.
    const searchAddressFromCoordsAndSetRegion = useCallback(
        (position: Position) => {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(
                position.lng,
                position.lat,
                (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const address = result[0].address_name;
                        const code = result[0].code.toString().substring(0, 5);
                        setAddress(address);

                        const newSearchParams = new URLSearchParams(
                            searchParams,
                        );
                        newSearchParams.set('lat', position.lat.toString());
                        newSearchParams.set('lng', position.lng.toString());
                        newSearchParams.set('region', code);
                        setSearchParams(newSearchParams);
                    }
                },
            );
        },
        [searchParams, setSearchParams],
    );

    // searchParams 변경 시 region 코드 업데이트
    useEffect(() => {
        const latParam = searchParams.get('lat');
        const lngParam = searchParams.get('lng');

        if (latParam && lngParam) {
            const lat = parseFloat(latParam);
            const lng = parseFloat(lngParam);

            if (!isNaN(lat) && !isNaN(lng)) {
                searchAddressFromCoordsAndSetRegion({ lat, lng });
            }
        }
    }, [searchParams]);

    // 첫 로딩시 좌표가 있다면 그 좌표로 설정합니다.
    // 없다면 현재 위치를 가져와서 설정합니다.
    // 현재위치를 가져오는데 실패하면 기본 좌표로 설정합니다.
    useEffect(() => {
        if (searchParams.get('lat') && searchParams.get('lng')) {
            const lat = parseFloat(searchParams.get('lat')!);
            const lng = parseFloat(searchParams.get('lng')!);
            searchAddressFromCoordsAndSetRegion({ lat, lng });
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                searchAddressFromCoordsAndSetRegion(newPosition);
            },
            () => {
                searchAddressFromCoordsAndSetRegion(MAP_CENTER_POSITION);
            },
        );
    }, []);

    // 지도 드래그가 끝날 때 마다 중심좌표를 가져옵니다
    // 그 좌표를를 바탕으로 서치파람을 업데이트 합니다.
    const handleCenterChanged = useCallback(
        debounce(() => {
            const map = mapRef.current;
            if (!map) return;

            const center = map.getCenter();
            const newPosition = {
                lat: center.getLat(),
                lng: center.getLng(),
            };

            searchAddressFromCoordsAndSetRegion(newPosition);
        }, 200),
        [searchAddressFromCoordsAndSetRegion],
    );

    return (
        <>
            <KakaoMap
                id="map"
                center={{
                    lat: parseFloat(
                        searchParams.get('lat') ||
                            MAP_CENTER_POSITION.lat.toString(),
                    ),
                    lng: parseFloat(
                        searchParams.get('lng') ||
                            MAP_CENTER_POSITION.lng.toString(),
                    ),
                }}
                level={zoom}
                onZoomChanged={(target) => setZoom(target.getLevel())}
                keyboardShortcuts={true}
                onCenterChanged={handleCenterChanged}
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                }}
                ref={mapRef}
                aria-label="지도"
                role="application"
            >
                <MapTypeControl position={'TOPRIGHT'} />
                <ZoomControl position={'BOTTOMRIGHT'} />
                <MarkerClusterer
                    averageCenter={true}
                    minLevel={4}
                    disableClickZoom={false} // 클릭시 부드럽게 줌인되었으면 좋겠다.
                    calculator={[]} // 사이즈에 상관없이 모무 같은 스타일입니다.
                    styles={[
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(59, 130, 246, 0.9)',
                            border: '1px #3b82f6',
                            borderRadius: '50%',
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            // 인라인 스타일에서 호버속성은 사용할 수 없습니다 ㅠㅠ
                        },
                    ]}
                >
                    {data &&
                        zoom <= 7 &&
                        data.map((item) => {
                            return (
                                <CustomOverlayMap
                                    key={`${item.umdNum} ${item.jibun} ${item.mhouseNm}`}
                                    position={{ lat: item.y, lng: item.x }}
                                >
                                    <CustomMapMarker sise={item} />
                                </CustomOverlayMap>
                            );
                        })}
                </MarkerClusterer>

                <LocationPopup address={address} />
            </KakaoMap>
        </>
    );
};

export default Map;
