import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'    //ticket
const lastUri = 'lastUri'         //跳转至需要登陆才可以访问的页面a时，若未登录，保存页面a为lastUri
const dontTip = 'dontTip'         //产品报价界面是否 不提示‘购买的数量应为订单批量的整数倍

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getUri() {
  return Cookies.get(lastUri)
}
export function setUri(uri) {
  return Cookies.set(lastUri, uri)
}
export function removeUri() {
  return Cookies.remove(lastUri)
}


export function getDontTip() {
  return Cookies.get(dontTip)
}
export function setDontTip() {
  return Cookies.set(dontTip, 'true')
}


