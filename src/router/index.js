import Vue from 'vue'
import Router from 'vue-router'

import state from '../store/index';
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
        redirect: '/dashboard/project',
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
      }, {
        // 项目
        path: 'project',
        name: 'project',
        component: () => import('../views/project'),
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      }, {
        // 账号
        path: 'account',
        name: 'account',
        component: () => import('../views/account'),
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      }, {
        // 数据
        path: 'location',
        name: 'location',
        component: () => import('../views/location'),
        // 是否数据缓存
        meta: {
          keepAlive: true
        }
      }, {
        // 用户中心
        path: 'mine',
        name: 'mine',
        component: () => import('../views/mine'),
        // 是否数据缓存
        meta: {
          keepAlive: true
        },
      }]
    }, {
      // 项目报备
      path: '/report',
      name: 'report',
      component: () => import('../views/reportproject/report.vue')
    }, {
      // 项目报备
      path: '/projectdetail',
      name: 'projectdetail',
      component: () => import('../views/projectdetail/index.vue')
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