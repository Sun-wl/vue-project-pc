<template>
  <div class="NewsList">
    <ul>
      <li v-for="(item,index) in newsList" @click="_liClick(item.id)" :style="{'height':height}">
        <div class="originalStatus">
          <div class="news-bd news-bd2">
            <div class="time">{{item.time}}</div>
            <div class="des">
              <div class="text">{{item.title}}</div>
              <div class="imgBox">
                <img src="../../assets/icon_arrow.png" alt="">
              </div>
            </div>
            <!--<div class="comment">评论 8</div>-->
          </div>
        </div>
        <div class="hoverStatus">
          <img :src=" baseUrl + item.imgSrc" class="bgImg" v-if="item.imgSrc" alt="">
          <img src="../../../web-static/img/news1.jpg" class="bgImg" v-else alt="">
          <div class="news-bd news-bd1">
            <div class="time">{{item.time}}</div>
            <div class="des">
              <div class="text">{{item.title}}</div>
              <div class="imgBox">
                <img src="../../assets/icon_arrow2.png" alt="">
              </div>
            </div>
            <!--<div class="comment">评论 8</div>-->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {baseUrl} from '@/utils/fetch'
  export default {
    name: 'NewsList',
    data(){
      return {
        height: 0,
        baseUrl: baseUrl
      }
    },
    props: {
      newsList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    created(){
      this.height = document.documentElement.clientWidth * 9 / 16 / 6 + 'px'
    },
    methods: {
      _liClick: function (id) {
        this.$emit('liClick', id);
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  ul {
    min-height:4rem;
    li {
      list-style: none;
      .originalStatus , .hoverStatus {
        width: 100%;
        height:100%;
        position: relative;
        font-size: 0;
      }
      .hoverStatus{
        display: none;
      }
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
              width: 0.3rem;
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
    li:hover{
      .originalStatus{
        display: none;
      }
      .hoverStatus{
        display: block;
      }
    }
  }
</style>
