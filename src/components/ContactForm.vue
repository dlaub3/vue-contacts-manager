<template>
    <div id="form"> 
      <div>
        <button v-if="prev" @click="move('previous')">Previous</button>
        <button v-if="next" @click="move('next')">Next</button>
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
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import PersonForm from '@/components/PersonForm.vue';
import EmailAddressForm from '@/components/EmailAddressForm.vue';
import PhoneNumberForm from '@/components/PhoneNumberForm.vue';
import AddressForm from '@/components/AddressForm.vue';

export default {
  name: 'ContactForm',
  props: {},
  components: {
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
          next: null,
        },
      };

      let currState = this.$data.active;
      let newState = states[currState][direction] || currState;
      this.$data.active = newState;
      this.$data.prev = states[newState]['previous'] ? true : false;
      this.$data.next = states[newState]['next'] ? true : false;
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

input,
select {
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
  transition: opacity 0.5s;
}

.fade-leave-active {
  display: none;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
