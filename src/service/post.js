import Axios from "axios";
import { getItem } from "../utils"

export const postService = {
  getPosts,
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
