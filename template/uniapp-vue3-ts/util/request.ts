export const axios = {
  baseUrl: "",
  get(url, params, complete = () => { }, headers = {}) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + url,
        method: "GET",
        data: params,
        header: {
          ...headers
        },
        success: (res) => {
          resolve(res)
        },
        fail: err => reject(err),
        complete
      });
    })
  },
  post(url, data, complete = () => { }, headers = {}) {
    return new Promise((resolve, reject) => {
      uni.request({
        url: this.baseUrl + url,
        method: "POST",
        data,
        header: {
          ...headers
        },
        success: (res) => {
          resolve(res)
        },
        fail: err => reject(err),
        complete
      });
    })
  }
}
