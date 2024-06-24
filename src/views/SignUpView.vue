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
        v-model="body.email"
        :placeholder="translate('INPUTS.EMAIL')"
        :disabled="isSubmitting"
        :hide-details="true"
        type="email"
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
          <img v-else src="@/assets/images/no-image.png" alt="image" class="custom-file-upload-placeholder">
        </div>
        <span>{{ translate("INPUTS.SELECT_IMAGE") }}</span>
        <input
          class="custom-input"
          v-on:change="signUpFileOnChange"
          :disabled="isSubmitting"
          :hide-details="true"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </label>
      <button type="submit">{{ translate("BUTTONS.SIGNUP") }}</button>
      <div class="form-error-message" v-if="errorMessage">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {ErrorResponse, SignUpBody } from '@/models'
import { useRouting } from '@/composables'
import { useUserStore } from '@/stores'
import { useAppI18n } from '@/i18n'

const routing = useRouting()
const userStore = useUserStore()
const { translate } = useAppI18n()

const preImageUrl = ref<string>('')
const isSubmitting = ref<boolean>(false)
const errorMessage = ref<string | null>('')

const body: SignUpBody = {
  username: '',
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  avatar: null,
} 

const signUpFileOnChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    preImageUrl.value = URL.createObjectURL(target.files[0]);
    body.avatar = target.files[0]
  }
}

const submit = async () => {
  try {
    if (isSubmitting.value) {
      return
    }
    isSubmitting.value = true

    const errorResponse: ErrorResponse | null = await userStore.signup(body)
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
