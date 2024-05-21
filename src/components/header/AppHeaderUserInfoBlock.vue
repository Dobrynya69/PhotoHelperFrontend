<template>
  <div class="user-info--wrapper">
    <div class="user-info--image">
      <img :src="utils.getFullImageUrl(currentUser?.avatar)" alt="userImage" />
    </div>
    <div class="user-info--text">{{ currentUser?.first_name }} {{ currentUser?.last_name }}</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user-store'
import { utilsService } from '@/services/utils'
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const utils = utilsService()
</script>

<style scoped>
.user-info--wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.connection {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 0;
}
.user-info--image {
  position: relative;
  border-radius: 5px;
  border: 2px solid #ffffff;
  width: calc(45px - 4px);
  height: calc(45px - 4px);
  overflow: hidden;
  z-index: 1;
}

.user-info--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.user-info--text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 5px 15px;
  height: calc(30px - 10px);
  font-family: Inter-Bold;
  font-size: 14px;
  border-radius: 0 5px 5px 0;
  z-index: 1;
}

.user-info--text::before {
  content: '';
  position: absolute;
  background-color: transparent;
  bottom: -6.25px;
  left: 0;
  height: 6.25px;
  width: 3.125px;
  border-top-left-radius: 3.125px;
  box-shadow: 0 -3.125px 0 0 #ffffff;
}

.user-info--text::after {
  content: '';
  position: absolute;
  background-color: transparent;
  top: -6.25px;
  left: 0;
  height: 6.25px;
  width: 3.125px;
  border-top-left-radius: 3.125px;
  box-shadow: 0 -3.125px 0 0 #ffffff;
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}
</style>
