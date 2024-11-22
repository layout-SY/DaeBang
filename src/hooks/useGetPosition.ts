import { useEffect, useState } from 'react';
import { Sise } from '../models/Sise.model';
import { Position } from '../components/Detail/DetailList';

export const useGetPosition = (house: Sise) => {
    const [position, setPosition] = useState<Position>({
        lat: 33.450701,
        lng: 126.570667,
    });
    const queryString = `${house.umdNm} ${house.jibun} ${house.mhouseNm}`;
    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://dapi.kakao.com/v2/local/search/address.JSON?analyze_type=exact&query=${queryString}`,
                {
                    headers: {
                        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
                    },
                },
            );
            const json = await response.json();
            setPosition({ lat: json.documents[0].y, lng: json.documents[0].x });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [house]);
    return { position };
};
