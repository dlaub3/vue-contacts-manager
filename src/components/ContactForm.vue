<template>
    <div id="form">

      <div>
      <button @click="move('previous')">Previous</button><button @click="move('next')">Next</button>
      </div>
      <pre>
        {{contactForm }}
        </pre>
      <transition name="fade">
        <div  v-if="active === 'PersonForm'">
          <PersonForm />
        </div>
      </transition>

      <transition name="fade">
        <div  v-if="active === 'EmailAddressForm'">
          <EmailAddressForm v-bind:key="emailAddress + 'e'" v-for="emailAddress in emailAddressForms" />
          <button @click="addForm('emailAddressForms')">Add Emial Address</button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'PhoneNumberForm'">
          <PhoneNumberForm  v-bind:key="phoneNumber + 'p'" v-for="phoneNumber in phoneNumberForms"   />
          <button @click="addForm('phoneNumberForms')">Add Phone Number</button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'AddressForm'">
          <AddressForm  v-bind:key="address + 'a'" v-for="address in addressForms"   />
          <button @click="addForm('addressForms')">Add Address</button>
        </div>
      </transition>
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
      active: 'PersonForm'
    };
  },
  computed: {
    ...mapState(["contactForm"]),
    ...mapGetters([]),
  },
  methods: {
    ...mapActions([]),
    addForm(form) {
      this.$data[form] = [...this.$data[form], ++this.$data[form].length];
    },
    move(direction) {
      console.log(this.$props);
      console.log(this.$data);
      let states = {
        PersonForm: {
          previous: 'PersonForm',
          active: 'PersonForm',
          next: 'EmailAddressForm'
        },
        EmailAddressForm: {
          previous: 'PersonForm',
          active: 'EmailAddressForm',
          next: 'PhoneNumberForm'
        },
        PhoneNumberForm: {
          previous: 'EmailAddressForm',
          active: 'PhoneNumberForm',
          next: 'AddressForm'
        },
        AddressForm: {
          previous: 'PhoneNumberForm',
          active: 'AddressForm',
          next: 'AddressForm'
        }
      }

      let currState = this.$data.active;

      this.$data.active = states[currState][direction];
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

  .fade-enter-active {
    transition: opacity .5s;
  }
  
  .fade-leave-active {
    display: none;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
