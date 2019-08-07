import { mySurvey } from '../../utils/request.js'

const app = getApp()

Page({

  data: {
    list:[],
  },


  onShow: function () {

    mySurvey(app.globalData.token).then(res => {

      this.setData({
        list: res.list,
      })

    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  },

  surveySelect: function (event){

    console.log(event);

    const { surveyurl } = event.currentTarget.dataset;


    wx.navigateTo({
      url: '../web/web?url=https://www.gomeiguo.com' + surveyurl,
    })

  },

})