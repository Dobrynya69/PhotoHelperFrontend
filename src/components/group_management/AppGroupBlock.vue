<template>
  <AppPopup :active="groupDeleteFormIsActive" @toggleActive="groupDeleteFormIsActive=!groupDeleteFormIsActive">
    <form @submit.prevent="submitGroupDelete">
      <button type="submit">Delete</button>
      <div class="form-error-message" v-if="groupDeleteErrorMessage">
        {{ groupDeleteErrorMessage }}
      </div>
    </form>
  </AppPopup>
  <AppPopup :active="groupUpdateFormIsActive" @toggleActive="groupUpdateFormIsActive=!groupUpdateFormIsActive">
    <form @submit.prevent="submitGroupUpdate">
      <input
        class="custom-input"
        required
        v-model="groupUpdateBody.name"
        placeholder="Name"
        :hide-details="true"
        :disabled="groupUpdateIsSubmitting"
        type="text"
      />
      <button type="submit">Update</button>
      <div class="form-error-message" v-if="groupUpdateErrorMessage">
        {{ groupUpdateErrorMessage }}
      </div>
    </form>
  </AppPopup>
  <div class="group" @click="groupStore.setActiveGroup(group.id)" :class="{'active': groupStore.activeGroup === group}">
    <div class="group-info-wrapper">
      <div class="group-frame">
        <svg class="noselect" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5C0 2.23857 2.23858 0 5 0H59.9098C61.8037 0 63.535 1.07002 64.382 2.76395L72.618 19.2362C73.465 20.9302 75.1963 22.0002 77.0902 22.0002H295C297.761 22.0002 300 24.2388 300 27.0002V195C300 197.762 297.761 200 295 200H5C2.23857 200 0 197.762 0 195V5Z"/>
        </svg>
      </div>
      <span>
        {{ group.name }}
      </span>
    </div>
    <div class="group-action-button-wrapper">
      <div class="group-action-button" @click="groupDeleteFormIsActive=true">
        <img src="@/assets/images/delete.png" alt="delete">
      </div>
      <div class="group-action-button" @click="groupUpdateFormIsActive=true">
        <img src="@/assets/images/edit.png" alt="edit">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ErrorResponse, Group, GroupUpdateBody } from '@/models'
import { useGroupStore } from '@/stores'
import { ref} from "vue";
import AppPopup from "@/components/AppPopup.vue"

const props = defineProps<{
  group: Group
}>()

const groupStore = useGroupStore()

const groupDeleteErrorMessage = ref<string | null>('')
const groupDeleteFormIsActive = ref<boolean>(false)

const groupUpdateErrorMessage = ref<string | null>('')
const groupUpdateFormIsActive = ref<boolean>(false)
const groupUpdateIsSubmitting = ref<boolean>(false)
const groupUpdateBody: GroupUpdateBody = {
  name: props.group.name,
}

const submitGroupDelete = async () => {
  try {
    const errorResponse: ErrorResponse | null = await groupStore.destroy(props.group.id)
    if (errorResponse) {
      groupDeleteErrorMessage.value = errorResponse.error
    } else{
      groupDeleteFormIsActive.value = false
    }
  } catch (e) {
    console.error(e)
  }
}

const submitGroupUpdate = async () => {
  try {
    if (groupUpdateIsSubmitting.value) {
      return
    }

    groupUpdateIsSubmitting.value = true

    const errorResponse: ErrorResponse | null = await groupStore.update(groupUpdateBody, props.group.id)
    if (errorResponse) {
      groupUpdateErrorMessage.value = errorResponse.error
    } else{
      groupUpdateBody.name = props.group.name
      groupUpdateErrorMessage.value = null
      groupUpdateFormIsActive.value = false
    }

    groupUpdateIsSubmitting.value = false
  } catch (e) {
    console.error(e)
    groupUpdateIsSubmitting.value = false
  }
}
</script>

<style scoped>
  .group{
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
    height: auto;
    padding: 10px;
    color: rgb(var(--app-white));
    font-size: 18px;
    font-family: Inter-Bold;
    transition: transform 300ms;
  }

  .group-frame {
    max-width: 50px;
    width: 100%;
    height: auto;
  }

  .group-frame svg{
    width: 100%;
    height: auto;
  }

  .group-frame svg path{
    fill: rgb(var(--app-main));
  }

  .group-info-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .group-info-wrapper span{
    max-width: 150px;
    text-wrap: nowrap;
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
  }

  .group-action-button-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .group-action-button{
    cursor: pointer;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: rgb(var(--app-main));
    border-radius: 5px;
    visibility: hidden;
    opacity: 0;
    transition: all 300ms;
  }

  .group-action-button img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .group.active{
    cursor: default;
  }

  .group.active .group-action-button{
    opacity: 1;
    visibility: visible;
  }

  .group.active .group-frame svg path{
    fill: rgb(var(--app-second));
  }

  @media(hover: hover){
    .group:not(.active):hover{
      transform: scale(1.05, 1.05);
    }

    .group-action-button:hover{
      background-color: rgb(var(--app-second));
    }
  }
</style>