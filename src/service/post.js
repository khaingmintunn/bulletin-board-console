import Axios from "axios";
import { getItem } from "../utils"

export const postService = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
}

async function createPost(params) {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/post/create`,
    data: JSON.stringify({ title: params.title, text: params.text }),
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}

async function getPosts() {
  const result = Axios({
    method: "GET",
    url: `${process.env.VUE_APP_ROOT_API}/post/list`,
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}

async function getPost(post_id) {
  const result = Axios({
    method: "GET",
    url: `${process.env.VUE_APP_ROOT_API}/post/post/${post_id}`,
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}

async function updatePost(params) {
  const result = Axios({
    method: "PUT",
    url: `${process.env.VUE_APP_ROOT_API}/post/${params.post_id}`,
    data: JSON.stringify({ title: params.title, text: params.text }),
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}

async function deletePost(post_id) {
  const result = Axios({
    method: "DELETE",
    url: `${process.env.VUE_APP_ROOT_API}/post/${post_id}`,
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}
