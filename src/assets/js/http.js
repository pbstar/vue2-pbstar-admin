import axios from "axios";
import config from "../../../public/config.json";
let baseURL = config.baseApi
axios.defaults.timeout = 8000;//设置超时时间，单位毫秒
axios.defaults.retry = 3; //设置全局请求次数
axios.defaults.retryDelay = 1000;//设置全局请求间隙

// http 响应拦截器
axios.interceptors.response.use((response) => {
  return response
}, error => {
  var config = error.config;
  if (!config || !config.retry) return Promise.reject(error);
  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= config.retry) {
    alert('请求异常：' + error.message + '!')
    return Promise.reject(error);
  }

  config.__retryCount++;

  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });

  return backoff.then(function () {
    return axios(config);
  });
})
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
