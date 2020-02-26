import instance from './axios';
import fetchJsonp from 'fetch-jsonp';

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
    fetchJsonp(url)
		.then(function(response) {
      resolve(response.json())
		})
		.catch(function(ex) {
			reject(ex)
		});
  })
}
