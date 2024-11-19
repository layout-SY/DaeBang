import axios, { AxiosInstance } from 'axios';

interface ApiParams {
    LAWD_CD: number;
    DEAL_YMD: number;
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
