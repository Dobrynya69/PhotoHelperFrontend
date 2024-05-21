import { apiService } from '@/services/api'

export const utilsService = () => {
  function getErrorMessage(error: any): string {
    const defaultError: string = 'Unknown error!'

    try {
      if (!error) {
        return defaultError
      }

      if (error?.response?.data?.message && typeof error.response.data.message === 'string') {
        return error.response.data.message
      }

      if (error?.message && typeof error.message === 'string') {
        return error.message
      }

      if (error && typeof error === 'string') {
        return error
      }

      if (error) {
        return JSON.stringify(error)
      }

      return defaultError
    } catch (e) {
      console.error(e)
      return defaultError
    }
  }

  function getFullImageUrl(url?: string): string {
    const api = apiService()
    if (url) {
      const editedUrl = url.substring(1, url.length)
      console.log(editedUrl)
      return api.apiUrl + editedUrl
    }

    return api.apiUrl
  }

  return {
    getErrorMessage,
    getFullImageUrl
  }
}
