<template>
    <div id="form"> 
      <ModalMessage :active="showModal" @closeModal="showModal = false" :message="modalMessage"/>
      <h1>Contact Details</h1>
          <PersonForm :stateKey="stateKey + 'person'"  />
          <EmailAddressForm :stateKey="stateKey + 'email_addresses'"  />
          <PhoneNumberForm :stateKey="stateKey + 'phone_numbers'" />
          <AddressForm :stateKey="stateKey + 'addresses'"  />

          <div>
            <button class="focus" @click="updateContact">Update</button>
          </div>
          <div>
            <button class="important" @click="deleteContact">Delete</button>
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
import { updateContact, deleteContact } from '@/lib/api';

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
      stateKey: 'contact.',
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
    ...mapActions([
      'resetForms',
      'getContact',
      'linkState',
      'deleteContactData',
    ]),
    fetchData() {
      this.getContact(this.$route.params.id);
    },
    async updateContact() {
      let contact = await updateContact(this.contact.id, this.contact);
      if (!contact.id) {
        this.$data.showModal = true;
        this.$data.modalMessage = 'Update failed, please try again.';
      } else {
        this.$data.showModal = true;
        this.$data.modalMessage = 'Update successful :)';
      }
    },
    async deleteContact() {
      let success = await deleteContact(this.contact.id);
      if (!success) {
        this.$data.showModal = true;
        this.$data.modalMessage = 'Delete failed, please try again.';
      } else {
        this.$router.go(-1);
        this.deleteContactData(this.contact.id);
      }
    },
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    let id = this.$route.params.id;
    let contact = this.searchContacts(id);
    if (contact.length !== 0) {
      this.linkState({ key: 'contact', data: contact[0] });
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
