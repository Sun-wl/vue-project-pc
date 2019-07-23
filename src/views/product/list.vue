<template>
  <div class="productList">
    <ul>
      <li v-for="(item,index) in products"
          :class="[index%3==2 || index==products.length-1 ? 'border-right' : '' , 'product']">
        <div class="product-img">
          <img :src=" baseUrl + item.imgSrc " alt="">
        </div>
        <div class="product-name">{{item.name}}</div>
        <div class="product-des">
          <div class="des">
            <div class="title">产品描述</div>
            <div class="info">
              <div v-for="i in item.des">{{i}}</div>
            </div>
            <!--<div class="buy">
              <button>订购</button>
            </div>-->
          </div>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <Pagination :pages="pages" @changePage="changePage"></Pagination>
    </div>

  </div>
</template>

<script>
  import {Pagination} from '@/views/layout'
  import {products} from '@/api/product'
  import {baseUrl} from '@/utils/fetch'
  import {replaceSeperator} from '@/utils/validate'
  export default {
    name: 'productList',
    components: {
      Pagination
    },
    data(){
      return {
        products: [],
        baseUrl: baseUrl,
        pages: 0,
        type: 0,
        industryType: 0
      }
    },
    created(){
      this.changePage(1)
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route"(){
        this.changePage(1)
      }
    },
    methods: {
      changePage(currentPage){
        var _this = this;
        this.type = +this.$route.params.type;
        this.industryType = +this.$route.params.industryType;
        products({
          type: this.type || undefined,
          industryType: this.industryType || undefined,
          start: (currentPage - 1) * 12,
          length: 12
        }, function (res) {
          _this.products = res.data;
          _this.products.forEach(function (item, index) {
            item.des = item.remark.split('\n');
          })
          _this.pages = Math.ceil(res.recordsTotal / 12);
        });
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .productList {
    ul {
      overflow: hidden;
      width: 100%;
      min-height: 7rem;
      li.product {
        list-style: none;
        border-top: 0.01rem solid #e2e2e2;
        border-bottom: 0.01rem solid #e2e2e2;
        border-left: 0.01rem solid #e2e2e2;
        float: left;
        width: 3rem;
        margin-bottom: 0.1rem;
        position: relative;
        .product-img {
          width: 2.98rem;
          height: 2.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F6F6F6;
          img {
            height: 60%;
          }
        }
        .product-name {
          text-align: center;
          font-size: 0.16rem;
          font-weight: bold;
          padding: 0.5rem;
        }
        .product-des {
          display: none;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          .des {
            width: 92%;
            height: 94%;
            margin-left: 4%;
            margin-top: 4%;
            background: rgba(27, 40, 79, 0.95);
            position: relative;
            .title {
              color: #fff;
              font-size: 0.16rem;
              font-weight: bold;
              text-align: center;
              padding-top: 0.25rem;
              padding-bottom: 0.12rem;
            }
            .info {
              padding: 0 0.18rem 0 0.45rem;
              div {
                font-size: 0.1rem;
                color: #fff;
                line-height: 0.17rem;

              }
            }
            .buy {
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
              text-align: center;
              padding: 0.18rem 0;
              button {
                background: #ebae19;
                border: none;
                color: #fff;
                width: 0.8rem;
                height: 0.25rem;
                font-size: 0.12rem;
              }
            }
          }

        }
      }
      @media screen and (max-width: 1200px) {
        li.product {
          width: 2.7rem;
          .product-img {
            width: 2.68rem;
            height: 2.9rem;
          }
          .product-des {
            .des {
              .info {
                padding: 0 0.2rem;
                * {
                  line-height: 0.18rem;
                }
              }
            }
          }
        }
      }
      li.product:hover {
        .product-des {
          display: block;
        }
      }
    }
    .pagination {
      text-align: center;
      padding-top: 0.5rem;

    }
  }
</style>

