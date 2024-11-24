import {
    Map as KakaoMap,
    MapTypeControl,
    ZoomControl,
    CustomOverlayMap,
} from 'react-kakao-maps-sdk';
import { useRef, useCallback, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import LocationPopup from './Map/LocationPopup';
import useSiseWithReactQuery from '../hooks/useSiseWithReactQuery';
import { MAP_CENTER_POSITION } from '../utils/constants';
import CustomMapMarker from './Map/CustomMapMarker';

export interface Position {
    lat: number;
    lng: number;
}

const Map = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const mapRef = useRef<kakao.maps.Map>(null);
    const [center, setCenter] = useState<Position>(MAP_CENTER_POSITION);
    const [address, setAddress] = useState<string>('');
    const [markers, setMarkers] = useState([]);
    const { data, isPending, isError, error } = useSiseWithReactQuery();
    console.log(data, isPending, isError, error);

    // 첫 로드시 중심좌표로 주소를 검색하여 구코드를 URLSearchParams에 추가합니다.
    useEffect(() => {
        searchAddressFromCoordsAndSetSearchParam(center);
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

    //TODO : 일정 zoom level부터 마커를 표시합니다.

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
                {data &&
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
                <LocationPopup address={address} />
            </KakaoMap>
        </>
    );
};

export default Map;
