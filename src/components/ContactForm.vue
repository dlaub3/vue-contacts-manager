<template>
    <div id="form">
      <PersonForm />
      <EmailAddressForm v-bind:key="emailAddress + 'e'" v-for="emailAddress in emailAddressForms" />
      <button @click="addForm('emailAddressForms')">Add Emial Address</button>
      <PhoneNumberForm  v-bind:key="phoneNumber + 'p'" v-for="phoneNumber in phoneNumberForms"   />
      <button @click="addForm('phoneNumberForms')">Add Phone Number</button>
      <AddressForm  v-bind:key="address + 'a'" v-for="address in addressForms"   />
      <button @click="addForm('addressForms')">Add Address</button>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import PersonForm from "@/components/PersonForm.vue";
import EmailAddressForm from "@/components/EmailAddressForm.vue";
import PhoneNumberForm from "@/components/PhoneNumberForm.vue";
import AddressForm from "@/components/AddressForm.vue";

export default {
  name: "ContactForm",
  props: {
  },
  components: {
    PersonForm,
    EmailAddressForm,
    PhoneNumberForm,
    AddressForm
  },
  data() {
    return {
      emailAddressForms: [1],
      phoneNumberForms: [1],
      addressForms: [1],
    };
  },
  computed: {
    ...mapState([]),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    addForm(form) {
      this.$data[form] = [...this.$data[form], ++this.$data[form].length];
    }
  },
  watch: {
    propName: function() {},
  },
  mounted() {}
};
</script>

<style scoped>
  #form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  input, select {
    font-size: 1.5em;
    margin: 0.5em;
    padding: 0.2em; 
    display: block;
    border: 1px solid lightgrey;
  }

  select > option {
    width: 400px;
  }

  form {
    margin: 0 auto;
  }

</style>
