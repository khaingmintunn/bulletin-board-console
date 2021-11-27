import { postService } from "../service";
import moment from "moment";

const state = {
  posts: [],
  error_message: null,
  success_message: null,
  loading: false,
};

const getters = {
  posts: (state) => state.posts,
  error_message: (state) => state.error_message,
  success_message: (state) => state.success_message,
  loading: (state) => state.loading,
};

const actions = {
  getPosts({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    postService
      .getPosts()
      .then((res) => {
        const posts = [];
        res.data.posts.map((post) => {
          posts.push({
            ...post,
            created: moment(post.created * 1000).format("llll"),
            updated: post.updated ? moment(post.updated * 1000).format("llll") : null,
          });
        });
        commit("setPosts", posts);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },
};

const mutations = {
  setPosts(state, params) {
    state.posts = params;
    state.error_message = null;
    state.success_message = null;
    state.loading = false;
  },

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

export const post = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
