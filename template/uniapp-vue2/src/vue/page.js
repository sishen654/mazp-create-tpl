import Vue from 'vue'
// 1 获取窗口基本信息
function windowSize (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('windowSize函数: 必须传递一个函数!')
  }
  uni.getSystemInfo({
    success: function (res) {
      let { windowHeight, windowWidth, statusBarHeight } = res
      callback({ windowHeight, windowWidth, statusBarHeight })
    }
  })
}




Vue.prototype.$windowSize = windowSize
