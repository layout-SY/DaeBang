import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ErrorBox from '../common/ErrorBox';
import { useTypedSelector } from '../../hooks/redux';

const DetailRoadView = () => {
    const { detailInfo } = useTypedSelector((state) => state.detail);
    const [hasRoadView, setHasRoadView] = useState(true);
    const roadviewContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!roadviewContainerRef.current || !detailInfo) return;

        const roadview = new kakao.maps.Roadview(roadviewContainerRef.current);
        const roadviewClient = new kakao.maps.RoadviewClient();
        const kakaoPosition = new kakao.maps.LatLng(detailInfo.y, detailInfo.x);

        roadviewClient.getNearestPanoId(kakaoPosition, 50, (panoId) => {
            if (panoId === null) {
                setHasRoadView(false);
            } else {
                setHasRoadView(true);
                roadview.setPanoId(panoId, kakaoPosition);

                const marker = new kakao.maps.Marker({
                    position: kakaoPosition,
                    map: roadview, // 로드뷰에 마커를 추가
                });

                // 정보창 생성 및 마커에 연결
                const infoWindow = new kakao.maps.InfoWindow({
                    content: `<div style="padding:5px;"><span>${detailInfo.mhouseNm}</span></div>`,
                });
                infoWindow.open(roadview, marker);
            }
        });
    }, [detailInfo, roadviewContainerRef]);

    if (!hasRoadView) {
        return (
            <ErrorBox
                message="로드뷰가 제공되지 않는 지역입니다"
                height={200}
            />
        );
    }

    return <DetailRoadViewStyle ref={roadviewContainerRef} />;
};

const DetailRoadViewStyle = styled.div`
    width: 100%;
    height: 200px;
`;

export default DetailRoadView;
