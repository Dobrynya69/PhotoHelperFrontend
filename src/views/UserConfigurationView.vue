<template>
  <div class="auth-wrapper">
    <form @submit.prevent="submit">
      <input
        class="custom-input"
        required
        v-model="body.first_name"
        :placeholder="translate('INPUTS.FIRST_NAME')"
        :disabled="isSubmitting"
        :hide-details="true"
        type="text"
      />
      <input
        class="custom-input"
        required
        v-model="body.last_name"
        :placeholder="translate('INPUTS.LAST_NAME')"
        :disabled="isSubmitting"
        :hide-details="true"
        type="text"
      />
      <label class="custom-file-upload">
        <div class="custom-file-upload-pre-image">
          <img v-if="preImageUrl" :src="preImageUrl" alt="image">
          <img v-else src="@/assets/images/no-image.png" alt="image" style="width: 50px; height: 50px; opacity: 0.5;">
        </div>
        <span>{{ translate("INPUTS.SELECT_IMAGE") }}</span>
        <input
          class="custom-input"
          v-on:change="updateFileOnChange"
          :disabled="isSubmitting"
          :hide-details="true"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </label>
      <button type="submit">{{ translate("BUTTONS.UPDATE") }}</button>
      <div class="form-error-message" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import type { ErrorResponse, UserUpdateBody } from '@/models'
import { useUserStore } from '@/stores'
import { utilsService } from "@/services"
import { useRouting } from '@/composables'
import { useAppI18n } from '@/i18n'

const utils = utilsService()
const routing = useRouting()
const { translate } = useAppI18n()

const userStore = useUserStore()

const preImageUrl = ref<string>('')
const isSubmitting = ref<boolean>(false)
const errorMessage = ref<string>('')

const body: UserUpdateBody = {
  first_name: '',
  last_name: '',
  avatar: null,
} 

const updateFileOnChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    preImageUrl.value = URL.createObjectURL(target.files[0])
    body.avatar = target.files[0]
  }
}

onBeforeMount(() => {
  if (userStore.currentUser) {
    body.first_name = userStore.currentUser.first_name
    body.last_name = userStore.currentUser.last_name
    preImageUrl.value = utils.getFullImageUrl(userStore.currentUser.avatar)
  }
})

const submit = async () => {
  try {
    if (isSubmitting.value) {
      return
    }
    isSubmitting.value = true

    const errorResponse: ErrorResponse | null = await userStore.update(body)
    if (errorResponse) {
      errorMessage.value = errorResponse.error
    } else{
      routing.toHome()
    }

    isSubmitting.value = false
  } catch (e) {
    console.error(e)
    isSubmitting.value = false
  }
}
</script>
