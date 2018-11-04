<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
      <input  
        v-model="form.emailAddress" 
				type="email"
				placeholder="Email Address" 
				required
				@keyup="updateForm({ form: 'emailAddressForm', id: form.id, emailAddress: form.emailAddress, field: 'emailAddress' })" 
				/>
      <Select 
      	:message="'Select email type'" 
				:selectedOption="form.typeID" 
				:options="options" 
				v-on:option-selected="updateForm({ form: 'emailAddressForm', id: form.id, typeID: $event, field: 'typeID'})"
			/>
    </form>
     <button @click="addForm('emailAddressForm')">Add Emial Address</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Select from '@/components/Select.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'EmailAddressForm',
  props: {},
  components: {
    Select,
  },
  computed: {
    ...mapState({
      forms: state => state.emailAddressForm,
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
