import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie(key) {
  return Cookies.get(key)
}

export function setCookie(key,data) {
  return Cookies.set(key, data)
}

export function removeCookie(key) {
  return Cookies.remove(key)
}