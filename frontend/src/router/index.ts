import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/:key',
    name: 'watch',
    component: () => import('@/views/Watch.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
  // {
  //   path: '/history',
  //   name: 'history',
  //   component: () => import('@/views/History.vue')
  // },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/Upload.vue')
  },
  {
    path: '/mylist',
    name: 'mylist',
    component: () => import('@/views/Mylist.vue')
  },
  {
    path: '/mylist/:key',
    name: 'mylist.modify',
    component: () => import('@/views/Modify.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router