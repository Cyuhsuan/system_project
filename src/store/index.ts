import Vue from 'vue'
import Vuex from 'vuex'
import Auth from "./modules/auth.module";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    // addUser(state, data) {
    //   state.user = data;
    //   let obj = JSON.stringify(data);
    //   localStorage.setItem("user", obj);
    // },
    // removeUser(state) {
    //   state.user = {};
    // },
  },
  actions: {
  },
  modules: {
    Auth
  },
  getters: {
  }
})
