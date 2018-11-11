<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
      <input  
        v-model="form.email_address" 
				type="email"
				placeholder="Email Address" 
				required
				@keyup="updateForm({ form: stateKey, id: form.id, email_address: form.email_address, field: 'email_address' })" 
				/>
      <Select 
      	:message="'Select email type'"
				:selectedOption="form.type_id" 
				:options="options" 
				v-on:option-selected="updateForm({ form: stateKey, id: form.id, type_id: $event, field: 'type_id'})"
			/>
    </form>
     <button @click="addForm(stateKey)">Add Emial Address</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import Select from '@/components/Select.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'EmailAddressForm',
  props: {},
  components: {
    Select,
  },
  data() {
    return {
      stateKey: 'contact.email_addresses',
    };
  },
  computed: {
    ...mapState({
      forms: state => state.contact.email_addresses,
      options: state => state.types,
    }),
  },
  methods: {
    ...mapActions(['addForm', 'updateForm']),
  },
};
</script>

<style scoped>
</style>
