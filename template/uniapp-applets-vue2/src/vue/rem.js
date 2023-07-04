import Vue from 'vue'

let fontSize = '16px'

uni.getSystemInfo({
  success (res) {
    let { windowWidth } = res
    if (windowWidth > 540) {
      windowWidth = 540
    }
    else if (windowWidth < 320) {
      windowWidth = 320
    }
    fontSize = (windowWidth / 375 * 16).toFixed(2) + 'px'
  },
  complete () {
    Vue.prototype.$fontSize = fontSize
  }
})
