<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button class="link-button">
    <a :href="props.path">{{ props.name }}</a>
    <div class="link-button--shade"></div>
  </button>
</template>

<style scoped>
.link-button {
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(184, 108, 245, 1),
    rgba(245, 108, 110, 1),
    rgba(245, 108, 110, 1),
    rgba(184, 108, 245, 1)
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

.link-button:hover {
  background-position: right;
}

.link-button--shade {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-color: rgba(31, 31, 31, 0.2);
  z-index: 2;
}

.link-button a {
  position: relative;
  display: block;
  padding: 10px 5px;
  width: calc(100% - 10px);
  font-family: Inter-Bold;
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  color: #ffffff;
  z-index: 3;
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
