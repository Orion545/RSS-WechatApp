//index.js
//获取应用实例
/*
const app = getApp()

Page({
  data: {
    motto: '©SMS RainStormServer',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading_det: false,
    plain_det: true
  },
  //事件处理函数
  gotoYaYuan: function(){
    plain_det: false;
    loading_det: true;
    setTimeout(function(){
      wx.navigateTo({
        url: '../yayuan/yayuan'
      })},300);
  },
  gotoHongHu: function () {
    plain_det: false;
    loading_det: true;
    setTimeout(function () {
      wx.navigateTo({
        url: '../honghu/honghu'
      })
    }, 300);
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
*/

Page({
  data: {
    PageCur: 'waterlog'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'RainStormServer-智能积水深度监测小程序',
    }
  },
})