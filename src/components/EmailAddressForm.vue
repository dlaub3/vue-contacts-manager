<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
      <input
        :class="[form.email_address ? '' : 'required']"  
        v-model="form.email_address" 
				type="email"
				placeholder="Email Address" 
				@keyup="updateForm({ form: stateKey, id: form.id, email_address: form.email_address, field: 'email_address' })" 
				/>
      <Select
        :class="[form.type_id ? '' : 'required']" 
      	:message="'Select email type'"
				:selectedOption="form.type_id" 
				:options="options" 
				v-on:option-selected="updateForm({ form: stateKey, id: form.id, type_id: $event, field: 'type_id'})"
			/>
      <button class="important" @click="deleteForm({form: 'email_addresses', id: form.id})">Delete Email Address</button>
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
  props: {
    stateKey: {
      type: String,
      default: () => console.error(`${this} missing stateKey`),
    },
  },
  components: {
    Select,
  },
  computed: {
    ...mapState({
      forms: state => state.contact.email_addresses,
      options: state => state.types,
    }),
  },
  methods: {
    ...mapActions(['addForm', 'updateForm', 'deleteForm']),
  },
};
</script>

<style scoped>
</style>
