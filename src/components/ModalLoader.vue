<template>
  <div class='loader'>
    <div class="block"></div>
  </div>
</template>

<script>
export default {
  name: 'ModalLoader',
};
</script>

<style scoped>
@keyframes loader {
  from {
    left: -20%;
  }
  to {
    left: 100vw;
  }
}

.loader {
  position: relative;
  background: white;
  width: 75%;
  height: 20px;
  overflow: hidden;
}

.block {
  position: absolute;
  width: 20%;
  background: teal;
  height: 100%;
  left: -20%;
  animation: loader 3s linear infinite;
}
</style>
