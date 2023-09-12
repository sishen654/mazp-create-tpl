import Vue from "vue";
import VueRouter from "vue-router";
import { PiniaVuePlugin } from 'pinia'
import App from "./App.vue";
import router from "./route";
import pinia from "./store"
import "@global/index.scss";

// 1) 引入插件
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)

// 2) 挂载
new Vue({
  el: "#app",
  router,
  pinia,
  render: (h) => h(App),
}).$mount();
