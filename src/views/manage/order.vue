<template>
  <div class="mOrder">
    <ul class="orderStatus">
      <li :class="type == 3 ? 'active' : ''" @click="getOrder(3)">有效订单</li>
      <li :class="type == 1 ? 'active' : ''" @click="getOrder(1)">已完成订单</li>
      <li :class="type == 2 ? 'active' : ''" @click="getOrder(2)">未生效及取消</li>
    </ul>

    <div class="tableData">
      <el-table :data="orders" border size="small" style="width: 100%" @cell-click="toDetails">
        <el-table-column prop="orderNo" label="订单号" width="150"></el-table-column>
        <el-table-column prop="statusText" label="订单状态" width="120"></el-table-column>
        <el-table-column prop="productName" label="产品"></el-table-column>
        <el-table-column prop="createTime" label="下单时间" width="150"></el-table-column>
        <el-table-column className="look" label="操作" width="120" :formatter="formatter"></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import {getOrders} from '@/api/manage'
  export default {
    name: 'mOrder',
    data(){
      return {
        type: 3,
        orders: [],
      }
    },
    created(){
      this.getOrder(this.type);
    },
    methods: {
      getOrder(type){
        var _this = this;
        this.type = type;
        return getOrders(type, function (res) {
          _this.orders = res.data;
        })
      },
      formatter(row, column){
        return '查看'
      },
      toDetails(row, column, cell, event){
        if (column.className == 'look') {
          this.jump('/manage/orderDetails/'+row.orderNo)
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mOrder {
    .orderStatus {
      display: flex;
      border-top: 0.01rem solid #eee;
      border-bottom: 0.01rem solid #eee;
      border-right: 0.01rem solid #eee;
      li {
        flex: 1;
        list-style: none;
        line-height: 0.4rem;
        font-size: 0.15rem;
        text-align: center;
        border-left: 0.01rem solid #eee;
        background: #F6F6F6;
        cursor: pointer;
      }
      li.active {
        background: #eee;
      }
      li:hover {
        background: #eee;
      }
    }
    .tableData {
      margin-top: 0.2rem;
    }
  }

</style>

