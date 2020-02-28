import instance from './axios';
import fetchJsonp from 'fetch-jsonp';
import config from '@/config';

export function AppPost(url, data) {
	return new Promise((resolve, reject) => {
		instance
			.post(url, data)
			.then(res => {
				if (res.data.success) {
					resolve(res.data.data);
				} else {
					reject(res.data.message);
				}
			})
			.catch(err => {
				reject(err);
			});
	});
}

export function AppGet(url, data) {
	return new Promise((resolve, reject) => {
		instance
			.get(url, {
				params: {
					...data,
				},
			})
			.then(res => {
				resolve(res.data.data);
			})
			.catch(err => {
				reject(err);
			});
	});
}

export function AppFetchJsonp(url) {
	return new Promise((resolve, reject) => {
		fetchJsonp(url.startsWith('http') ? url : config.baseUrl + url)
			.then(async function(response) {
				if (!url.startsWith('http')) {
					const { code, msg, data } = await response.json()
					if (code === 200) {
						resolve(data)
					} else {
						reject(msg)
					}
				} else {
					resolve(response.json());
				}
			})
			.catch(function(ex) {
				reject(ex);
			});
	});
}
