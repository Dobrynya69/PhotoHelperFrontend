<template>
<div class="develop-wrapper">
    <PinturaEditor
        v-bind="editorDefaults"
        :src="imageSrc"
        @pintura:process="handleImageDevelop($event)"
    />
</div>
</template>

<script setup lang="ts">
import { PinturaEditor } from "@pqina/vue-pintura"
import {
    createDefaultImageReader,
    createDefaultImageWriter,
    createDefaultImageOrienter,
    setPlugins,
    plugin_crop,
    plugin_finetune,
    plugin_finetune_defaults,
    locale_en_gb,
    plugin_crop_locale_en_gb,
    plugin_finetune_locale_en_gb} from '@pqina/pintura'
import { useImageStore } from "@/stores/image-store"
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue"
import type { ErrorResponse, Image, ImageUpdateBody } from "@/models"
import { utilsService } from "@/services"
import { useRouting } from "@/composables"

const imageStore = useImageStore()
const route = useRoute()
const routing = useRouting()
const image = ref<Image | null>(null)
const imageSrc = ref<Blob | null>(null)
const utils = utilsService()

setPlugins(plugin_crop, plugin_finetune)
const editorDefaults = {
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  imageOrienter: createDefaultImageOrienter(),
  ...plugin_finetune_defaults,
  locale: {
      ...locale_en_gb,
      ...plugin_crop_locale_en_gb,
      ...plugin_finetune_locale_en_gb,
  },
}

const handleImageDevelop = async (event:any) => {
  await imageUpdate(event.detail.dest)
}

const imageUpdate = async (newImageFile: File) => {
  if (image.value) {
    try {
      const imageUpdateBody: ImageUpdateBody = {
        title: image.value.title,
        image: new File([newImageFile], `${image.value.title}.${newImageFile.type.split("/")[1]}`, {type: newImageFile.type})
      }
      const errorResponse: ErrorResponse | null = await imageStore.update(imageUpdateBody, image.value.id)
      if (!errorResponse) {
        await routing.toImageManagement()
      }
    } catch (e) {
      console.error(e)
    }
  }
}

onMounted(async () => {
  
  var allfunctions=[];
  for ( var i in window) {
    if((typeof window[i]).toString()=="function"){
      allfunctions.push(window[i].name);
    }
  }
  console.log(allfunctions)

  const imageIdString = route.params.imageId
  let imageId = -1
  if (typeof imageIdString === "string") {
    imageId = parseInt(imageIdString)
  }

  image.value = await imageStore.retrieve(imageId)
  if (image.value) {
    const imageFile: Blob | null = await utils.imageToFile(image.value, false)
    if (imageFile) {
      imageSrc.value = imageFile
    }
  }
})
</script>

<style>
@import "/node_modules/@pqina/pintura/pintura.css";

.pintura-editor {
  --color-background: var(--app-black);
  --color-foreground: var(--app-white);
  --color-primary: rgb(var(--app-main));
  --color-primary-text: rgb(var(--app-white));
  --color-primary-dark: rgb(var(--app-second))
}

.develop-wrapper{
  width: 100vw;
  height: calc(100vh - 65px);
}
</style>