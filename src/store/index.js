import Vue from 'vue'
import Vuex from 'vuex'
import order from './order'
import user from './user'
import address from './address'
import adduser from './adduser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    order,
    user,
    address,
    adduser
  }
})
