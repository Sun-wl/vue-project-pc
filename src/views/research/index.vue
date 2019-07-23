<template>
  <div class="research">
    <Banner :bannerInfo="bannerInfo"></Banner>
    <Menus :menuList="menuList" :noRouter="noRouter"></Menus>
  </div>
</template>

<script>
  import {Banner, Menus} from '@/views/layout'
  export default {
    name: 'research',
    components: {
      Banner,
      Menus
    },
    data(){
      return {
        bannerInfo: {
          img: '../../../web-static/img/research-banner.jpg',
          title: ['璞耐研究中心']
        },
        menuList:[
          {name: '中心介绍'}
        ],
        noRouter:true
      }
    },
    created(){

    },
    methods: {}

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>

