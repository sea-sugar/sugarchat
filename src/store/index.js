import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import webSocket from './modules/webSocket'
import getters from './getters'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    user,
    webSocket,
  },
  getters
})

export default store


// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
