import { appStorageService } from '@/services/app-storage'
import { AUTH_TOKEN } from '@/constants'

export const authTokenService = () => {
  const storage = appStorageService()

  async function set(token: string | null): Promise<void> {
    if (token) {
      await storage.set(AUTH_TOKEN, token)
    } else {
      await storage.clearExcept(AUTH_TOKEN)
    }
  }

  async function destroy(): Promise<void> {
    await set(null)
  }

  async function get(): Promise<string | null> {
    return storage.get(AUTH_TOKEN)
  }

  return {
    set,
    destroy,
    get
  }
}
