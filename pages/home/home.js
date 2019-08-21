import { getUserInfo, hospitalInfo } from '../../utils/request.js'

const app = getApp()

Page({

  data: {
    info: null,
    hospital:null,
  },

  onShow(){

    getUserInfo(app.globalData.token).then(res => {

      this.setData({
        info: res,
      })

    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

    hospitalInfo(app.globalData.token).then(res => {

      this.setData({
        hospital: res,
      })

    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })
  },

  havePersonInfo(){
    const { info } = this.data;

    if (info.code){
      return true;
    }else{

      wx.showToast({
        title: '请完善个人信息',
      })
      wx.navigateTo({
        url: './../update/update',
      })

      return false;
    }
  },

  onZiXun:function(){

    const { info } = this.data;

    if (this.havePersonInfo()){
      wx.navigateTo({
        url: './../zixun/zixun?name='+info.name,
      })
    }

  },

  onYuYue: function () {

    if (this.havePersonInfo()){

      wx.navigateTo({
        url: './../doctors/doctors',
      })
    }

  },

  //互动
  onInteract: function () {

    wx.navigateTo({
      url: './../interact/interact',
    })

  },

  onInfo: function () {
    
    wx.navigateTo({
      url: './../mine/mine',
    })

  },

  onMine: function () {

    wx.navigateTo({
      url: './../info/info',
    })

  },

  //问诊
  onWenZhen: function () {

    wx.navigateTo({
      url: './../contact/contact',
    })

  },

  //健康教育
  onJiaoYu: function () {

    wx.navigateTo({
      url: './../health/health',
    })

  },

  //康复指南
  onKangFu: function () {

    wx.navigateTo({
      url: './../healthguide/healthguide',
    })

  },

  //随访
  onSuiFang: function () {

    wx.navigateTo({
      url: './../survey/survey',
    })

  },

  //评测量表
  onScale: function () {

    wx.navigateTo({
      url: './../scale/scale',
    })

  },

  //报告查询
  onReport:function() {
    wx,wx.navigateTo({
      url: './../report/report',
    })
  },

  //调查报告
  onSurveies: function () {
    wx, wx.navigateTo({
      url: './../surveies/surveies',
    })
  },

  //医院介绍
  onHospitalDesc: function () {
    const { hospital } = this.data;

    wx, wx.navigateTo({
      url: `../hospital/hospital?title=${hospital.hospitalName}&desc=${hospital.hospitalDesc}`,
    })
  },


  //就医指南
  onHospitalFlow: function () {
    wx, wx.navigateTo({
      url: '../web/web?url=https://wound.gomeiguo.com' + this.data.hospital.hospitalFlow,
    })
  },

  //来院导航
  onGuide: function () {
    const { hospital } = this.data;

    wx, wx.navigateTo({
      url: `./../hospitalguide/hospitalguide?longitude=${hospital.longitude}&latitude=${hospital.latitude}&title=${hospital.hospitalName}`,
    })
  },

  //院内指引
  onHospitalGuide: function () {
    wx, wx.navigateTo({
      url: `../web/web?url=https://wound.gomeiguo.com${this.data.hospital.hospitalGuide}`,
    })
  },

})