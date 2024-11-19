import axios from 'axios';

const api = axios.create({
	baseURL: 'https://openapi.gg.go.kr/Coaltnmlpxhoulesrent?',
	params: {
		Type: 'json',
		KEY: '9f6c537d67854989a4756ec7da7c6e61',
	},
});

export default api;
