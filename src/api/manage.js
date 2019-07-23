import { getRequest, postRequest } from '@/api/index'
import { validatPhone } from '@/utils/validate'
import { Message } from 'element-ui'

const userBaseUrl = 'api/member/';
const productBaseUrl = '/api/product/';
const shoppingBaseUrl = '/api/shopping/';
const orderBaseUrl = 'api/order/';

/* 获取金属类型 */
export function metalType(callback) {
  return getRequest('/backend/dictionary/list', {
    typeName:'metal_rare_type'
  }, function (res) {
    callback(res)
  })
}

/* 根据金属类型获取产品列表 */
export function products(type,callback) {
  return getRequest(productBaseUrl + 'list/' + type, {}, function (res) {
    callback(res)
  })
}

/* 获取包装规格和交货期 */
export function packingAndDate(data,callback) {
  return getRequest(productBaseUrl + 'packingAndDate/' + data.id, {
    downPayment: data.downPayment
  }, function (res) {
    callback(res)
  })
}

/* 加入购物车 */
export function addToCart(params,callback) {
  return postRequest(shoppingBaseUrl + 'saveOrUpdate', {
    'entity.id': params.id,                         //当前编辑的当条的id
    'entity.productId': params.productId,           //产品id
    'entity.shipmentTimeId': params.shipmentTimeId, //交货期id
    'entity.shipmentTime': params.shipmentTime,     //交货期
    'entity.unitPrice': params.unitPrice,           //单价
    'entity.deposit': params.deposit,               //定金比例（30/100）
    'purchaseDetails': params.purchaseDetails,
    'purchaseDetailsStr': params.purchaseDetailsStr //包装规格，格式：'["包装规格;数量","50;10"]'
  }, function (res) {
    callback(res)
  })
}

/* 获取购物车列表 */
export function cartList(callback) {
  return getRequest(shoppingBaseUrl + 'list', {}, function (res) {
    callback(res)
  })
}

/* 删除购物车产品 */
export function delCartProduct(id, callback) {
  return postRequest(shoppingBaseUrl + 'delete/' + id, {}, function (res) {
    callback(res)
  })
}


/* 获取企业信息 */
export function getUserInfo(callback) {
  return getRequest(userBaseUrl + 'details', {}, function (res) {
    callback(res)
  })
}
/* 获取付款方式 */
export function getPayment(callback) {
  return getRequest(userBaseUrl + 'payModel', {}, function (res) {
    callback(res)
  })
}
/* 获取收货地址 */
export function getAreas(callback) {
  return getRequest(userBaseUrl + 'query/address', {}, function (res) {
    callback(res)
  })
}
/* 删除收货地址 */
export function delArea(id, callback) {
  return getRequest(userBaseUrl + 'address/delete/'+id, {}, function (res) {
    callback(res)
  })
}
/* 保存地址 */
export function saveArea(params, callback) {
  if(!params.id){
    if (!params.receiveName) { Message({ message: '请输入联系人', type: 'error', duration: 1000}); return }
    if (!params.receiveMobile) { Message({ message: '请输入手机号码', type: 'error', duration: 1000}); return }
    if (!validatPhone(params.receiveMobile)) { Message({ message: '请输入正确的手机号', type: 'error', duration: 1000}); return }
    if (!params.provinceName || !params.cityName || !params.address.split('-')[1]) { Message({ message: '请完善地址', type: 'error', duration: 1000}); return }
  }
  return postRequest(userBaseUrl + 'saveOrUpdateAddress', {
    'entity.id': params.id,                       //修改地址的id
    'entity.provinceName': params.provinceName,   //省份
    'entity.cityName': params.cityName,           //城市
    'entity.address': params.address,             //区域+详细地址
    'entity.receiveName': params.receiveName,     //姓名
    'entity.receiveMobile': params.receiveMobile, //手机号
    'entity.isDefault': params.isDefault          //是否为默认地址，true/false
  }, function (res) {
    callback(res)
  })
}


/* 提交订单 */
export function saveOrder(saveList, paymentModelId, callback) {
  return postRequest(orderBaseUrl + 'save', {
    saveList: saveList,
    paymentModelId: paymentModelId
  }, function (res) {
    callback(res)
  })
}
/* 获取订单列表 */
export function getOrders(type, callback) {
  return getRequest(orderBaseUrl + 'query/status', {
    type: type
  }, function (res) {
    callback(res)
  })
}
/* 获取订单详情 */
export function orderDetails(orderNo, callback) {
  return getRequest(orderBaseUrl + 'details/' + orderNo, {}, function (res) {
    callback(res)
  })
}
