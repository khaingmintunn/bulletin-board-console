import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth'
import { user } from './user'
import { post } from './post'

Vue.use(Vuex)

/**
 *eslint-disable no-new
 */
export const store = new Vuex.Store({
  modules: {
    auth,
    user,
    post,
  },
})
