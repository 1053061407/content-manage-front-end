import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import article from './modules/article'
import employment from './modules/employment'
import carousel from './modules/carousel'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    article,
    employment,
    carousel
  },
  getters
})

export default store
