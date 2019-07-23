<template>
  <div class="company">
    <Banner :bannerInfo="bannerInfo" :logoShow="logoShow"></Banner>
    <div class="company-bd1">
      <div v-for="(item,idx) in companyInfo1" :class="[idx==0 ? 'm-b-50' : '','flex-row']">
        <div v-for="(i,index) in item" :class="[index==0 ? 'm-r-100' : '','span1','flex-row','com-detail']">
          <div class="flex-column">
            <div class="com-detail-img">
              <img :src="i.img" alt="">
            </div>
            <div class="com-detail-title">{{i.name}}</div>
            <div class="com-detail-line"></div>
            <div class="com-detail-des">{{i.des}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="company-bd2">
      <img src="../../assets/icon_company2.png" class="w-all" alt="">
      <div class="flex-row company-bd2-ctn">
        <div class="com-detail span1 flex-column center" v-for="item in companyInfo2">
          <div class="box">
            <div></div>
          </div>

          <div class="flex-column com-detail-ctn">
            <div class="com-detail-img">
              <img :src="item.img" alt="">
            </div>
            <div class="com-detail-title">{{item.name}}</div>
            <div class="com-detail-line"></div>
            <div class="com-detail-des">{{item.des}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Banner, Menus} from '@/views/layout'
  export default {
    name: 'company',
    components: {
      Banner
    },
    data(){
      return {
        bannerInfo: {
          img: '../../../web-static/img/company-banner.jpg',
          title: ['公司简介']
        },
        logoShow: true,
        companyInfo1: [
          [
            {
              name: '相关业务',
              des: '上海久岳化工有限公司多年来一直从事贵金属及贵金属化合物系列产品的相关业务。 公司以上海久岳为核心，另外投资设立了上海璞耐环保科技有限公司和湖州久岳新材料有限公司。',
              img: '../../../web-static/img/icon-12.png'
            },
            {
              name: '“久”系列产品',
              des: '“久”上海久岳化工有限公司“久”系列贵金属化合物及催化剂产品广泛应用于电镀、电子信息、陶瓷、医药、石油化工、精细化工等领域，在业内享有骄人的声誉；“久”系列高纯试剂被众多高校和科研单位作为指定的实验试剂。',
              img: '../../../web-static/img/icon-13.png'
            }
          ],
          [
            {
              name: '各公司地理位置分布',
              des: '上海璞耐环保科技有限公司设在上海张江药谷，主要开展贵金属化合物、贵金属多功能材料和贵金属催化剂的研发工作。湖州久岳新材料有限公司设在浙江湖州经济开发区，已建成国内规模最大的贵金属化合物、贵金属多功能材料和贵金属催化剂生产基地。上海久岳化工有限公司设在上海浦东金桥，为客户提供技术咨询、价格咨询和产品销售等一站式的集成服务。',
              img: '../../../web-static/img/icon-14.png'
            },
            {
              name: '公司立足点',
              des: '上海久岳化工有限公司立足产学研结合，推进我国贵金属化工技术产业化；立足现代信息管理技术，推进贵金属行业及时供货；立足多年的贵金属市场经验，推动国内贵金属市场的价格透明化。上海久岳化工有限公司坚持客户营销理念，重视与客户的长期合作和利益共享，已经与多个相关行业的主流客户构建了长期联盟关系。',
              img: '../../../web-static/img/icon-15.png'
            }
          ]
        ],
        companyInfo2: [
          {
            name: '快速高效的运行体系',
            des: '持续提高运营能力，持续缩短供货周期，持续加快市场反馈',
            img: '../../../web-static/img/icon_wheel.png'
          },
          {
            name: '多方共赢的目标',
            des: '多方共赢的目标',
            img: '../../../web-static/img/icon_handshake.png'
          },
          {
            name: '领先的科技应用体系',
            des: '以ERP为基础的管理系统，开放共享的知识管理平台，与高校及科研院所长期合作，致力于推进科研成果产业化',
            img: '../../../web-static/img/icon_cup.png'
          },
          {
            name: '可靠的质量保证体系',
            des: '高素质的员工，高品质的工作，完善的质保体系，全程无忧服务',
            img: '../../../web-static/img/icon_tick.png'
          }
        ]
      }
    },
    created(){

    },
    methods: {}

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .company {
    font-size: 0;
    .company-bd1 {
      width: 12rem;
      margin: 0 auto;
      padding: 0.7rem;
      background: rgba(255, 255, 255, 0.9);
      .com-detail {
        &-img img {
          width: 0.6rem;
        }
        &-title {
          font-size: 0.15rem;
          font-weight: bold;
          line-height: 0.45rem;
        }
        &-line {
          width: 0.3rem;
          border-top: 0.015rem solid #ebae19;
        }
        &-des {
          color: #777777;
          line-height: 0.25rem;
          padding: 0.2rem 0;
          font-size: 0.14rem;
        }
      }
    }
    .company-bd2 {
      font-size: 0;
      position: relative;
      .company-bd2-ctn {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        .com-detail {
          padding: 0 0.3rem;
          position: relative;
          & > * {
            width: 100%;
            align-items: center;
            height: 2.05rem;
          }
          &-ctn{
            z-index: 1;
          }
          &-img img {
            width: 0.6rem;
          }
          &-title {
            font-size: 0.15rem;
            font-weight: bold;
            line-height: 0.45rem;
            color: #fff;
          }
          &-line {
            width: 0.3rem;
            border-top: 0.015rem solid #ebae19;
          }
          &-des {
            color: rgba(255, 255, 255, 0.85);
            line-height: 0.25rem;
            padding: 0.2rem 0;
            font-size: 0.14rem;
            text-align: center;
          }
          & > .box {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            div {
              width: 1.5rem;
              height: 1.5rem;
              border: 0.1rem solid rgba(255, 255, 255, 0.1);
            }
          }
        }
      }
    }
  }
</style>

