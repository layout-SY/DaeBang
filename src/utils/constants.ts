import { Position } from '../components/Map';

export const WIDTH = '350px';

// 사용자의 현재 위치를 가져오는데 실패했을 때의 기본 위치
export const MAP_CENTER_POSITION: Position = {
    lat: 37.49436732800421,
    lng: 127.01446798508894,
};

// 지도의 기본 줌 레벨
export const MAP_ZOOM_LEVEL = 5;
