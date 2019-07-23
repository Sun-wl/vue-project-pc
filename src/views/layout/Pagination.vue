<template>
  <div class="pagination">
    <ul v-if="pages>0">
      <li class="first" @click="_changePage(1)"><span>〈</span>首页</li>
      <li v-if="pages>8 && (currentPage-3)>1">...</li>
      <li v-for="i in pages" class="page">
        <div v-if="pages > 8">
          <div v-if="currentPage<=(pages-3) && currentPage>3 && i>=(currentPage-3) && i<=(currentPage+3)"
               :class="[i==currentPage+3 ? 'page-border-right' : '', i==currentPage ? 'active' : '', 'pageBd']" @click="_changePage(i)">
            {{i}}
          </div>
          <div v-if="currentPage>(pages-3) && i>(pages-7)"
               :class="[i==pages ? 'page-border-right' : '', i==currentPage ? 'active' : '', 'pageBd']" @click="_changePage(i)">
            {{i}}
          </div>
          <div v-if="currentPage<=3 && i<8"
               :class="[i==7 ? 'page-border-right' : '', i==currentPage ? 'active' : '', 'pageBd']" @click="_changePage(i)">
            {{i}}
          </div>
        </div>
        <div v-else @click="_changePage(i)"
             :class="[i==pages ? 'page-border-right' : '', i==currentPage ? 'active' : '', 'pageBd']">
          {{i}}
        </div>
      </li>
      <li v-if="pages>8 && (currentPage+3)<pages">...</li>
      <li class="last" @click="_changePage(pages)">尾页<span>〉</span></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      pages: {
        type: Number,
        default: function () {
          return 0
        }
      }
    },
    data(){
      return {
        currentPage: 1
      }
    },
    created(){

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route"(){
        this.currentPage = 1;
      }
    },
    methods: {
      _changePage(i){
        this.currentPage = i
        this.$emit('changePage', i);
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .page-border-right {
    border-right: 0.01rem solid #e2e2e2;
  }

  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    li {
      list-style: none;
      color: #999999;
      padding: 0 0.2rem;
      cursor: pointer;
      font-weight: bold;
      span {
        margin: 0 0.07rem;
        color: #999999;
        font-size: 0.12rem;
      }
    }
    li.page {
      padding: 0;
      .pageBd {
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.4rem;
        color: #999999;
        font-size: 0.15rem;
        font-weight: normal;
        border-top: 0.01rem solid #e2e2e2;
        border-bottom: 0.01rem solid #e2e2e2;
        border-left: 0.01rem solid #e2e2e2;
      }
      .pageBd.active {
        color: #fff;
        background: #999999;
      }
    }
  }
</style>
