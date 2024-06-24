<template>
  <AppPopup :active="imageDeleteAllFormIsActive" @toggleActive="imageDeleteAllFormIsActive=!imageDeleteAllFormIsActive">
    <form @submit.prevent="imageDeleteAllSubmit">
      <button type="submit">{{ translate("BUTTONS.DELETE") }}</button>
      <div class="form-error-message" v-if="imageDeleteAllErrorMessage">
        {{ imageDeleteAllErrorMessage }}
      </div>
    </form>
  </AppPopup>
  <AppPopup :active="imageUpdateGroupFormIsActive" @toggleActive="imageUpdateGroupFormIsActive=!imageUpdateGroupFormIsActive">
    <form @submit.prevent="imageUpdateGroupSubmit">
      <app-select
        class="custom-select"
        :options="groupStore.groups"
        label="name"
        v-model="imageUpdateGroup"
      >
      </app-select>
      <button type="submit">{{ translate("BUTTONS.SET_GROUP") }}</button>
      <div class="form-error-message" v-if="imageUpdateGroupErrorMessage">
        {{ imageUpdateGroupErrorMessage }}
      </div>
    </form>
  </AppPopup>
  <AppPopup :active="imageCreteFormIsActive" @toggleActive="imageCreteFormIsActive=!imageCreteFormIsActive">
    <form @submit.prevent="imageCreateSubmit">
      <label class="custom-file-upload">
        <div class="custom-file-upload-pre-image">
          <span v-if="imageCreateBodies.length">
            {{ imageCreateBodies.length }}
          </span>
          <img v-else src="@/assets/images/no-image.png" alt="image" class="custom-file-upload-placeholder">
        </div>
        <span>{{ translate("INPUTS.SELECT_IMAGE") }}</span>
        <input
          class="custom-input"
          v-on:change="imageCreateFilesOnChange"
          :disabled="imageCreateIsSubmitting"
          :hide-details="true"
          type="file"
          multiple="true"
          accept="image/png, image/jpeg, image/jpg"
        />
      </label>
      <button type="submit">{{ translate("BUTTONS.UPLOAD") }}</button>
      <div class="form-error-message" v-if="imageCreateErrorMessage">
        {{ imageCreateErrorMessage }}
      </div>
    </form>
  </AppPopup>
  <div class="image-management-wrapper">
    <div class="image-wrapper">
      <div class="image-create-button" @click="imageCreteFormIsActive=true">
        <span>{{ translate("BUTTONS.ADD_IMAGES") }}</span>
        <img src="@/assets/images/add.png" alt="add"/>
      </div>
      <AppImageBlock v-for="selectableImage in images" :key="selectableImage.image.id" :selectableImage="selectableImage"></AppImageBlock>
    </div>
  </div>
  <div class="image-management-action-wrapper" :class="{'active': imageStore.isImagesActive}">
    <div class="image-management-action-button" @click="imageDeleteAllFormIsActive=true">
			<img src="@/assets/images/delete.png" alt="delete">
		</div>
    <div class="image-management-action-button">
			<img src="@/assets/images/move.png" alt="move" @click="imageUpdateGroupFormIsActive=true">
		</div>
    <div class="image-management-action-button" @click="imageStore.downloadActiveImageAll(false)">
			<img src="@/assets/images/download.png" alt="download">
		</div>
    <div class="image-management-action-button download-borderized" @click="imageStore.downloadActiveImageAll(true)">
			<img src="@/assets/images/download.png" alt="download-borderized">
		</div>
    <div class="image-management-action-button" @click="imageStore.activeImageAll">
			<img src="@/assets/images/select-all.png" alt="select-all">
		</div>
    <div class="image-management-action-button" @click="imageStore.removeActiveImageAll">
			<img src="@/assets/images/deselect-all.png" alt="deselect-all">
		</div>
  </div>
</template>

<script setup lang="ts">
import { useImageStore } from '@/stores/image-store'
import { storeToRefs } from 'pinia'
import AppPopup from "@/components/AppPopup.vue"
import AppImageBlock from "@/components/image_management/AppImageBlock.vue"
import { ref } from 'vue'
import type { ErrorResponse, Group, ImageCreateBody } from '@/models'
import { useGroupStore } from '@/stores'
import { useAppI18n } from '@/i18n'

const { translate } = useAppI18n()
const imageStore = useImageStore()
const groupStore = useGroupStore()
const { images } = storeToRefs(imageStore)
const imageUpdateGroup = ref<Group | null>(null)

const imageDeleteAllErrorMessage = ref<string | null>('')
const imageDeleteAllFormIsActive = ref<boolean>(false)

const imageCreateIsSubmitting = ref<boolean>(false)
const imageCreateErrorMessage = ref<string | null>('')
const imageCreteFormIsActive = ref<boolean>(false)
const imageCreateBodies = ref<ImageCreateBody[]>([])

