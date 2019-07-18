//app.js
App({
  onLaunch: function () {

    var token = wx.getStorageSync('USER_LOCATION_INFO') || null

    this.globalData.token = token

  },

  globalData: {
    token: null
  }
})