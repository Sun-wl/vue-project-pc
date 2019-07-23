import { getRequest } from '@/api/index'

const baseUrl = '/web/product/'

/*获取主页产品*/
export function homeProduct(callback) {
  return getRequest(baseUrl + 'use/list', {}, function (res) {
    callback(res)
  })

}

/*根据类型获取产品列表*/
export function products(params,callback) {
  return getRequest(baseUrl + 'list', {
    type:params.type,                 //按主金属查询
    industryType:params.industryType, //按应用行业查询
    iDisplayStart:params.start,
    iDisplayLength:params.length
  }, function (res) {
    callback(res)
  })

}


