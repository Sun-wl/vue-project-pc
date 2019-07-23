import store from './store'
import router from './router'
import {getToken, setUri} from '@/utils/auth'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start()
  if(to.path.indexOf('manage') >= 0){
    if (getToken()) {
      next();
    } else {
      NProgress.done();
      setUri(to.path);
      store.commit('setAccountShow', {
        accountShow:true
      })
    }
  }else{
    next();
  }

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
