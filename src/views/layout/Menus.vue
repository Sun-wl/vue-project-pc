<template>
  <div class="menus">
    <Sidebar :menuList="menuList" :noRouter="noRouter"></Sidebar>
    <div class="gap"></div>
    <router-view class="menus-ctn"></router-view>
  </div>
</template>

<script>
  import {Sidebar} from '@/views/layout'
  export default {
    components: {
      Sidebar
    },
    props: {
      menuList: {
        type: Array,
        default: function () {
          return []
        }
      },
      noRouter: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    data(){
      return {

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menus {
    width: 11rem;
    margin: 0 auto;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: row;
    .gap{
      width:0.2rem;
    }
    &-ctn{
      flex:1;
    }
  }

  @media screen and (min-width: 1200px) {
    .menus{
      width: 12rem;
    }
  }
</style>
