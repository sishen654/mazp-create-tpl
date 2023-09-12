<script setup lang='ts'>
import { useRoute, useRouter } from "@hook/router"

const route = useRoute()
const router = useRouter()
</script>

<template>
  <div class="classname">
    <button @click="router.back()">返回</button>
  </div>
</template>

<style scoped lang="scss">
.classname {}
</style>
