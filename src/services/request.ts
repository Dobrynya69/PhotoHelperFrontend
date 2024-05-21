import { apiService } from '@/services/api'
import type { CurrentUser, LoginBody } from '@/models'

export const requestService = () => {
  const api = apiService()

  async function login(body: LoginBody): Promise<CurrentUser> {
    return api.post('users/login/ ', body)
  }

  async function getCurrentUser(): Promise<CurrentUser> {
    return api.get('users/')
  }

  async function logout(): Promise<void> {
    api.del('users/')
  }

  return {
    login,
    getCurrentUser,
    logout
  }
}
