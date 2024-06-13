import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Group, ErrorResponse, GroupCreateBody, GroupUpdateBody } from '@/models'
import { appStorageService, authTokenService, requestService } from '@/services'
import { ACTIVE_GROUP_ID } from '@/constants'
import { useImageStore } from './image-store'

export const useGroupStore = defineStore('group', () => {
  const request = requestService()
  const authToken = authTokenService()
  const storage = appStorageService()
  const imageStore = useImageStore()

  const groups = ref<Group[] | null>(null)
  const activeGroup = ref<Group | null>(null)

  async function populate(): Promise<void> {
    try {
      await list()
    } catch (e) {
      console.error(e)
    }
  }

  async function setGroups(value: Group[] | null): Promise<void> {
    groups.value = value
    const activeGroupId = await storage.get(ACTIVE_GROUP_ID)
    setActiveGroup(activeGroupId)
  }

  async function setActiveGroup(groupId: number | null): Promise<void> {
    if (groupId && groups.value) {
      for (let index = 0; index < groups.value.length; index++) {
        const group = groups.value[index]
        if (group.id === groupId) {
          activeGroup.value = group
          await storage.set(ACTIVE_GROUP_ID, activeGroup.value.id)
          await imageStore.populate()
          return
        }
      }
    }

    await removeActiveGroup()
    await imageStore.populate()
  }

  async function removeActiveGroup(): Promise<void> {
    activeGroup.value = null
    const activeGroupId = await storage.get(ACTIVE_GROUP_ID)
    if (activeGroupId){
      await storage.remove(ACTIVE_GROUP_ID)
    }
  }

  async function list(): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.groupList();
      if (responseStatus != 200) {
        await setGroups(null)
        return responseData as ErrorResponse
      }

      await setGroups(responseData as Group[])
      return null
    }

    await setGroups(null)
    return null
  }

  async function create(body: GroupCreateBody): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.groupCreate(body);
      if (responseStatus != 201) {
        return responseData as ErrorResponse
      } else{
        await populate()
        await setActiveGroup((responseData as Group).id)
        return null
      }
    }

    await populate()
    return null
  }

  async function update(body: GroupUpdateBody, groupId: number): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.groupUpdate(body, groupId)
      if (responseStatus != 200) {
        return responseData as ErrorResponse
      }
    }

    await populate()
    return null
  }

  async function destroy(groupId: number): Promise<ErrorResponse | null> {
    const token: string | null = await authToken.get()
    if (token) {
      const [responseData, responseStatus] = await request.groupDestroy(groupId)
      if (responseStatus != 200) {
        return responseData as ErrorResponse
      } else if (activeGroup.value && activeGroup.value.id === groupId) {
        await removeActiveGroup()
      }
    }

    await populate()
    return null
  }

  return {
    groups,
    activeGroup,
    populate,
    setActiveGroup,
    list,
    create,
    update,
    destroy,
  }
})
