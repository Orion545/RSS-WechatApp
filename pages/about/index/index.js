// pages/about/index/index.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  data:{
    list: [{
      title: '我们是谁',
      img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
      url: '/us/us'
    },
    {
      title: 'RSS @ CTB',
      img: 'https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg',
      url: '/ctb/ctb'
    },
    {
      title: '关注公众号',
      img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
      url: '/gzh/gzh'
    }
    ]
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/plugin' + e.currentTarget.dataset.url
      })
    },
  }
})