import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: '0be8ca05ad0dd0c80da443e49e5f1488',
        libraries: ['clusterer', 'drawing', 'services'],
    });
}
