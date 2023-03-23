import axios from "axios";
import config from "../../../public/config.json";
// axios.defaults.baseURL = "";
let baseURL = config.baseApi
function defaultGet(url, d) {
  let data = new Object()
  if (d) data = d
  data.axiosTime = new Date().getTime()
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: data,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function get(url, d) {
  let data = new Object()
  if (d) data = d
  data.axiosTime = new Date().getTime()
  return new Promise((resolve, reject) => {
    axios
      .get(baseURL + url, {
        params: data,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function post(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(baseURL + url, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default {
  defaultGet,
  get,
  post,
};
