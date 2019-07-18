import { phoneVerify } from '../../utils/util.js'
import { modifyPhone, sendSMS } from '../../utils/request.js'

const app = getApp()

Page({
  data: {
    phone: '',
    smsCode: '',
    pwdValue: '',
    count: 60,
    text: '获取验证码', //按钮文字
    disabled: false,
  },

  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindCodeInput(e) {
    this.setData({
      smsCode: e.detail.value
    })
  },

  bindPwdValueInput(e) {
    this.setData({
      pwdValue: e.detail.value
    })
  },

  onGetCode() {
    const { phone } = this.data
    if (!phoneVerify(phone)) {
      wx.showToast({ title: '请输入有效的手机号码', icon: 'none' })
      return;
    }

    sendSMS(phone, '3').then(res => {
      wx.showToast({ title: '验证码发送成功', icon: 'success' })
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
      return;
    })

    var that = this;

    this.setData({ disabled: true })

    var count = this.data.count;

    var interval = setInterval(function () {
      count--;

      that.setData({ text: '剩余' + count + "s" })

      if (count <= 0) {
        clearInterval(interval)
        that.setData({
          count: 60,
          disabled: false,
          text: '重新发送'
        })
      }

    }, 1000)

  },

  onCommit(){

    const { phone, smsCode, pwdValue } = this.data

    if (!phoneVerify(phone)) {
      wx.showToast({ title: '请输入有效的手机号码', icon: 'none' })
      return;
    }

    if (smsCode.length === 0) {
      wx.showToast({ title: '请输入验证码', icon: 'none' })
      return;
    }

    if (pwdValue.length < 6) {
      wx.showToast({ title: '请输入至少6位密码', icon: 'none' })
      return;
    }

    modifyPhone(app.globalData.token, phone, smsCode, pwdValue).then(res => {
      wx.showToast({ title: '手机号修改成功', icon: 'success' })
      wx.navigateBack()
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  }
})