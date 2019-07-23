<template>
  <div class="footer">
    <div class="footer-container">
      <img src="../../assets/toTop.png" class="toTop" @click="toTop" alt="">
      <div class="footer-left">
        <div class="footer-left-container">
          <ul v-for="list in navList">
            <li v-for="item in list" @click="jump(item.path ,item.id)">{{item.name}}</li>
          </ul>
        </div>
        <div class="footer-left-copyright">
          2007-2018 Shanghai July Chemical Co., Ltd. 版权所有 沪ICP备05019658号
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-right-container">
          <div>
            <div class="title">销售热线</div>
            <div class="tel">手机：13817534426</div>
            <div class="tel">固话：021-50753102</div>
            <div class="tel">微信：13817534426</div>
            <div class="tel">Q&nbsp;&nbsp;Q：1760334313</div>
          </div>
          <div>
            <div class="title">客服热线</div>
            <div class="tel">手机：13817542532</div>
            <div class="tel">固话：021-50750650</div>
            <div class="tel">微信：13817542532</div>
            <div class="tel">Q&nbsp;&nbsp;Q：3296796972</div>
          </div>
        </div>
        <div class="footer-right-copyright"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data(){
      return {
        navList: [
          [
            {name: '销售支持', path: '/product/sale', id:'#sale'},
            {name: '热线电话', path: '/product/sale', id:'#tel'},
            {name: '关键约定', path: '/product/sale', id:'#appoint'},
//            {name: '业务流程', path: '/product/sale', id:'#flow'},
            {name: '在线订单', path: '/manage/productList'},
            {name: '产品推广', path: ''}
          ],
          [
            {name: '客户服务', path: '/product/customer', id:'#customer'},
            {name: '热线电话', path: '/product/customer', id:'#tel'},
            {name: '关键约定', path: '/product/customer', id:'#appoint'},
            {name: '投诉资料', path: '/product/customer', id:'#feedback'},
            {name: '在线订单', path: '/manage/productList'},
//            {name: '客服流程', path: '/product/customer', id:'#flow'}
          ],
          [
            {name: '实时贵金属价', path: ''},
            {name: 'Thebulliondesk', path: 'http://www.thebulliondesk.com'},
            {name: 'Kitco', path: 'http://www.kitco.com'},
            {name: '上海黄金交易所', path: 'http://www.sge.com.cn'}
          ]
        ]
      }
    },
    methods: {

    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .footer {
    width: 100%;
    background: #151517;
    padding: 0.8rem 0;
    @media screen and (min-width: 1300px) {
      .footer-container{
        width: 12rem;
      }
    }
    &-container {
      margin: 0 auto;
      padding: 0 auto;
      width: 11rem;
      display: flex;
      flex-direction: row;
      font-size: 0.14rem;
      position: relative;
      .toTop {
        width: 0.50rem;
        height: 0.50rem;
        position: absolute;
        right: -0.50rem;
        top: 0;
        cursor: pointer;
      }
      .footer-left {
        flex: 3;
        background: #1F1F21;
        min-height: 100%;
        padding-left: 0.50rem;
        display: flex;
        flex-direction: column;
        &-container {
          padding: 0.50rem 0 0.50rem 0;
          flex: 1;
          display: flex;
          ul li {
            list-style: none;
            width: 1.50rem;
            line-height: 0.32rem;
            cursor: pointer;
            color: #999999;
          }
          ul li:first-child {
            line-height: 0.55rem;
            color: #fff;
            font-size: 0.145rem;
          }
          ul li:hover {
            color: #ebae19;
          }
        }
        &-copyright {
          height: 1.00rem;
          line-height: 1.00rem;
          border-top: 0.03rem solid #333335;
          color: #6d6d6d;
        }
      }
      .footer-right {
        flex: 2;
        background: #1B1B1D;
        min-height: 100%;
        padding-right: 0.50rem;
        display: flex;
        flex-direction: column;
        &-container {
          padding: 0.50rem 0 0.50rem 0.50rem;
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .title {
            line-height: 55px;
            color: #ebae19;
            font-size: 0.145rem;
          }
          .tel {
            line-height: 0.32rem;
            color: #999999;
          }
        }
        &-copyright {
          height: 1.00rem;
          border-top: 0.03rem solid #333335;
        }
      }
    }
  }
</style>
