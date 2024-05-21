<template>
  <AppHeader />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/header/AppHeader.vue'
import { useUserStore } from '@/stores'

const userStore = useUserStore()
const { populate } = userStore

populate()
</script>

<style scoped>
@font-face {
  font-family: Inter-Bold;
  src: url('@/assets/fonts/Inter-Bold.ttf');
}
</style>
