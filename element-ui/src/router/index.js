import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
      }, 

      // video部分
      // 若无子菜单，可直接访问该菜单
      {
        path: '/video',
        name: 'Video',
        component: () => import('../views/video/Index.vue'),
      },
      // 子菜单路由
      {
        path: '/video/new',
        name: 'VideoNew',
        component: () => import('../views/video/New.vue'),
      },
      {
        path: '/video/hot',
        name: 'VideoHot',
        component: () => import('../views/video/Hot.vue'),
      },
      {
        path: '/video/conn',
        name: 'VideoConn',
        component: () => import('../views/video/Conn.vue'),
      },

      // user部分
      // 若无子菜单，可直接访问该菜单
      {
        path: '/user',
        name: 'User',
        component: () => import('../views/user/Index.vue'),
      },
      // 子菜单路由
      {
        path: '/user/search',
        name: 'UserSearch',
        component: () => import('../views/user/Search.vue'),
      },
      {
        path: '/user/setting',
        name: 'UserSetting',
        component: () => import('../views/user/Setting.vue'),
      },

      // 无子菜单部分
      {
        path: '/look',
        name: 'Look',
        component: () => import('../views/look/Index.vue'),
      },
      {
        path: '/notice',
        name: 'Notice',
        component: () => import('../views/notice/Index.vue'),
      },
      {
        path: '/file',
        name: 'File',
        component: () => import('../views/file/Index.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

// 解决重复点击报错问题
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
