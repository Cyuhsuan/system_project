import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    addUser(state, data) {
      state.user = data
    },
    removeUser(state) {
      state.user = {};
    },
  },
  actions: {
  },
  modules: {
  }
})
