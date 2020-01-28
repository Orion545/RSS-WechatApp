//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: ["1970/01/01/ 00:00:00"]
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
