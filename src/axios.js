import axios from 'axios';

const api = axios.create({
	baseURL: 'http://apis.data.go.kr/1613000/RTMSDataSvcRHRent/getRTMSDataSvcRHRent',
	params: {
		LAWD_CD: 11110,
		DEAL_YMD: 202408,
		serviceKey: 'l+S2yIYFVqM4CiiVEfmlyaGd7wmWk3KOnhtCVast8Ocwlfz1oymc5OEqNnurYI8g2+lWNCbS7Ii2ht6UTWpPOw==',
	},
});

export default api;
