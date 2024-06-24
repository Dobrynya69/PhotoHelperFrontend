<template>
  <div class="auth-wrapper">
    <form @submit.prevent="submit">
      <input
        class="custom-input"
        required
        v-model="body.username"
        :placeholder="translate('INPUTS.USERNAME')"
        :disabled="isSubmitting"
        :hide-details="true"
        type="text"
      />
      <input
        class="custom-input"
        required
        v-model="body.password"
        :placeholder="translate('INPUTS.PASSWORD')"
        :disabled="isSubmitting"
        :hide-details="true"
        type="password"
      />
      <button type="submit">{{ translate("BUTTONS.LOGIN") }}</button>
      <div class="form-error-message" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppI18n } from "@/i18n";
import type { ErrorResponse, LoginBody } from '@/models'
import { useRouting } from '@/composables'
import { useUserStore } from '@/stores'

const routing = useRouting()
const userStore = useUserStore()
const { translate } = useAppI18n()

const isSubmitting = ref<boolean>(false)
const errorMessage = ref<string | null>('')

const body: LoginBody = {
  username: '',
  password: '',
} 

const submit = async () => {
  try {
    if (isSubmitting.value) {
      return
    }

    isSubmitting.value = true

    const errorResponse: ErrorResponse | null = await userStore.login(body)
    if (errorResponse) {
      errorMessage.value = errorResponse.error
    } else{
      errorMessage.value = null
      routing.toHome()
    }

    isSubmitting.value = false
  } catch (e) {
    console.error(e)
    isSubmitting.value = false
  }
}
</script>