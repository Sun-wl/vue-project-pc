<template>
  <div style="overflow: hidden;">
    <div class="swiper-container1" :style="{'height':height}">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in showList1" :class="[index%2 ? 'bg-f6' : 'bg-e2', 'swiper-slide']"
             :style="{'height':height}">
          <img :src=" baseUrl + item.imgSrc" alt="">
          <div class="swiper-slide-hover">
            <div>
              <p class="title">{{item.name}}</p>
              <p class="code">{{item.molecule}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-container2" :style="{'height':height}">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in showList2" :class="[index%2 ? 'bg-e2' : 'bg-f6', 'swiper-slide']"
             :style="{'height':height}">
          <img :src=" baseUrl + item.imgSrc" alt="">
          <div class="swiper-slide-hover">
            <div>
              <p class="title">{{item.name}}</p>
              <p class="code">{{item.molecule}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from '../../../web-static/swiper.min.js'
  import {baseUrl} from '@/utils/fetch'
  let mySwiper1, mySwiper2
  export default {
    name: 'Swiper',
    props: {
      showList1: {
        type: Array,
        default: function () {
          return []
        }
      },
      showList2: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data(){
      return {
        hegiht: '0px',
        baseUrl: baseUrl
      }
    },
    mounted () {
      this.lunbo()

    },
    created(){
      this.height = document.documentElement.clientWidth / 4 + 'px'
    },
    methods: {
      lunbo () {
        mySwiper1 = new Swiper('.swiper-container1', {
          autoplay: 5000,
          slidesPerView: 2,
          grabCursor: true,
        })
        mySwiper2 = new Swiper('.swiper-container2', {
          autoplay: 5000,
          slidesPerView: 2,
          grabCursor: true,
        })
        mySwiper1.params.control = mySwiper2;//需要在Swiper2初始化后，Swiper1控制Swiper2
        mySwiper2.params.control = mySwiper1;//需要在Swiper1初始化后，Swiper2控制Swiper1
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import url("../../styles/swiper.min.css");
  .bg-f6 {
    background: #F6F6F6;
  }

  .bg-e2 {
    background: #E2E2E2;
  }
  .swiper-slide {
    width: 50%;
    font-size: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background: #E9E9E9;*/
    /*border: 0.01rem solid #e2e2e2;*/
    img {
      height: 60%;
    }
    .swiper-slide-hover {
      display: none;
      position: absolute;
      left:0;
      top:0;
      width: 100%;
      height: 100%;
      div {
        width: 90%;
        height: 90%;
        background: rgba(235, 174, 25, 0.75);
        position: absolute;
        top: 5%;
        left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          margin: 0;
          padding: 0;
          line-height: 0.25rem;
        }
        .title {
          color: #333333;
          font-size: 0.16rem;
          font-weight: bold;
          margin-top: 0.25rem;
        }
        .code {
          color: #fff;
        }
      }
    }
  }

  .swiper-slide:hover {
    display: flex;
    justify-content: center;
    align-items: center;
    .swiper-slide-hover {
      display: block;
    }
  }
</style>
