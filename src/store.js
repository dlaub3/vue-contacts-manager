import Vue from "vue";
import Vuex from "vuex";
import {
  loadContact
} from '@/lib/api';

Vue.use(Vuex);

const FORMS = {
  person: {
    first_name: '',
    last_name: '',
    date_of_birth: '',
  },
  email_addresses: {
    id: null,
    email_address: null,
    type_id: -1,
  },
  phone_numbers: {
    id: null,
    phone_number: null,
    type_id: -1,
  },
  addresses: {
    address_1: null,
    address_2: null,
    city: null,
    state: null,
    country: null,
    zip: null,
    type_id: -1,
  }
}

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
      }
    ],
    contact: {
      addresses: [{
        address_1: '123 South Lane',
        address_2: 'Box 109',
        city: 'Pleasant City',
        state: 'SD',
        country: 'USA',
        zip: '46729',
        type_id: 1,
      }],
      email_addresses: [{
        id: 1,
        email_address: 'person1@example.com',
        type_id: 1,
      }, ],
      phone_numbers: [{
        id: 1,
        phone_number: '888-888-8888',
        type_id: 1,
      }],
      first_name: 'Sam',
      last_name: 'Waters',
      date_of_birth: '11-11-1911',
    }
  },
  mutations: {
    addForm(state, formKey) {
      let forms = propBuilder(formKey, state);
      let id = forms.length + 1;
      let formName = formKey.split('.').pop();
      let newForm = FORMS[formName];
      newForm.id = id;
      forms.push({ ...newForm
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
      state.person = FORMS.person;
      state.addresses = [FORMS.addresses];
      state.phone_numbers = [FORMS.phone_numbers];
      state.email_addresses = [FORMS.email_addresses];
    },
    loadContact(state, payload) {
      state.contact = payload;
    }
  },
  actions: {
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
    async loadContact({
      commit
    }, id) {
      let contact = await loadContact(id);
      commit('loadContact', contact);
    }
  },
  getters: {},
});

function propBuilder(str, state) {
  let props = str.split('.');
  props.forEach(p => {
    state = state[p];
  });
  return state;
}