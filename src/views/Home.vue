<template>
  <div class="home">
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
