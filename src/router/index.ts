import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomePageView.vue')
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: () => import('@/views/LogInView.vue')
    }
  ]
})

export default router
