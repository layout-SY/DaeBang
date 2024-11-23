import axios, { AxiosInstance } from 'axios';
import { SiseApiResponseAll } from '../models/Sise.model';

interface ApiParams {
    LAWD_CD: number;
    DEAL_YMD: number;
    pageNo: number;
    numOfRows: number;
}

export const SiseApi = (params: ApiParams): AxiosInstance => {
    return axios.create({
        baseURL:
            'http://apis.data.go.kr/1613000/RTMSDataSvcRHRent/getRTMSDataSvcRHRent',
        params: {
            serviceKey: process.env.REACT_APP_Sise_API_KEY,

            ...params,
        },
    });
};

export const fetchSiseData = async (
    params: ApiParams,
): Promise<SiseApiResponseAll> => {
    const api = SiseApi(params);
    const response = await api.get<SiseApiResponseAll>('');
    return response.data;
};

export const fetchSiseDataThatThrowsError = async (
    params: ApiParams,
): Promise<SiseApiResponseAll> => {
    try {
        const response = await axios.get<SiseApiResponseAll>(
            'http://apis.data.go.kr/1613000/RTMSDataSvcRHRent/getRTMSDataSvcRHRent',
            {
                params: {
                    serviceKey: process.env.REACT_APP_Sise_API_KEY,
                    ...params,
                },
            },
        );

        if (response.data.response.header.resultCode !== '000') {
            switch (response.data.response.header.resultCode) {
                case '01':
                    throw new Error(
                        '[Application Error] 제공기관 서비스 제공 상태가 원활하지 않습니다.',
                    );
                case '02':
                    throw new Error(
                        '[DB Error] 제공기관 DB 서비스 제공 상태가 원활하지 않습니다.',
                    );
                case '03':
                    throw new Error('[No Data] 데이터 없음 에러');
                case '04':
                    throw new Error(
                        '[HTTP Error] 제공기관 서비스 제공 상태가 원활하지 않습니다.',
                    );
                case '05':
                    throw new Error(
                        '[service time out] 제공기관 서비스 제공 상태가 원활하지 않습니다.',
                    );
                case '10':
                    throw new Error(
                        '[잘못된 요청 파라미터 에러] OpenApi 요청시 ServiceKey 파라미터가 없음',
                    );
                case '11':
                    throw new Error(
                        '[필수 요청 파라미터가 없음]요청하신 OpenApi의 필수 파라미터가 누락되었습니다.',
                    );
                case '12':
                    throw new Error(
                        '[해당 오픈 API 서비스가 없거나 폐기됨] OpenApi 호출시 URL이 잘못됨.',
                    );
                case '20':
                    throw new Error(
                        '[서비스 접근 거부] 활용승인이 되지 않은 OpenApi 호출',
                    );
                case '22':
                    throw new Error(
                        '[서비스 요청 제한 횟수 초과 에러] 일일 활용건수가 초과함',
                    );

                case '30':
                    throw new Error(
                        '[등록되지 않은 서비스키] 잘못된 서비스키를 사용하였거나 서비스키를 URL 인코딩하지 않음',
                    );
                case '31':
                    throw new Error(
                        '[기한만료된 서비스키] OpenApi 사용기간이 만료됨',
                    );
                case '32':
                    throw new Error(
                        '[등록되지 않은 도메인명 또는 IP 주소] 활용신청한 서버의 IP와 실제 OpenAPI호출한 서버가 다를 경우',
                    );
                default:
                    throw new Error('알 수 없는 에러');
            }
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
