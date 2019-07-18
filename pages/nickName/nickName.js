import { updateUserInfo } from '../../utils/request.js'

const app = getApp()

Page({
  data: {
    nickName: '',
  },

  bindNickNameInput(e) {
    this.setData({
      nickName: e.detail.value
    })
  },

  onCommit() {

    const { nickName } = this.data

    updateUserInfo({ token: app.globalData.token, nickName:nickName}).then(res => {
      wx.navigateBack()
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  }
})