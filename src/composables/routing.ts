import { useRouter } from 'vue-router'

export const useRouting = () => {
  const router = useRouter()
  //Global
  async function toHome() {
    return router.push({name: 'home'})
  }

  //Image
  async function toImageManagement() {
    return router.push({name: 'management'})
  }

  async function toImageDevelop(imageId: string | number) {
    return router.push({name: 'develop', params: { imageId: imageId }})
  }

  //User
  async function toLogIn() {
    return router.push({name: 'log-in'})
  }

  async function toUserUpdate() {
    return router.push({name: 'user-update'})
  }

  return {
    //Global
    toHome,

    //Image
    toImageManagement,
    toImageDevelop,

    //User
    toLogIn,
    toUserUpdate
  }
}
