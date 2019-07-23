<template>
  <div class="news flex-row">
    <div class="span7" style="position: relative;">
      <img src="../../assets/icon_news.png" class="w-all" alt="">
      <search-type :searchType="searchType" @search="searchNews"></search-type>
    </div>
    <div class="span9" v-if="showList">
      <news-list :newsList="newsList" @liClick="toDetails" style="margin-top: 0.9rem;"></news-list>
      <div class="pagination">
        <Pagination :pages="pages" @changePage="changePage"></Pagination>
      </div>
    </div>
    <div class="span9" v-else>
      <news-info :newsDetails="newsDetails" @back=" showList = true; "></news-info>
    </div>
  </div>
</template>

<script>
  import {searchType, newsList, Pagination, newsInfo} from '@/views/layout'
  import {allNews, newsDetails} from '@/api/news'
  export default {
    name: 'news',
    components: {
      searchType,
      newsList,
      newsInfo,
      Pagination
    },
    data(){
      return {
        searchType: [
          {name: '行业新闻', type: 2},
          {name: '贵金属新闻', type: 1}
        ],
        newsList: [],
        pages: 1,
        showList: true,
        newsDetails: {},
        type:2
      }
    },
    created(){
      this.searchNews(this.type);
    },
    methods: {
      searchNews(type){
        this.type = type;
        this.changePage(1)
      },
      changePage(currentPage){
        var _this = this;
        return allNews({
          type: this.type || undefined,
          start:(currentPage-1)*6,
          length:6
        }, function (res) {
          _this.newsList = res.data;
          _this.pages = Math.ceil(res.recordsTotal/6);
        });
      },
      getDetails(id){
          var _this = this;
          return newsDetails(id,function (res) {
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
  .pagination {
    overflow: hidden;
    & > * {
      margin: 0.5rem 0.2rem;
      float: left;
    }
  }


</style>

