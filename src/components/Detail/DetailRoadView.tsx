import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Position } from './DetailList';
import ErrorBox from '../common/ErrorBox';

interface Props {
    position: Position;
}

const DetailRoadView = ({ position }: Props) => {
    const [hasRoadView, setHasRoadView] = useState(true);
    const roadviewContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!roadviewContainerRef.current) return;

        const roadview = new kakao.maps.Roadview(roadviewContainerRef.current);
        const roadviewClient = new kakao.maps.RoadviewClient();
        const kakaoPosition = new kakao.maps.LatLng(position.lat, position.lng);

        roadviewClient.getNearestPanoId(kakaoPosition, 50, (panoId) => {
            if (panoId === null) {
                setHasRoadView(false);
            } else {
                setHasRoadView(true);
                roadview.setPanoId(panoId, kakaoPosition);
            }
        });
    }, [position]);

    if (!hasRoadView) {
        return (
            <ErrorBox
                message="로드뷰가 제공되지 않는 지역입니다"
                height={200}
            />
        );
    }

    return (
        <DetailRoadViewStyle ref={roadviewContainerRef} className="roadview" />
    );
};
const DetailRoadViewStyle = styled.div`
    width: 100%;
    height: 200px;
`;

export default DetailRoadView;
