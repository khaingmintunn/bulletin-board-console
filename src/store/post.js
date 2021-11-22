import { authService } from '../service'
import { router } from '../router'
import { setItem } from '../utils'

const state = {
  error_message: null,
  success_message: null,
  loading: false,
}

const getters = {
  error_message: (state) => state.error_message,
  success_message: (state) => state.success_message,
  loading: (state) => state.loading,
}

const actions = {
  login({ commit }, params) {
    commit('resetMessage')
    state.loading = true
    authService
      .login(params)
      .then((res) => {
        setItem(process.env.VUE_APP_NAME, res.data.user)
        router.push('/home')
      })
      .catch((err) => {
        commit('setErrorMessage', err.graphQLErrors[0])
      })
  },

  signup({ commit }, params) {
    commit('resetMessage')
    state.loading = true
    authService
      .signup(params)
      .then((res) => {
        commit('setSuccessMessage', res.data.signup)
        setTimeout(() => {
          router.push('/login')
        }, 100)
      })
      .catch((err) => {
        commit('setErrorMessage', err.graphQLErrors[0])
      })
  },

  signupConfirm({ commit }, params) {
    commit('resetMessage')
    authService
      .signupConfirm(params)
      .then((res) => {
        commit('setSuccessMessage', res.data.signup_confirm)
      })
      .catch((err) => {
        commit('setErrorMessage', err.graphQLErrors[0])
      })
  },

  forgetPassword({ commit }, params) {
    commit('resetMessage')
    state.loading = true
    authService
      .forgetPassword(params)
      .then((res) => {
        commit('setSuccessMessage', res.data.forget_password)
        setTimeout(() => {
          router.push('/login')
        }, 100)
      })
      .catch((err) => {
        commit('setErrorMessage', err.graphQLErrors[0])
      })
  },

  resetPassword({ commit }, params) {
    commit('resetMessage')
    state.loading = true
    authService
      .resetPassword(params)
      .then((res) => {
        commit('setSuccessMessage', res.data.reset_password)
        setTimeout(() => {
          router.push('/login')
        }, 100)
      })
      .catch((err) => {
        commit('setErrorMessage', err.graphQLErrors[0])
      })
  },

  logout({ commit }) {
    authService
      .logout()
      .then((res) => {
        localStorage.clear()
        router.push('/login')
      })
      .catch((err) => {
        localStorage.clear()
        router.push('/login')
      })
  },

}

const mutations = {
  setErrorMessage(state, params) {
    state.error_message = params.message
    state.success_message = null
    state.loading = false
  },

  setSuccessMessage(state, params) {
    state.error_message = null
    state.success_message = params.message
    state.loading = false
  },

  resetMessage(state) {
    state.error_message = null
    state.success_message = null
  },
}

export const post = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
