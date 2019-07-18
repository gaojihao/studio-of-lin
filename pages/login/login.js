import { phoneVerify } from '../../utils/util.js'
import { userLogin } from '../../utils/request.js'

const app = getApp()

Page({

  data: {
    phoneValue: '',
    pwdValue: '',
  },

  onShow(){
    if (app.globalData.token){
      wx.redirectTo({
        url: './../home/home',
      })
    }
    
  },

  onLogin:function(){

    const { phoneValue, pwdValue } = this.data
    if (!phoneVerify(phoneValue)) {
      wx.showToast({ title: '请输入有效的手机号码', icon: 'none' })
      return;
    }

    if (pwdValue.length < 6) {
      wx.showToast({ title: '请输入密码', icon: 'none' })
      return;
    }

    userLogin(phoneValue, pwdValue).then(res => {

      app.globalData.token = res.token;

      wx.setStorage({
        key: 'USER_LOCATION_INFO',
        data: res.token
      })

      wx.redirectTo({
        url: './../home/home',
      })
    }, reject => {
      console.log(reject);
      wx.showToast({ title: reject.error, icon: 'none' })
    })
  },

  onRegister:function(){
    wx.navigateTo({
      url: './../register/register',
    })
  },

  onForgot(){
    wx.navigateTo({
      url: './../forget/forget',
    })
  },

  bindPhoneInput(e) {
    this.setData({
      phoneValue: e.detail.value
    })
  },

  bindPwdInput(e) {
    this.setData({
      pwdValue: e.detail.value
    })
  }
})