import Axios from "axios";
import { getItem } from "../utils"

export const authService = {
  login,
  signup,
  signupConfirm,
  forgetPassword,
  resetPassword,
  logout,
}

async function login(params) {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/login`,
    data: JSON.stringify({ email: params.email, password: params.password }),
    headers: {
      "content-type": "application/json"
    }
  });
  return result;
}

async function signup(params) {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/signup`,
    data: JSON.stringify({ name: params.name, email: params.email, password: params.password }),
    headers: {
      "content-type": "application/json"
    }
  });
  return result;
}

async function signupConfirm(token_id) {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/signup-confirm`,
    data: JSON.stringify({ token_id }),
    headers: {
      "content-type": "application/json"
    }
  });
  return result;
}

async function forgetPassword(email) {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/forget-password`,
    data: JSON.stringify({ email }),
    headers: {
      "content-type": "application/json"
    }
  });
  return result;
}

async function resetPassword(params) {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/reset-password`,
    data: JSON.stringify({ token_id: params.token_id, password: params.password, confirm_password: params.confirm_password }),
    headers: {
      "content-type": "application/json"
    }
  });
  return result;
}

async function logout() {
  const result = Axios({
    method: "POST",
    url: `${process.env.VUE_APP_ROOT_API}/logout`,
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}
