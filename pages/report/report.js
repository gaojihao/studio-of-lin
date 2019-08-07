import { reportList } from '../../utils/request.js'

const app = getApp()


Page({

  data: {
    items: [],
  },

  onShow: function () {

    reportList(app.globalData.token).then(res => {

      this.setData({
        items: res.list,
      })

    }, reject => {
      console.log(reject);
      wx.showToast({
        title: reject.error,
      })
    })
    //end

  },

  onDetail(event) {

    const { url } = event.currentTarget.dataset;

    if (url) {
      wx, wx.navigateTo({
        url: '../web/web?url=https://www.gomeiguo.com' + url,
      })
    }

  }

})