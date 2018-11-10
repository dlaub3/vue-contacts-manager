<template>
  <div>
    <form v-for="form in forms" v-bind:key="form.id">
        <input 
          v-model="form.address_1" 
          type="text" 
          placeholder="Address 1" 
          @keyup="updateForm({ form: stateKey, id: form.id, address_1: form.address_1, field: 'adress_1' })" 
        />
        <input
          v-model="form.address_2" 
          type="text" 
          placeholder="Address 2"
          @keyup="updateForm({ form: stateKey, id: form.id, address_2: form.address_2, field: 'adress_2' })" 
        />
        <input 
          v-model="form.city" 
          type="text" 
          placeholder="City"
          @keyup="updateForm({ form: stateKey, id: form.id, city: form.city, field: 'city' })" 
        />
        <input 
          v-model="form.state" 
          type="text" 
          placeholder="State"
          @keyup="updateForm({ form: stateKey, id: form.id, state: form.state, field: 'state' })" 
        >
        <input 
          v-model="form.zip" 
          type="text" 
          placeholder="Zip"
          @keyup="updateForm({ form: stateKey, id: form.id, zip: form.zip, field: 'zip' })" 
          />
        <input 
          v-model="form.country"
          type="text" 
          placeholder="Country"
          @keyup="updateForm({ form: stateKey, id: form.id, country: form.country, field: 'country' })" 
          />
        <Select
          :message="'Select email type'" 
          :selectedOption="form.type_id" 
          :options="options"
				  v-on:option-selected="updateForm({ form: stateKey, id: form.id, type_id: $event, field: 'type_id'})" 
        />
    </form>
      <button @click="addForm(stateKey)">Add Address</button>
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
  data() {
    return {
      stateKey: 'contact.addresses',
    };
  },
  computed: {
    ...mapState({
      forms: state => state.contact.addresses,
      options: state => state.types,
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
