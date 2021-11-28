import { userService } from '../service'
import { router } from '../router'
import moment from "moment";

const state = {
  user: {},
  users: [],
  error_message: null,
  success_message: null,
  loading: false,
}

const getters = {
  user: (state) => state.user,
  users: (state) => state.users,
  error_message: (state) => state.error_message,
  success_message: (state) => state.success_message,
  loading: (state) => state.loading,
}

const actions = {
  getUsers({ commit }) {
    userService
      .getUsers()
      .then((res) => {
        const users = [];
        res.data.users.map((user) => {
          users.push({
            ...user,
            created: moment(user.created * 1000).format("llll"),
            updated: user.updated ? moment(user.updated * 1000).format("llll") : null,
          });
        });
        commit("setUsers", users);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      })
  },

  getUser({ commit }) {
    userService
      .getUser(params)
      .then((res) => {
        router.push('/login')
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      })
  },
}

const mutations = {
  setUser(state, params) {
    state.user = params
    state.error_message = null
    state.success_message = null
    state.loading = false
  },

  setUsers(state, params) {
    state.users = params
    state.error_message = null
    state.success_message = null
    state.loading = false
  },

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

export const user = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
