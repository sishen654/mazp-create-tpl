<script setup lang="ts">
import { useRoute, useRouter } from "@hook/router"
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div>
    <h1>测试 POSTCSS</h1>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../asset/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld msg="Vite + Vue" />
    <button @click="router.push('/A')">跳转A页面</button>
    <button @click="router.replace('/A')">跳转A页面，但是无历史记录</button>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 16px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
