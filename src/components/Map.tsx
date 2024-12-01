import {
    Map as KakaoMap,
    MapTypeControl,
    ZoomControl,
    CustomOverlayMap,
    MarkerClusterer,
} from 'react-kakao-maps-sdk';
import { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
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
    // const [zoom, setZoom] = useState<number>(MAP_ZOOM_LEVEL);
    const { data, isPending, isError, error } = useSiseWithReactQuery();

    // ref를 전역적으로 접근 가능하게 만들기
    useEffect(() => {
        if (mapRef.current) {
            (window as any).mapInstance = mapRef.current;

            const pantoAndZoom = (lat: number, lng: number) => {
                mapRef.current?.panTo(new kakao.maps.LatLng(lat, lng));
                setTimeout(() => {
                    mapRef.current?.setLevel(1);
                }, 500);
            };
            (window as any).mapInstance.pantoAndZoom = pantoAndZoom;
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
    const handleCenterChanged = useCallback(() => {
        const map = mapRef.current;
        if (!map) return;
        const center = map.getCenter();
        const newPosition = {
            lat: center.getLat(),
            lng: center.getLng(),
        };
        searchAddressFromCoordsAndSetRegion(newPosition);
    }, [searchAddressFromCoordsAndSetRegion]);

    const debouncedHandleCenterChanged = useMemo(
        () => debounce(handleCenterChanged, 200),
        [handleCenterChanged],
    );

    useEffect(() => {
        return () => {
            debouncedHandleCenterChanged.cancel();
        };
    }, [debouncedHandleCenterChanged]);
    /*
      debounce 함수를 매번 생성하지 않도록 메모이제이션을 시도하신 것 같습니다.
      하지만 위와 같은 코드는 원하시는 대로 메모이제이션이 동작하지 않습니다.
      useCallback은 함수 참조 자체를 메모이제이션 합니다. 하지만 debounce()는 고차함수로, 매번 새로운 함수를 생성하게 됩니다.
      그래서 매 렌더링마다 새로운 함수 참조를 받게되고 결과적으로 원하는 방향의 메모이제이션이 되지 않습니다.

      그렇기 때문에 위와 같이 debounce 함수는 useMemo로 메모이제이션 해야,
      매번 debounce()함수를 생성하지 않고 이전에 생성한 debounce를 사용할 것입니다.

      그리고 컨포넌트가 언마운트 시 대기 중이던 debounce를 해제하는 cleanup 함수도 넣어주시면 좋을 것 같습니다 :)
    */

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
                // level={zoom}
                // onZoomChanged={(target) => setZoom(target.getLevel())}
                keyboardShortcuts={true}
                onCenterChanged={debouncedHandleCenterChanged} // useMemo에 메모이제이션된 debounce 함수
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
                {!isPending && (
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
                            // zoom <= 7 &&
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
                )}

                <LocationPopup address={address} />
            </KakaoMap>
        </>
    );
};

export default Map;
