import Vue from "vue";
import App from "./App.vue";
import router from "./route";
import VueRouter from "vue-router";
import "@global/index.scss";

// 1) 引入插件
Vue.use(VueRouter);

// 2) 挂载
new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
}).$mount();
