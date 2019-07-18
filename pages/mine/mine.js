import { operationList } from '../../utils/request.js'

const app = getApp()

Page({

  data: {
    items: [],
  },


  onShow(){

    operationList(app.globalData.token).then(res => {

      this.setData({
        items: res.list,
      })

    }, reject => {
      console.log(reject);
      wx.showToast({
        title: reject.error,
      })
    })
  },

})