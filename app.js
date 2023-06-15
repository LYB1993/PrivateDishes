// app.js
import $http from './utils/request.js'
App({
  $http,
  onLaunch() {
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuTop = menuButtonInfo.top;
    this.globalData.menuHeight = menuButtonInfo.height;
  },
  globalData: {
    userInfo: null,
    navBarHeight: null,
    menuRight: null,
    menuTop: null,
    menuHeight: null,
    server: 'http://192.168.106.60:8080/api',
    staticServer: 'http://192.168.106.60:8080/'
  }
})