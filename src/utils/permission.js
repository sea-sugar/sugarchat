import NProgress from 'nprogress'   // 导入 nprogress
import 'nprogress/nprogress.css'
import router from '../router/index'
import store from '../store/index'
import { getToken } from '@/utils/auth'
NProgress.configure({ showSpinner: true })   // 显示右上角螺旋加载提示


const whiteList = ['/login','/register']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) { 
    //有token
    if (whiteList.includes(to.path)) {
      next({ path: '/index' })
      NProgress.done()
    } 
    else {
      store.dispatch('GetInfo').then(res => {
        next();
        NProgress.done()
      })
      .catch(err => {
        console.log(err);
        store.dispatch('LogOut').then(() => {
          next({ path: '/login' })
          NProgress.done()
        }).catch(err =>{
          console.log(err);
        })
      })
    } 
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next()
      NProgress.done()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
