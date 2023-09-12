/* 封装 hook, Vue-router@3 没有兼容 Vue2 版本相关的 hook */
import VueRouter, { Route } from "vue-router";
import { getCurrentInstance } from "vue"

export const useRoute = () => {
  let vm = getCurrentInstance()?.proxy
  return vm?.$route as Route
}

export const useRouter = () => {
  let vm = getCurrentInstance()?.proxy
  return vm?.$router as VueRouter
}

