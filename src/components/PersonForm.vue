<template>
    <form>
        <input
          :class="[form.first_name? '' : 'required']"
          v-model="form.first_name"
          placeholder="First Name" 
          type="text" autofocus
          @keyup="updateProp({propkey: 'contact', value: form})"
        />
        <input
          :class="[form.last_name ? '' : 'required']"
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
import formStyles from './formStyles.scss';

export default {
  name: 'PersonForm',
  props: {
    stateKey: {
      type: String,
      default: () => console.error(`${this} missing stateKey`),
    },
  },
  components: {},
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
