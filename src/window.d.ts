interface Window {
    mapInstance: kakao.maps.Map & {
        pantoAndZoom: (lat: number, lng: number) => void;
    };
}
