export function setStorage(key, data) {
  uni.setStorageSync(key, data)
}

export function getStorage(key) {
  return uni.getStorageSync(key)
}

export function deleteStorage(key) {
  uni.removeStorageSync(key)
}

export function inStorage(key) {
  let res = getStorage(key)
  return res ? true : false
}

