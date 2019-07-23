<template>
  <div class="mProductConfirm">
    <ul class="productList">
      <li v-for="(product,index) in products" class="product" v-if="validatAfterToday(product.shipmentTime)">
        <div class="product-title">
          <div class="m-r-20">{{product.productName}} ({{product.deposit}})</div>
          <div class="m-r-20">￥{{ (Math.round(product.unitPrice * 100) / 100).toFixed(2) }}</div>
          <div class="m-r-20">交货期：{{product.shipmentTime}}</div>
          <div class="m-r-20">重量：{{product.totalSum/1000}}kg</div>
          <div class="m-r-20">金额：<span
            class="blueColor">￥{{ (Math.round(product.amount * 100) / 100).toFixed(2) }}</span></div>
          <div class="product-btn">
            <div class="product-btn-edit">
              <div @click="edit(product.productId, index)">选择数量</div>
            </div>
            <div class="product-btn-del">
              <div @click="del(product.id)">删除</div>
            </div>
          </div>
        </div>
        <div class="product-format">
          <div class="flex-row" v-for="purchaseDetail in product.purchaseDetails">
            <div class="span1 font-color-9">包装规格：{{purchaseDetail.specifications}}g/瓶</div>
            <div class="span1 font-color-9">数量：{{purchaseDetail.num}}瓶</div>
            <div class="span1 font-color-9">价格：￥{{ (Math.round(purchaseDetail.amount * 100) / 100).toFixed(2) }}</div>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="!products.length" class="text-center">暂时没有数据</div>
    <div class="product-bottom" v-else>
      <div class="span1">
        总金额：
        <span class="product-bottom-amount">￥{{amount}}</span>
      </div>
      <div class="product-bottom-btn">
        <div @click="jump('/manage/confirmDetails')">确认订单</div>
      </div>
    </div>

    <el-dialog
      title="选择产品规格"
      :visible.sync="cartShow"
      width="5rem"
      :center="true"
      :before-close="handleClose">

      <div class="dialog-body">
        <div class="title" v-if="products.length && products.length > nowEditIndex">
          {{products[nowEditIndex].productName}}
          ({{products[nowEditIndex].deposit}})
        </div>
        <div class="dialog-body-ctn">
          <div class="name">交货期</div>
          <div class="span1 dates">
            <div v-for="(date,index) in dates"
                 :class="[dateIndex == index ? 'active' : '','dateBody']"
                 @click="dateSelect(index)">{{date.weekDayTime}}
            </div>
          </div>
        </div>
        <div class="dialog-body-ctn">
          <div class="name">包装规格</div>
          <div class="span1 formats">
            <div class="format" v-for="(format,index) in formats">
              <div
                :class="[formatIndex.indexOf(index) >= 0 ? 'active' : '','formatBody']"
                @click="formatSelect(index)">{{format}}g/瓶
              </div>
              <div class="multiplication">*</div>
              <number-input v-model.number="num[index].value" @input="changeNum(index)"></number-input>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
          <div class="cancel" @click="cancel">取 消</div>
          <div class="sure" @click="sure">确 定</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {numberInput} from '@/views/layout'
  import {validatAfterToday} from '@/utils/validate'
  import {cartList, delCartProduct, packingAndDate, addToCart} from '@/api/manage'
  import {Message} from 'element-ui'
  export default {
    name: 'mProductConfirm',
    components: {
      numberInput
    },
    data(){
      return {
        products: [],
        amount: 0,
        nowEditIndex: 0, //当前正在修改的产品
        cartShow: false,
        num: [],
        dateIndex: '无',
        dates: [],
        formatIndex: [],
        formats: [],
      }
    },
    created(){
      this.cartList()
    },
    methods: {
      changeNum(index){
        /*修改数量时，数量大于1直接选中，为0取消选中*/
        var _this = this;
        this.$nextTick(function () {
          if (_this.num[index].value && _this.formatIndex.indexOf(index) < 0) {
            _this.formatIndex.push(index);
          } else if (!_this.num[index].value && _this.formatIndex.indexOf(index) >= 0) {
            _this.formatIndex.splice(_this.formatIndex.indexOf(index), 1);
          }
        })
      },
      validatAfterToday(time){
        /*检测交货期是否在今天之后*/
        return validatAfterToday(time)
      },
      cartList(){
        var _this = this;
        this.amount = 0;
        return cartList(function (res) {
          _this.products = res.data;
          _this.products.forEach(function (item, index) {
            _this.amount = +_this.amount + +item.amount;
            _this.amount = (Math.round(_this.amount * 100) / 100).toFixed(2);
          })
        })
      },
      del(id){
        var _this = this;
        if (confirm('确认删除？')) {
          delCartProduct(id, function (res) {
            _this.cartList();
          })
        }
      },
      getPackingAndDate(data, callback){
        /*获取包装规格*/
        var _this = this;
        return packingAndDate(data, function (res) {
          _this.dates = res.data.weekDays;
          /*交货期*/
          _this.formats = res.data.productSpecification;
          /*包装规格*/
          callback(_this.dates, _this.formats)
        })
      },
      edit(id, index){
        /*点击选择数量，将nowEditIndex设为当前编辑的index*/
        this.nowEditIndex = index;
        var _this = this;
        this.num = []
        /*获取包装规格*/
        this.getPackingAndDate({
          id: id,
          downPayment: this.products[this.nowEditIndex].deposit   //定金比例
        }, function (dates, formats) {
          for (var i = 0; i < formats.length; i++) {
            _this.num.push({value: 0})
            for (var j = 0; j < _this.products[index].purchaseDetails.length; j++) {
              if (formats[i] == _this.products[index].purchaseDetails[j].specifications) {
                _this.formatIndex.push(i);
                _this.num[i].value = _this.products[index].purchaseDetails[j].num
              }
            }
          }
          for (var i = 0; i < dates.length; i++) {
            if (dates[i].weekDayTime == _this.products[index].shipmentTime) {
              _this.dateIndex = i;
            }
          }
        })
        this.cartShow = true;
      },
      handleClose(done) {
        /*模态框关闭前确认*/
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      dateSelect(index){
        /*点击交货期（选中）*/
        this.dateIndex = index;
      },
      formatSelect(index){
        /*点击包装规格（选中、取消）*/
        if (this.formatIndex.indexOf(index) >= 0) {
          this.formatIndex.splice(this.formatIndex.indexOf(index), 1);
        } else {
          this.formatIndex.push(index);
        }
      },
      cancel(){
        this.cartShow = false;
        this.dateIndex = '无';
        this.formatIndex = [];
        this.num.forEach(function (item) {
          item.value = 0;
        });
      },
      sure(){
        /*选择数量提交（修改购物车）*/
        var arr = [];
        for (var i = 0; i < this.formatIndex.length; i++) {
          var m = this.formatIndex[i]
          if (!this.num[m].value) {
            Message({
              message: '请选择数量',
              type: 'error',
              duration: 1000
            })
            return
          }
          var a = this.formats[m] + ';' + this.num[m].value;
          arr.push(a);
        }
        var params = {
          id: this.products[this.nowEditIndex].id,
          productId: this.products[this.nowEditIndex].productId,
          shipmentTimeId: this.dates[this.dateIndex].id,
          shipmentTime: this.dates[this.dateIndex].weekDayTime,
          unitPrice: this.dates[this.dateIndex].result,
          deposit: this.products[this.nowEditIndex].deposit,
          purchaseDetailsStr: JSON.stringify(arr)
        }
        var _this = this;
        return addToCart(params, function (res) {
          _this.cartList();
          _this.cancel();
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mProductConfirm {
    position: relative;
    padding-bottom: 0.8rem;
    ul.productList {
      li.product {
        list-style: none;
        border-top: 0.01rem solid #eee;
        padding: 0 0.3rem;
        .product-title {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          line-height: 0.5rem;
          border-bottom: 0.01rem solid #eee;
          * {
            font-size: 0.145rem;
          }
          .product-btn {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            & > * {
              width: 100px;
              padding: 0.115rem;
              div {
                cursor: pointer;
                line-height: 0.25rem;
                text-align: center;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
              }
            }
            &-edit {
              div {
                border: 0.01rem solid #1171af;
                color: #1171af;
                font-size: 0.14rem;
              }
            }
            &-del {
              div {
                border: 0.01rem solid #ccc;
                font-size: 0.14rem;
              }
            }
          }
        }
        .product-format {
          padding: 0.1rem 0.3rem;
          & > * {
            line-height: 0.25rem;
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
    .dialog-body {
      .title {
        font-size: 0.16rem;
      }
      .dialog-body-ctn {
        display: flex;
        flex-direction: row;
        * {
          color: #888;
        }
        .name {
          width: 0.8rem;
          line-height: 0.34rem;
          padding: 0.05rem 0;
        }
        .dates {
          padding: 0.05rem 0;
          overflow: hidden;
          .dateBody {
            cursor: pointer;
            float: left;
            text-align: center;
            font-size: 0.13rem;
            padding: 0.03rem 0.15rem;
            margin-bottom: 0.05rem;
            margin-right: 0.2rem;
            border: 0.01rem solid #eee;
            -webkit-border-radius: 0.05rem;
            -moz-border-radius: 0.05rem;
            border-radius: 0.05rem;
            word-break: keep-all;
            white-space: nowrap;
          }
          .dateBody.active {
            border: 0.01rem solid #1171af;
            background: #1171af;
            color: #fff;
          }
        }
        .formats {
          display: flex;
          flex-direction: column;
          padding: 0.05rem 0;
          .format {
            display: flex;
            flex-direction: row;
            margin-bottom: 0.1rem;
            .formatBody {
              cursor: pointer;
              text-align: center;
              width: 1rem;
              font-size: 0.13rem;
              padding: 0.03rem 0.15rem;
              margin-bottom: 0.05rem;
              border: 0.01rem solid #eee;
              -webkit-border-radius: 0.05rem;
              -moz-border-radius: 0.05rem;
              border-radius: 0.05rem;
              word-break: keep-all;
              white-space: nowrap;
            }
            .formatBody.active {
              border: 0.01rem solid #1171af;
              background: #1171af;
              color: #fff;
            }
            .multiplication {
              padding: 0 0.1rem;
              color: #888;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
    .dialog-footer {
      display: flex;
      flex-direction: row;
      justify-content: center;
      & > * {
        cursor: pointer;
        width: 1rem;
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
  }
</style>

