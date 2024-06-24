import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Image, ErrorResponse, ImageCreateBody, ImageUpdateBody, SelectableImage } from '@/models'
import { authTokenService, requestService, utilsService } from '@/services'
import { useGroupStore } from './group-store'

export const useImageStore = defineStore('image', () => {
  const request = requestService()
  const utils = utilsService()
  const authToken = authTokenService()
  const groupStore = useGroupStore()

  const images = ref<SelectableImage[]>([])
  const isImagesActive = ref<boolean>(false)

  async function populate(): Promise<void> {
    try {
      await list()
    } catch (e) {
      console.error(e)
    }
  }

  async function setImages(values: Image[]): Promise<void> {
    images.value = []
    isImagesActive.value = false
    for (let index = 0; index < values.length; index++) {
      const selectableImage: SelectableImage = {
        image: values[index],
        active: false,
      }
      images.value.push(selectableImage)
    }
    console.log(images.value)
  }

  async function list(): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    const activeGroup = groupStore.activeGroup
    if (token && activeGroup) {
      const [responseData, responseStatus] = await request.imageList(activeGroup.id);
      if (responseStatus != 200) {
        await setImages([])
        return responseData as ErrorResponse
      }

      await setImages(responseData as Image[])
      return null
    } else if(token){
      const [responseData, responseStatus] = await request.imageListWithoutGroup();
      if (responseStatus != 200) {
        await setImages([])
        return responseData as ErrorResponse
      }

      await setImages(responseData as Image[])
      return null
    }

    await setImages([])
    return null
  }

  async function retrieve(imageId: number): Promise<Image | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.imageRetrieve(imageId);
      if (responseStatus == 200) {
        return responseData as Image
      }
    }

    return null
  }


  async function create(body: ImageCreateBody): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    const activeGroup = groupStore.activeGroup
    if (token && activeGroup) {
      const [responseData, responseStatus] = await request.imageCreate(body, activeGroup.id);
      if (responseStatus != 201) {
        return responseData as ErrorResponse
      }
    } else if(token){
      const [responseData, responseStatus] = await request.imageCreateWithoutGroup(body);
      if (responseStatus != 201) {
        return responseData as ErrorResponse
      }
    }

    await populate()
    return null
  }

  async function update(body: ImageUpdateBody, imageId: number): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.imageUpdate(body, imageId);
      if (responseStatus != 200) {
        return responseData as ErrorResponse
      }
    }

    await populate()
    return null
  }

  async function updateGroupActiveImageAll(groupId: number): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      for (let index = 0; index < images.value.length; index++) {
        if (images.value[index].active) {
          const image = images.value[index].image
          const [responseData, responseStatus] = await request.imageUpdateGroup(image.id, groupId);
          if (responseStatus != 200) {
            return responseData as ErrorResponse
          }
        }
      }
    }

    await populate()
    return null
  }

  function toggleActiveImage(imageId: number): void{
    if (images.value) {
      for (let index = 0; index < images.value.length; index++) {
        const selectableImage = images.value[index]
        if (selectableImage.image.id === imageId) {
          selectableImage.active = !selectableImage.active
        }
      }

      for (let index = 0; index < images.value.length; index++) {
        const selectableImage = images.value[index]
        if (selectableImage.active) {
          isImagesActive.value = true
          return
        }
      }
    }

    isImagesActive.value = false
  }

  function activeImageAll(): void{
    if (images.value) {
      for (let index = 0; index < images.value.length; index++) {
        const selectableImage = images.value[index]
        if (!selectableImage.active) {
          toggleActiveImage(selectableImage.image.id)
        }
      }
    }
  }

  function removeActiveImageAll(): void{
    if (images.value) {
      for (let index = 0; index < images.value.length; index++) {
        const selectableImage = images.value[index]
        if (selectableImage.active) {
          toggleActiveImage(selectableImage.image.id)
        }
      }
    }
  }

  async function downloadActiveImageAll(borderized: boolean) {
    if (images.value) {
      const activeImages: Image[] = []
      for (let index = 0; index < images.value.length; index++) {
        if (images.value[index].active) {
          activeImages.push(images.value[index].image)
        }
      }
      
      if (activeImages.length === 1) {
        const file: Blob | null = await utils.imageToFile(activeImages[0], borderized)
        if (file) {
          utils.downloadFile(file, activeImages[0].title)
        }
      } else if(activeImages.length){
        const file: Blob | null = await utils.imagesToZip(activeImages, borderized)
        if (file) {
          utils.downloadFile(file, "photoHelperImages")
        }
      }
    }
  }

  async function destroyActiveImageAll(): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      for (let index = 0; index < images.value.length; index++) {
        if (images.value[index].active) {
          const image = images.value[index].image
          const [responseData, responseStatus] = await request.imageDestroy(image.id);
          if (responseStatus != 200) {
            return responseData as ErrorResponse
          }
        }
      }
    }

    await populate()
    return null
  }

  return {
    images,
    isImagesActive,
    populate,
    list,
    retrieve,
    create,
    update,
    updateGroupActiveImageAll,
    toggleActiveImage,
    activeImageAll,
    removeActiveImageAll,
    downloadActiveImageAll,
    destroyActiveImageAll,
  }
})