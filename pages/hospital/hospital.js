Page({

  
  data: {
    title:'',
    desc:''
  },

  onLoad: function (options) {
    this.setData({
      title: options.title,
      desc: options.desc,
    })
  }

})