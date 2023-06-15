// pages/shop/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staticServer: app.globalData.staticServer,
    shops: '',
    nav: {
      list: [{
          name: '点菜',
          index: 0
        },
        {
          name: '套餐',
          index: 1
        }, {
          name: '评价',
          index: 2
        }
      ],
      width: 28,
      offsetLeft: 11,
      active: 0,
    },
    shopMenu: {
      list: [],
      active: 0,
    },
    goods: [],
    shopId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const _this = this
    _this.setData({
      shopId: options.shopId,
    })
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowWidth: res.windowWidth
        })
      }
    });
    _this.getShops()
    _this.getGoods()
    _this.getShopMenu()
  },
  getShops() {
    const _this = this;
    app.$http.get('/v1/shop/' + _this.data.shopId).then(res => {
      _this.setData({
        shops: res
      })
    }).catch(err => {
      console.error(err)
    })
  },
  getGoods() {
    const _this = this;
    app.$http.get('v1/goods/' + _this.data.shopId).then(res => {
      _this.setData({
        goods: res
      })
    }).catch(err => {

    })
  },
  getShopMenu() {
    const _this = this;
    app.$http.get('v1/menu/shop/' + _this.data.shopId).then(res => {
      _this.setData({
        'shopMenu.list': res
      })
    }).catch(err => {

    })
  },
  selectMenu(e) {
    let tempShopMenu = this.data.shopMenu
    tempShopMenu.active = e.currentTarget.dataset.index
    this.setData({
      shopMenu: tempShopMenu
    })
  },
  select(e) {
    let _this = this,
      nav = _this.data.nav,
      idx = e.currentTarget.dataset.index,
      width = nav.list[idx].name.length * 14,
      windowWidth = _this.data.windowWidth,
      offsetLeft = e.target.offsetLeft
    if (offsetLeft < windowWidth) {
      nav.left = width + 68 - windowWidth + offsetLeft;
    } else {
      nav.left = offsetLeft - windowWidth + width + 68;
    }
    wx.createSelectorQuery().select('.scroll_item' + idx).boundingClientRect(function (res) {
      nav.active = idx;
      nav.width = res.width - 20;
      nav.offsetLeft = offsetLeft + 11;
      _this.setData({
        nav: nav,
      })
    }).exec();
  }
})