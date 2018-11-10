<template>
    <div id="form"> 
      <ModalMessage :active="showModal" @closeModal="showModal = false" :message="modalMessage"/>

          <PersonForm />
          <EmailAddressForm />
          <PhoneNumberForm />
          <AddressForm/>

          <div>
            <button v-if="!next" @click="updateContact">Update</button>
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
import { updateContact } from '@/lib/api';

export default {
  name: 'Contact',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
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
    ...mapState({
      contact: state => state.contact,
    }),
  },
  methods: {
    ...mapActions(['resetForms', 'getContact']),
    fetchData() {
      this.getContact(this.$route.params.id);
    },
    updateContact() {
      updateContact(this.contact.id, this.contact);
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.getContact(this.$route.params.id);
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
