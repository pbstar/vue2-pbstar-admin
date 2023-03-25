function isMobile() {
  let m =
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  return navigator.userAgent.match(m);
}
function strToBase64(str) {
  if (str) {
    let encode = encodeURI(str);
    let base64 = btoa(encode);
    return base64;
  }
}
function base64ToStr(base64) {
  if (base64) {
    let decode = atob(base64);
    let str = decodeURI(decode);
    return str;
  }
}
function getLocalStorage(name) {
  if (name) return base64ToStr(localStorage.getItem(name));
}
function setLocalStorage(name, value) {
  if (name) localStorage.setItem(name, strToBase64(value));
}
function removeLocalStorage(name) {
  if (name) localStorage.removeItem(name);
}
function clearLocalStorage() {
  localStorage.clear()
}

function getRandomStr(num) {
  const chars = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  let res = ''
  for (let i = 0; i < num; i++) {
    var id = Math.ceil(Math.random() * 35)
    res += chars[id]
  }
  return res
}
function formatDate (date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var second = date.getSeconds();
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
};

export default {
  isMobile,
  strToBase64,
  base64ToStr,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  getRandomStr,
  formatDate
};
