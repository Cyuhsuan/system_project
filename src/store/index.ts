import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    addUser(state, data) {
      state.user = data;
      let obj = JSON.stringify(data);
      localStorage.setItem("user", obj);
    },
    removeUser(state) {
      state.user = {};
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    isLogin: (state) => {
      if (state.user !== {}) {
        return true;
      } else {
        return false;
      }
      // return state.user !== {};
      // if (state.user) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  }
})
