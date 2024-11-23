import {
    Map as KakaoMap,
    MapTypeControl,
    ZoomControl,
    MapMarker,
} from 'react-kakao-maps-sdk';
// import useKakaoLoader from '../hooks/useKaKaoLoader';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useRef, useCallback, useState, useEffect } from 'react';
import { debounce, set } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import LocationPopup from './Map/LocationPopup';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';

interface Position {
    lat: number;
    lng: number;
}

const Map = () => {
    // 해당 hook를 사용이후 전역에 설치가 되고 이후 재호출(동일한 옵션)이 일어나더라도 재설치 되거나, 제거되지 않습니다.
    useKakaoLoader({
        appkey: '0be8ca05ad0dd0c80da443e49e5f1488',
        libraries: ['clusterer', 'drawing', 'services'],
    });

    const [searchParams, setSearchParams] = useSearchParams();
    const mapRef = useRef<kakao.maps.Map>(null);
    const [center, setCenter] = useState<Position>({
        lat: 37.5642135,
        lng: 127.0016985,
    });
    const [address, setAddress] = useState<string>('');
    const [markers, setMarkers] = useState([
        { lat: 33.450701, lng: 126.570667 },
    ]);
    const { data, isPending, isError, error } = useSiseWithReactQuery();
    console.log(data, isPending, isError, error);

    // 기존에는 첫 진입시 서치파람이 없는 문제가 있었는데, 일단은 하드코딩해서 해결했습니다.
    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (!newSearchParams.has('region')) {
            newSearchParams.set('region', '11140');
            setSearchParams(newSearchParams);
        }
        if (!address) {
            setAddress('서울특별시 중구 ');
        }
    }, []);

    // 지도 드래그가 끝날 때 마다 중심좌표를 가져오고 주소를 검색합니다.
    // 검색된 주소의 법정동 코드 앞 5자리(구코드)를 URLSearchParams에 추가합니다.
    // TODO: 후에 custom hook으로 분리할 수도 있음.
    const handleCenterChanged = useCallback(
        debounce(() => {
            const map = mapRef.current;
            if (!map) return;
            const center = map.getCenter();
            setCenter({ lat: center.getLat(), lng: center.getLng() });
            searchAddressFromCoordsAndSetSearchParam({
                lat: center.getLat(),
                lng: center.getLng(),
            });
        }, 200),
        [searchParams, setSearchParams],
    );

    const searchAddressFromCoordsAndSetSearchParam = (position: Position) => {
        // 좌표로 행정동 주소 정보를 요청합니다
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(
            position.lng,
            position.lat,
            (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    const address = result[0].address_name;
                    const code = result[0].code.toString().substring(0, 5);
                    setAddress(address);
                    const newSearchParams = new URLSearchParams(searchParams);
                    newSearchParams.set('region', code);
                    setSearchParams(newSearchParams);
                }
            },
        );
    };

    //TODO : 마커정보를 받아와 동적으로 마커를 표시합니다.
    //TODO : 마커를 클릭시 해당 마커의 정보를 표시합니다.
    //TODO : 마커정보는 상태로 관리하지만 Props로 받아올 수도 있습니다.

    return (
        <>
            <KakaoMap
                id="map"
                center={center}
                level={7}
                keyboardShortcuts={true}
                onCenterChanged={handleCenterChanged}
                // TODO : 임시 스타일링 입니다. 후에 width, height 100%로 변경해주세요.
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
                {markers.map((marker, index) => (
                    <MapMarker
                        key={index}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            console.log('마커 클릭됨');
                        }}
                    />
                ))}

                <LocationPopup address={address} />
            </KakaoMap>
        </>
    );
};

export default Map;
