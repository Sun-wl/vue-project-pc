<template>
  <div class="mInfo">
    <ul class="productType">
      <li class="active">企业信息</li>
      <li @click="jump('/manage/area')">企业地址</li>
    </ul>
    <div class="mInfoBase">
      <el-card class="mInfoBase-ctn">
        <div class="flex-row">
          <div class="img">
            <img class="w-20" src="../../assets/personalImg4.png" alt="">
          </div>
          <div class="name">企业名称：</div>
          <div class="span1">{{customer.companyName}}</div>
        </div>
        <div class="flex-row">
          <div class="img">
            <img class="w-20" src="../../assets/personalImg5.png" alt="">
          </div>
          <div class="name">联系人：</div>
          <div class="span1">{{customer.realName}}</div>
        </div>
        <div class="flex-row">
          <div class="img">
            <img class="w-20" src="../../assets/personalImg6.png" alt="">
          </div>
          <div class="name">手机号：</div>
          <div class="span1">{{customer.mobile}}</div>
        </div>
      </el-card>
      <el-card class="mInfoBase-ctn">
        <div class="flex-row" v-for="list in billing">
          <div class="img2">
            <img class="w-20" src="../../assets/personalImg7.png" alt="">
          </div>
          <div class="span1">
            <div class="flex-row">
              <div class="name">开票名称：</div>
              <div class="span1">{{list.title}}</div>
            </div>
            <div class="flex-row">
              <div class="name">纳税人识别号：</div>
              <div class="span1">{{list.tfn}}</div>
            </div>
            <div class="flex-row">
              <div class="name">开票地址：</div>
              <div class="span1">{{list.reciveAddress}}</div>
            </div>
            <div class="flex-row">
              <div class="name">开票电话：</div>
              <div class="span1">{{list.reciveMobile}}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/manage'
  export default {
    name: 'mInfo',
    components: {},
    data(){
      return {
        customer: {},
        billing: []
      }
    },
    created(){
      var _this = this;
      this.getUserInfo()
    },
    methods: {
      getUserInfo(){
        var _this = this;
        return getUserInfo(function (res) {
          _this.customer = res.data.customer
          _this.billing = res.data.billing
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mInfo {
    display: flex;
    flex-direction: column;
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
    .mInfoBase{
      padding:0 0.5rem;
      width:6rem;
      .mInfoBase-ctn{
        margin-top:0.2rem;
        *{
          line-height:0.4rem;
        }
        .img{
          display: flex;
          justify-content: center;
          align-items: center;
          padding-right:0.2rem;
          font-size:0;
        }
        .img2{
          padding-right:0.2rem;
          padding-top:0.1rem;
          font-size:0;
        }
        .name{
          width:1rem;
        }
      }

    }

  }
</style>

