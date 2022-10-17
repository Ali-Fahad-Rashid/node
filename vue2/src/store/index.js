import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      {name: ''},

]
  },
  getters: {
    uu: (state) => {
        var uu = state.users.map( user => {
            return {
                name:localStorage.getItem('user')
            };
        });
        return uu;
    }
},
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
