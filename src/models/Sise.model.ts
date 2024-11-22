export interface SiseApiResponseAll {
    response: {
        body: {
            items: {
                item: Sise[] | Sise; // 배열이거나 단일 객체일 수 있음
            };
            numOfRows: number;
            pageNo: number;
            totalCount: number;
        };
        header: {
            resultCode: string;
            resultMsg: string;
        };
    };
}

export interface Sise {
    buildYear: number;
    contractTerm: string;
    contractType: string;
    dealDay: number;
    dealMonth: number;
    dealYear: number;
    deposit: string;
    excluUseAr: number;
    floor: number;
    houseType: string;
    jibun: number;
    mhouseNm: string;
    monthlyRent: number;
    preDeposit: string;
    preMonthyRent: number;
    sggCd: number;
    umdNm: string;
    useRRRight: string;
}

export interface paginateByKeyResultProps {
    index: number;
    data: { key: string; items: Sise[] }[];
}
