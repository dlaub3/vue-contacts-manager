<template>
    <div id="form"> 
      <ModalMessage :active="showModal" @closeModal="showModal = false" :message="modalMessage"/>
      <div>
      
        <div class="nav">
          <transition name="grow">
            <button 
            v-if="prev" 
            @click="move('previous')">Previous</button>
          </transition>

          <transition name="grow">
            <button 
            v-if="next" 
            :class="next ? 'focus' : ''"
            @click="move('next')">{{nextText}}</button>
          </transition>
        </div>

      <transition name="fade">
        <div  v-if="active === 'PersonForm'">
          <PersonForm :stateKey="stateKey + 'person'" />
        </div>
      </transition>

      <transition name="fade">
        <div  v-if="active === 'EmailAddressForm'">
          <EmailAddressForm :stateKey="stateKey + 'email_addresses'" />
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'PhoneNumberForm'">
          <PhoneNumberForm :stateKey="stateKey + 'phone_numbers'"  />
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'AddressForm'">
          <AddressForm :stateKey="stateKey + 'addresses'" />
        </div>
      </transition>

      <transition name="fade">
        <div v-if="active === 'Review'">
          <PersonForm :stateKey="stateKey + 'person'"  />
          <EmailAddressForm :stateKey="stateKey + 'email_addresses'"  />
          <PhoneNumberForm :stateKey="stateKey + 'phone_numbers'"  />
          <AddressForm :stateKey="stateKey + 'addresses'" />
        </div>
      </transition>

    <div>
      <button class="focus" v-if="!next" @click="handleSubmit">Submit</button>
    </div>
    </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
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
      stateKey: 'contact.',
      active: 'PersonForm',
      prev: false,
      next: true,
      nextText: 'Next',
      showModal: false,
      modalMessage: '',
    };
  },
  computed: {
    ...mapState({
      contact: state => state.contact,
    }),
  },
  methods: {
    ...mapActions(['resetForms']),
    async handleSubmit() {
      let data = this.contact;
      let person = await addContact(data);
      if (person) {
        this.resetForms();
        this.$data.active = 'PersonForm';
        this.$data.prev = false;
        this.$data.next = true;
        this.$data.nextText = 'Next';
        this.$data.modalMessage = `
            Contact added successfully<br><br>
            <a href="/#/contact/${person.id}">View Contact</a>`;
        this.$data.showModal = true;
      }
      if (!person) {
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
  watch: {
    $route: 'resetForms',
  },
  created() {
    this.resetForms();
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

.nav {
  display: flex;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  display: none;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.grow-enter-active {
  transition: opacity 0.5s;
}

.grow-leave-active {
  flex-grow: 0;
}

.grow-enter,
.grow-leave-to {
  opacity: 0;
}
</style>
