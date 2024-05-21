<template>
  <header>
    <AppHeaderUserInfoBlock v-if="userStore.currentUser" />
    <div v-else class="header-buttons">
      <AppHeaderButton path="/log-in">Log-In</AppHeaderButton>
      <AppHeaderButton path="/sign-up">Sign-Up</AppHeaderButton>
    </div>
    <div class="separation-line"></div>
    <div class="header-buttons">
      <AppHeaderButton path="/home">Home</AppHeaderButton>
      <AppHeaderButton path="/home-gg">Home after the time</AppHeaderButton>
      <AppHeaderButton path="/test">Home & go</AppHeaderButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import AppHeaderButton from '@/components/header/AppHeaderButton.vue'
import AppHeaderUserInfoBlock from '@/components/header/AppHeaderUserInfoBlock.vue'
import { useUserStore } from '@/stores/user-store'
const userStore = useUserStore()
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 5px solid;
  border-image: linear-gradient(#b86cf5, #eebdf5) 30;
  padding: 10px;
  height: calc(65px - 20px);
  width: 100%;
  background-color: #1f1f1f;
  z-index: 99;
}

.separation-line {
  width: 0;
  height: 45px;
  border: 1px dashed #ffffff;
  margin: 0 20px;
}

.header-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
