import axios from 'axios';

const api = axios.create({
	baseURL: `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`,
	headers: {
		Authorization: 'Bearer a312215838278d26f0a04d8b95573ac5',
	},
	params: {
		query: '거장아트빌',
	},
});

export default api;
