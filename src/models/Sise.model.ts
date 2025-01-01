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

interface BaseSise {
    buildYear: number;
    contractTerm: string;
    contractType: string;
    dealDay: number;
    dealMonth: number;
    dealYear: number;
    deposit: string;
    excluUseAr: number;
    floor: number;
    jibun: number;
    monthlyRent: number;
    preDeposit: string;
    preMonthyRent: number;
    sggCd: number;
    umdNm: string;
    useRRRight: string;
}

export type SiseCategory = 'onetwo' | 'officetel' | 'apt';

export interface OneTwoSise extends BaseSise {
    houseType: string;
    mhouseNm: string;
}

export interface AptSise extends BaseSise {
    aptNm: string;
}

export interface OfficetelSise extends BaseSise {
    offiNm: string;
}

export type AnySise = OneTwoSise | AptSise | OfficetelSise;

export interface BaseSiseAPIResponse<T> {
    response: {
        body: {
            items: {
                item: T[] | T; // 배열이거나 단일 객체일 수 있음
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

export interface paginateByKeyResultProps {
    key: string;
    items: Sise[];
}

export interface SiseOfBuilding {
    buildYear: number;
    houseType: string;
    jibun: number;
    mhouseNm: string;
    sggCd: number;
    umdNum: string;
    contracts: Contract[];
}

// 같은 지번이라도 면적이 다를 수 있어서 빼봤습니다.
export interface Contract {
    contractTerm: string;
    contractType: string;
    dealDay: number;
    dealMonth: number;
    dealYear: number;
    deposit: string;
    excluUseAr: number;
    floor: number;
    monthlyRent: number;
    preDeposit: string;
    preMonthyRent: number;
    useRRRight: string;
}

export interface SiseOfBuildingWithXy extends SiseOfBuilding {
    x: number;
    y: number;
}

export interface GroupedSiseDataWithAverage {
    key: string; // 동 이름 + 평균 월세/전세
    averageMonthlyRent: number;
    averageDeposit: number;
    SiseData: SiseOfBuildingWithXy[];
}

export interface OpenAPI_ServiceResponse {
    cmmMsgHeader: {
        errMsg: string;
        returnAuthMsg: string;
        returnReasonCode: string;
    };
}
