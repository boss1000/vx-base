import Vue from 'vue'
import Router from 'vue-router'

import state from '../store/index';

const Home = () => import('../views/home')
const Build = () => import('../views/build')
const Location = () => import('../views/location')
const Mine = () => import('../views/mine')
Vue.use(Router)

// 解决多次点击重复路由报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  // 解决路由跳转页面没有置顶
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
    path: '/',
    redirect: '/dashboard',
    // 是否数据缓存
    meta: {
      keepAlive: true
    }
  }, {
    // 根页面 
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard'),
    children: [{
      path: '/dashboard',
      redirect: '/dashboard/home',
      // 是否数据缓存
      meta: {
        keepAlive: true
      },
    }, {
      // 主页
      path: 'home',
      name: 'home',
      component: Home,
      // 是否数据缓存
      meta: {
        keepAlive: true
      }
    }, {
      // 楼盘
      path: 'build',
      name: 'build',
      component: Build,
      // 是否数据缓存
      meta: {
        keepAlive: true
      }
    }, {
      // 地图找房
      path: 'location',
      name: 'location',
      component: Location,
      // 是否数据缓存
      meta: {
        keepAlive: true
      }
    }, {
      // 用户中心
      path: 'mine',
      name: 'mine',
      component: Mine,
      // 是否数据缓存
      meta: {
        keepAlive: true
      },
    }, {
      // 最新资讯
      path: 'newInfo',
      name: 'newInfo',
      component: () => import('../views/newInfo'),
      // 是否数据缓存
      meta: {
        keepAlive: true
      }
    }]
  },
  {
    // 注册登录
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  }
  ]
})

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router