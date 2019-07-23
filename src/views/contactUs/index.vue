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
          img: '../../../web-static/img/contact-banner.jpg',
          title: ['联系我们']
        },
        menuList:[
          {name: '联系我们'}
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

