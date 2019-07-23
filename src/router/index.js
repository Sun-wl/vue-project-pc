import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {/*首页*/
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/home/index'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component: resolve => require(['@/views/product/index'], resolve),
      children: [
        /*产品服务 -- 按主金属查询/按金属行业查询*/
        {path: 'index/:type/:industryType', name: 'productList', component: resolve => require(['@/views/product/list'], resolve)},
        /*产品服务 -- 销售支持*/
        {path: 'sale', name: 'sale', component: resolve => require(['@/views/product/sale'], resolve)},
        /*产品服务 -- 客户服务*/
        {path: 'customer', name: 'customer', component: resolve => require(['@/views/product/customer'], resolve)}
      ]
    },
    {/*公司概况*/
      path: '/company',
      name: 'company',
      component: resolve => require(['@/views/company/index'], resolve)
    },
    {/*新闻中心*/
      path: '/news',
      name: 'news',
      component: resolve => require(['@/views/news/index'], resolve)
    },
    {/*璞耐研究中心*/
      path: '/research',
      component: resolve => require(['@/views/research/index'], resolve),
      children: [
        {path: '', name: 'research', component: resolve => require(['@/views/research/introduce'], resolve)}
      ]
    },
    {/*联系我们*/
      path: '/contactUs',
      component: resolve => require(['@/views/contactUs/index'], resolve),
      children: [
        {path: '', name: 'contactUs', component: resolve => require(['@/views/contactUs/list'], resolve)}
      ]
    },
    {
      path: '/manage',
      name: 'manage',
      component: resolve => require(['@/views/manage/index'], resolve),
      children: [
        /*产品报价*/
        {path: 'productList', name: 'mProductList', component: resolve => require(['@/views/manage/product'], resolve)},
        /*待定产品*/
        {path: 'confirm', name: 'mProductConfirm', component: resolve => require(['@/views/manage/confirm'], resolve)},
        /*确认订单*/
        {path: 'confirmDetails', name: 'mProductConfirmDetails', component: resolve => require(['@/views/manage/confirmDetails'], resolve)},
        /*订单列表*/
        {path: 'order', name: 'mOrder', component: resolve => require(['@/views/manage/order'], resolve)},
        /*订单详情*/
        {path: 'orderDetails/:orderNo', name: 'mOrderDetails', component: resolve => require(['@/views/manage/orderDetails'], resolve)},
        /*企业信息*/
        {path: 'info', name: 'mInfo', component: resolve => require(['@/views/manage/info'], resolve)},
        /*收货地址*/
        {path: 'area', name: 'mArea', component: resolve => require(['@/views/manage/area'], resolve)},
      ]
    }
  ]
})

