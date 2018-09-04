import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {
    setName(state, val) {
      state.name = val
    }
  },
  getters: {}
})