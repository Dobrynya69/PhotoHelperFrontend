import type { ErrorResponse, Image } from '@/models'
import { apiService } from '@/services/api'
import axios, { type AxiosHeaderValue, type AxiosResponseHeaders } from 'axios'
import JSZip from 'jszip'
import { requestService } from './request'

export const utilsService = () => {
  const api = apiService()
  const request = requestService()

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

  function getFullImageUrl(url: string): string {
    if (url) {
      const editedUrl = url.substring(1, url.length)
      return api.apiUrl + editedUrl
    }

    return ''
  }

  async function imagesToZip(images: Image[], borderized: boolean): Promise<Blob | null> {
    const zip = new JSZip()
    let responseFile: Blob | null = null 
    for (let index = 0; index < images.length; index++) {
      const image = images[index]
      let responseData: any, responseStatus: Number
      if (borderized) {
        [responseData, responseStatus] = await request.imageRetrieveBorderized(image.id)
        if (responseStatus !== 200) {
          return null
        }
      } else{
        [responseData, responseStatus] = await request.getMediaFile(image.image)
        if (responseStatus !== 200) {
          return null
        }
      }

      const responseType: string = responseData.type
      zip.file(`${image.title.split(".")[0]}.${responseType.split("/")[1] }`, responseData)
    }

    await zip.generateAsync({
      type: "blob"
    }).then(function(file) {
      responseFile = file
    })
  
    return responseFile
  }
  
  async function imageToFile(image: Image, borderized: boolean): Promise<Blob | null>{
    let responseData: any, responseStatus: Number
    if (borderized) {
      [responseData, responseStatus] = await request.imageRetrieveBorderized(image.id)
      if (responseStatus !== 200) {
        return null
      }
    } else{
      [responseData, responseStatus] = await request.getMediaFile(image.image)
      if (responseStatus !== 200) {
        return null
      }
    }

    return responseData
  } 

  function downloadFile(file: Blob, name: string): void {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(file)
    link.download = name
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return {
    getErrorMessage,
    getFullImageUrl,
    imagesToZip,
    imageToFile,
    downloadFile,
  }
}
