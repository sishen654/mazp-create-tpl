import Vue from 'vue'
function setStorage (key, data) {
  uni.setStorageSync(key, data)
}

function getStorage (key) {
  return uni.getStorageSync(key)
}

function deleteStorage (key) {
  uni.removeStorageSync(key)
}

function inStorage (key) {
  let res = getStorage(key)
  return res ? true : false
}


Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$deleteStorage = deleteStorage
Vue.prototype.$inStorage = inStorage
