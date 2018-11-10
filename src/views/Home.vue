<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ContactForm />
    <!-- <Contact /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import ContactForm from '@/components/ContactForm.vue';
import Contact from '@/components/Contact.vue';

export default {
  name: 'home',
  components: {
    ContactForm,
    // Contact,
  },
};
</script>
