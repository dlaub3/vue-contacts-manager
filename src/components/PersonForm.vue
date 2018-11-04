<template>
    <form>
        <input 
          v-model="form.firstName"
          placeholder="First Name" 
          type="text" autofocus required 
          @keyup="updateProp({propkey: 'personForm', value: form})"
        />
        <input 
          v-model="form.lastName"
          placeholder="Last Name" 
          type="text" 
        />
        <input 
          v-model="form.dateOfBirth"
          placeholder="Date Of Birth" 
          type="text" 
          @keyup="updateProp({propkey: 'personForm', value: form})"
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
      form: state => state.personForm,
    }),
  },
  methods: {
    ...mapActions(['updateProp']),
  },
};
</script>

<style scoped>
</style>
