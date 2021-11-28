import { postService } from "../service";
import moment from "moment";
import { router } from "../router";

const state = {
  posts: [],
  post: {},
  error_message: null,
  success_message: null,
  loading: false,
};

const getters = {
  posts: (state) => state.posts,
  post: (state) => state.post,
  error_message: (state) => state.error_message,
  success_message: (state) => state.success_message,
  loading: (state) => state.loading,
};

const actions = {
  createPost({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    postService
      .createPost(params)
      .then(() => {
        router.push("/post/list");
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

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
            updated: post.updated
              ? moment(post.updated * 1000).format("llll")
              : null,
          });
        });
        commit("setPosts", posts);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  getPost({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    postService
      .getPost(params)
      .then((res) => {
        commit("setPost", res.data.post);
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  updatePost({ commit }, params) {
    commit("resetMessage");
    state.loading = true;
    postService
      .updatePost(params)
      .then(() => {
        router.push("/post/list");
      })
      .catch((err) => {
        commit("setErrorMessage", err.response.data);
      });
  },

  deletePost({ commit, state }, params) {
    commit("resetMessage");
    state.loading = true;
    postService
      .deletePost(params)
      .then((res) => {
        const posts = state.posts.filter(
          (post) => post.post_id !== res.data.post.post_id
        );
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

  setPost(state, params) {
    state.post = params;
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
