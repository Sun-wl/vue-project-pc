<template>
  <div class="contactUs">
    <div class="router-title">
      <img src="../../assets/icon-22.png" alt="">
      <div>联系我们</div>
    </div>
    <div class="info">
      <div :class="[index%2==0 ? 'bg-f7' : '', 'infoBd']" v-for="(item,index) in infos">
        <div class="title">{{item.name}}</div>
        <div class="des">{{item.des}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contactUs',
    data(){
      return {
        infos: [
          {name: '公司全称', des: '上海久岳化工有限公司'},
          {name: '地址', des: '上海市浦东金桥路1398号金台大厦503室'},
          {name: '电话', des: '021-50753020'},
          {name: '传真', des: '021-50753199'},
          {name: '邮编', des: '200136'},
          {name: '销售信箱', des: 'sales@pgmchina.com'},
          {name: '人事信箱', des: 'hr@pgmchina.com'},
          {name: '公司帐号', des: '100281209006764584'},
          {name: '开户行', des: '工行浦东开发区支行'},
          {name: '公司税号', des: '310115778514192'}
        ]
      }
    },
    created(){

    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .bg-f7 {
    background: #F7F7F7;
  }

  .info {
    padding: 0.4rem 0;
    .infoBd{
      display: flex;
      flex-direction: row;
      padding:0.2rem 0;
      .title{
        font-weight:bold;
        width:2rem;
        padding-left:0.2rem;
      }
      .des{
        color: #777777;
      }
    }

  }
</style>

