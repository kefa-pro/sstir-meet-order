import instance from './axios';
import fetchJsonp from 'fetch-jsonp';
import { Loading } from 'element-ui';

import config from '@/config';

export function AppPost(url, data) {
	return new Promise((resolve, reject) => {
		instance
			.post(url, data)
			.then(res => {
				if(res.data.code === 200) {
					resolve(res.data.data)
				} else {
					reject(res.data.msg)
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
				resolve((res.data && res.data.data) || res.data);
			})
			.catch(err => {
				reject(err);
			});
	});
}

export function AppFetchJsonp(url) {
	Loading.service({
		lock: false, // 这里要设为false,否则loading时会隐藏滚动条，导致抖动
		text: 'Loading',
		spinner: 'el-icon-loading',
		background: 'rgba(0, 0, 0, 0.7)',
	});
	return new Promise((resolve, reject) => {
		fetchJsonp(url.startsWith('http') ? url : config.baseUrl + url, {
			timeout: 1000 * 20,
		})
			.then(async function(response) {
				Loading.service().close();
				if (!url.startsWith('http')) {
					const { code, msg, data } = await response.json();
					if (code === 200) {
						resolve(data);
					} else {
						reject(msg);
					}
				} else {
					resolve(response.json());
				}
			})
			.catch(function(ex) {
				Loading.service().close();
				reject(ex);
			});
	});
}
