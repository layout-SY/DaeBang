import { fetchSiseData } from '../../api/Sise.api';
import { Sise, SiseApiResponseAll } from '../../models/Sise.model';
import { generatePastMonths } from '../../utils/dateUtils';

export const fetchSiseDataForPastMonths = async (
    lawdCd: number,
): Promise<Sise[]> => {
    const dealYmList = generatePastMonths(3); // 최근 24개월
    const requests = dealYmList.map((dealYmd) =>
        fetchSiseData({ LAWD_CD: lawdCd, DEAL_YMD: parseInt(dealYmd) }),
    );

    try {
        const responses = await Promise.all(requests);
        // 응답 데이터 병합
        const allData = responses.flatMap((data) => {
            const itemsResponse = data.response.body.items.item;
            console.log(itemsResponse);
            if (!itemsResponse) return []; // 데이터가 없는 경우 빈 배열 반환

            // 단일 객체일 경우 배열로 변환
            return Array.isArray(itemsResponse)
                ? itemsResponse
                : [itemsResponse];
        });

        return allData as Sise[];
    } catch (err) {
        console.error('Error fetching Sise data:', err);
        throw err;
    }
};
