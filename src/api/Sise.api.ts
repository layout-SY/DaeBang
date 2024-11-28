import axios, { AxiosInstance } from 'axios';
import { SiseApiResponseAll } from '../models/Sise.model';
import {
    BaseSiseAPIResponse,
    OneTwoSise,
    OfficetelSise,
    AptSise,
} from '../models/Sise.model';

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

export const fetchSiseDataThatThrowsError = async <T>(
    url: string,
    params: ApiParams,
    signal?: AbortSignal,
): Promise<BaseSiseAPIResponse<T>> => {
    try {
        const response = await axios.get<BaseSiseAPIResponse<T>>(url, {
            params: {
                serviceKey:
                    'A20RCgS2wjkbDnuSQthB8HSa5fsL6y/q41joBu21NW7NA39fbaJ5sXigJU0DaNTPAy7sHo3do1Md+hpnc0lUWg==',
                ...params,
            },
            signal,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchOneTwoSiseData = (
    params: ApiParams,
    signal?: AbortSignal,
): Promise<BaseSiseAPIResponse<OneTwoSise>> => {
    return fetchSiseDataThatThrowsError<OneTwoSise>(
        'http://apis.data.go.kr/1613000/RTMSDataSvcRHRent/getRTMSDataSvcRHRent',
        params,
        signal,
    );
};

export const fetchOfficetelSiseData = (
    params: ApiParams,
    signal?: AbortSignal,
): Promise<BaseSiseAPIResponse<OfficetelSise>> => {
    return fetchSiseDataThatThrowsError<OfficetelSise>(
        'https://apis.data.go.kr/1613000/RTMSDataSvcOffiRent/getRTMSDataSvcOffiRent',
        params,
        signal,
    );
};

export const fetchAptSiseData = (
    params: ApiParams,
    signal?: AbortSignal,
): Promise<BaseSiseAPIResponse<AptSise>> => {
    return fetchSiseDataThatThrowsError<AptSise>(
        'http://apis.data.go.kr/1613000/RTMSDataSvcAptRent/getRTMSDataSvcAptRent',
        params,
        signal,
    );
};
