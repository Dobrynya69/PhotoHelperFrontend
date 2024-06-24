import { authTokenService } from '@/services'
import { createRouter, createWebHistory } from 'vue-router'
const authToken = authTokenService()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Global
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePageView.vue'),
      meta: {auth: false}
    },

    //Image
    {
      path: '/management',
      name: 'management',
      component: () => import('@/views/ManagementView.vue'),
      meta: {auth: true}
    },
    {
      path: '/develop/:imageId',
      name: 'develop',
      component: () => import('@/views/ImageDevelopView.vue'),
      meta: {auth: true}
    },

    //User
    {
      path: '/log-in',
      name: 'log-in',
      component: () => import('@/views/LogInView.vue'),
      meta: {auth: false}
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/views/SignUpView.vue'),
      meta: {auth: false}
    },
    {
      path: '/user/update',
      name: 'user-update',
      component: () => import('@/views/UserConfigurationView.vue'),
      meta: {auth: true}
    }
  ]
})

router.beforeEach(async to => {
  try {
     const metaAuth: boolean = (to.meta as any).auth as boolean
     const authTokenValue: string | null = await authToken.get()

     if (typeof metaAuth as any !== 'boolean') {
        return true
     }

     if (!authTokenValue && metaAuth) {
        return {name: 'log-in'}
     }

     return true
  } catch (e) {
     console.error(e)
     return false
  }
})

export default router
