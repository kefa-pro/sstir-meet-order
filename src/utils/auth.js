// 对Cookie的操作
// 这里没有写过期时间，所以Cookie的有效期都是Session，一旦关闭浏览器就过期
import appConfig from '@/config';
const domain = appConfig.domain;

import Cookies from 'js-cookie';

const TokenKey = 'token';

export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token) {
  console.log(token, domain)
	return Cookies.set(TokenKey, token, { domain });
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}
