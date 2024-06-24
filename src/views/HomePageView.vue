<template>
  <div class="home-page-wrapper">
    <div class="home-page-image">
      <img src="@/assets/images/background.jpg" alt="background" />
    </div>
    <span class="home-page-text" v-if="currentUser === null">
      {{ translate("MESSAGES.WELLCOME_NEW") }}
    </span>
    <span class="home-page-text" v-else>
      {{ translate("MESSAGES.WELLCOME") }} {{currentUser!.first_name}} {{currentUser!.last_name}}!
    </span>
    <span class="copyright-text">
      {{ translate("MESSAGES.COPYRIGHT") }}
    </span>
    <div class="home-page-buttons" v-if="currentUser === null">
      <AppLinkButton path="/log-in">{{ translate("BUTTONS.LOGIN") }}</AppLinkButton>
      <AppLinkButton path="/sign-up">{{ translate("BUTTONS.SIGNUP") }}</AppLinkButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AppLinkButton from '@/components/AppLinkButton.vue'
import { useUserStore } from '@/stores'
import { useAppI18n } from '@/i18n'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)
const { translate } = useAppI18n()

</script>

<style scoped>
.home-page-wrapper {
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-page-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--app-black), 0.8);
}

.home-page-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  filter: blur(10px);
}

.home-page-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-page-text {
  position: relative;
  margin: 0 10px;
  font-family: Inter-Bold;
  font-size: calc(20px + (20 + 20 * 0.7) * ((100vw - 320px) / 1280));
  color: rgb(var(--app-white));
  text-align: center;
  max-width: 1400px;
  z-index: 1;
}

.copyright-text{
  position: relative;
  margin: 0 10px;
  font-family: Inter-Bold;
  font-size: 12px;
  color: rgb(var(--app-white));
  text-align: center;
  max-width: 1400px;
  z-index: 1;
}
</style>
