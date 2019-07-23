<template>
  <div class="home">
    <div class="hidden">
      <div class="left w-half" style="position: relative;">
        <img src="../../assets/icon_product.png" class="w-all" alt="">
      </div>
      <div class="left w-half" :style="{'height':height}">
        <home-swiper :showList1="products1" :showList2="products2"></home-swiper>
      </div>
    </div>

    <div class="company">
      <img src="../../assets/icon_company.png" class="w-all" alt="">
      <div class="company-ctn">
        <div class="flex-row" v-for="item in companyInfo">
          <div class="span1 flex-column com-detail" v-for="i in item">
            <div class="com-detail-img">
              <img :src="i.img" alt="">
            </div>
            <div class="com-detail-title">{{i.name}}</div>
            <div class="com-detail-line"></div>
            <div class="com-detail-des">{{i.des}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="news flex-row">
      <div class="span7">
        <img src="../../assets/icon_news.png" class="w-all" alt="">
      </div>
      <div class="span9" v-if="showList">
        <news-list :newsList="newsList" @liClick="toDetails" style="margin-top: 0.9rem;"></news-list>
      </div>
      <div class="span9" v-else>
        <news-info :newsDetails="newsDetails" @back=" showList = true; "></news-info>
      </div>
    </div>
  </div>
</template>

<script>
  import {homeSwiper, newsList, newsInfo} from '@/views/layout'
  import {homeProduct} from '@/api/product'
  import {homeNews, newsDetails} from '@/api/news'
  export default {
    name: 'home',
    components: {
      newsList,
      homeSwiper,
      newsInfo
    },
    data(){
      return {
        height: 0,
        products1: [{name: '氯亚铂酸钾'}, {name: '二亚硝基二氨铂（P盐）'}, {name: '硝酸铂(液体)'}, {name: '氯铂酸钾'}],   //不能删
        products2: [{name: '氯铂酸铵'}, {name: '氯亚铂酸铵'}, {name: '四氯化铂'}, {name: '二氯化铂'}],                   //不能删
        companyInfo: [
          [
            {
              name: '领先的科技应用体系',
              des: '以ERP为基础的管理系统，开放共享的知识管理平台，与高校及科研院所长期合作，致力于推进科研成果产业化',
              img: '../../../web-static/img/icon_cup.png'
            },
            {
              name: '可靠的质量保证体系',
              des: '高素质的员工，高品质的工作，完善的质保体系，全程无忧服务',
              img: '../../../web-static/img/icon_tick.png'
            }
          ],
          [
            {
              name: '快速高效的运行体系',
              des: '持续提高运营能力，持续缩短供货周期，持续加快市场反馈',
              img: '../../../web-static/img/icon_wheel.png'
            },
            {
              name: '多方共赢的目标',
              des: '多方共赢的目标',
              img: '../../../web-static/img/icon_handshake.png'
            }
          ]
        ],
        newsList: [],
        showList: true,
        newsDetails: {}
      }
    },
    created(){
      var _this = this;
      this.height = document.documentElement.clientWidth / 2 + 'px'
      this.getProduct().then(function () {
        return _this.getNews();
      })
    },
    methods: {
      getProduct(){
        var _this = this;
        return homeProduct(function (res) {
          /*将产品分为两部分轮播展示*/
          _this.products1 = []
          _this.products2 = []
          if (res.data.length) {
            for (var i = 0; i < res.data.length; i++) {
              if (i < Math.ceil(res.data.length / 2)) {
                _this.products1.push(res.data[i])
              } else {
                _this.products2.push(res.data[i])
              }
            }
          }
          _this.products2.length = _this.products1.length;
        })
      },
      getNews(){
        var _this = this;
        return homeNews(function (res) {
          _this.newsList = res.data;
        })
      },
      getDetails(id){
        var _this = this;
        return newsDetails(id, function (res) {
          _this.newsDetails = res.data;
        })
      },
      toDetails(id){
        this.showList = false;
        this.getDetails(id);
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .company {
    position: relative;
    font-size: 0;
    .company-ctn {
      position: absolute;
      right: 1rem;
      top: 1rem;
      bottom: 1rem;
      padding-left: 0.9rem;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    @media screen and (max-width: 1300px) {
      .company-ctn {
        left: 4rem;
        padding-left: 0.3rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        .com-detail {
          padding: 0.1rem 0;
          &-img img {
            width: 0.5rem;
          }
          &-title {
            font-size: 0.15rem;
            font-weight: bold;
            line-height: 0.4rem;
          }
          &-line {
            width: 0.3rem;
            border-top: 0.015rem solid #ebae19;
          }
          &-des {
            color: #777777;
            line-height: 0.2rem;
            padding: 0.1rem 0.3rem 0.1rem 0;
            font-size: 0.14rem;
          }
        }
      }
    }
    @media screen and (min-width: 1300px) {
      .company-ctn {
        width: 11rem;
        right: 1rem;
        top: 1rem;
        bottom: 1rem;
        padding-top: 0.4rem;
        padding-bottom: 0.5rem;
        .com-detail {
          padding: 0.2rem 0;
          &-img img {
            width: 0.6rem;
          }
          &-title {
            font-size: 0.15rem;
            font-weight: bold;
            line-height: 0.45rem;
          }
          &-line {
            width: 0.3rem;
            border-top: 0.015rem solid #ebae19;
          }
          &-des {
            color: #777777;
            line-height: 0.25rem;
            padding: 0.2rem 1rem 0.4rem 0;
            font-size: 0.14rem;
          }
        }
      }
    }
    @media screen and (min-width: 1700px) {
      .company-ctn {
        width: 11.5rem;
        right: 1rem;
        top: 1rem;
        bottom: 1rem;
        padding-top: 0.9rem;
        padding-bottom: 0.9rem;
      }
    }
  }
</style>

