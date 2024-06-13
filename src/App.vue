<template>
  <AppHeader />
  <RouterView v-if="isMounted" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/header/AppHeader.vue'
import { useUserStore } from '@/stores'
import { onMounted, ref } from 'vue';

const userStore = useUserStore()
const isMounted = ref<boolean>(false)

onMounted(async () => {
  await userStore.populate()
  isMounted.value = true
})

</script>

<style scoped>
@font-face {
  font-family: Inter-Bold;
  src: url('@/assets/fonts/Inter-Bold.ttf');
}
</style>
