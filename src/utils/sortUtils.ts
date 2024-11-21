import { Sise } from '../models/Sise.model';

export const groupAndSortByDate = (
    data: Sise[],
): { key: string; items: Sise[] }[] => {
    const map = new Map<string, Sise[]>();

    // 데이터 그룹화
    data.forEach((item) => {
        const key = `${item.umdNm} ${item.jibun}`;
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(item);
    });

    // Map 객체를 배열로 변환 및 정렬
    return Array.from(map.entries()).map(([key, items]) => ({
        key,
        items: items.sort((a, b) => {
            const dateA = new Date(a.dealYear, a.dealMonth - 1, a.dealDay);
            const dateB = new Date(b.dealYear, b.dealMonth - 1, b.dealDay);
            return dateB.getTime() - dateA.getTime(); // 최신 날짜 우선
        }),
    }));
};
