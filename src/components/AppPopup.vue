<template>
  <div class="popup-overlay" :class="{'active': active}" @click="emit('toggleActive')"></div>
  <div class="popup-wrapper" :class="{'active': active}">
    <div class="popup">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  active: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleActive'): void
}>()
</script>

<style scoped>
  .popup-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--app-black), 0.8);
    z-index: 96;
    visibility: hidden;
    opacity: 0;
    transition: all 200ms;
  }

  .popup-overlay.active{
    opacity: 1;
    visibility: visible;
  }

  .popup-wrapper{
    position: fixed;
    max-width: 280px;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 97;
    visibility: hidden;
    opacity: 0;
    transition: all 400ms;
  }

  .popup-wrapper.active{
    opacity: 1;
    visibility: visible;
  }

  .popup{
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    border-radius: 10px;
    background-color: rgb(var(--app-black));
    box-shadow: 0 0 0 2px rgb(var(--app-main)), 8px 8px 0 0 rgb(var(--app-main));
  }
</style>