<template>
  <div class="management-wrapper">
    <AppImageManagement></AppImageManagement>
    <AppGroupManagement></AppGroupManagement>
  </div>
</template>
  
<script setup lang="ts">
import AppGroupManagement from "@/components/group_management/AppGroupManagement.vue";
import AppImageManagement from "@/components/image_management/AppImageManagement.vue";
</script>

<style scoped>
  .management-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(100vh - 65px);
    width: 100vw;
  }

  @media(max-width: 640px){
    .management-wrapper{
      flex-direction: column-reverse;
      height: auto;
      min-height: 100vh;
      justify-content: flex-end;
    }
  }
</style>