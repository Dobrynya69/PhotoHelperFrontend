<template>
  <button class="link-button">
    <a :href="path.toString()"><slot></slot></a>
    <div class="link-button-shade"></div>
  </button>
</template>

<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router'
defineProps<{
  path: RouteLocationRaw
}>()
</script>

<style scoped>
.link-button {
  position: relative;
  background: linear-gradient(
    90deg,
    rgb(var(--app-main)),
    rgb(var(--app-second)),
    rgb(var(--app-second)),
    rgb(var(--app-main))
  );
  background-size: 300%;
  background-position: left;
  border: none;
  border-radius: 5px;
  min-width: 200px;
  transition: background-position 300ms;
  margin-top: 20px;
  z-index: 1;
}

.link-button-shade {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-color: rgba(var(--app-black), 0.2);
  z-index: 2;
}

.link-button a {
  position: relative;
  text-wrap: nowrap;
  display: block;
  padding: 10px 5px;
  width: calc(100% - 10px);
  font-family: Inter-Bold;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  color: rgb(var(--app-white));
  z-index: 3;
}

@media (hover: hover){
  .link-button:hover {
    background-position: right;
  }
}

@media (min-width: 1500px) {
  .link-button {
    min-width: 250px;
  }

  .link-button a {
    padding: 15px 10px;
    width: calc(100% - 20px);
  }
}

@media (min-width: 1500px) {
  .link-button {
    min-width: 250px;
  }

  .link-button a {
    padding: 15px 10px;
    width: calc(100% - 20px);
  }
}

@media (min-width: 1900px) {
  .link-button {
    min-width: 300px;
  }

  .link-button a {
    padding: 20px 10px;
    width: calc(100% - 20px);
    font-size: 24px;
  }
}
</style>
