import { healthEdu } from '../../utils/request.js'

const app = getApp()


Page({

  data: {
    items:[],
  },

  onShow: function () {

    healthEdu(app.globalData.token).then(res => {

      this.setData({
        items: res.list,
      })

    }, reject => {
      wx.showToast({
        title: reject.error,
      })
    })
    //end

  },

  onDetail(event){

    const { url } = event.currentTarget.dataset;

    console.log(url);

    if(url){
      wx,wx.navigateTo({
        url: '../web/web?url=https://wound.gomeiguo.com' + url,
      })
    }

  }

})