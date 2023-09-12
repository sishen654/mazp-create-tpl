<script setup lang='ts'>
import { useRoute, useRouter } from "@hook/router"
import { useStore } from "store"

const route = useRoute()
const router = useRouter()
const { count, doubleCount, increment } = toRefs(useStore())
</script>

<template>
  <div class="classname">
    <h1>count: {{ count }}</h1>
    <h1>doubleCount: {{ doubleCount }}</h1>
    <button @click="increment">增加 store 中的 count</button>
    <button @click="router.back()">返回</button>
  </div>
</template>

<style scoped lang="scss">
.classname {}
</style>
