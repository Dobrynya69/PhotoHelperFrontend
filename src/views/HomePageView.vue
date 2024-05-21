<script setup>
import LinkButton from '@/components/LinkButton.vue'
</script>

<template>
  <div class="home-page--wrapper">
    <div class="home-page--image">
      <img src="@/assets/images/background.jpg" alt="background" />
    </div>
    <span class="home-page--text">
      {{ $route }}
      Welcome to Photo Helper, log-in into the account or create a new one if you are new
    </span>
    <div class="home-page--buttons">
      <LinkButton path="/log-in" name="Log-In" />
      <LinkButton path="/sign-up" name="Sign-Up" />
    </div>
  </div>
</template>

<style scoped>
.home-page--wrapper {
  position: relative;
  width: 100%;
  padding-top: 70px;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-page--image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(31, 31, 31, 0.8);
}

.home-page--image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
  filter: blur(10px);
}

.home-page--buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.home-page--text {
  position: relative;
  margin: 0 10px;
  font-family: Inter-Bold;
  font-size: calc(20px + (20 + 20 * 0.7) * ((100vw - 320px) / 1280));
  color: #ffffff;
  text-align: center;
  max-width: 1400px;
  z-index: 1;
}
</style>
