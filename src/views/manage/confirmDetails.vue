<template>
  <div class="mProductConfirmDetails">
    <div class="header">
      <div class="toBack" @click="back">
        <img src="../../assets/icon_arrow.png" alt="">
      </div>
      <div class="title">填写并核对订单信息</div>
    </div>
    <div v-if="products.length">
      <div class="mProductConfirmDetails-body">
        <el-card class="product-radio">
          <div class="title">付款方式</div>
          <div class="body" v-if="paymentsShow">
            <div class="bodyCtn" v-for="item in payments">
              <label class="flex-row">
                <input type="radio" name="payment" :value="item.id" v-model="paymentId">
                <div class="span1">{{item.bankName}}</div>
                <div class="span2">收款人：{{item.name}}</div>
                <div class="span2">收款号：{{item.bankNo}}</div>
                <div class="span2">
                  <span v-if="item.openBank">支行：{{item.openBank}}</span>
                </div>
              </label>
            </div>
          </div>
          <div class="body" v-else>
            <div class="bodyCtn" v-for="item in payments" v-if="item.id == paymentId">
              <label class="flex-row">
                <input type="radio" name="payment" :value="item.id" v-model="paymentId">
                <div class="span1">{{item.bankName}}</div>
                <div class="span2">收款人：{{item.name}}</div>
                <div class="span2">收款号：{{item.bankNo}}</div>
                <div class="span2">
                  <span v-if="item.openBank">支行：{{item.openBank}}</span>
                </div>
              </label>
            </div>
          </div>
          <div class="more" @click="paymentsShow = !paymentsShow">
            <span v-if="paymentsShow">收起</span>
            <span v-else>更多方式</span>
            <div class="more-img">
              <img class="w-15 rotate" v-if="paymentsShow" src="../../assets/pulldown.png" alt="">
              <img class="w-15" v-else src="../../assets/pulldown.png" alt="">
            </div>
          </div>
        </el-card>
        <ul class="productList">
          <li v-for="(product,index) in products" class="product" v-if="validatAfterToday(product.shipmentTime)">
            <div class="product-index">产品{{index+1}}</div>
            <div class="product-title">
              <div class="span3 product-nameAndDeposit">
                <div class="span2">{{product.productName}} ({{product.deposit}})</div>
                <div class="span1">￥{{ (Math.round(product.unitPrice * 100) / 100).toFixed(2) }}</div>
              </div>
              <div class="span2">交货期：{{product.shipmentTime}}</div>
              <div class="span2">重量：{{product.totalSum/1000}}kg</div>
              <div class="span2">金额：<span
                class="blueColor">￥{{ (Math.round(product.amount * 100) / 100).toFixed(2) }}</span></div>
            </div>
            <div class="product-format">
              <div class="flex-row" v-for="purchaseDetail in product.purchaseDetails">
                <div class="span1 font-color-9">包装规格：{{purchaseDetail.specifications}}g/瓶</div>
                <div class="span1 font-color-9">数量：{{purchaseDetail.num}}瓶</div>
                <div class="span1 font-color-9">价格：￥{{ (Math.round(purchaseDetail.amount * 100) / 100).toFixed(2) }}
                </div>
              </div>
            </div>
            <div class="product-body">
              <div class="span1">保险费（{{premiumRate}}%）：￥{{product.insurance}}</div>
              <div class="product-body-img">
                <img class="w-15" src="../../assets/active.png" alt="" v-if="isInsurance[index].value"
                     @click="isInsurance[index].value = !isInsurance[index].value">
                <img class="w-15" src="../../assets/activeNo.png" alt="" v-else
                     @click="isInsurance[index].value = !isInsurance[index].value">
              </div>
            </div>
            <div class="product-body">
              <div class="span1">包装费：￥{{product.packPrice}}</div>
              <div class="product-body-img">
                <el-tooltip>
                  <div slot="content" class="product-pack-tip">
                    包装费计算方式：<br>
                    ① ≤8克/瓶：<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;25瓶或25瓶以下，10元（每瓶的包装价格）;<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;25瓶以上，瓶数*0.4（每瓶的价格）;<br>
                    ② >8克/瓶：<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;10元（每瓶的价格）;
                  </div>
                  <img class="w-20" src="../../assets/des.png" alt="">
                </el-tooltip>
              </div>
            </div>
            <div class="product-body m-column-10">
              <div class="w-100">备注：</div>
              <div class="span1">
                <el-input size="small" placeholder="(选填)" v-model="remark[index].value"></el-input>
              </div>
            </div>
            <div class="product-body m-column-10">
              <div class="w-100">开票名称：</div>
              <div class="span1">
                <el-select size="small" v-model="bill[index].value" placeholder="请选择开票名称">
                  <el-option v-for="item in billing" :key="item.title" :label="item.title" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="product-radio">
              <div class="title flex-row">
                <span>收货信息</span>
                <div class="span1 add" @click="addArea">新增收货地址</div>
              </div>
              <div class="body" v-if="areaShow[index].value">
                <div class="bodyCtn flex-row" v-for="(item, j) in areas">
                  <label class="flex-row span2">
                    <input type="radio" :name=" 'area'+index" :value="item.id" v-model="areaId[index].value">
                    <div class="span1">{{item.receiveName}}</div>
                    <div class="span2">
                      {{item.provinceName}}{{item.cityName}}{{item.address.split('-')[0]}}{{item.address.split('-')[1]}}
                    </div>
                    <div class="span1">{{item.receiveMobile}}</div>
                  </label>
                  <div class="span1 opera">
                    <span class="default" v-if="item.isDefault">默认地址</span>
                    <span v-else @click="setDefaultArea(item.id, j)">设为默认地址</span>
                    <span @click="addArea(j)">编辑</span>
                  </div>
                </div>
              </div>
              <div class="body" v-else>
                <div class="bodyCtn flex-row" v-for="(item, j) in areas" v-if="item.id == areaId[index].value">
                  <label class="flex-row span2">
                    <input type="radio" :name=" 'area'+index" :value="item.id" v-model="areaId[index].value">
                    <div class="span1">{{item.receiveName}}</div>
                    <div class="span2">
                      {{item.provinceName}}{{item.cityName}}{{item.address.split('-')[0]}}{{item.address.split('-')[1]}}
                    </div>
                    <div class="span1">{{item.receiveMobile}}</div>
                  </label>
                  <div class="span1 opera">
                    <span class="default" v-if="item.isDefault">默认地址</span>
                    <span v-else @click="setDefaultArea(item.id, j)">设为默认地址</span>
                    <span @click="addArea(j)">编辑</span>
                  </div>
                </div>
              </div>
              <div class="more" @click="areaShow[index].value = !areaShow[index].value">
                <span v-if="areaShow[index].value">收起</span>
                <span v-else>更多地址</span>
                <div class="more-img">
                  <img class="w-15 rotate" v-if="areaShow[index].value" src="../../assets/pulldown.png" alt="">
                  <img class="w-15" v-else src="../../assets/pulldown.png" alt="">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="product-bottom">
        <div class="span1">
          应付金额：
          <span class="product-bottom-amount">￥{{amount}}</span>
        </div>
        <div class="product-bottom-btn">
          <div @click="orderSave">提交订单</div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">暂时没有数据</div>

    <area-add :addAreaShow="addAreaShow"
              :defaultArea="area"
              @cancel="addAreaShow = false"
              @saveAfter="saveAreaAfter">
    </area-add>

  </div>
