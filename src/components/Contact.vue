<template>
    <div id="form"> 
      <ModalMessage :active="showModal" @closeModal="showModal = false" :message="modalMessage"/>
      <h1>Contact Details</h1>
          <PersonForm />
          <EmailAddressForm />
          <PhoneNumberForm />
          <AddressForm/>

          <div>
            <button class="focus" @click="updateContact">Update</button>
          </div>

    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { mapActions } from 'vuex';
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
    ...mapGetters(['searchContacts']),
    ...mapState({
      contact: state => state.contact,
    }),
  },
  methods: {
    ...mapActions(['resetForms', 'getContact', 'setState']),
    fetchData() {
      this.getContact(this.$route.params.id);
    },
    async updateContact() {
      let contact = await updateContact(this.contact.id, this.contact);
      if (!contact.id) {
        this.$data.showModal = true;
        this.$data.modalMessage = 'Update failed, please try again.';
      }
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    let id = this.$route.params.id;
    let contact = this.searchContacts(id);
    if (contact.length === 1) {
      this.setState(contact[0]);
      console.info('Contact found! 😹');
    } else {
      console.info('Contact not found, fetching from server 😿');
      this.getContact(id);
    }
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
