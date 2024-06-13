import { useRouter } from 'vue-router'

export const useRouting = () => {
  const router = useRouter()

  async function toLogIn() {
    return router.push({name: 'log-in'})
  }

  async function toHome() {
    return router.push({name: 'home'})
  }

  async function toUserUpdate() {
    return router.push({name: 'user-update'})
  }

  return {
    toLogIn,
    toHome,
    toUserUpdate
  }
}
