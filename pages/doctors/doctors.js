import { getDoctorList } from '../../utils/request.js'

const app = getApp()

Page({
  
  data: {
    hospitalIndex:0,
    hospitals: [],
    doctors: [],
  },

  onLoad(query){

    getDoctorList(app.globalData.token).then(res => {

      this.setData({
        hospitals: res.hospitals,
        doctors: res.hospitals[0].doctors,
      })

    }, reject => {
      console.log(reject);
      wx.showToast({
        title: reject.error,
      })
    })
  },

  hospitalSelect(event){
    const { hospitalindex } = event.currentTarget.dataset;
    const { hospitals } = this.data;

    this.setData({
      hospitalIndex: hospitalindex,
      doctors: hospitals[hospitalindex].doctors,
    })
  },

  doctorSelect(event){
    console.log(event);

    const { doctorid } = event.currentTarget.dataset;

    
    wx.navigateTo({
      url: '../yuyue/yuyue?doctorId=' + doctorid,
    })
  }


})