<template>
  <div class="mProductList">
    <ul class="productType">
      <li v-for="item in types" :class="item.id == id ? 'active' : ''" @click="getProducts(item.id)">{{item.name}}</li>
    </ul>
    <div style="text-align: right; position:relative;">
      <button class="confirm" @click="jump('/manage/confirm')">去确认已选择的产品</button>
      <div style="position: absolute; right: 0; top: 30px;">
        <Balls ref="ball"></Balls>
      </div>
    </div>
    <div class="productList">
      <table>
        <thead>
        <tr>
          <th>产品名称</th>
          <th>单价(元/克)</th>
          <th>订货批量(千克)</th>
          <th>交货期</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product,index) in products">
          <td>{{product.name}} ({{product.downPaymentPercentage}})</td>
          <td>￥{{ (Math.round(product.result * 100) / 100).toFixed(2) }}</td>
          <td>{{product.minimumQuantity}}</td>
          <td class="nowrap">{{product.weekDayTime}}</td>
          <td>
            <div class="buyBtn" :ref=" 'buy' + index" @click="buy(index, $event)">
              购买
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <el-dialog
      title="友情提示"
      :visible.sync="tipShow"
      width="350px"
      :show-close="false"
      center>
      <div class="flex-column center">
        <div>
          <div class="line-40">购买的数量应为订单批量的整数倍</div>
          <div class="flex-row row-center">
            <input type="checkbox" v-model="dontTip" value="1">
            <div class="line-40 m-l-5">不再提醒</div>
          </div>
          <div class="know" @click="know">知道了</div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {metalType, products, packingAndDate, addToCart} from '@/api/manage'
  import {Balls} from '@/views/layout'
  import {getDontTip,setDontTip} from '@/utils/auth'
  export default {
    name: 'mProductList',
    components: {
      Balls
    },
    data(){
      return {
        types: [],
        id: 0,
        products: [],
        tipShow: true,
        dontTip: false
      }
    },
    created(){
      if(getDontTip() == 'true'){
        this.tipShow = false;
      }
      var _this = this;
      this.metalType().then(function () {
        return _this.getProducts(_this.id)
      })
    },
    methods: {
      know(){
        if (this.dontTip) {
          setDontTip();
        }
        this.tipShow = false;
      },
      metalType(){
        /*获取金属类型*/
        var _this = this;
        return metalType(function (res) {
          _this.types = res.data;
          if (_this.types.length) {
            _this.id = _this.types[0].id;
          }
        })
      },
      getProducts(id){
        /*获取产品列表*/
        var _this = this;
        this.id = id;
        return products(id, function (res) {
          _this.products = res.data;
        })
      },
      getPackingAndDate(id, callback){
        /*获取包装规格和交货期*/
        return packingAndDate({id: id}, function (res) {
          var formats = res.data.productSpecification;
          callback(formats);
        })
      },
      buy(index, e){
        /*加入购物车*/
        var _this = this;
        //获取每个产品的发货期
        this.getPackingAndDate(this.products[index].id, function (formats) {
          var params = {
            productId: _this.products[index].id,
            shipmentTimeId: _this.products[index].weekDayId,
            shipmentTime: _this.products[index].weekDayTime,
            unitPrice: _this.products[index].result,
            deposit: _this.products[index].downPaymentPercentage,
            purchaseDetailsStr: JSON.stringify([formats[0] + ';1'])
          }
          addToCart(params, function (res) {
            /*加入购物车动画*/
            _this.$refs.ball.drop(e.target)
          })
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mProductList {
    display: flex;
    flex-direction: column;
    max-height: 8rem;
    .productType {
      display: flex;
      border-top: 0.01rem solid #eee;
      border-bottom: 0.01rem solid #eee;
      border-right: 0.01rem solid #eee;
      li {
        flex: 1;
        list-style: none;
        line-height: 0.4rem;
        font-size: 0.15rem;
        text-align: center;
        border-left: 0.01rem solid #eee;
        background: #F6F6F6;
        cursor: pointer;
      }
      li.active {
        background: #eee;
      }
      li:hover {
        background: #eee;
      }
    }
    .confirm {
      background: #1171af;
      color: #fff;
      border: none;
      border-radius: 0.05rem;
      padding: 0.1rem 0.2rem;
      margin-top: 0.1rem;
    }
    .productList {
      flex: 1;
      overflow-y: auto;
      table {
        width: 100%;
        text-align: center;
        th {
          border-bottom: 0.01rem solid #eee;
          font-size: 0.15rem;
          height: 0.5rem;
        }
        td {
          height: 0.4rem;
          .buyBtn {
            width: 0.6rem;
            line-height: 0.2rem;
            border-radius: 0.05rem;
            border: 0.01rem solid #ccc;
            background: #fff;
            cursor: pointer;
          }
          .buyBtn:active {
            background: #1171af;
            color: #fff;
            border: 1px solid #1171af;
          }
        }
      }
    }

  }

  .know {
    cursor: pointer;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #fff;
    color: #333;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    margin-top: 10px;
  }
</style>

