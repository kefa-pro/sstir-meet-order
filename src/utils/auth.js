// 对Cookie的操作
// 这里没有写过期时间，所以Cookie的有效期都是Session，一旦关闭浏览器就过期

import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
