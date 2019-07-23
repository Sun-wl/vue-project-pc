<template>
  <div class="manage">
    <Menus :menuList="menuList"></Menus>
  </div>
</template>

<script>
  import {Menus} from '@/views/layout'
  export default {
    name: 'manage',
    components: {
      Menus
    },
    data(){
      return {
        menuList: [
          {name: '产品报价',path: '/manage/productList'},
          {name: '待定产品',path: '/manage/confirm'},
          {name: '企业订单', path: '/manage/order'},
          {name: '企业资料',path: '/manage/info'}
        ]
      }
    },
    created(){

    },
    mounted () {

    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-carousel__indicators{
  bottom:0.5rem;
}
</style>

