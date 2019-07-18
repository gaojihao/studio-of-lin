Page({

  data: {
  },

  onLoad: function (options) {

    console.log(options);

    let marker = {
      latitude: parseFloat(options.latitude),
      longitude: parseFloat(options.longitude), 
      width: 30,
      height: 51,
      id: 0,
      name: options.title,
      iconPath: '/images/position.png',
      }

    this.setData({
      latitude: parseFloat(options.latitude),
      longitude: parseFloat(options.longitude),
      markers: [marker],
    })
  },

})