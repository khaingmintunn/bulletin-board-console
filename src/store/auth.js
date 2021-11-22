import { authService } from "../service";
import { router } from "../router";
import { setItem } from "../utils";
import { USER_TYPE } from "../../constant";

const state = {
  error_message: null,
  success_message: null,
  loading: false,
};

const getters = {
  error_message: (state) => state.error_message,
  success_message: (state) => state.success_message,
  loading: (state) => state.loading,
};

const actions = {
  login({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    authService
      .login(params)
      .then((res) => {
        setItem(process.env.VUE_APP_NAME, res.data);
        commit("setSuccessMessage", "");
        res.data.user.user_type === USER_TYPE.USER
          ? router.push("/post/list")
          : router.push("/user/list");
      })
      .catch((err) => {
        if (err.response) {
          commit("setErrorMessage", err.response.data);
        }
      });
  },

  signup({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    authService
      .signup(params)
      .then((res) => {
        commit("setSuccessMessage", res.data);
        setTimeout(() => {
          router.push("/login");
        }, 100);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  signupConfirm({ commit }, params) {
    commit("resetMessage");
    authService
      .signupConfirm(params)
      .then((res) => {
        commit("setSuccessMessage", res.data);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  forgetPassword({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    authService
      .forgetPassword(params)
      .then((res) => {
        commit("setSuccessMessage", res.data);
        setTimeout(() => {
          router.push("/login");
        }, 100);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  resetPassword({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    authService
      .resetPassword(params)
      .then((res) => {
        commit("setSuccessMessage", res.data);
        setTimeout(() => {
          router.push("/login");
        }, 100);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  logout({ commit }) {
    authService
      .logout()
      .then((res) => {
        localStorage.clear();
        router.push("/login");
      })
      .catch((err) => {
        localStorage.clear();
        router.push("/login");
      });
  },
};

const mutations = {
  setErrorMessage(state, params) {
    state.error_message = params.message;
    state.success_message = null;
    state.loading = false;
  },

  setSuccessMessage(state, params) {
    state.error_message = null;
    state.success_message = params.message;
    state.loading = false;
  },

  resetMessage(state) {
    state.error_message = null;
    state.success_message = null;
  },
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
