<template>
  <div class="sidebar">
    <div class="menuUl">
      <div class="menuLi title">
        <div class="menuLi-text span1">菜单</div>
        <div class="menuLi-icon">
          <img src="../../assets/icon_menu.png" class="icon_menu" alt="">
        </div>
      </div>
      <div v-for="(item,index) in menuList">
        <div class="subMenuUl" v-if="item.child && item.child.length">
          <div :class="[openUlIndex==index && openLiIndex==index ? 'active' : '', 'subMenuLi']"
               @click="_ulClick(index, item.path)">
            <div class="menuLi-text span1">{{item.name}}</div>
            <div class="menuLi-icon active" v-if="openUlIndex==index">▲</div>
            <div class="menuLi-icon" v-else>▲</div>
          </div>
          <div v-for="(child,i) in item.child" v-if="openUlIndex==index" @click="_liClick(i, child.path)"
               :class="[openLiIndex==index+'-'+i ? 'active' : '', 'subMenuLi', 'subMenuLiBd']">
            <div class="menuLi-text span1">{{child.name}}</div>
          </div>
        </div>

        <div :class="[openUlIndex==index && openLiIndex==index ? 'active' : '', 'subMenuLi']"
             @click="_ulClick(index, item.path)" v-else>
          <div class="menuLi-text span1">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        unique: true,
        openUlIndex: 'a',
        openLiIndex: 'a'
      }
    },
    props: {
      menuList: {
        type: Array,
        default: function () {
          return []
        }
      },
      noRouter: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    created(){
      this.changeUlLi()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": 'changeUlLi'
    },
    methods: {
      changeUlLi(){
        var _this = this;
        this.menuList.forEach(function (item, index) {
          if (item.child) {
            item.child.forEach(function (i, j) {
                console.log(_this.$route.path, i.path)
              if (_this.$route.path == i.path) {
                _this.openUlIndex = '' + index;
                _this.openLiIndex = _this.openUlIndex + '-' + j;
              }
            })
          } else {
            if (_this.$route.path == item.path) {
              _this.openUlIndex = '' + index;
              _this.openLiIndex = _this.openUlIndex;
            }
          }

        })
      },
      _ulClick(i, path){
        if (this.noRouter) {
          return
        }
        if (this.openLiIndex.split('-')[0] == i && this.menuList[i].child) {
          this.openUlIndex = 'a';
          this.openLiIndex = 'a';
        } else {
          this.openUlIndex = i + '';
          this.openLiIndex = i + '';
          if (path) {
            this.jump(path)
          }
        }
      },
      _liClick(i, path){
        if (this.noRouter) {
          return
        }
        this.openLiIndex = this.openUlIndex + '-' + i;
        this.jump(path)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .sidebar {
    width: 2.7rem;
    .menuUl {
      font-weight: bold;
      border-bottom: 0.01rem solid #e2e2e2;
      .menuLi {
        border-top: 0.01rem solid #e2e2e2;
        background-color: #F0F0F2;
        padding: 0 0.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 0.5rem;
      }
      .menuLi.title {
        background: #000;
        height: 0.7rem;
        .menuLi-text {
          color: #fff;
        }
      }
      .subMenuLi {
        width: 100%;
        height: 0.6rem;
        padding: 0 0.2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #F0F0F2;
        border-top: 0.01rem solid #e2e2e2;
        cursor: pointer;
      }
      .subMenuLi.active {
        background: #ebae19;
      }
      .subMenuLi.subMenuLiBd {
        background: #fff;
      }
      .subMenuLi.subMenuLiBd.active {
        background: #ebae19;
      }
      .menuLi-icon {
        font-size: 0.12rem;
        transform: rotate(180deg);
      }
      .menuLi-icon.active {
        font-size: 0.12rem;
        transform: rotate(0deg);
      }
    }
  }
</style>
