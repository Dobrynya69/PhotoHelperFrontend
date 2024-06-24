import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import { authTokenService } from '@/services/auth-token'

export const apiService = () => {
  const authToken = authTokenService()
  const apiUrl: string = 'http://45-147-248-58.cloud-xip.com:8000/'

  const instance: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json'
    }
  } as CreateAxiosDefaults)

  instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token: string | null = await authToken.get()

    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  })

  async function get<T = any, R = any>(url: string, config?: AxiosRequestConfig<T>): Promise<[R, Number]> {
    return formattingResponse(await instance.get(url, config as AxiosRequestConfig<T>))
  }

  async function post<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<[R, Number]> {
    return formattingResponse(await instance.post(url, data, config as AxiosRequestConfig<T>))
  }

  async function put<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<[R, Number]> {
    return formattingResponse(await instance.put(url, data, config as AxiosRequestConfig<T>))
  }

  async function patch<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<[R, Number]> {
    return formattingResponse(await instance.patch(url, data, config as AxiosRequestConfig<T>))
  }

  async function del<T = any, R = any>(url: string, config?: AxiosRequestConfig<T>): Promise<[R, Number]> {
    return formattingResponse(await instance.delete(url, config as AxiosRequestConfig<T>))
  }

  function formattingResponse<T = any>(response: AxiosResponse<T>): [T, Number] {
    return [response.data, response.status]
  }

  return {
    apiUrl,
    instance,
    get,
    post,
    put,
    patch,
    del,
  }
}
