<template>
  <div class="index-page">
    <h1>{{ num }}</h1>
    <button @click="add">add</button>
    <button @click="del">del</button>
  </div>
</template>

<script setup lang='ts'>
const num = ref(0)

const add = () => num.value++
const del = () => num.value--
</script>

<style scoped lang="scss">
.index-page {}
</style>
