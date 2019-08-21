import { phoneVerify } from '../../utils/util.js'
import { userRegister, sendSMS } from '../../utils/request.js'

let t = ''

Page({

  data:{
    count:60,
    text: '获取验证码', //按钮文字
    flag:true,
    phoneValue:'',
    codeValue: '',
    disabled:false,
    pwdValue: '',
  },

  onGetCode:function(){

    const { phoneValue } = this.data

    if (!phoneVerify(phoneValue)) {
      wx.showToast({ title: '请输入有效的手机号码', icon: 'none' })
      return;
    }

    var that = this;

    this.setData({disabled:true})

    sendSMS(phoneValue, '1').then(res => {
      wx.showToast({ title: '验证码发送成功', icon: 'success' })
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
      return;
    })

    var count = this.data.count;

    var interval = setInterval(function(){
      count--;

      that.setData({text:'剩余'+count+"s"})

      if(count <= 0){
        clearInterval(interval)
        that.setData({
          count:60,
          disabled:false,
          text:'重新发送'
        })
      }

    },1000)
  },

  onLogin: function () {

    const { phoneValue, codeValue, pwdValue } = this.data
    if (!phoneVerify(phoneValue)) {
      wx.showToast({ title: '请输入有效的手机号码', icon: 'none' })
      return;
    }

    if (codeValue.length === 0) {
      wx.showToast({ title: '请输入验证码', icon: 'none' })
      return;
    }

    if (pwdValue.length < 6) {
      wx.showToast({ title: '请输入至少6位密码', icon: 'none' })
      return;
    }

    userRegister(phoneValue, codeValue, pwdValue).then(res => {
      wx.showToast({ title: '恭喜您 注册成功', icon: 'success' })
      wx.navigateBack()
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  },

  bindPhoneInput(e){
    this.setData({
      phoneValue: e.detail.value
    })
  },

  bindCodeInput(e) {
    this.setData({
      codeValue: e.detail.value
    })
  },

  bindPwdInput(e) {
    this.setData({
      pwdValue: e.detail.value
    })
  }

})