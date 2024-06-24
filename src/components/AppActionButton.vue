<template>
  <button class="action-button">
    <span><slot></slot></span>
  </button>
</template>

<style scoped>
.action-button {
  box-sizing: border-box;
  background-color: rgb(var(--app-black));
  border-radius: 5px;
  border: 1px solid rgb(var(--app-white));
  transition: background-color 300ms;
}

.action-button span {
  display: block;
  cursor: pointer;
  padding: 5px;
  font-family: Inter-Bold;
  font-size: 14px;
  text-decoration: none;
  max-width: 100%;
  text-wrap: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(var(--app-white));
}

@media (hover: hover) {
  .action-button:hover {
    background-color: rgb(var(--app-white));
    border: 1px solid rgb(var(--app-black));
  }
  
  .action-button:hover span {
    color: rgb(var(--app-black))
  }
}
</style>  