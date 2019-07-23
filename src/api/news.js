import { getRequest } from '@/api/index'

const baseUrl = '/web/news/'

/*获取主页新闻列表*/
export function homeNews(callback) {
  return getRequest(baseUrl + 'use', {}, function (res) {
    callback(res)
  })
}


/*根据类型获取新闻列表*/
export function allNews(params, callback) {
  return getRequest(baseUrl + 'list', {
    'entity.newsType':params.type,
    iDisplayStart:params.start,
    iDisplayLength:params.length
  }, function (res) {
    callback(res)
  })
}

/*获取新闻详情*/
export function newsDetails(id, callback) {
  return getRequest(baseUrl + 'details/'+id, {}, function (res) {
    callback(res)
  })
}
