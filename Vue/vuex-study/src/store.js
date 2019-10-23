import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visit: []
  },
  mutations: {
    SET_EMPTY(state, view) {
      state.visit.push({
        ...view
      })
    }
  },
  actions: {
    async setEmptyObjectTest({commit}, view) {
      console.log(view)
      commit("SET_EMPTY", view)
    }
  }
})
