import { getUserInfo } from '../../utils/request.js'

const app = getApp()

Page({

  data:{
    info:null,
  },

  onShow(){
    this.onGetUserInfo();
  },

  onGetUserInfo(){
    getUserInfo(app.globalData.token).then(res => {

      this.setData({
        info:res,
      })

    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  },

  onChangeNickName(){
    wx.navigateTo({
      url: '../nickName/nickName',
    })
  },
  
  //个人信息
  onEdit(){

    wx.navigateTo({
      url: '../update/update',
    })

  },

  //退出登录
  onLogout(){
    app.globalData.token = null;

    wx.removeStorage({
      key: 'USER_LOCATION_INFO',
      success: function(res) {
        wx.redirectTo({
          url: '../login/login',
        })
      },
    })

  },

  //修改手机号
  onUpdatePhone() {
    wx.navigateTo({
      url: '../changephone/changephone',
    })
  },

  //修改密码
  onChangePwd() {
    wx.navigateTo({
      url: '../changepwd/changepwd',
    })
  },

  //关于我们
  onAboutUs() {

    wx.navigateTo({
      url: '../about/about',
    })

  },

  //使用帮助
  onHelp() {

    wx.navigateTo({
      url: '../help/help',
    })

  },

})