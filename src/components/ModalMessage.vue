<template>
<transition name="modal">
   <div v-if="active">
     <div class="modal opacity"></div>
      <div class="modal">
         <div class="card">
          <div class="content" v-html="message">
          </div>
          <button @click="$emit('closeModal')">close</button>
        </div>
      </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'ModalMessage',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.opacity {
  background: #121515;
  opacity: 0.9;
}

.card {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2em;
}

.content {
  font-size: 1.2em;
  color: black;
  margin: 50px 0;
}
.modal-enter-active {
  z-index: 10;
  transition: all 0.5s;
}

.modal-leave-active {
  transition: all 0.5s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
</style>
