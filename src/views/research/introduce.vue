<template>
  <div class="research">
    <div class="router-title">
      <img src="../../assets/icon-20.png" alt="">
      <div>中心介绍</div>
    </div>
    <div class="router-list" style="margin-top: 0.4rem;">
      <div class="router-list-item">
        <div class="router-list-item-des">久岳化工一贯坚持与高效和科研院所建立产学研联盟、以技术应用求发展的战略，投资设立了璞耐研究中心。研究中心拥有一个以新催化剂的制备、现有催化剂性能的优化和建立新催化反应为研究目的的科研创新团队，每年有众多的研究成果以论文和专利形式发表公开，在催化领域具有雄厚的科研实力。</div>
      </div>
    </div>
    <div class="router-subtitle">科研项目</div>
    <div class="router-list">
      <div class="router-list-item" style="flex-direction: column">
        <div class="router-list-item-title" style="width: 100%;">微囊型、包埋型等新型贵金属催化剂项目，主要进行下述研究：</div>
        <div class="router-list-item-des" style="padding-left: 0.55rem;">
          贵金属催化剂的沸石和高分子微囊化及包埋的研究<br>
          微囊化和包埋条件的优化<br>
          催化剂合成规模的扩大<br>
          系列精细有机反应的活性表征<br>
        </div>
      </div>
    </div>
    <div class="router-subtitle">设备照片</div>
    <div class="equipment">
      <div class="equipmentCtn" v-for="item in equipments">
        <img :src="item.img" alt="">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'research',
    data(){
      return {
        equipments:[
          {name:'紫外分光光度计',img:'../../../web-static/img/equipment1.png'},
          {name:'溶剂净化装置',img:'../../../web-static/img/equipment2.png'},
          {name:'真空线',img:'../../../web-static/img/equipment3.png'},
          {name:'比表面测定仪',img:'../../../web-static/img/equipment4.png'},
          {name:'手套箱',img:'../../../web-static/img/equipment5.png'}
        ]
      }
    },
    created(){

    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.equipment{
  overflow: hidden;
  .equipmentCtn{
    float: left;
    width:33.33%;
    border:0.01rem solid #e2e2e2;
    img{
      width:100%;
    }
    div{
      text-align: center;
      padding:0.2rem;
      font-weight:bold;
    }
  }
}
</style>

