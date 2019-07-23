<template>
  <div class="mOrderDetails">
    <div class="header">
      <div class="toBack" @click="back">
        <img src="../../assets/icon_arrow.png" alt="">
      </div>
      <div class="title">查看订单详情</div>
    </div>
    <div class="mOrderDetails-body">
      <el-card class="product-radio">
        <!--<div class="title">付款方式</div>
        <div class="body">
          <div class="bodyCtn">
            <label class="flex-row">
              <div class="span1">{{payment.bankName}}</div>
              <div class="span2">收款人：{{payment.name}}</div>
              <div class="span2">收款号：{{payment.bankNo}}</div>
              <div class="span2">
                <span v-if="payment.openBank">支行：{{payment.openBank}}</span>
              </div>
            </label>
          </div>
        </div>-->
        <div class="bodyCtn flex-row">
          <div class="span1">订单号：{{orderNo}}</div>
          <div class="span1">应付总金额：￥{{ (Math.round(data.amount * 100) / 100).toFixed(2) }}</div>
          <div class="span1">下单时间：{{data.createTime}}</div>
        </div>
        <div class="bodyCtn flex-row">
          <div class="m-r-10">付款方式:</div>
          <div class="m-r-20">{{payment.bankName}}</div>
          <div class="m-r-20">收款人：{{payment.name}}</div>
          <div class="m-r-20">收款号：{{payment.bankNo}}</div>
          <div class="m-r-20"><span v-if="payment.openBank">支行：{{payment.openBank}}</span></div>
        </div>
        <div class="bodyCtn flex-row" v-if="data.paymentInformations && data.paymentInformations.length">
          <div class="span1">预付首款日期：{{data.paymentInformations[0].dateTime}}</div>
          <div class="span1">付款金额：￥{{ (Math.round((+data.paymentInformations[0].payMoney) * 100) / 100).toFixed(2) }}
          </div>
        </div>
        <div class="bodyCtn flex-row" v-if="data.paymentInformations && data.paymentInformations.length==2">
          <div class="span1">预付尾款日期：{{data.paymentInformations[1].dateTime}}</div>
          <div class="span1">付款金额：￥{{ (Math.round((+data.paymentInformations[1].payMoney) * 100) / 100).toFixed(2) }}
          </div>
        </div>
        <div class="bodyCtn flex-row" v-if="data.payRecordList && data.payRecordList.length">
          <div class="span1">已付首款日期：{{data.payRecordList[0].payTime}}</div>
          <div class="span1">付款金额：￥{{ (Math.round((+data.payRecordList[0].amount) * 100) / 100).toFixed(2) }}</div>
          <div class="span1">付款方式：{{data.payRecordList[0].payMode}}</div>
        </div>
        <div class="bodyCtn flex-row" v-if="data.payRecordList && data.payRecordList.length==2">
          <div class="span1">已付尾款日期：{{data.payRecordList[1].payTime}}</div>
          <div class="span1">付款金额：￥{{ (Math.round((+data.payRecordList[1].amount) * 100) / 100).toFixed(2) }}</div>
          <div class="span1">付款方式：{{data.payRecordList[1].payMode}}</div>
        </div>
      </el-card>
      <ul class="productList">
        <li v-for="(item,index) in products" class="product">
          <div class="product-index">产品{{index+1}}</div>
          <div class="product-title">
            <div class="span3 product-nameAndDeposit">
              <div class="span2">{{item.productName}} ({{item.downPaymentPercentage}})</div>
              <div class="span1">￥{{ (Math.round(item.unitPrice * 100) / 100).toFixed(2) }}</div>
            </div>
            <div class="span2">交货期：{{item.paymentGoodsData}}</div>
            <div class="span2">重量：{{item.total/1000}}kg</div>
            <div class="span2">金额：<span class="blueColor">￥{{ (Math.round(item.amount * 100) / 100).toFixed(2) }}</span>
            </div>
          </div>
          <div class="product-format">
            <div class="flex-row" v-for="data in item.purchaseDetailsList">
              <div class="span1 font-color-9">包装规格：{{data.specifications}}g/瓶</div>
              <div class="span1 font-color-9">数量：{{data.num}}瓶</div>
              <div class="span1 font-color-9">价格：￥{{ (Math.round(data.amount * 100) / 100).toFixed(2) }}</div>
            </div>
          </div>
          <div class="product-body">
            <div class="span1">保险费({{item.premiumRate}}%)：￥{{ (Math.round(item.premiumAmount * 100) / 100).toFixed(2)
              }}
            </div>
            <div class="span1">包装费：￥{{item.packPrice}}</div>
            <div class="span1" v-if="item.billingTitle">开票名称：{{item.billingTitle}}</div>
            <div class="span1" v-else></div>
            <div class="span1" v-if="item.remark">备注：{{item.remark}}</div>
            <div class="span1" v-else></div>
          </div>
          <div class="product-body">
            <div class="span1">收货信息：</div>
            <div class="span1">{{item.receiveName}}</div>
            <div class="span3">{{item.receiveAddress}}</div>
            <div class="span1">{{item.receiveMobile}}</div>
            <div class="span2"></div>
          </div>

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {orderDetails} from '@/api/manage'
  export default {
    name: 'mOrderDetails',
    data(){
      return {
        orderNo: '',
        payment: {},
        products: [],
        data: {}
      }
    },
    created(){
      this.orderNo = this.$route.params.orderNo;
      this.orderDetails()
    },
    methods: {
      orderDetails(){
        var _this = this;
        return orderDetails(this.orderNo, function (res) {
          _this.data = res.data;
          _this.products = res.data.itemList;
          _this.payment = res.data.paymentModel;
          for (var i = 0; i < _this.products.length; i++) {
            /*计算包装费*/
            _this.products[i].packPrice = 0;
            for (var j = 0; j < _this.products[i].purchaseDetailsList.length; j++) {
              _this.products[i].packPrice = _this.products[i].packPrice + _this.products[i].purchaseDetailsList[j].packPrice;
            }
            _this.products[i].packPrice = (Math.round(_this.products[i].packPrice * 100) / 100).toFixed(2);
          }
        })
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mOrderDetails {
    position: relative;
    padding-bottom: 1rem;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      .toBack {
        width: 0.5rem;
        img {
          width: 0.3rem;
          transform: rotate(180deg);
        }
      }
      .title {
        font-size: 0.2rem;
        line-height: 0.5rem;
      }
    }
    .mOrderDetails-body {
      .product-radio {
        .title {
          font-size: 0.16rem;
          * {
            font-size: 0.16rem;
          }
          .add {
            cursor: pointer;
            text-align: right;
            color: #1171af;
            font-size: 0.14rem;
          }
        }
        .bodyCtn {
          padding: 0.05rem 0;
          input {
            margin-right: 0.2rem;
          }
          .opera {
            text-align: right;
            * {
              color: #1171af;
              margin: 0 0.2rem;
              cursor: pointer;
            }
            .default {
              color: #fff;
              background: #AEAEAE;
              padding: 0.03rem 0.1rem;
              -webkit-border-radius: 0.03rem;
              -moz-border-radius: 0.03rem;
              border-radius: 0.03rem;
            }
          }
        }
        .more {
          cursor: pointer;
          padding: 0.1rem;
          display: flex;
          flex-direction: row;
          span {
            color: #888;
          }
          .more-img {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0.1rem;
            font-size: 0;
            .rotate {
              transform: rotate(180deg);
            }
          }
        }
      }
      ul.productList {
        li.product {
          list-style: none;
          border-top: 0.01rem solid #eee;
          padding: 0.2rem 0.3rem;
          .product-index {
            color: #6b62aa;
            font-size: 0.16rem;
            line-height: 0.5rem;
            border-bottom: 0.01rem solid #eee;
          }
          .product-title {
            display: flex;
            flex-direction: row;
            line-height: 0.5rem;
            border-bottom: 0.01rem solid #eee;
            * {
              font-size: 0.145rem;
            }
            .product-nameAndDeposit {
              display: flex;
              flex-direction: row;
              .unitPrice {
                color: #1171af;
              }
            }
          }
          .product-format {
            padding: 0.1rem 0.3rem;
            * {
              line-height: 0.25rem;
            }
          }
          .product-body {
            display: flex;
            flex-direction: row;
            line-height: 0.3rem;
          }
        }
      }
    }
    .product-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      text-align: right;
      padding: 0.1rem 0;
      background: #fff;
      border-bottom: 0.01rem solid #ccc;
      line-height: 0.35rem;
      * {
        font-size: 0.15rem;
      }
      &-amount {
        color: #1171af;
      }
      &-btn {
        padding: 0 0.2rem;
        div {
          cursor: pointer;
          padding: 0 0.3rem;
          background: #1171af;
          color: #fff;
          -webkit-border-radius: 0.05rem;
          -moz-border-radius: 0.05rem;
          border-radius: 0.05rem;
        }
      }
    }
  }

  .el-cascader {
    width: 100%;
  }

  .dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    & > * {
      cursor: pointer;
      width: 1rem;
      text-align: center;
      line-height: 0.3rem;
      margin: 0 0.1rem;
      -webkit-border-radius: 0.05rem;
      -moz-border-radius: 0.05rem;
      border-radius: 0.05rem;
    }
    .cancel {
      border: 0.01rem solid #ccc;
    }
    .sure {
      background: #1171af;
      color: #fff;
      border: 0.01rem solid #1171af;
    }
  }

  .product-pack-tip {
    color: #fff;
    font-size: 0.1rem;
  }
</style>

