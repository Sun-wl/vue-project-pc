/*状态管理*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  accountShow:false     //是否显示登录模态框
}
const mutations = {
  setAccountShow (state, { accountShow }) {
    state.accountShow = accountShow
  }
}


const store = new Vuex.Store({
  state,
  mutations
})


export default store
