import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import Qs from 'qs'

/*ajax数据请求*/
export const baseUrl = 'http://192.168.31.201:4061';
// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 20000,                  // 请求超时时间
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    data = Qs.stringify(data);
    return data;
  }]
})

// request拦截器
service.interceptors.request.use(config => {
  if(getToken()){
    config.headers['ticket'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
  if(response.status == 200){
    const res = response.data
    if ((res.statusCode && res.statusCode != 200) || (res.code && res.code != 200)) {
      if(res.statusCode == 301){
        Message({
          message: '您没有当前页面的权限哦',
          type: 'error',
          duration: 2 * 1000
        })
        setTimeout(function () {
          router.back()
        },2000)
      }else if(res.statusCode == 302){
        if(confirm('账号审核通过后方可查看当前界面，是否查看企业资料？')){
          router.push('/manage/info')
        }else{
          router.back()
        }
      }else{
        Message({
          message: res.message,
          type: 'error',
          duration: 2 * 1000
        })
      }
      return Promise.reject('error')
    } else {
      return res
    }
  }else{
    Message({
      message: response.statusText,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject('error')
  }

  },
  error => {
    console.log(2,error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service


