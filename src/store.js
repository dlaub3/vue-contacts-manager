import Vue from 'vue';
import Vuex from 'vuex';
import {
  getContact,
  deleteForm
} from '@/lib/api';

import {
  deepClone
} from '@/lib/objHelpers';
import {
  formatAPIString
} from '@/lib/strHelpers';

Vue.use(Vuex);

const CONTACT = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  email_addresses: [{
    email_address: '',
    type_id: 1,
  }],
  phone_numbers: [{
    phone_number: '',
    type_id: 1,
  }],
  addresses: [{
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    type_id: 1,
  }],
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
    data: [],
    page: 1,
  },
  mutations: {
    addForm(state, formKey) {
      let forms = propBuilder(formKey, state);
      let id = forms.length + 1;
      let formName = formKey.split('.').pop();
      let newForm = CONTACT[formName][0];
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
    deleteForm(state, payload) {
      let {
        id,
        form,
      } = payload;

      state.contact[form] = state.contact[form].filter(form => form.id !== id);
    },
    deleteContactData(state, id) {
      state.data = state.data.filter(contact => contact.id !== id);
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
      state.contact = deepClone(CONTACT);
    },
    setState(state, payload) {
      let {
        key,
        data
      } = payload;

      if (data.constructor === Array) {
        state[key] = [...data];
      } else if (data.constructor === Object) {
        state[key] = { ...data
        };
      } else {
        state[key] = data;
      }
    },
    linkState(state, payload) {
      let {
        key,
        data
      } = payload;

      if (data.constructor === Array) {
        state[key] = data;
      } else if (data.constructor === Object) {
        state[key] = data;
      } else {
        state[key] = data;
      }
    },
    appendState(state, payload) {
      let {
        key,
        data
      } = payload;

      if (data instanceof Array) {
        state[key] = [...state[key], ...data];
      } else if (data instanceof Object) {
        state[key] = {
          ...state[key],
          ...data
        };
      }
    }
  },
  actions: {
    setState({
      commit
    }, payload) {
      commit('setState', payload);
    },
    linkState({
      commit
    }, payload) {
      commit('linkState', payload);
    },
    appendState({
      commit
    }, payload) {
      commit('appendState', payload);
    },
    addForm({
      commit
    }, form) {
      commit('addForm', form);
    },
    async deleteForm({
      commit,
      getters
    }, payload) {
      let form = getters.searchForms(payload.form, payload.id);
      if (form.person_id) {
        let url = formatAPIString(payload.form);
        let success = await deleteForm(url, form.id);
        success ? commit('deleteForm', payload) : console.log(`Failed to delete:${url,form.id}`);
      } else {
        commit('deleteForm', payload);
      }
    },
    deleteContactData({
      commit
    }, id) {
      commit('deleteContactData', id);
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
    searchForms: state => (forms, id) => {
      return state.contact[forms].filter(form => Number(form.id) === Number(id))[0];
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