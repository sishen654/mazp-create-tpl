<template>
  <page-meta :root-font-size="fontSize">
    <div class="content">
      <img class="logo" src="/static/logo.png" alt="">
      <div class="text-area">
        <h1>{{ title }}</h1>
      </div>
    </div>
  </page-meta>
</template>

<script>
export default {
  data () {
    return {
      fontSize: this.$fontSize,
      title: 'Hello',
    }
  },
  onLoad () {
    console.log("this.$fontSize", this.$fontSize);
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: rem(200);
  width: rem(200);
  margin-top: rem(200);
  margin-left: auto;
  margin-right: auto;
  margin-bottom: rem(50);
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: rem(36);
  color: #8f8f94;
}
</style>
