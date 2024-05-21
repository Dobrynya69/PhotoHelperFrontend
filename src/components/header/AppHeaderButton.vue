<template>
  <button :class="{ active: $route.path === path }" class="header-button">
    <RouterLink :to="path"><slot></slot></RouterLink>
  </button>
</template>

<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from 'vue-router'
defineProps<{
  path: RouteLocationRaw
}>()
</script>

<style scoped>
.header-button {
  background-color: #1f1f1f;
  border-radius: 5px;
  border: 1px solid #ffffff;
  margin-right: 10px;
  transition: background-color 300ms;
}

.header-button.active {
  background-color: #8c6cf550;
}

.header-button:hover {
  background-color: #8b6cf5;
}

.header-button a {
  display: block;
  padding: 10px;
  font-family: Inter-Bold;
  font-size: 16px;
  text-decoration: none;
  color: #ffffff;
}
</style>
