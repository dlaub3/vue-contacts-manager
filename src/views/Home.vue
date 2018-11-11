<template>
  <div class="home">
    <h1>Add Contacts</h1>
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
