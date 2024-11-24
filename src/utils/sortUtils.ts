import {
    paginateByKeyResultProps,
    Sise,
    SiseOfBuilding,
    Contract,
} from '../models/Sise.model';

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

export const groupSiseByAddress = (data: Sise[]): SiseOfBuilding[] => {
    const buildingMap: { [key: string]: SiseOfBuilding } = {};

    data.forEach((item) => {
        const key = `${item.umdNm} ${item.jibun}`;
        if (!buildingMap[key]) {
            buildingMap[key] = {
                buildYear: item.buildYear,
                huseType: item.houseType,
                jibun: item.jibun,
                mhouseNm: item.mhouseNm,
                sggCd: item.sggCd,
                umdNum: item.umdNm,
                contracts: [],
            };
        }

        const contract: Contract = {
            contractTerm: item.contractTerm,
            contractType: item.contractType,
            dealDay: item.dealDay,
            dealMonth: item.dealMonth,
            dealYear: item.dealYear,
            deposit: item.deposit,
            excluUseAr: item.excluUseAr,
            floor: item.floor,
            monthlyRent: item.monthlyRent,
            preDeposit: item.preDeposit,
            preMonthyRent: item.preMonthyRent,
            useRRRight: item.useRRRight,
        };

        buildingMap[key].contracts.push(contract);
    });

    return Object.values(buildingMap);
};