</template>

<script>
  import AMap from 'AMap'
  import {validatAfterToday} from '@/utils/validate'
  import {cartList, getUserInfo, getPayment, getAreas, saveArea, saveOrder} from '@/api/manage'
  import {Message} from 'element-ui'
  import {areaAdd} from '@/views/layout'
  export default {
    name: 'mProductConfirmDetails',
    components: {
      areaAdd
    },
    data(){
      return {
        products: [],         //所有购物车产品
        billing: [],          //所有开票名称
        payments: [],         //所有支付方式
        areas: [],            //所有收货地址
        addAreaShow: false,   //是否显示添加地址的卡片
        defaultAreaId: 0,     //默认地址id
        premiumRate: 0.15,    //保险费率
        area: {               //新增或修改的地址
          receiveName: '',
          receiveMobile: '',
          quyu: [],
          addr: '',
          isDefault: false
        },
        paymentsShow: false,  //是否显示所有支付方式
        areaShow: [],         //是否显示所有地址
        paymentId: 0,         //选中的支付方式id
        isInsurance: [],      //是否选择保险费
        bill: [],              //选择的开票名称id
        selectedArea: [],     //选中的城市
      }
    },
    computed: {
      amount(){
        var amount = 0
        for (var i = 0; i < this.products.length; i++) {
          amount += +this.products[i].amount + +this.products[i].packPrice;
          if (this.isInsurance[i].value) {
            amount += +this.products[i].insurance;
          }
        }
        amount = (Math.round(amount * 100) / 100).toFixed(2);
        return amount;
      },
      remark(){
        var arr = [], _this = this;
        _this.products.forEach(function (item, index) {
          arr.push({value: ''});
        })
        return arr;
      },
      areaId(){
        var arr = [], _this = this;
        _this.products.forEach(function (item, index) {
          arr.push({value: _this.defaultAreaId});
        })
        return arr;
      }
    },
    created(){
      var _this = this;
      this.getUserInfo().then(function () {
        return _this.getPayment();
      }).then(function () {
        return _this.getAreas();
      }).then(function () {
        return _this.cartList();
      })
    },
    methods: {
      validatAfterToday(time){
        /*验证交货期是否在今天之后*/
        return validatAfterToday(time)
      },
      getUserInfo(){
        var _this = this;
        return getUserInfo(function (res) {
          /*开票信息*/
          _this.billing = res.data.billing
        })
      },
      getPayment(){
        var _this = this;
        return getPayment(function (res) {
          /*支付方式*/
          _this.payments = res.data;
          _this.paymentId = _this.payments[0].id;
        })
      },
      getAreas(){
        var _this = this;
        return getAreas(function (res) {
          /*收货地址*/
          _this.areas = res.data
          for (var i = 0; i < _this.areas.length; i++) {
            if (_this.areas[i].isDefault) {
              /*默认收货地址*/
              _this.defaultAreaId = _this.areas[i].id;
            }
          }
        })
      },
      cartList(){
        /*获取购物车列表*/
        var _this = this;
        return cartList(function (res) {
          _this.products = res.data;
          _this.products.forEach(function (item, index) {
            /*是否选择保险费*/
            _this.isInsurance = [];
            /*开票名称*/
            _this.bill = [];
            /*是否展示全部收货地址*/
            _this.areaShow = [];
            _this.products.forEach(function (item, index) {
              _this.isInsurance.push({value: true});
              _this.bill.push({value: ''});
              _this.areaShow.push({value: false});
            })
            /*计算包装费*/
            item.packPrice = 0;
            for (var j = 0; j < item.purchaseDetails.length; j++) {
              item.packPrice = +(item.packPrice + item.purchaseDetails[j].packPrice);
            }
            item.packPrice = (Math.round(item.packPrice * 100) / 100).toFixed(2);
            /*计算保险费*/
            item.insurance = 0;
            item.insurance += +(item.amount / 100 * _this.premiumRate);
            item.insurance = (Math.round(item.insurance * 100) / 100).toFixed(2);
          })
        })
      },
      setDefaultArea(id, index){
        /*设置默认地址*/
        var _this = this;
        return saveArea({
          id: id,
          isDefault: true
        }, function () {
          _this.getAreas();
        })
      },
      addArea(i){
        /*点击编辑/添加地址，弹出模态框*/
        this.addAreaShow = true;
        if (typeof i == "number") {
          this.area = this.areas[i]
        } else {
          this.area = undefined
        }
      },
      saveAreaAfter(){
        /*地址保存成功后，隐藏模态框，获取最新地址*/
        this.addAreaShow = false;
        this.getAreas();
      },
      orderSave(){
        var _this = this;
        /*验证当前时间是否为下单时间范围，然后提交订单*/
        var now = (new Date).getTime();
        var today = [];
        today[0] = (new Date()).getFullYear();
        today[1] = (new Date()).getMonth() + 1;
        today[2] = (new Date()).getDate();
        today = today.join('/')
        var date1 = new Date(today + ' 9:30').getTime()
        var date2 = new Date(today + ' 16:30').getTime()
        if (now < date1 || now > date2) {
          Message({
            message: '下单时间是9:30-16:30，现在不能下单哦！',
            type: 'warning',
            duration: 2 * 1000
          })
          return
        }
        for (var i = 0; i < this.bill.length; i++) {
          if (!this.bill[i].value) {
            Message({
              message: '请选择开票名称',
              type: 'error',
              duration: 2 * 1000
            })
            return
          }
        }
        var saveList = []
        this.products.forEach(function (item, i) {
          if (_this.validatAfterToday(item.shipmentTime)) {
            var obj = {
              shoppingIds: item.id,
              remark: _this.remark[i].value || undefined,
              billingId: _this.bill[i].value || undefined,
              premium: _this.isInsurance[i].value,
              premiumRate: _this.premiumRate,
              paymentGoodsData: item.shipmentTime,
              unitPrice: item.unitPrice,
            }
            _this.areas.forEach(function (area) {
              if (area.id == _this.areaId[i].value) {
                obj.receiveAddress = area.provinceName + area.cityName + area.address.split('-')[0] + area.address.split('-')[1];
                obj.receiveMobile = area.receiveMobile
                obj.receiveName = area.receiveName
              }
            })
            saveList.push(obj)
          }
        })

        return saveOrder(JSON.stringify(saveList), this.paymentId, function (res) {
          Message({
            message: '提交成功！',
            type: 'success',
            duration: 2 * 1000
          })
          _this.$router.push('/manage/orderDetails/' + res.data.orderNo);
        })

      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mProductConfirmDetails {
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
    .mProductConfirmDetails-body {
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
        .body {
          padding: 0.1rem;
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
            .product-body-img {
              font-size: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .el-select {
              display: block;
            }
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

  .product-pack-tip {
    color: #fff;
    font-size: 0.1rem;
  }
</style>

