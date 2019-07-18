import { consult, consultList } from '../../utils/request.js'

const app = getApp()

Page({
  data: {
    name:null,
    headImage: null,
    senderId: 0,
    text:'',
    items: []
  },

  onLoad(query){
    const { name } = query;

    this.setData({name:name})
  },

  onShow(){
    this.onGetConsult();
  },

  bindMsgInput(e){
    this.setData({
      text: e.detail.value
    })
  },

  pageScrollToBottom(){

    wx.createSelectorQuery().select('#j_page').boundingClientRect(function (rect) {
      wx.pageScrollTo({
        scrollTop: rect.bottom})
        }).exec()
  },

  onGetConsult(){
    const { name } = this.data;

    consultList(app.globalData.token).then(ret => {
      let myInfo = ret.list.filter(function (value) { return value.name === name })[0];
      console.log(myInfo.name);

      this.setData({
        items: ret.list,
        headImage: myInfo.headImage,
        senderId: myInfo.senderId,
      })
      this.pageScrollToBottom();
    }, error => {

    })

  },


  onSend(){
    
    const { text, headImage, senderId, name, items} = this.data;
    if(text.length < 1){
      return;
    }

    consult({ token: app.globalData.token, content: text }).then(ret => {
      console.log(ret);
      let item = { senderId: senderId, name: name, headImage: headImage, content: text}
      this.setData({
        text: '',
        items: [...items,item],
      })

      this.pageScrollToBottom();

    }, error => {
      console.log(error);
    })
  }


})