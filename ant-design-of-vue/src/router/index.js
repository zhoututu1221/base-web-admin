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
        name: 'List',
        component: () => import('../views/List.vue'),
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../views/List.vue'),
      },
      {
        path: '/res',
        name: 'Res',
        component: () => import('../views/Res.vue'),
      },
    ],
  }
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
