<template>
  <div class="mArea">
    <ul class="productType">
      <li @click="jump('/manage/info')">企业信息</li>
      <li class="active">企业地址</li>
    </ul>
    <div class="addArea">
      <div class="btn" @click="addArea">新增收货地址</div>
    </div>
    <div class="areas">
      <el-card class="area" v-for="(area,index) in areas" :key="area.id">
        <div class="flex-row">
          <div class="span1 flex-row">
            <div class="name">{{area.receiveName}}</div>
            <div class="default">
              <span v-if="area.isDefault">默认地址</span>
            </div>
          </div>
          <div class="span1 text-right">
            <img class="w-18" @click="delArea(area.id)" src="../../assets/del.png" alt="">
          </div>
        </div>

        <div class="area-body flex-row">
          <div class="title">手机号：</div>
          <div class="span1">{{area.receiveMobile}}</div>
        </div>
        <div class="area-body flex-row">
          <div class="title">所属区域：</div>
          <div class="span1">{{area.provinceName}}{{area.cityName}}</div>
        </div>
        <div class="area-body flex-row">
          <div class="title">详细地址：</div>
          <div class="span1">{{area.address.split('-')[0]}}{{area.address.split('-')[1]}}</div>
        </div>
        <div class="area-footer">
          <span v-if="!area.isDefault" @click="setDefaultArea(area.id, index)">设为默认地址</span>
          <span @click="addArea(index)">编辑</span>
        </div>
      </el-card>

      <area-add :addAreaShow="addAreaShow"
                :defaultArea="area"
                @cancel="addAreaShow = false"
                @saveAfter="saveAreaAfter">
      </area-add>

    </div>
  </div>
</template>

<script>
  import {getUserInfo} from '@/api/manage'
  import {areaAdd} from '@/views/layout'
  import {getAreas, saveArea, delArea} from '@/api/manage'
  export default {
    name: 'mArea',
    components: {
      areaAdd
    },
    data(){
      return {
        areas: [],
        addAreaShow: false,
        area: {}
      }
    },
    created(){
      var _this = this;
      this.getAreas()
    },
    methods: {
      getAreas(){
        var _this = this;
        return getAreas(function (res) {
          _this.areas = res.data
          _this.areas.forEach(function (item) {
            item.area = item.provinceName + item.cityName + item.address
          })
        })
      },
      delArea(id){
        var _this = this;
        if (confirm('确认删除？')) {
          var _this = this;
          return delArea(id, function () {
            _this.getAreas()
          })
        }
      },
      setDefaultArea(id, index){
        /*设置默认地址*/
        var _this = this;
        return saveArea({
          id: id || undefined,
          isDefault: true
        }, function () {
          _this.getAreas();
        })
      },
      addArea(i){
        this.addAreaShow = true;
        if (typeof i == "number") {
          this.area = this.areas[i];
        } else {
          this.area = undefined;
        }
      },
      saveAreaAfter(){
        this.addAreaShow = false;
        this.getAreas();
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mArea {
    display: flex;
    flex-direction: column;
    .productType {
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
    .addArea {
      padding: 0.2rem 0.2rem 0;
      .btn {
        width: 1.3rem;
        padding: 0.04rem 0;
        text-align: center;
        border: 0.01rem solid #888;
        border-radius: 0.05rem;
        cursor: pointer;
      }
    }
    .areas {
      overflow: hidden;
      .area {
        width: 45%;
        height: 2rem;
        margin: 0.2rem 2.4% 0;
        float: left;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .name {
          font-size: 0.18rem;
          padding-right: 0.2rem;
          line-height: 0.4rem;
        }
        .default {
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            display: inline-block;
            height: 0.2rem;
            color: #fff;
            font-size: 0.1rem;
            background: #AEAEAE;
            padding: 0.01rem 0.05rem;
            -webkit-border-radius: 0.03rem;
            -moz-border-radius: 0.03rem;
            border-radius: 0.03rem;
          }
        }
        .area-body {
          * {
            line-height: 0.3rem;
          }
        }
        .area-footer {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          * {
            color: #1171af;
            line-height: 0.3rem;
            margin-left: 0.2rem;
            cursor: pointer;
          }
        }
      }

    }

  }
</style>

