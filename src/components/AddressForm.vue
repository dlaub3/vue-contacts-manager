<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
        <input 
          v-model="form.address1" 
          type="text" 
          placeholder="Address 1" 
          @keyup="updateForm({ form: 'addressForm', id: form.id, adress1: form.adress1, field: 'adress1' })" 
        />
        <input 
          v-model="form.address2" 
          type="text" 
          placeholder="Address 2"
          @keyup="updateForm({ form: 'addressForm', id: form.id, adress2: form.adress2, field: 'adress2' })" 
        />
        <input 
          v-model="form.city" 
          type="text" 
          placeholder="City"
          @keyup="updateForm({ form: 'addressForm', id: form.id, city: form.city, field: 'city' })" 
        />
        <input 
          v-model="form.state" 
          type="text" 
          placeholder="State"
          @keyup="updateForm({ form: 'addressForm', id: form.id, state: form.state, field: 'state' })" 
        >
        <input 
          v-model="form.zip" 
          type="text" 
          placeholder="Zip"
          @keyup="updateForm({ form: 'addressForm', id: form.id, zip: form.zip, field: 'zip' })" 
          />
        <Select
          :message="'Select email type'" 
          :selectedOption="form.typeID" 
          :options="options"
				  v-on:option-selected="updateForm({ form: 'addressForm', id: form.id, typeID: $event, field: 'typeID'})" 
        />
    </form>
      <button @click="addForm('addressForm')">Add Emial Address</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import Select from '@/components/Select.vue';
import formStyles from './formStyles.scss';

export default {
  name: 'addressForm',
  props: {},
  components: {
    Select,
  },
  computed: {
    ...mapState({
      forms: state => state.addressForm,
      options: state => state.typeSelectOptions,
    }),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions(['addForm', 'updateForm']),
  },
};
</script>

<style scoped>
</style>
