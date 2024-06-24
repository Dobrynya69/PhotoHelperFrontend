import { apiService } from '@/services/api'
import type { CurrentUser, LoginBody, SignUpBody, ErrorResponse, UserUpdateBody, Group, GroupCreateBody, GroupUpdateBody, Image, ImageCreateBody, ImageUpdateBody } from '@/models'

export const requestService = () => {
  const api = apiService()

  //User
  async function userRetrieveCurrent(): Promise<[CurrentUser | ErrorResponse, Number]> {
    return api.get(`users/`)
  }

  async function signup(body: SignUpBody): Promise<[CurrentUser | ErrorResponse, Number]> {
    return api.post(`users/`, body)
  }

  async function login(body: LoginBody): Promise<[CurrentUser | ErrorResponse, Number]> {
    return api.post(`users/login/`, body)
  }

  async function userUpdate(body: UserUpdateBody): Promise<[CurrentUser | ErrorResponse, Number]> {
    return api.patch(`users/`, body)
  }

  async function logout(): Promise<[void | ErrorResponse, Number]> {
    return api.del(`users/`)
  }

  //Group
  async function groupList(): Promise<[Group[] | ErrorResponse, Number]> {
    return api.get('api/group/')
  }

  async function groupCreate(body: GroupCreateBody): Promise<[Group | ErrorResponse, Number]> {
    return api.post('api/group/', body)
  }

  async function groupUpdate(body: GroupUpdateBody, groupId: number): Promise<[Group | ErrorResponse, Number]> {
    return api.patch(`api/group/${groupId}/`, body)
  }

  async function groupDestroy(groupId: number): Promise<[ErrorResponse, Number]> {
    return api.del(`api/group/${groupId}/`)
  }

  //Image
  async function imageList(groupId: number): Promise<[Image[] | ErrorResponse, Number]> {
    return api.get(`api/image/group/${groupId}/`)
  }

  async function imageListWithoutGroup(): Promise<[Image[] | ErrorResponse, Number]> {
    return api.get(`api/image/`)
  }

  async function imageRetrieve(imageId: number): Promise<[Image | ErrorResponse, Number]> {
    return api.get(`api/image/${imageId}/`)
  }

  async function imageCreate(body: ImageCreateBody, groupId: number): Promise<[Image | ErrorResponse, Number]> {
    return api.post(`api/image/group/${groupId}/`, body)
  }

  async function imageCreateWithoutGroup(body: ImageCreateBody): Promise<[Image | ErrorResponse, Number]> {
    return api.post(`api/image/`, body)
  }

  async function imageUpdate(body: ImageUpdateBody, imageId: number): Promise<[Image | ErrorResponse, Number]> {
    return api.patch(`api/image/${imageId}/`, body)
  }

  async function imageUpdateGroup(imageId: number, groupId: number): Promise<[Image | ErrorResponse, Number]> {
    return api.put(`api/image/${imageId}/group/${groupId}/`)
  }

  async function imageDestroy(imageId: number): Promise<[ErrorResponse, Number]> {
    return api.del(`api/image/${imageId}/`)
  }

  //Files
  async function getMediaFile(fileUrl: string): Promise<[any, Number]> {
    return api.get(`${fileUrl}`, {responseType: "blob"})
  }

  async function imageRetrieveBorderized(imageId: number): Promise<[any, Number]> {
    return api.get(`api/image/${imageId}/borderized/`, {responseType: "blob"})
  }

  return {
    //User
    userRetrieveCurrent,
    signup,
    login,
    userUpdate,
    logout,
  
    //Group
    groupList,
    groupCreate,
    groupUpdate,
    groupDestroy,

    //Image
    imageList,
    imageListWithoutGroup,
    imageRetrieve,
    imageCreate,
    imageCreateWithoutGroup,
    imageUpdateGroup,
    imageUpdate,
    imageDestroy,

    //Files
    getMediaFile,
    imageRetrieveBorderized,
  }
}
