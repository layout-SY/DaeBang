import logo from './logo.svg';
import './App.css';
import api from './axios';
import api2 from './axios2';
import api3 from './axios3';
import api4 from './axios4';
import { useEffect, useState } from 'react';

function App() {
	const [data, setData] = useState([]);

	const getData = async () => {
		try {
			const responseData = await api.get();
			setData(responseData.data.response.body.items.item);
			console.log(responseData);
		} catch (err) {
			console.log(err);
		}
	};

	const getData2 = async () => {
		try {
			const responseData = await api2.get();
			console.log(responseData);
		} catch (err) {
			console.log(err);
		}
	};

	const getData3 = async () => {
		try {
			const responseData = await api3.get();
			console.log(responseData);
		} catch (err) {
			console.log(err);
		}
	};
	const getData4 = async () => {
		try {
			const responseData = await api4.get();
			console.log(responseData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getData();
		// getData2();
		// getData3();
		getData4();
	}, []);

	return <div>{}</div>;
}

export default App;
