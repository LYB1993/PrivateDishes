const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 0,
    },
    index: {
      type: String,
      value: "",
    },
    src: {
      type: String,
      value:  "/static/resource/default.png"
    },
    title: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    server: app.globalData.server
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})