import Vue from 'vue';
import Vuex from 'vuex';
import {
  getContact
} from '@/lib/api';

Vue.use(Vuex);

const FORMS = {
  person: {
    first_name: '',
    last_name: '',
    date_of_birth: '',
  },
  email_addresses: {
    id: '',
    email_address: '',
    type_id: '',
  },
  phone_numbers: {
    id: '',
    phone_number: '',
    type_id: '',
  },
  addresses: {
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    type_id: '',
  },
};

export default new Vuex.Store({
  state: {
    types: [{
        id: 1,
        text: 'Primary',
      },
      {
        id: 2,
        text: 'Secondary',
      },
      {
        id: 3,
        text: 'Home',
      },
    ],
    contact: {},
    data: []
  },
  mutations: {
    addForm(state, formKey) {
      let forms = propBuilder(formKey, state);
      let id = forms.length + 1;
      let formName = formKey.split('.').pop();
      let newForm = FORMS[formName];
      newForm.id = id;
      forms.push({
        ...newForm,
      });
    },
    updateForm(state, payload) {
      let {
        id,
        form,
        field
      } = payload;

      let forms = propBuilder(form, state);

      forms.forEach(form => {
        if (form.id === id) {
          form[field] = payload[field];
        }
      });
    },
    updateProp(state, payload) {
      let {
        propkey,
        value
      } = payload;

      let prop = propBuilder(propkey, state);

      prop = value;
    },
    resetForms(state) {
      state.contact = FORMS.person;
      state.contact.addresses = [FORMS.addresses];
      state.contact.phone_numbers = [FORMS.phone_numbers];
      state.contact.email_addresses = [FORMS.email_addresses];
    },
    setState(state, payload) {
      let {
        key,
        data
      } = payload;
      state[key] = data;
    }
  },
  actions: {
    setState({
      commit
    }, payload) {
      commit('setState', payload);
    },
    addForm({
      commit
    }, form) {
      commit('addForm', form);
    },
    updateForm({
      commit
    }, payload) {
      commit('updateForm', payload);
    },
    updateProp({
      commit
    }, payload) {
      commit('updateProp', payload);
    },
    resetForms({
      commit
    }) {
      commit('resetForms');
    },
    async getContact({
      commit
    }, id) {
      let contact = await getContact(id);
      commit('setState', {
        key: 'contact',
        data: contact
      });
    },
  },
  getters: {
    searchContacts: state => id => {
      return state.data.filter(contact => Number(contact.id) === Number(id));
    },
  },
});

function propBuilder(str, state) {
  let props = str.split('.');
  props.forEach(p => {
    state = state[p];
  });
  return state;
}