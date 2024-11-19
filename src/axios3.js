import axios from 'axios';

const api = axios.create({
	baseURL: 'https://www.reb.or.kr/r-one/openapi/SttsApiTblItm.do',
	params: {
		Type: 'json',
		KEY: 'e7599233309b44a6a9e4d617a5987df4',
		pIndex: '1',
		pSize: '100',
	},
});

export default api;
