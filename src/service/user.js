import Axios from "axios";
import { getItem } from "../utils"

export const userService = {
  getProfile,
  profileUpdate,
  emailUpdate,
  emailUpdateConfirm,
  passwordUpdate,
  getUser,
  getUsers,
  createUser,
  suspendUser,
  deleteUser
}

async function getProfile() {

}

async function profileUpdate() {

}

async function emailUpdate() {

}

async function emailUpdateConfirm() {

}

async function passwordUpdate() {

}

async function getUser() {

}

async function getUsers() {
  const result = Axios({
    method: "GET",
    url: `${process.env.VUE_APP_ROOT_API}/user/list`,
    headers: {
      "content-type": "application/json",
      "Authorization": getItem(process.env.VUE_APP_NAME).token
    }
  });
  return result;
}

async function createUser() {

}

async function suspendUser() {

}

async function deleteUser() {

}
