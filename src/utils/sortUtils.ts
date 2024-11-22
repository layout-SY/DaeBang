import { paginateByKeyResultProps, Sise } from '../models/Sise.model';

export const groupAndSortByDate = (
    data: Sise[],
): { key: string; items: Sise[] }[] => {
    const map = new Map<string, Sise[]>();

    // Map(key-value) 형태로 데이터 그룹화
    data.forEach((item) => {
        const key = `${item.umdNm} ${item.jibun}`;
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.push(item);
    });

    // 그룹화된 Map 데이터를 배열로 변환 후 최신 날짜 기준 정렬
    return Array.from(map.entries()).map(([key, items]) => ({
        key,
        items: items.sort((a, b) => {
            const dateA = new Date(a.dealYear, a.dealMonth - 1, a.dealDay);
            const dateB = new Date(b.dealYear, b.dealMonth - 1, b.dealDay);
            return dateB.getTime() - dateA.getTime(); // 최신 날짜 우선
        }),
    }));
};

export const paginateByKey = (
    groupedData: { key: string; items: Sise[] }[],
    itemCount: number,
): paginateByKeyResultProps[] => {
    const paginatedData = [];

    for (let i = 0; i < groupedData.length; i += itemCount) {
        paginatedData.push({
            index: i / itemCount + 1,
            data: groupedData.slice(i, i + itemCount),
        });
    }

    return paginatedData;
};
