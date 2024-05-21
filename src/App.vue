<script setup>
import { RouterView } from 'vue-router'
import CustomHeader from '@/components/header/CustomHeader.vue'
</script>

<template>
  <CustomHeader />
  <RouterView />
</template>

<style>
@font-face {
  font-family: Inter-Bold;
  src: url('@/assets/fonts/Inter-Bold.ttf');
}
</style>
