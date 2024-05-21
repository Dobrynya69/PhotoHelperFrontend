<script setup>
import HeaderUserInfoBlock from '@/components/header/HeaderUserInfoBlock.vue'
import HeaderButton from '@/components/header/HeaderButton.vue'
</script>

<template>
  <header>
    <HeaderUserInfoBlock />
    <div class="separation-line"></div>
    <div class="header-buttons">
      <HeaderButton path="/">Home</HeaderButton>
      <HeaderButton path="/home">Home after the time</HeaderButton>
      <HeaderButton path="/test">Home & go</HeaderButton>
    </div>
  </header>
</template>

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
