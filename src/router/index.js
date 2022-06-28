import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '@/views/user/IndexPage.vue'

const routes = [
  {
    path: '/users/:page',
    name: 'home',
    component: IndexPage,
  },
  { path: '/', redirect: '/users/1' },
  { path: '/users', redirect: '/users/1' },
  {
    path: '/user/:id',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/user/SingleView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
