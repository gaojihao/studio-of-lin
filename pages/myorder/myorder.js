import { myOrders } from '../../utils/request.js'

const app = getApp()


Page({

  data: {
    orders:[],
  },

  onShow(){
    this.getMyOrder();
  },

  getMyOrder(){
    
    myOrders(app.globalData.token).then(res => {

      this.setData({
        orders: res.list,
      })

    }, reject => {
      console.log(reject);
      wx.showToast({
        title: reject.error,
      })
    })

  },


})