const app = getApp()

Page({
  data: {
    url: null
  },

  onLoad: function (options) {
    const { url } = options

    let path = `https://www.studyhealth.org/user/v1/feedback/feedback?token=${app.globalData.token}&terminal=wechat`

    this.setData({ url:path })
  }

})