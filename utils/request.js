const BASE_URL = 'http://192.168.106.60:8080/api'

const getToken = () => {
  var token = wx.getStorageSync('token')
  if (token != '') {
    return new Promise((resolve, reject) => {
      resolve(token)
    })
  } else {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          wx.request({
            url: BASE_URL + '/v1/login/token',
            header: {
              'Wechat-Code': res.code
            },
            success(res) {
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('open_id', res.data.open_id)
              wx.setStorageSync('session_key', res.data.session_key)
              resolve(res.data.token)
            }
          })
        }
      })
    })
  }


}

const request = (url, option) => {
  return new Promise((resolve, reject) => {
    if(url.charAt(0) !== '/'){
      url = '/' + url
    }
    wx.request({
      url: BASE_URL + url,
      method: option.method,
      data: option.method === 'GET' ? option.data : JSON.stringify(option.data),
      header: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Token': wx.getStorageSync('token')
      },
      success(request) {
        if (request.statusCode === 200) {
          resolve(request.data)
        } else if (request.statusCode === 401){
          wx.removeStorageSync('token')
          reject(request)
        }
      },
      fail(error) {
        reject(error.data)
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  })
}

const get = (url, option = {}) => {
  return request(url, {
    method: 'GET',
    data: option
  })
}

const post = (url, option = {}) => {
  return request(url, {
    method: 'POST',
    data: option
  })
}

const del = (url, option = {}) => {
  return request(url, {
    method: 'DELETE',
    data: option
  })
}

const put = (url, option = {}) => {
  return request(url, {
    method: 'PUT',
    data: option
  })
}

module.exports = {
  getToken,
  get,
  post,
  put,
  del
}