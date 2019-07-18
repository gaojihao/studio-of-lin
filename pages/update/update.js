import { updateUserInfo, getUserInfo, getCity } from '../../utils/request.js'

const app = getApp()

Page({

  data:{
    date: '1997-04-22',
    name:'',
    info:null,
    address:'',
    cities: [],
    selectIndex:0,
    alarmPhone:'',
    items: [
      { value: '1', name: '男', checked: true },
      { value: '0', name: '女', checked: false }
    ],
    relation: [
      { value: '0', name: '本人', checked: true },
      { value: '1', name: '父母', checked: false },
      { value: '2', name: '其他', checked: false }
    ],
  },


  onShow() {
    this.getCity();
    this.onGetUserInfo();
  },

  getCity() {

    getCity(app.globalData.token).then(res => {
      this.setData({
        cities: res.cities,
      })
    })
  },

  onGetUserInfo() {
    getUserInfo(app.globalData.token).then(res => {

      var items = this.data.items;
      var relation = this.data.relation;
      for (var i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].name == res.sex
      }

      for (var i = 0, len = relation.length; i < len; ++i) {
        relation[i].checked = relation[i].name == (res.guardian||'本人')
      }

      this.setData({
        items: items,
        relation: relation
      });


      this.setData({
        info: res,
        name: res.name,
        address: res.address,
        date: res.birthday,
      })

    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })

  },

  bindNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  bindAddressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },

  bindPhoneInput(e) {
    this.setData({
      alarmPhone: e.detail.value
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindCityChange(e){
    
    this.setData({
      selectIndex: e.detail.value
    })
  },

  radioChange: function (e) {
    var items = this.data.items;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      items: items
    });
  },

  relationChange(e){
    var relation = this.data.relation;
    for (var i = 0, len = relation.length; i < len; ++i) {
      relation[i].checked = relation[i].value == e.detail.value
    }

    this.setData({
      relation: relation
    });
  },


  onUpdateInfo: function () {

    const { date, name, address, alarmPhone, items, relation,selectIndex,cities} = this.data;

    const sex = items.filter((item) => item.checked)[0].value
    const guardian = relation.filter((item) => item.checked)[0].value
    const cityCode = cities[selectIndex].code
    const city = cities[selectIndex].city

    updateUserInfo({ token: app.globalData.token, city: city, cityCode: cityCode, realName: name, sex: sex, address: address, birthday: date, guardian: guardian, mobile:alarmPhone}).then(res => {
      wx.showToast({ title: '修改信息成功', icon: 'success' })
      wx.navigateBack()
    }, reject => {
      wx.showToast({ title: reject.error, icon: 'none' })
    })
  }




})