import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from "../public/config.json";
import element from '@/assets/js/element'
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/css/index.scss";
import http from "@/assets/js/http.js";
import unit from "@/assets/js/unit.js";
import bus from "@/assets/js/bus.js";
Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.prototype.$unit = unit;
Vue.prototype.$bus = bus;
Vue.prototype.$config = config;
Vue.use(element);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
