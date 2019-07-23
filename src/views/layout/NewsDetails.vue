<template>
  <div class="NewsDetails">
    <div class="toBack" @click="_back">
      <img src="../../assets/icon_arrow.png" alt="">
    </div>
    <div class="newsInfo" :style="{'height':height}">
      <img :src=" baseUrl + newsDetails.imgSrc" class="bgImg" v-if="newsDetails.imgSrc" alt="">
      <img src="../../../web-static/img/news1.jpg" class="bgImg" v-else alt="">
      <div class="news-bd news-bd1">
        <div class="time">{{newsDetails.time}}</div>
        <div class="des">
          <div class="text">{{newsDetails.title}}</div>
        </div>
        <!--<div class="comment">评论 8</div>-->
      </div>
    </div>
    <div class="newsDetails">{{newsDetails.content}}</div>
  </div>
</template>

<script>
  import {baseUrl} from '@/utils/fetch'
  export default {
    name: 'NewsDetails',
    data(){
      return {
        height: 0,
        baseUrl: baseUrl
      }
    },
    props: {
      newsDetails: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    created(){
      this.height = document.documentElement.clientWidth * 9 / 16 / 6 + 'px'
    },
    methods: {
      _back: function () {
        this.$emit('back');
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .toBack {
    margin-top: 0.65rem;
    padding: 0.2rem 0;
    width: 0.5rem;
    img {
      width:0.3rem;
      transform: rotate(180deg);
    }
  }

  .newsInfo {
    width: 100%;
    position: relative;
    font-size: 0;
    .bgImg {
      width: 100%;
    }
    .news-bd {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 0.5rem;
      font-size: 0;
      .time {
        font-size: 0.12rem;
      }
      .des {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.4rem;
        .text {
          font-size: 0.15rem;
          font-weight: bold;
          margin-right: 0.3rem;
        }
        .imgBox {
          img {
            width: 0.25rem;
          }
        }
      }
      .comment {
        font-size: 0.12rem;
      }
    }
    .news-bd1 {
      .time, .des .text, .comment {
        color: #fff;
      }
    }
    .news-bd2 {
      border-bottom: 0.01rem solid #eee;
      .time, .comment {
        color: #a7a7a7;
      }
    }
  }

  .newsDetails {
    padding: 0.5rem;
    line-height: 0.25rem;
    color: #777777;
  }
</style>
