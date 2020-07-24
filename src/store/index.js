import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //弹出背景层
    showpopup: false,
  },
  mutations: {
    //修改弹出层
    changeShowpopup(state, payload) {
      state.showpopup = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
