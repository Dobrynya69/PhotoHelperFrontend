<template>
  <AppPopup :active="groupCreteFormIsActive" @toggleActive="groupCreteFormIsActive=!groupCreteFormIsActive">
    <form @submit.prevent="submitGroupCreate">
      <input
        class="custom-input"
        required
        v-model="groupCreateBody.name"
        placeholder="Name"
        :hide-details="true"
        :disabled="groupCreateIsSubmitting"
        type="text"
      />
      <button type="submit">Create</button>
      <div class="form-error-message" v-if="groupCreateErrorMessage">
        {{ groupCreateErrorMessage }}
      </div>
    </form>
  </AppPopup>
  <div class="group-management-wrapper">
      <div @click="groupCreteFormIsActive=true" class="group-create-button">
        <span>Add Group</span>
        <img src="@/assets/images/add.png" alt="add"/>
      </div>
      <div @click="groupStore.setActiveGroup(null)" :class="{'active': activeGroup}" class="group-unselect">
        <span>Unselect Group</span>
      </div>
      <div class="no-groups" v-if="!groups || !groups.length">There are no groups.</div>
      <AppGroupBlock v-for="group in groups" :key="group.id" :group="group"></AppGroupBlock>
  </div>
</template>

<script setup lang="ts">
import { useGroupStore } from '@/stores'
import { storeToRefs } from 'pinia'
import AppGroupBlock from "@/components/group_management/AppGroupBlock.vue"
import AppPopup from "@/components/AppPopup.vue"
import { ref } from 'vue'
import type { ErrorResponse, GroupCreateBody } from '@/models'

const groupCreateIsSubmitting = ref<boolean>(false)
const groupCreateErrorMessage = ref<string | null>('')
const groupCreteFormIsActive = ref<boolean>(false)

const groupStore = useGroupStore()
const { groups, activeGroup } = storeToRefs(groupStore)

const groupCreateBody: GroupCreateBody = {
  name: '',
} 

const submitGroupCreate = async () => {
  try {
    if (groupCreateIsSubmitting.value) {
      return
    }

    groupCreateIsSubmitting.value = true

    const errorResponse: ErrorResponse | null = await groupStore.create(groupCreateBody)
    if (errorResponse) {
      groupCreateErrorMessage.value = errorResponse.error
    } else{
      groupCreateBody.name = ''
      groupCreateErrorMessage.value = null
      groupCreteFormIsActive.value = false
    }

    groupCreateIsSubmitting.value = false
  } catch (e) {
    console.error(e)
    groupCreateIsSubmitting.value = false
  }
}
</script>

<style scoped>
  .group-management-wrapper{
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    max-width: 300px;
    width: 100%;
    height: calc(100vh - 65px);
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .group-create-button{
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(var(--app-white));
    border-radius: 10px;
    max-height: 50px;
    margin: 10px;
    padding: 20px;
    color: rgb(var(--app-white));
    font-size: 16px;
    font-family: Inter-Bold;
    transition: transform 300ms;
  }

  .group-create-button img{
    max-height: 30px;
    margin-left: 10px;
  }

  .no-groups{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(var(--app-white), 0.6);
    border-radius: 10px;
    max-height: 50px;
    margin: 10px;
    padding: 20px;
    color: rgba(var(--app-white), 0.6);
    font-size: 18px;
    font-family: Inter-Bold;
  }

  .group-unselect{
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgb(var(--app-white));
    border-radius: 10px;
    max-height: 50px;
    margin: 10px;
    padding: 5px;
    color: rgb(var(--app-white));
    font-size: 14px;
    font-family: Inter-Bold;
    pointer-events: none;
    opacity: 0.5;
    transition: background-color 300ms, opacity 300ms;
  }

  .group-unselect.active{
    pointer-events: all;
    opacity: 1;
  }
  @media(hover: hover){
    .group-create-button:hover{
      transform: scale(1.03, 1.03);
    }

    .group-unselect:hover{
      background-color: rgb(var(--app-second));
    }
  }

  @media(max-width: 640px){
    .group-management-wrapper{
      height: auto;
    }
  }
</style>