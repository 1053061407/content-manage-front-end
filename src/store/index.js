import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import article from './modules/article'
import employment from './modules/employment'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    article,
    employment
  },
  getters
})

export default store
