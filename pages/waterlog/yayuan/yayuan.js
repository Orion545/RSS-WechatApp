// pages/honghu/honghu.js

var pageObject = {
  //constant
  buttonPrimary: 'green',
  //original data
  data: {
    //map related
    markers: [{
      id: 1,
      latitude: '22.557289',
      longitude: '114.125108',
      iconPath: "/src/marker-black.png",
      width: 75,
      height: 75,
      callout: {},
      label: {}
    }],
    initial: false,
    //traffic button related
    traffic: false,
    trafficButtonType: 'green',
    trafficButtonContent: '打开路况信息'
  },

  switchTrafficButton: function () {
    if(this.data.trafficButtonType == this.buttonPrimary){
      this.setData({
        traffic: true,
        trafficButtonType: 'red',
        trafficButtonContent: '关闭路况信息'
      })
    }
    else{
      this.setData({
        traffic: false,
        trafficButtonType: 'green',
        trafficButtonContent: '打开路况信息'
      })
    }
  },

  gotoYayuanDetail: function () {
    plain_det: false;
    loading_det: true;
    setTimeout(function () {
      wx.navigateTo({
        url: '../yayuan-detail/yayuan-detail'
      })
    }, 300);
  },

  goBack: function () {
    plain_det: false;
    loading_det: true;
    setTimeout(function () {
      wx.navigateBack()
    }, 300);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://rainstormserver.cn/get.php',
      data: {
        db: 'dev',
        table: 'main',
        type: 0,
        pass: '199131ecce361f8f9695ada54a358985078c9c1446cb7c78d0edd0aafa22ad82db24bc19f52dfe7154b975813f0420f0'
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data);
        var pathString = "/src/";
        if(res.data.depth <= 10) 
          pathString += "marker-green.png";
        if(res.data.depth <= 150 && res.data.depth >10 )
          pathString += "marker-yellow.png";
        if(res.data.depth > 150)
          pathString += "marker-red.png";
        this.setData({
          markers: [{
            id: 1,
            latitude: '22.557289',
            longitude: '114.125108',
            iconPath: pathString,
            width: 75,
            height: 75,
            callout: {
              content: "实时积水深度：" + res.data.depth + "毫米\n数据记录时间：" + res.data.time + "\n详细信息请点击底部按钮查询",
              borderRadius: 10,
              borderColor: "#000000",
              borderWidth: 1.5,
              bgColor: "#ffffff",
              fontSize: 16,
              padding: 10,
              textAlign: "center"
            },
            label: {
              content: "点击查看积水点信息",
              borderRadius: 10,
              borderColor: "#000000",
              borderWidth: 1,
              fontSize: 14,
              bgColor: "#ffffff",
              padding: 5,
              textAlign: "center"
            },
          }],
          initial: true
        });
      }
    });
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