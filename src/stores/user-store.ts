import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useRouting } from '@/composables'
import type { CurrentUser, ErrorResponse, LoginBody, SignUpBody, UserUpdateBody } from '@/models'
import { authTokenService, requestService } from '@/services'
import { useGroupStore } from './group-store'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<CurrentUser | null>(null)

  const routing = useRouting()
  const request = requestService()
  const authToken = authTokenService()
  const groupStore = useGroupStore()

  async function populate(): Promise<void> {
    try {
      const errorResponse: ErrorResponse | null = await retrieveCurrent()
      if (errorResponse) {
        await logout()
      }

      await groupStore.populate()
    } catch (e) {
      console.error(e)
    }
  }

  function setCurrentUser(value: CurrentUser | null): void {
    currentUser.value = value
  }

  async function retrieveCurrent(): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.userRetrieveCurrent()
      if (responseStatus != 200) {
        return responseData as ErrorResponse
      }

      setCurrentUser(responseData as CurrentUser)
      return null
    }

    setCurrentUser(null)
    return null
  }

  async function login(body: LoginBody): Promise<ErrorResponse | null> {
    const [responseData, responseStatus] = await request.login(body);
    if (responseStatus != 200) {
      return responseData as ErrorResponse
    }

    await authToken.set((responseData as CurrentUser).token)
    await populate()
    return null
  }

  async function signup(body: SignUpBody): Promise<ErrorResponse | null> {
    const [responseData, responseStatus] = await request.signup(body);
    if (responseStatus != 201) {
      return responseData as ErrorResponse
    }

    await authToken.set((responseData as CurrentUser).token)
    await populate()
    return null
  }

  async function update(body: UserUpdateBody): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.userUpdate(body);
      if (responseStatus != 200) {
        return responseData as ErrorResponse
      }
    }

    await populate()
    return null
  }

  async function logout(): Promise<void> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.logout();
      if (responseStatus != 200) {
        console.error(responseData as ErrorResponse)
      }

      authToken.destroy()
    }

    routing.toLogIn()
    await populate()
  }

  return {
    currentUser,
    populate,
    setCurrentUser,
    retrieveCurrent,
    login,
    signup,
    update,
    logout,
  }
})
