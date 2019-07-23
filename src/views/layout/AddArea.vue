<template>
  <div class="AddArea">
    <el-dialog title="新增收货地址" width="5rem" :visible.sync="addAreaShow" :close-on-click-modal="false"
               :show-close="false">
      <el-form :model="area">
        <el-form-item label="联系人" label-width="1rem">
          <el-input size="small" v-model="area.receiveName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="1rem">
          <el-input size="small" v-model="area.receiveMobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" label-width="1rem">
          <el-cascader
            size="small"
            :options="provinces"
            v-model="area.quyu">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="1rem">
          <el-input type="textarea" v-model="area.addr" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <div class="cancel" @click="_cancel">取 消</div>
          <div class="sure" @click="saveArea(area.id)">保 存</div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AMap from 'AMap'
  import {Message} from 'element-ui'
  import {saveArea} from '@/api/manage'
  export default {
    name: 'AddArea',
    data(){
      return {
        provinces: [],        //所有城市
      }
    },
    props: {
      addAreaShow: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      defaultArea: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    computed: {
      area(){
        var obj = {
          receiveName: '',
          receiveMobile: '',
          quyu: [],
          addr: '',
          isDefault: false
        }
        if (this.defaultArea.id) {
          obj = {
            id: this.defaultArea.id,
            receiveName: this.defaultArea.receiveName,
            receiveMobile: this.defaultArea.receiveMobile,
            quyu: [this.defaultArea.provinceName, this.defaultArea.cityName, this.defaultArea.address.split('-')[0]],
            addr: this.defaultArea.address.split('-')[1],
            isDefault: this.defaultArea.isDefault
          }
        }
        return obj
      }
    },
    created(){
      this.provincesInit();

    },
    methods: {
      provincesInit(){
        /*使用高德地图获取3级*/
        var _this = this;
        AMap.service('AMap.DistrictSearch', function () {//回调函数
          //实例化DistrictSearch
          var districtSearch = new AMap.DistrictSearch({
            level: 'country',
            subdistrict: 3
          });
          districtSearch.search('中国', function (status, result) {
            var provinces = result.districtList[0].districtList;
            _this.provinces = [];
            provinces.forEach(function (province, index) {
              _this.provinces.push({
                label: province.name,
                value: province.name,
                children: []
              })
              if (province.districtList && province.districtList.length) {
                province.districtList.forEach(function (city, i) {
                  _this.provinces[index].children.push({
                    label: city.name,
                    value: city.name,
                    children: []
                  })
                  if (city.districtList && city.districtList.length) {
                    city.districtList.forEach(function (item, j) {
                      _this.provinces[index].children[i].children.push({
                        label: item.name,
                        value: item.name
                      })
                    })
                  } else {
                    _this.provinces[index].children[i].children = undefined
                  }
                })
              } else {
                _this.provinces[index].children = undefined
              }

            })
          })
        })
      },
      saveArea(id){
        /*保存地址*/
        var _this = this;
        return saveArea({
          id: id || undefined,
          provinceName: _this.area.quyu[0],
          cityName: _this.area.quyu[1] || '',
          address: _this.area.quyu[2] ? _this.area.quyu[2] + '-' + _this.area.addr : '-' + _this.area.addr,
          receiveName: _this.area.receiveName,
          receiveMobile: _this.area.receiveMobile,
          isDefault: _this.area.isDefault
        }, function () {
          _this.$emit('saveAfter');
        })
      },
      _cancel(){
        this.$emit('cancel');
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .el-cascader, .el-input, .el-textarea {
    width: 3rem;
  }

  .dialog-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    & > * {
      cursor: pointer;
      width: 1rem;
      text-align: center;
      line-height: 0.3rem;
      margin: 0 0.1rem;
      -webkit-border-radius: 0.05rem;
      -moz-border-radius: 0.05rem;
      border-radius: 0.05rem;
    }
    .cancel {
      border: 0.01rem solid #ccc;
    }
    .sure {
      background: #1171af;
      color: #fff;
      border: 0.01rem solid #1171af;
    }
  }
</style>
