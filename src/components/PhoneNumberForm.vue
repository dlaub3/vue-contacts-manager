<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
      <input  
        v-model="form.phone_number" 
				type="tel"
				placeholder="Phone Number" 
				required
				@keyup="updateForm({ form: stateKey, id: form.id, phone_number: form.phone_number, field: 'phone_number' })" 
			/>
      <Select 
      	:message="'Select phone type'"  
				:selectedOption="form.type_id" 
				:options="options" 
				v-on:option-selected="updateForm({ form: stateKey, id: form.id, type_id: $event, field: 'type_id'})"
			/>
       <button class="important" @click="deleteForm({form: 'phone_numbers', id: form.id})">Delete Phone Number</button>
    </form>
      <button @click="addForm(stateKey)">Add Phone Number</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import Select from '@/components/Select.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'PhoneNumberForm',
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
      forms: state => state.contact.phone_numbers,
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
