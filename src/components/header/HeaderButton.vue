<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  path: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button :class="{ active: $route.path === props.path }" class="header-button">
    <RouterLink :to="props.path"><slot></slot></RouterLink>
  </button>
</template>

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
