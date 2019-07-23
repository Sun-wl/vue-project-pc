import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import locales from '@/locales/'
import App from './App'
import router from './router'
import mixins from './mixins'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import '@/mixins/rem.js'  //自适应字体

Vue.mixin(mixins)
Vue.use(VueI18n)
Vue.use(ElementUI)


Vue.config.productionTip = false
Vue.config.lang = 'zh'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
export default new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

