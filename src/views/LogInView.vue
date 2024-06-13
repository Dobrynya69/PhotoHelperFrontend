<template>
  <form @submit.prevent="submit">
    <input
      class="custom-input"
      required
      v-model="body.username"
      placeholder="Username"
      :disabled="isSubmitting"
      :hide-details="true"
      type="text"
    />
    <input
      class="custom-input"
      required
      v-model="body.password"
      placeholder="Password"
      :disabled="isSubmitting"
      :hide-details="true"
      type="password"
    />
    <button type="submit">Log-In</button>
    <div class="form-error-message" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ErrorResponse, LoginBody } from '@/models'
import { useRouting } from '@/composables'
import { useUserStore } from '@/stores'

const routing = useRouting()
const userStore = useUserStore()

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