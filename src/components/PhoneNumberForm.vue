<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
      <input  
        v-model="form.phoneNumber" 
				type="email"
				placeholder="Email Address" 
				required
				@keyup="updateForm({ form: 'phoneNumberForm', id: form.id, phoneNumber: form.phoneNumber, field: 'phoneNumber' })" 
			/>
      <Select 
      	:message="'Select email type'" 
				:selectedOption="form.typeID" 
				:options="options" 
				v-on:option-selected="updateForm({ form: 'phoneNumberForm', id: form.id, typeID: $event, field: 'typeID'})"
			/>
    </form>
      <button @click="addForm('phoneNumberForm')">Add Emial Address</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Select from '@/components/Select.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'PhoneNumberForm',
  props: {},
  components: {
    Select,
  },
  computed: {
    ...mapState({
      forms: state => state.phoneNumberForm,
      options: state => state.typeSelectOptions,
    }),
  },
  methods: {
    ...mapActions(['addForm', 'updateForm']),
  },
};
</script>

<style scoped>
</style>
