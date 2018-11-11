<template>
  <div>
    <h1>Search Contacts</h1>
    <SearchForm />
  </div>
</template>
<script>
import SearchForm from '@/components/SearchForm.vue';

export default {
  name: 'home',
  components: {
    SearchForm,
  },
};
</script>
