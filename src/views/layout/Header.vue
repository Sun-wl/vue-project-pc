<template>
  <div class="header">
    <div class="header-container">
      <div class="header_logo">
        <img src="../../assets/icon_logo.png" @click="jump('/')" alt="">
      </div>
      <ul class="header-menu">
        <li v-for="item in navList" @click="jump(item.path)" v-if="item.name != '战略伙伴专供'">{{item.name}}</li>
        <li v-for="item in navList" v-if="item.name == '战略伙伴专供'">
          <el-dropdown @command="command">
            <span class="manage">
              {{item.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="color:#1b284f;" v-for="i in manages" :key="i.path" :command="i.path">
                {{i.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!--<li @click="jump('/')">{{$t('header.home')}}</li>
        <li @click="jump('/product')">{{$t('header.product')}}</li>
        <li @click="jump('/company')">{{$t('header.company')}}</li>
        <li @click="jump('/news')">{{$t('header.news')}}</li>
        <li @click="jump('/research')">{{$t('header.research')}}</li>
        <li>
          <el-dropdown @command="handleCommand">
            <span class="manage">
              {{$t('header.manage')}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="color:#1b284f;" v-for="item in manages" :key="item.path" :command="item.path">
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>-->
      </ul>
      <ul class="header-btn">
        <!--<li class="header-btn-account"></li>-->
        <li class="header-btn-tel" @click="jump('/contactUs')"></li>
        <li class="header-btn-lang" v-if="lang == 'zh'" @click="changeLang('en')">EN</li>
        <li class="header-btn-lang" v-else @click="changeLang('zh')">中文</li>
      </ul>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'header',
    data(){
      return {
        navList: [
          {name: '首页', path: '/'},
          {name: '产品服务', path: '/product/index/1/type'},
          {name: '公司概况', path: '/company'},
          {name: '新闻中心', path: '/news'},
          {name: '璞耐研究中心', path: '/research'},
          {name: '战略伙伴专供'}
        ],
        manages: [
          {name: '产品报价', path: '/manage/productList'},
          {name: '企业订单', path: '/manage/order'},
          {name: '企业资料', path: '/manage/info'}
        ]
      }
    },
    computed: {
      lang(){
        return Vue.config.lang
      }
    },
    created(){
      console.log(this.$t('header.home'))
    },
    methods: {
      changeLang(lang){
        /*切换语言*/
        Vue.config.lang = lang;
      },
      command(path){
        this.jump(path)
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .header {
    width: 100%;
    height: 1.10rem;
    box-shadow: 0 0 0.10rem -0.02rem rgba(155, 155, 155, 0.4);
    @media screen and (min-width: 1300px) {
      .footer-container {
        width: 12rem;
      }
    }
    &-container {
      margin: 0 auto;
      padding: 0 auto;
      width: 11.00rem;
      height: 100%;
      display: flex;
      .header_logo {
        width: 1.50rem;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .header-menu {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        li {
          list-style: none;
          margin: 0 0.25rem;
          font-size: 0.16rem;
          color: #1b284f;
          cursor: pointer;
          font-weight: bold;
          line-height: 0.30rem;
          .manage {
            font-size: 0.16rem;
            color: #1b284f;
          }
        }
        li:hover {
          border-bottom: 0.02rem solid #1b284f;
        }
      }
      .header-btn {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        li {
          list-style: none;
          width: 0.50rem;
          height: 0.50rem;
          cursor: pointer;
        }
        li.header-btn-account {
          margin-right: 0.2rem;
          background: url('../../assets/icon_account.png') no-repeat center;
          background-size: contain;
        }
        li.header-btn-account:hover {
          background: url('../../assets/icon_account2.png') no-repeat center;
          background-size: contain;
        }
        li.header-btn-tel {
          margin-right: 0.2rem;
          background: url('../../assets/icon_telephone.png') no-repeat center;
          background-size: contain;
        }
        li.header-btn-tel:hover {
          background: url('../../assets/icon_telephone2.png') no-repeat center;
          background-size: contain;
        }
        li.header-btn-lang {
          border-radius: 50%;
          border: 0.01rem solid #1b284f;
          color: #1b284f;
          font-size: 0.12rem;
          line-height: 0.5rem;
          text-align: center;
        }
        li.header-btn-lang:hover {
          background: #1b284f;
          color: #fff;
        }
      }
    }

  }
</style>
