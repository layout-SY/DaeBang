import { FiltersState } from '../store/slice/filterSlice';
import {
    paginateByKeyResultProps,
    Sise,
    SiseOfBuilding,
    Contract,
    GroupedSiseDataWithAverage,
    SiseOfBuildingWithXy,
    OneTwoSise,
    OfficetelSise,
    AptSise,
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

// export const paginateByKey = (
//     groupedData: { key: string; items: Sise[] }[],
//     itemCount: number,
// ): paginateByKeyResultProps[] => {
//     const paginatedData = [];

//     for (let i = 0; i < groupedData.length; i += itemCount) {
//         paginatedData.push({
//             index: i / itemCount + 1,
//             data: groupedData.slice(i, i + itemCount),
//         });
//     }

//     return paginatedData;
// };

export const groupSiseByAddress = (
    data: (OneTwoSise | OfficetelSise | AptSise)[],
): SiseOfBuilding[] => {
    const buildingMap: { [key: string]: SiseOfBuilding } = {};

    data.forEach((item) => {
        const key = `${item.umdNm} ${item.jibun}`;
        const buildingName =
            'mhouseNm' in item
                ? item.mhouseNm
                : 'aptNm' in item
                  ? item.aptNm
                  : 'offiNm' in item
                    ? item.offiNm
                    : '';

        if (!buildingMap[key]) {
            buildingMap[key] = {
                buildYear: item.buildYear,
                houseType: 'houseType' in item ? item.houseType : '',
                jibun: item.jibun,
                mhouseNm: buildingName,
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

export const groupSiseByUmdnumWithAverages = (
    data: SiseOfBuildingWithXy[] | undefined,
): GroupedSiseDataWithAverage[] => {
    const buildingMap: { [key: string]: SiseOfBuildingWithXy[] } = {};

    // 동별로 데이터를 그룹화
    data?.forEach((item) => {
        const key = item.umdNum; // umdNum을 기준으로 그룹화
        if (!buildingMap[key]) {
            buildingMap[key] = [];
        }
        buildingMap[key].push(item);
    });

    // 그룹화된 데이터를 기반으로 평균 월세와 전세 계산
    const groupedData: GroupedSiseDataWithAverage[] = Object.entries(
        buildingMap,
    ).map(([umdNum, SiseData]) => {
        let totalMonthlyRent = 0;
        let totalDeposit = 0;
        let totalContracts = 0;

        // 모든 contracts를 순회하며 평균값 계산
        SiseData.forEach((building) => {
            building.contracts.forEach((contract) => {
                totalMonthlyRent += contract.monthlyRent;

                // deposit이 문자열인지 확인 후 콤마 제거
                const depositValue =
                    typeof contract.deposit === 'string'
                        ? parseInt(contract.deposit.replace(/,/g, ''), 10)
                        : contract.deposit || 0;

                totalDeposit += depositValue;
                totalContracts += 1;
            });
        });

        const averageMonthlyRent =
            totalContracts > 0 ? totalMonthlyRent / totalContracts : 0;
        const averageDeposit =
            totalContracts > 0 ? totalDeposit / totalContracts : 0;

        return {
            key: `${umdNum}`, // 그룹의 이름
            averageMonthlyRent,
            averageDeposit,
            SiseData, // 원본 데이터 포함
        };
    });

    return groupedData;
};
