import Vue from 'vue'
// 1 跳转页面路由，有返回箭头
function to (url, options = {}) {
  let { events, success, fail, complete } = options
  // 重写错误回调
  let errorHandler = fail
  fail = (err) => {
    console.log('页面跳转失败: ', err);
    errorHandler && errorHandler(err)
  }
  // url进行拼接
  url = '/pages/' + url
  // 执行跳转
  uni.navigateTo({
    url, events, success, complete, fail
  });
}

// 2 跳转到其它页面，只有回首页
function redirect (url, options = {}) {
  let { success, fail, complete } = options
  // 重写错误回调
  let errorHandler = fail
  fail = (err) => {
    console.log('页面重定向失败: ', err);
    errorHandler && errorHandler(err)
  }
  // url进行拼接
  url = '/pages/' + url
  // 执行跳转
  uni.redirectTo({
    url, success, complete, fail
  });
}

// 3 预加载某一个页面（微信不支持）
function preload (url, options = {}) {
  let { complete, fail } = options
  // 重写错误回调
  let errorHandler = fail
  fail = (err) => {
    console.log('预加载页面失败: ', err);
    errorHandler && errorHandler(err)
  }
  // 重新成功回调
  let successHandler = complete
  complete = () => {
    console.log('预加载页面成功');
    successHandler && successHandler(err)
  }
  // url进行拼接
  url = '/pages/' + url
  // 执行预加载
  uni.preloadPage({
    url, complete, fail
  });
}

// 4 返回上一个页面
function back (options = {}) {
  let { delta, success, fail, complete } = options
  // 重写错误回调
  let errorHandler = fail
  fail = (err) => {
    console.log('页面返回失败: ', err);
    errorHandler && errorHandler(err)
  }
  // 执行返回
  uni.navigateBack({
    delta, success, complete, fail
  });
}



Vue.prototype.$to = to
Vue.prototype.$redirect = redirect
Vue.prototype.$preload = preload
Vue.prototype.$back = back
