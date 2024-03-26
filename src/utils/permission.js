import NProgress from 'nprogress'   // 导入 nprogress
import 'nprogress/nprogress.css'
import router from '../router/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
NProgress.configure({ showSpinner: true })   // 显示右上角螺旋加载提示


const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken() !== 'Token') { //路由守卫不生效
    if (to.path === '/login') {
      next({ path: '/index' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
