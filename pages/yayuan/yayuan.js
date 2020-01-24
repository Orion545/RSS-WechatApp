// pages/honghu/honghu.js

var waterDepth = 100

var waterTime = "2020-01-01 12:34:56"

var calloutObject = {
  content: "实时积水深度："+waterDepth.toString()+"毫米\n数据记录时间："+waterTime+"\n详细信息请点击底部按钮查询",
  borderRadius: 10,
  borderColor: "#000000",
  borderWidth: 1.5,
  bgColor: "#ffffff",
  fontSize: 16,
  padding: 10,
  textAlign: "center"
}

var pageObject = {
  //constant
  buttonPrimary: 'primary',
  //original data
  data: {
    //map related
    markers: [{
      id: 1,
      latitude: '22.557289',
      longitude: '114.125108',
      iconPath: "/src/location.png",
      callout: calloutObject
    }],
    stl: 2,
    //traffic button related
    traffic: false,
    trafficButtonType: 'primary',
    trafficButtonContent: '打开路况信息'
  },

  switchTrafficButton: function (e) {
    if(this.data.trafficButtonType == this.buttonPrimary){
      this.setData({
        traffic: true,
        trafficButtonType: 'warn',
        trafficButtonContent: '关闭路况信息'
      })
    }
    else{
      this.setData({
        traffic: false,
        trafficButtonType: 'primary',
        trafficButtonContent: '打开路况信息'
      })
    }
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
}

Page(pageObject)