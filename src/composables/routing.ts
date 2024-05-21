import { useRouter } from 'vue-router'

export const useRouting = () => {
  const router = useRouter()

  async function toSignIn() {
    return router.push('/sign-in')
  }

  async function toHome() {
    return router.push('/home')
  }

  return {
    toSignIn,
    toHome
  }
}
