<template>
    <div id="form"> 
      <ModalMessage :active="showModal" @closeModal="showModal = false" :message="modalMessage"/>
      <div>
        <button v-if="prev" @click="move('previous')">Previous</button>
        <button v-if="next" @click="move('next')">{{nextText}}</button>
      </div>

      <transition name="fade">
        <div  v-if="active === 'PersonForm'">
          <PersonForm />
        </div>
      </transition>

      <transition name="fade">
        <div  v-if="active === 'EmailAddressForm'">
          <EmailAddressForm />
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'PhoneNumberForm'">
          <PhoneNumberForm />
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'AddressForm'">
          <AddressForm/>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'Review'">
          <PersonForm />
          <EmailAddressForm />
          <PhoneNumberForm />
          <AddressForm/>
        </div>
      </transition>

    <div>
      <button v-if="!next" @click="handleSubmit">Submit</button>
    </div>
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
import { addContact } from '@/lib/api';

export default {
  name: 'ContactForm',
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
      active: 'PersonForm',
      prev: false,
      next: true,
      nextText: 'Next',
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
    ...mapActions(['resetForms']),
    async handleSubmit() {
      let data = this.contactForm;
      let success = await addContact(data);
      if (success) {
        this.resetForms();
        this.$data.active = 'PersonForm';
        this.$data.prev = false;
        this.$data.next = true;
        this.$data.nextText = 'Next';
        this.$data.modalMessage = 'Contact added successfully';
        this.$data.showModal = true;
      }
      if (!success) {
        this.$data.showModal = true;
        this.$data.modalMessage =
          'There was an error adding your contact, please try again.';
      }
    },
    move(direction) {
      let states = {
        PersonForm: {
          previous: null,
          active: 'PersonForm',
          next: 'EmailAddressForm',
        },
        EmailAddressForm: {
          previous: 'PersonForm',
          active: 'EmailAddressForm',
          next: 'PhoneNumberForm',
        },
        PhoneNumberForm: {
          previous: 'EmailAddressForm',
          active: 'PhoneNumberForm',
          next: 'AddressForm',
        },
        AddressForm: {
          previous: 'PhoneNumberForm',
          active: 'AddressForm',
          next: 'Review',
          nextText: 'Review',
        },
        Review: {
          previous: 'AddressForm',
          active: 'Review',
          next: null,
        },
      };

      let currState = this.$data.active;
      let newState = states[currState][direction] || currState;
      this.$data.active = newState;
      this.$data.prev = states[newState]['previous'] ? true : false;
      this.$data.next = states[newState]['next'] ? true : false;
      this.$data.nextText = states[newState]['nextText'] || 'Next';
    },
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
