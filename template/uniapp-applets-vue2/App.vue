<script>
export default {
  onLaunch: function () {
    let that = this;
    uni.addInterceptor('navigateTo', { //监听跳转
      success (e) {
        that.watchRouter();

      }
    })
    uni.addInterceptor('redirectTo', { //监听关闭本页面跳转
      success (e) {
        that.watchRouter();

      }
    })
    uni.addInterceptor('switchTab', { //监听tabBar跳转
      success (e) {
        that.watchRouter();

      }
    })
    uni.addInterceptor('navigateBack', { //监听返回
      success (e) {
        that.watchRouter();

      }
    })
  },
  onShow: function () {
    console.log('test');
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods: {
    watchRouter () {
      // console.log('路由进行跳转');
    },
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/src/index.scss";
</style>
