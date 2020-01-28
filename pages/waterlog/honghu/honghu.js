// pages/honghu/honghu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      id: '1',
      latitude: '22.575875',
      longitude: '114.120837',
      iconPath: "/src/location.png"
    },{
      id: '2',
      latitude: '22.571695',
      longitude: '114.122930',
      iconPath: "/src/location.png"
    }],
    stl: 1

  },

  backToIndex: function () {
    wx.navigateBack({
      
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})