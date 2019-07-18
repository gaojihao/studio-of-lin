import { modifyPassword } from '../../utils/request.js'

const app = getApp()

Page({

  data: {
    oldPwd:'',
    password: '',
    rePwd: '',
  },

  bindCurrentPwdInput(e) {
    this.setData({
      oldPwd: e.detail.value
    })
  },

  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    })
  },

  bindConfirmInput(e) {
    this.setData({
      rePwd: e.detail.value
    })
  },

  onCommit() {

    const { oldPwd, password, rePwd } = this.data

    if (oldPwd.length < 6) {
      wx.showToast({ title: '请输入当前密码', icon: 'none' })
      return;
    }

    if (password.length < 6) {
      wx.showToast({ title: '请输入至少6位新密码', icon: 'none' })
      return;
    }

    if (rePwd.length < 6) {
      wx.showToast({ title: '请输入至少6位确认密码', icon: 'none' })
      return;
    }

    modifyPassword(app.globalData.token, oldPwd, password).then(res => {
      wx.showToast({ title: '修改密码成功', icon: 'success' })
      wx.navigateBack()
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  }

})