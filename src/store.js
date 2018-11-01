import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    personForm: {
      firstName: "Maxwell",
      lastName: "Smart",
      dateOfBirth: "1986"
    }
  },
  mutations: {
    updatePerson(state, payload) {
      state.personForm = payload;
    }
  },
  actions: {
    updatePerson({ commit }, personForm) {
      commit("addItem", personForm);
    },
  },
  getters: {}
});
