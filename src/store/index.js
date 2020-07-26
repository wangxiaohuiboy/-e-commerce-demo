import Vue from 'vue'
import Vuex from 'vuex'
import search from "./search/index"

Vue.use(Vuex)
export default new Vuex.Store({
  state:{},
  mutations:{},
  actions:{},
  modules: {
    search,
  }
})
