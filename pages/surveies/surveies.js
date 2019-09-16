import { surveyList } from '../../utils/request.js'

const app = getApp()


Page({

  data: {
    items: [],
  },

  onShow: function () {

    surveyList(app.globalData.token).then(res => {

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

  surveySelect: function (event) {

    console.log(event);

    const { surveyurl } = event.currentTarget.dataset;


    wx.navigateTo({
      url: '../web/web?url=' + surveyurl,
    })

  },

})
