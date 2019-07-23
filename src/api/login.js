import { postRequest } from '@/api/index'
import { setToken, getUri } from '@/utils/auth'
import { validatPhone } from '@/utils/validate'
import router from '../router'

const baseUrl = '/api/member/'

/*登录*/
export function login(mobile, passWord, callback) {
  if (!mobile) { alert("请输入手机号"); return }
  if (!validatPhone(mobile)) { alert("请输入正确的手机号"); return }
  if (!passWord) { alert("请输入密码"); return }
  return postRequest(baseUrl + 'login', {
    mobile: mobile,
    passWord: passWord
  }, function (res) {
    /*登录成功后，执行回调，保存ticket到cookie，跳转至getUri()页面*/
    callback(res.data)
    setToken(res.data.ticket)
    router.push(getUri())
  })

}

/*注册*/
export function reg(params, callback) {
  if (!params.mobile) { alert("请输入手机号"); return }
  if (!validatPhone(params.mobile)) { alert("请输入正确的手机号"); return }
  if (!params.password) { alert("请输入密码"); return }
  if (params.password.length < 6) { alert("密码至少六位"); return }
  if (!params.captcheCode) { alert("请输入验证码"); return }
  if (!params.companyName) { alert("请输入企业名称"); return }
  if (!params.realName) { alert("请输入联系人"); return }
  return postRequest(baseUrl + 'register', {
    'entity.mobile': params.mobile,           //手机
    'entity.password': params.password,       //密码
    'captcheCode': params.captcheCode,        //验证码
    'entity.companyName': params.companyName, //企业名称
    'entity.realName': params.realName        //联系人
  }, function (res) {
    /*登录成功后，执行回调，保存ticket到cookie，跳转至getUri()页面*/
    callback(res.data)
    setToken(res.data.ticket)
    router.push(getUri())
  })

 }


 /*重置密码*/
export function reset(mobile, password, captcha, callback) {
  if (!mobile) { alert("请输入手机号"); return }
  if (!validatPhone(mobile)) { alert("请输入正确的手机号"); return }
  if (!password) { alert("请输入密码"); return }
  if (password.length < 6) { alert("密码至少六位"); return }
  if (!captcha) { alert("请输入验证码"); return }
  return postRequest(baseUrl + 'update/password', {
    mobile: mobile,       //手机
    passWord: password,   //密码
    captcha: captcha      //验证码
  }, function (res) {
    /*登录成功后，执行回调，保存ticket到cookie，跳转至getUri()页面*/
    callback(res.data)
    setToken(res.data.ticket)
    router.push(getUri())
  })

}

