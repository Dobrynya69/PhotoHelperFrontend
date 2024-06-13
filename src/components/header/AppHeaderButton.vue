<template>
  <button :class="{ active: $route.matched.some(({ name }) => name === pathName) }" class="header-button">
    <RouterLink :to="{name: pathName}"><slot></slot></RouterLink>
  </button>
</template>

<script setup lang="ts">
import { RouterLink, type RouteRecordName } from 'vue-router'
defineProps<{
  pathName: RouteRecordName | undefined
}>()

</script>

<style scoped>
.header-button {
  box-sizing: border-box;
  background-color: rgb(var(--app-black));
  border-radius: 5px;
  border: 1px solid rgb(var(--app-white));
  width: 100%;
  transition: background-color 300ms;
}

.header-button.active {
  pointer-events: none;
  background-color: rgba(var(--app-main), 0.2);;
}

@media (hover: hover) {
  .header-button:hover {
    background-color: rgb(var(--app-main));
  }
}

.header-button a {
  box-sizing: border-box;
  display: block;
  text-wrap: nowrap;
  padding: 10px;
  font-family: Inter-Bold;
  font-size: 16px;
  text-decoration: none;
  color: rgb(var(--app-white));
}
</style>
