import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const FORMS = {
  personForm: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  },
  emailAddressForm: {
    id: null,
    emailAddress: null,
    typeID: -1,
  },
  phoneNumberForm: {
    id: null,
    phoneNumber: null,
    typeID: -1,
  },
  addressForm: {
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    typeID: -1,
  }
}

export default new Vuex.Store({
  state: {
    typeSelectOptions: [{
        id: 1,
        text: 'Primary'
      },
      {
        id: 2,
        text: 'Secondary'
      },
      {
        id: 3,
        text: 'Home'
      }
    ],
    addressForm: [{
      address1: '123 South Lane',
      address2: 'Box 109',
      city: 'Pleasant City',
      state: 'SD',
      zip: '46729',
      typeID: 1
    }],
    emailAddressForm: [{
      id: 1,
      emailAddress: 'person1@example.com',
      typeID: 1
    }, ],
    phoneNumberForm: [{
      id: 1,
      phoneNumber: '888-888-8888',
      typeID: 1,
    }],
    personForm: {
      firstName: 'Sam',
      lastName: 'Waters',
      dateOfBirth: '11-11-1911'
    },
    contactForm: {},

  },
  mutations: {
    addForm(state, form) {
      let forms = state[form];
      let id = forms.length + 1;
      let newForm = FORMS[form];
      newForm.id = id;
      state[form] = [...state[form], { ...newForm
      }];
    },
    updateForm(state, payload) {
      let {
        id,
        form,
        field
      } = payload;
      let forms = state[form];
      forms.forEach(form => {
        if (form.id === id) {
          form[field] = payload[field];
        }
      });

      state[form] = forms;
    },
    updateProp(state, payload) {
      let {
        propkey,
        value
      } = payload;

      function propBuilder(str, state) {
        let props = str.split('.');
        props.forEach(p => {
          state = state[p];
        });
        return state;
      }

      let prop = propBuilder(propkey, state);

      prop = value;
    },
    resetForms(state) {
      state.personForm = FORMS.personForm;
      state.addressForm = [FORMS.addressForm];
      state.phoneNumberForm = [FORMS.phoneNumberForm];
      state.emailAddressForm = [FORMS.emailAddressForm];
    },
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
    }
  },
  getters: {},
});