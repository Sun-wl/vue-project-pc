<template>
  <div class="product">
    <Banner :bannerInfo="bannerInfo"></Banner>
    <Menus :menuList="menuList"></Menus>
  </div>
</template>

<script>
  import {Banner, Menus} from '@/views/layout'
  export default {
    name: 'product',
    components: {
      Banner,
      Menus
    },
    data(){
      return {
        bannerHeight: '470px',
        bannerInfo: {
          img: '../../../web-static/img/product-banner1.png',
          title: ['技术', '质量', '速度', '价值'],
          des: [
            '公司倡导以“三个体系、一个目标”为核心的企业文化，通过把高新科技应用到企业运作的各个环节，',
            '建立领先的科技应用体系、可靠的质量保证体系和快速高效的运行体系，致力于为客户提供品质优良和具备高让渡价值的产',
            '品，从而实现客户、合作方、企业和员工多方共赢的目标。'
          ]
        },
        menuList: [
          {
            name: '按主金属查询',
            child: [
              {name: '铂系', path: '/product/index/1/type'},
              {name: '钯系', path: '/product/index/2/type'},
              {name: '铑系', path: '/product/index/4/type'},
              {name: '铱系', path: '/product/index/6/type'},
              {name: '金系', path: '/product/index/3/type'},
              {name: '钌系', path: '/product/index/5/type'}
            ]
          },
          /*{
            name: '按应用行业查询',
            child: [
              {name: '电镀', path: '/product/index/industryType/1'},
              {name: '线路板', path: '/product/index/industryType/2'},
              {name: '尾气净化', path: '/product/index/industryType/3'},
              {name: '医药催化', path: '/product/index/industryType/4'},
              {name: '陶瓷颜料', path: '/product/index/industryType/5'},
              {name: '金属阳极', path: '/product/index/industryType/6'},
              {name: '石油石化', path: '/product/index/industryType/7'},
              {name: '其他', path: '/product/index/industryType/8'}
            ]
          },*/
          {name: '销售支持', path: '/product/sale'},
          {name: '客户服务', path: '/product/customer'}
        ]
      }
    },
    created(){
      this.bannerHeight = document.documentElement.clientWidth / 1920 * 470 + 'px'
    },
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-carousel__indicators {
    bottom: 0.5rem;
  }
</style>

