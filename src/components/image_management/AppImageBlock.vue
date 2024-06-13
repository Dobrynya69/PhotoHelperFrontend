<template>
	<AppPopup :active="imageUpdateFormIsActive" @toggleActive="imageUpdateFormIsActive=!imageUpdateFormIsActive">
		<form @submit.prevent="submitImageUpdate">
      <input
        class="custom-input"
        required
        v-model="imageUpdateBody.title"
        placeholder="Title"
        :hide-details="true"
        :disabled="imageUpdateIsSubmitting"
        type="text"
      />
      <button type="submit">Update</button>
      <div class="form-error-message" v-if="imageUpdateErrorMessage">
        {{ imageUpdateErrorMessage }}
      </div>
    </form>
	</AppPopup>
	<div class="image" :class="{'active': selectableImage.active}">
		<div class="image-picture-block">
			<img :src="utils.getFullImageUrl(selectableImage.image.image)" alt="image">
		</div>
		<span class>{{ selectableImage.image.title }}</span>
		<div class="image-action-wrapper">
			<div class="image-action-button" @click="imageUpdateFormIsActive=true">
				<img src="@/assets/images/edit.png" alt="edit">
			</div>
			<div class="image-action-button" @click="imageStore.toggleActiveImage(selectableImage.image.id)">
				<img src="@/assets/images/select.png" alt="select">
			</div>
			<div class="image-action-button">
				<img src="@/assets/images/develop.png" alt="develop">
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { ErrorResponse, ImageUpdateBody, SelectableImage } from '@/models'
import { utilsService } from '@/services'
import { useImageStore } from '@/stores/image-store'
import AppPopup from "@/components/AppPopup.vue"
import { ref } from 'vue';

const props = defineProps<{
	selectableImage: SelectableImage
}>()

const imageStore = useImageStore()
const utils = utilsService()

const imageUpdateIsSubmitting = ref<boolean>(false)
const imageUpdateErrorMessage = ref<string | null>('')
const imageUpdateFormIsActive = ref<boolean>(false)

const imageUpdateBody: ImageUpdateBody = {
	image: null,
	title: props.selectableImage.image.title,
}

const submitImageUpdate = async () => {
  try {
    if (imageUpdateIsSubmitting.value) {
      return
    }

    imageUpdateIsSubmitting.value = true

    const errorResponse: ErrorResponse | null = await imageStore.update(imageUpdateBody, props.selectableImage.image.id)
    if (errorResponse) {
      imageUpdateErrorMessage.value = errorResponse.error
    } else{
      imageUpdateBody.title = props.selectableImage.image.title
      imageUpdateErrorMessage.value = null
      imageUpdateFormIsActive.value = false
    }

    imageUpdateIsSubmitting.value = false
  } catch (e) {
    console.error(e)
    imageUpdateIsSubmitting.value = false
  }
}
</script>

<style scoped>
	.image{
		position: relative;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 10px;
		gap: 10px;
		justify-content: center;
		max-width: 150px;
		width: 100%;
		max-height: 200px;
		height: 100%;
		background-color: rgba(var(--app-white), 0.9);
		border-radius: 5px;
		transition: background-color 300ms, transform 300ms;
	}

	.image.active{
		background-color: rgba(var(--app-main), 0.8);
		transform: scale(0.9, 0.9);
	}

	.image-picture-block{
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 150px;
	}
	
	.image-picture-block img{
		box-sizing: border-box;
		max-width: 100%;
		max-height: 100%;
		border-radius: 5px;
		object-fit: contain;
	}

	.image span{
		max-width: 100%;
		text-wrap: nowrap;
    overflow:hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
		font-size: 18px;
		font-family: Inter-Bold;
	}

	.image-action-wrapper{
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
		background-color: rgb(var(--app-black), 0.8);
		visibility: hidden;
		opacity: 0;
		transition: all 300ms;
	}

	.image-action-button{
		cursor: pointer;
		box-sizing: border-box;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5px;
		border-radius: 5px;
		background-color: rgba(var(--app-main), 0.8);
		transition: background-color 300ms, transform 300ms;
	}

	.image-action-button img{
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image:hover .image-action-wrapper{
		visibility: visible;
		opacity: 1;
	}

	@media(hover: hover){
		.image-action-button:hover{
			background-color: rgba(var(--app-second), 1);
			transform: scale(1.05, 1.05);
		}
	}
</style>