const imageUpdateGroupIsSubmitting = ref<boolean>(false)
const imageUpdateGroupErrorMessage = ref<string | null>('')
const imageUpdateGroupFormIsActive = ref<boolean>(false)

const imageCreateFilesOnChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  imageCreateBodies.value = []
  if (target && target.files) {
    for (let index = 0; index < target.files.length; index++) {
      const file = target.files[index]
      if (file.size < 2621440) {
        const imageCreateBody: ImageCreateBody = {
          image: file,
          title: file.name.split(".")[0],
        }
        imageCreateBodies.value.push(imageCreateBody)
      } else{
        imageCreateErrorMessage.value = "File is bigger than 2.5mb"
      }
    }
  }
}

const imageDeleteAllSubmit = async () =>{
  try {
    const errorResponse: ErrorResponse | null = await imageStore.destroyActiveImageAll()
    if (errorResponse) {
      imageDeleteAllErrorMessage.value = errorResponse.error
    } else{
      imageDeleteAllErrorMessage.value = null
      imageDeleteAllFormIsActive.value = false
    }
  } catch (e) {
    console.error(e)
  }
}

const imageCreateSubmit = async () => {
  try {
    if (imageCreateIsSubmitting.value) {
      return
    }
    imageCreateIsSubmitting.value = true

    for (let index = 0; index < imageCreateBodies.value.length; index++) {
      const imageCreateBody = imageCreateBodies.value[index]
      const errorResponse: ErrorResponse | null = await imageStore.create(imageCreateBody)
      if (errorResponse) {
        imageCreateErrorMessage.value = errorResponse.error
      } else{
        imageCreateErrorMessage.value = null
        imageCreteFormIsActive.value = false
      }
    }

    imageCreateBodies.value = []
    imageCreateIsSubmitting.value = false
  } catch (e) {
    console.error(e)
    imageCreateIsSubmitting.value = false
  }
}

const imageUpdateGroupSubmit = async () => {
  if (imageUpdateGroup.value) {
    if (imageUpdateGroupIsSubmitting.value) {
      return
    }
    imageUpdateGroupIsSubmitting.value = true

    try {
    const errorResponse: ErrorResponse | null = await imageStore.updateGroupActiveImageAll(imageUpdateGroup.value.id)
    if (errorResponse) {
      imageUpdateGroupErrorMessage.value = errorResponse.error
    } else{
      imageUpdateGroupErrorMessage.value = null
      imageUpdateGroupFormIsActive.value = false
    }

    imageCreateBodies.value = []
    imageUpdateGroupIsSubmitting.value = false
  } catch (e) {
    console.error(e)
    imageUpdateGroupIsSubmitting.value = false
  }
  }
}
</script>

<style scoped>
  .image-management-wrapper{
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
    max-width: calc(100% - 300px);
    height: calc(100vh - 65px);
    width: 100%;
  }

  .image-wrapper{
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .image-create-button{
		position: relative;
    cursor: pointer;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
    justify-content: center;
		padding: 10px;
		gap: 10px;
		max-width: 150px;
		width: 100%;
		max-height: 200px;
		height: 100%;
		border: 2px rgba(var(--app-white), 0.9) solid;
		border-radius: 5px;
    color: rgb(var(--app-white));
    font-size: 20px;
    font-family: Inter-Bold;
    text-align: center;
    transition: background-color 300ms;
  }

  .image-management-action-wrapper{
    box-sizing: border-box;
    position: fixed;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    padding: 15px;
    gap: 15px;
    border-radius: 20px 20px 0 0;
    background-color: rgb(var(--app-black));
    box-shadow: 0 0 0 2px rgb(var(--app-main)), 8px 8px 0 0 rgb(var(--app-main));
    transition: bottom 300ms;
  }

  .image-management-action-wrapper.active{
    bottom: 0;
  }

  .image-management-action-button{
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: rgb(var(--app-black));
    box-shadow: 0 0 0 3px rgb(var(--app-main)), 6px 6px 0 0 rgb(var(--app-main));
    transition: border 300ms, box-shadow 300ms;
  }

  .download-borderized img{
    border: 2px rgb(var(--app-white)) solid;
    padding: 2px;
    border-radius: 4px;
  }

  .image-management-action-button img{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.8;
  }

  @media(hover: hover){
    .image-create-button:hover{
      background-color: rgb(var(--app-second));
    }

    .image-management-action-button:hover{
      box-shadow: rgba(var(--app-second)) 0px 0px 0px 3px;
    }
  }

  @media(max-width: 640px){
    .image-management-wrapper{
      max-width: none;
      height: auto;
    }

    .image-wrapper{
      justify-content: space-around;
      align-items: stretch;
    }

    .image-create-button{
      height: auto;
    }
  }
</style>