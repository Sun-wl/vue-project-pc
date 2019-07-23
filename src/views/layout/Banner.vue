<template>
  <div class="banner">
    <img :src="bannerInfo.img" class="w-all" alt="">
    <div class="banner-text">
      <div class="banner-title" v-if="bannerInfo.title && bannerInfo.title.length">
        <span v-for="item in bannerInfo.title"
              :class="[bannerInfo.title.length ? 'm-r-20' : '']">{{item}}</span>
      </div>
      <div class="banner-des" v-if="bannerInfo.des && bannerInfo.des.length">
        <div v-for="item in bannerInfo.des">{{item}}</div>
      </div>
    </div>
    <img src="../../assets/icon_logo_yello.png" alt="" v-if="logoShow" class="logo">
  </div>
</template>

<script>
  export default {
    name: 'banner',
    props: {
      bannerInfo: {
        type: Object,
        default: function () {
          return {}
        }
      },
      logoShow:{
        type: Boolean,
        default: function () {
          return false
        }
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .banner {
    font-size: 0;
    position: relative;
    &-text {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      * {
        color: #fff;
      }
      .banner-title{
        margin-bottom:0.3rem;
        span {
          font-size: 0.31rem;
          font-weight: bold;
        }
      }
      .banner-des{
        *{
          text-align: center;
          line-height:0.27rem;
        }
      }
    }
    .logo{
      position: absolute;
      top:0.3rem;
      left:0.3rem;
      width:0.7rem;
    }
  }
</style>
