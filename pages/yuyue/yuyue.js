import { doctorOrderDetail, doctorOrder } from '../../utils/request.js'

const app = getApp()

Page({
  data:{
    doctorId:null,
    headimg:'',
    departmentName: '',
    doctorName: '',
    position: '',
    desc: '',
    items: []
  },

  onLoad(query){
    
    const { doctorId } = query;
    this.setData({
      doctorId: doctorId
    })
  },

  onShow(){
    this.getDoctorOrderDetail();
  },

  getDoctorOrderDetail(){
    const { doctorId } = this.data;

    doctorOrderDetail(app.globalData.token, doctorId)
    .then(ret => {
      this.setData({
        items: ret.orderList,
        headimg: ret.headimg,
        departmentName: ret.departmentName,
        doctorName: ret.doctorName,
        position: ret.position,
        desc: ret.desc,
      })
    },error => {

    })
  },


  onYuYue(event){

    const { index } = event.currentTarget.dataset;
    const { doctorId } = this.data;

    let item = this.data.items[index];

    if (item.orderStatus === '1'){

      wx.showToast({
        title: '该门诊您已预约',
      })

      return;
    }

    doctorOrder(app.globalData.token, doctorId, item.orderId).then(ret => {
      wx.showToast({
        title: '预约成功，请耐心等待医院审核！',
      })
    }, error => {
      wx.showToast({
        title: '预约失败',
      })
    });

  }


})