// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    staticServer: app.globalData.staticServer,
    swiper: [],
    shops: [],
    foods: [],
    menus: []
  },
  computed: {
    funSrc() {
      console.log('funSrc')
    },
  },
  onLoad() {
    const _this = this
    app.$http.getToken().then(res=>{
      _this.getMenu()
      _this.getShops()
    })
  },
  jumpShop(e) {
    const shopId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../dram/dram?shopId=' + shopId,
    })
  },
  getCarousel() {
    const _this = this;
    app.$http.get('v1/app/carousel').then(res => {
      let image = []
        res.forEach(e => {
          image.push(app.globalData.server + '/v1/resource/' + e)
        });
        _this.setData({
          swiper: image
        })
    }).catch(err => {
      console.error(err)
    })
  },
  getShops() {
    const _this = this;
    app.$http.get('/v1/shop').then(res => {
      _this.setData({
        shops: res
      })
    }).catch(err => {
      console.error(err)
    })
  },
  getMenu() {
    const _this = this;
    app.$http.get('v1/menu/app').then(res => {
      _this.setData({
        menus: res
      })
    }).catch(err => {
      console.error(err)
    })
  }
})