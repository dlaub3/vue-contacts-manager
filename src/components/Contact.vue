<template>
    <div id="form"> 
      <ModalMessage :active="showModal" @closeModal="showModal = false" :message="modalMessage"/>

          <PersonForm />
          <EmailAddressForm />
          <PhoneNumberForm />
          <AddressForm/>

    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import ModalMessage from '@/components/ModalMessage.vue';
import PersonForm from '@/components/PersonForm.vue';
import EmailAddressForm from '@/components/EmailAddressForm.vue';
import PhoneNumberForm from '@/components/PhoneNumberForm.vue';
import AddressForm from '@/components/AddressForm.vue';
// import { addContact } from '@/lib/api';

export default {
  name: 'Contact',
  props: {},
  components: {
    ModalMessage,
    PersonForm,
    EmailAddressForm,
    PhoneNumberForm,
    AddressForm,
  },
  data() {
    return {
      showModal: false,
      modalMessage: '',
    };
  },
  computed: {
    contactForm: {
      get() {
        return {
          personForm: this.$store.state.personForm,
          emailAddressForm: this.$store.state.emailAddressForm,
          phoneNumberForm: this.$store.state.phoneNumberForm,
          addressForm: this.$store.state.addressForm,
        };
      },
    },
  },
  methods: {
    ...mapActions(['resetForms', 'loadContact']),
    async handleSubmit() {},
  },
  mounted() {
    console.log(this.$pops);
    this.loadContact(20);
  },
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

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  display: none;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
