<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ContactForm />
  </div>
</template>

<script>
// @ is an alias to /src
import ContactForm from '@/components/ContactForm.vue';

export default {
  name: 'home',
  components: {
    ContactForm,
  },
};
</script>
