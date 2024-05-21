<template>
  <form @submit.prevent="submit">
    <input
      v-model="username"
      placeholder="Username"
      :disabled="isSubmitting"
      :hide-details="true"
      type="text"
    />
    <input
      v-model="password"
      placeholder="Password"
      :disabled="isSubmitting"
      :hide-details="true"
      type="password"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CurrentUser, LoginBody } from '@/models'
import { useRouting } from '@/composables'
import { authTokenService, requestService } from '@/services'
import { useUserStore } from '@/stores'

const routing = useRouting()
const userStore = useUserStore()
const { setCurrentUser } = userStore

const request = requestService()
const authToken = authTokenService()

const isSubmitting = ref<boolean>(false)
const username = ref('')
const password = ref('')

const submit = async () => {
  try {
    if (isSubmitting.value) {
      return
    }
    isSubmitting.value = true

    const body: LoginBody = {
      username: username.value,
      password: password.value
    }

    const currentUser: CurrentUser = await request.login(body)
    setCurrentUser(currentUser)
    await authToken.set(currentUser.token)

    await routing.toHome()

    isSubmitting.value = false
  } catch (e) {
    console.error(e)
    isSubmitting.value = false
  }
}
</script>
