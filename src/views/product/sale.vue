<template>
  <div class="sale">
    <div class="router-title" id="sale">
      <img src="../../assets/icon_sale.png" alt="">
      <div>销售支持</div>
    </div>
    <div class="router-subtitle" id="tel">热线电话</div>
    <div class="router-list">
      <div class="router-list-item">
        <div class="router-list-item-title">首次询价客户</div>
        <div class="router-list-item-des">+86-21-50753020</div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">老客户</div>
        <div class="router-list-item-des">请联系为贵公司服务的客户经理</div>
      </div>
    </div>
    <div class="router-subtitle" id="appoint">关键约定</div>
    <div class="router-list">
      <div class="router-list-item">
        <div class="router-list-item-title">销售价格</div>
        <div class="router-list-item-des">
          随贵金属行情随时调整 由于产品的主原料为贵金属并且贵金属行情时刻都在波动，主原料成本决定了产品成本，因此我们随着贵金属行情波动每日调整产品销售价格。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">批量折扣</div>
        <div class="router-list-item-des">
          由于主原料损耗比率决定于生产批量，并且我公司以支持生产型客户的采购为己任，因此我们针对不同的订货量给予不同的价格。
        </div>
      </div>
      <div class="router-list-item">
        <div class="router-list-item-title">结算方式</div>
        <div class="router-list-item-des">
          我们以银行转账、贷记凭证（上海市区域）、电汇、银行本票为主要结算方式。如客户采用银行承兑汇票与我公司结算，双方确定交货期时，必须考虑银行承兑汇票的询征期（一般三天）。客户必须提前四天将银行承兑汇票寄至我公司财务部，由我公司财务部向汇票开户行行询征，以验证承兑汇票的真实性。由于行业运作特点，我方不可接受客户对账期的要求。
        </div>
      </div>
      <!--<div class="router-list-item">
        <div class="router-list-item-title">交货日期</div>
        <div class="router-list-item-des">
          <div>在产品目录里面，我们给出了产品的生产周期，但并不是所有订单都必须订制。</div>
          <div>常规产品：对于100克以内的订单，可以随时供货。</div>
          <div>非常规产品：为了保证质量和生产批量，我方要求客户在最低定购量（500克）以上订货方可安排生产。</div>
          <div>长期签约客户：客户提供预付款，我们按客户通知提前安排生产，款到齐后发货。</div>
          <div>非长期签约客户：对于100克以上的订单，必须在款到我公司之日算起，生产周期以后发货（实际到货可能还要延长1-3天）。但如果公司有足够库存，可以在客户款到之后即予发货。</div>
        </div>
      </div>-->
      <div class="router-list-item">
        <div class="router-list-item-title">交货方式</div>
        <div class="router-list-item-des">陆路运输
          <!--<div>EMS</div>
          <div>中通快递</div>
          <div>中铁快运</div>
          <div>送货（批量在1000g以上，300公里以内）</div>-->
        </div>
      </div>
    </div>
    <!--<div class="router-subtitle" id="flow">业务流程</div>
    <div class="router-flow">
      <div class="router-flow-des">客户询价</div>
      <div class="router-flow-arrow">
        <img src="../../assets/icon_arrow3.png" alt="">
      </div>
      <div class="router-flow-des">销售报表</div>
      <div class="router-flow-arrow">
        <img src="../../assets/icon_arrow3.png" alt="">
      </div>
      <div class="router-flow-des">达成约定</div>
      <div class="router-flow-arrow">
        <img src="../../assets/icon_arrow3.png" alt="">
      </div>
      <div class="router-flow-des">签订合同</div>
      <div class="router-flow-arrow">
        <img src="../../assets/icon_arrow3.png" alt="">
      </div>
      <div class="router-flow-des">销售下单</div>
      <div class="router-flow-arrow">
        <img src="../../assets/icon_arrow3.png" alt="">
      </div>
      <div class="router-flow-des">客户付款</div>
      <div class="router-flow-arrow">
        <img src="../../assets/icon_arrow3.png" alt="">
      </div>
      <div class="router-flow-des">生产或发货</div>
    </div>-->
  </div>
</template>

<script>
  export default {
    name: 'sale',
    data(){
      return {
          flow:['客户询价','销售报表','达成约定','签订合同','销售下单','客户付款','生产或发货']
      }
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
</style>

