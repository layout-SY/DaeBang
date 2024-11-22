import {
    Map as KakaoMap,
    MapTypeControl,
    ZoomControl,
    MapMarker,
} from 'react-kakao-maps-sdk';
import useKakaoLoader from '../hooks/useKaKaoLoader';
import { useRef, useCallback, useState } from 'react';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import LocationPopup from './Map/LocationPopup';

interface Position {
    lat: number;
    lng: number;
}

const Map = () => {
    useKakaoLoader();

    const [searchParams, setSearchParams] = useSearchParams();
    const mapRef = useRef<kakao.maps.Map>(null);
    const [center, setCenter] = useState<Position>({
        lat: 33.450701,
        lng: 126.570667,
    });
    const [address, setAddress] = useState<string>('');

    const [markers, setMarkers] = useState([
        { lat: 33.450701, lng: 126.570667 },
    ]);

    // 지도 드래그가 끝날 때 마다 중심좌표를 가져오고 주소를 검색합니다.
    // 검색된 주소의 법정동 코드 앞 5자리(구코드)를 URLSearchParams에 추가합니다.
    // TODO: 후에 custom hook으로 분리할 수도 있음.
    const handleCenterChanged = useCallback(
        debounce(() => {
            const map = mapRef.current;
            if (map) {
                const center = map.getCenter();
                console.log(
                    `위도: ${center.getLat()}, 경도: ${center.getLng()}`,
                );

                searchAddrFromCoords(
                    { lat: center.getLat(), lng: center.getLng() },
                    (result, status) => {
                        if (status === kakao.maps.services.Status.OK) {
                            setAddress(result[0].address_name);
                            const code = result[0].code
                                .toString()
                                .substring(0, 5);
                            const newSearchParams = new URLSearchParams(
                                searchParams,
                            );

                            newSearchParams.set('region', code);
                            setSearchParams(newSearchParams);
                        } else {
                            console.log('주소 정보를 가져오지 못했습니다.');
                        }
                    },
                );
            }
        }, 200),
        [searchParams, setSearchParams],
    );

    // 좌표로 행정동 주소 정보를 요청합니다.
    // TODO : any 타입 대신 명확한 타입을 정의.
    const searchAddrFromCoords = (
        position: Position,
        callback: (result: any, status: any) => void,
    ) => {
        // 좌표로 행정동 주소 정보를 요청합니다
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2RegionCode(position.lng, position.lat, callback);
    };

    //TODO : 마커정보를 받아와 동적으로 마커를 표시합니다.
    //TODO : 마커를 클릭시 해당 마커의 정보를 표시합니다.
    //TODO : 마커정보는 상태로 관리하지만 Props로 받아올 수도 있습니다.

    return (
        <>
            <KakaoMap
                id="map"
                center={center}
                level={3}
                keyboardShortcuts={true}
                onCenterChanged={handleCenterChanged}
                // TODO : 임시 스타일링 입니다. 후에 width, height 100%로 변경해주세요.
                style={{
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
