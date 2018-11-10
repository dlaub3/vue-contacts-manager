<template>
    <form>
        <input 
          v-model="form.first_name"
          placeholder="First Name" 
          type="text" autofocus required 
          @keyup="updateProp({propkey: 'contact', value: form})"
        />
        <input 
          v-model="form.last_name"
          placeholder="Last Name" 
          type="text" 
        />
        <input 
          v-model="form.date_of_birth"
          placeholder="Date Of Birth" 
          type="text" 
          @keyup="updateProp({propkey: 'contact', value: form})"
        />
    </form>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Select from '@/components/Select.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'PersonForm',
  components: {
    Select,
  },
  computed: {
    ...mapState({
      form: state => state.contact,
    }),
  },
  methods: {
    ...mapActions(['updateProp']),
  },
};
</script>

<style scoped>
</style>
