<template>
  <header>
    <div class="header-wrapper">
      <AppHeaderUserInfoBlock v-if="userStore.currentUser"/>
      <div v-else></div>
      <span class="header-action-wrapper-button noselect" @click="headerActionIsActive=!headerActionIsActive" :class="{'active': headerActionIsActive}">☰</span>
    </div>
  </header>
  <div class="header-action-wrapper" :class="{'active': headerActionIsActive}">
    <div v-if="!userStore.currentUser" class="header-buttons">
      <AppHeaderButton pathName="log-in">Log-In</AppHeaderButton>
      <AppHeaderButton pathName="sign-up">Sign-Up</AppHeaderButton>
    </div>
    <div class="header-buttons" v-if="userStore.currentUser">
      <AppActionButton @click="userStore.logout" style="width: 100%;">Log-Out</AppActionButton>
      <AppActionButton @click="routing.toUserUpdate" style="width: 100%;">Configuration</AppActionButton>
    </div>
    <div class="horyzontal-separation-line" v-if="userStore.currentUser"></div>
    <div class="header-buttons">
      <AppHeaderButton pathName="home">Home</AppHeaderButton>
      <AppHeaderButton pathName="management" v-if="userStore.currentUser">Management</AppHeaderButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeaderButton from '@/components/header/AppHeaderButton.vue'
import AppActionButton from '@/components/AppActionButton.vue'
import AppHeaderUserInfoBlock from '@/components/header/AppHeaderUserInfoBlock.vue'
import { useRouting } from '@/composables'
import { useUserStore } from '@/stores'
import { ref } from 'vue'

const userStore = useUserStore()
const routing = useRouting()

const headerActionIsActive = ref<boolean>(false)
</script>

<style scoped>
header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 5px solid;
  border-image: linear-gradient(rgb(var(--app-main)), rgb(var(--app-main-shade))) 30;
  padding: 10px;
  height: 65px;
  width: 100%;
  background-color: #1f1f1f;
  z-index: 99;
}

.header-wrapper{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.header-action-wrapper-button{
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--app-main), 0.5);
  font-weight: bold;
  font-size: 18px;
  color: rgb(var(--app-white));
  border: 2px solid rgb(var(--app-white));
  transition: color 300ms, background-color 300ms, border 300ms;
  z-index: 100;
}

.header-action-wrapper-button.active{
  background-color: rgb(var(--app-white));
  color: rgb(var(--app-main));
  border: 2px solid  rgb(var(--app-main));
}

.header-action-wrapper{
  box-sizing: border-box;
  background-color: rgb(var(--app-black));
  border-left: 5px solid;
  border-image: linear-gradient(rgb(var(--app-main)), rgb(var(--app-main-shade))) 30;
  position: fixed;
  top: 0;
  right: -100%;
  height: 100vh;
  padding-top: 65px;
  max-width: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: right 300ms;
  z-index: 98;
}

.header-action-wrapper.active{
  right: 0;
}

.horyzontal-separation-line {
  box-sizing: border-box;
  width: calc(100% - 40px);
  border: 1px dashed rgb(var(--app-white));
  margin: 0 20px;
}

.header-buttons {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;
  justify-content: center;
  width: 100%;
  padding: 10px;
  gap: 10px;
}
</style>
