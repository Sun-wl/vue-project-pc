<template>
  <div class="customer">
    <div class="router-title" id="customer">
      <img src="../../assets/icon_customer.png" alt="">
      <div>客户服务</div>
    </div>
    <div class="router-subtitle" id="tel">热线电话</div>
    <div class="router-list">
      <div class="router-list-item">
        <div class="router-list-item-title">+86-21-50753308</div>
      </div>
    </div>
    <div class="router-subtitle" id="appoint">关键约定</div>
    <div class="router-list">
      <div class="router-list-item">
        <div class="router-list-item-title">客户使用标的物前</div>
        <div class="router-list-item-des">
          应随机抽取一批化验，在化验合格后使用，如不经化验使用标的物即表示对标的物质量的认可。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">对数量有异议</div>
        <div class="router-list-item-des">
          不得动用标的物的内包装或使用标的物。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">对数量有异议</div>
        <div class="router-list-item-des">
          必须收货后2个工作日内传真通知我公司。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">对质量存在异议</div>
        <div class="router-list-item-des">
          须在收货后5个工作日内传真通知我公司。
        </div>
      </div>
    </div>
    <div class="router-subtitle" id="feedback">投诉与异议</div>
    <div class="router-list">
      <div class="router-list-item">
        <div class="router-list-item-title">如系包装出现泄漏</div>
        <div class="router-list-item-des">
          客户须向我公司提供标的物的泄漏状况的照片及公函，并在我方确认承担责任后将标的物和发票以适当方式送至我方。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">如系质量争议</div>
        <div class="router-list-item-des">
          双方须就标的物进行采样，然后将样品送至我方认可的分析机构检测，并向我方提供检测报告和公函，并在我方确认承担责任后将标的物和发票以适当方式送至我方。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">如系数量投诉</div>
        <div class="router-list-item-des">
          客户须将标的物以适当方式送回我公司并提供公函，并在我方确认承担责任后将发票以适当方式送至我公司。
        </div>
      </div>
    </div>
    <!--<div class="router-subtitle" id="flow">客服流程</div>
    <div class="p-l-30">
      <div style="font-weight: bold; margin-bottom: 0.2rem;">技术咨询处理流程</div>
      <div class="router-flow" style="margin-bottom: 0.3rem;">
        <div class="router-flow-des">客户技术咨询</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">客户经理填制内部交流单</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">客服部答复内部交流单</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">客户经理答复客户</div>
      </div>
      <div style="font-weight: bold; margin-bottom: 0.2rem;">技术咨询处理流程</div>
      <div class="router-flow">
        <div class="router-flow-des">客户投诉</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">客户经理告知客户所需证据和处理流程</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">双方责任认定</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">双方协商解决方案</div>
        <div class="router-flow-arrow">
          <img src="../../assets/icon_arrow3.png" alt="">
        </div>
        <div class="router-flow-des">双方履行解决方案</div>
      </div>
    </div>-->

  </div>
</template>

<script>
  export default {
    name: 'customer',
    data(){
      return {}
    },
    created(){

    },
    methods: {}
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.router-flow{
  margin-bottom:0.5rem;
}
@media screen and (max-width: 1200px) {
  .router-flow{
     &-arrow{
       padding:0 0.06rem;
     }
   }
}


</style>

