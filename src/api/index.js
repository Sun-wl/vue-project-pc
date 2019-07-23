import fetch from '@/utils/fetch'

/*post请求*/
export function postRequest(url, data, callback) {
  return new Promise((resolve, reject) => {
    fetch.post(url, data).then(function (res) {
      resolve(res)
      callback(res)
    }).catch(function (error) {
      reject(error)
    });
  })

}

/*get请求*/
export function getRequest(url, params, callback) {
  return new Promise((resolve, reject) => {
    fetch.get(url, {
      params: params
    }).then(function (res) {
      resolve(res)
      callback(res)
    }).catch(function (error) {
      reject(error)
    });
  })
}
