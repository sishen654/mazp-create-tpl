import VueRouter from "vue-router";
import { defineAsyncComponent } from "vue"

const routes = [
  { path: "/", component: defineAsyncComponent(() => import('@page/Index.vue')) },
  { path: "/A", component: defineAsyncComponent(() => import('@page/A.vue')) },
];

export default new VueRouter({
  mode: "history",
  routes,
});
