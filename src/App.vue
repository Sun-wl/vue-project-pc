<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
    <main-footer></main-footer>

    <div v-if="accountShow">
      <account-login :loginShow="loginShow"
                     :regShow="regShow"
                     :resShow="resShow"
                     @close="close"
                     @toLogin="toLogin"
                     @toReg="toReg"
                     @toRes="toRes">

      </account-login>
    </div>
  </div>
</template>

<script>
  import {Navbar, mainFooter, accountLogin} from '@/views/layout'
  export default {
    name: 'app',
    components: {
      Navbar,
      mainFooter,
      accountLogin
    },
    data(){
      return {
        loginShow: true,
        regShow: false,
        resShow: false
      }
    },
    computed: {
      accountShow(){
        return this.$store.state.accountShow;
      }
    },
    created(){

    },
    methods: {
      setAccountShow(accountShow){
        this.$store.commit('setAccountShow', {
          accountShow: accountShow
        })
      },
      close(){
        this.setAccountShow(false);
        this.loginShow = true;
        this.regShow = false;
        this.resShow = false;
      },
      toLogin(){
        this.regShow = false;
        this.loginShow = true;
      },
      toReg(){
        this.loginShow = false;
        this.regShow = true;
      },
      toRes(){
        this.loginShow = false;
        this.resShow = true;
      }
    }
  }
</script>

<style lang="scss">
  @import './styles/index.scss';
  @import './styles/common.scss';

  * {
    font-size: 0.14rem;
    color: #333333;
  }
</style>
