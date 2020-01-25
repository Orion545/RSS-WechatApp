// pages/yayuan-detail/yayuan-detail.js
import * as echarts from '../../ec-canvas/echarts';

function getDepthRange(depth){
  if(depth<=10) return 0;
  if(depth<=50) return 1;
  if(depth<=150) return 2;
  if(depth<=300) return 3;
  return 4;
}

var pageObject = {
  /**
     * 页面的初始数据
     */
  data: {
    chartTwoHour: {
      lazyLoad: true,
    },
    chartTwoHourPie: {
      lazyLoad: true,
    },
    chart24Hour: {
      lazyLoad: true,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.chartTwoHour = this.selectComponent("#chartTwoHour");
    this.chartTwoHourPie = this.selectComponent("#chartTwoHourPie");
    this.chart24Hour = this.selectComponent("#chart24Hour");
    this.getTwoHourData();
    this.get24HourData();
  },

  getTwoHourData: function () {
    wx.request({
      url: 'https://rainstormserver.cn/get.php',
      data: {
        db: 'dev',
        table: 'main',
        type: 7200,
        pass: '199131ecce361f8f9695ada54a358985078c9c1446cb7c78d0edd0aafa22ad82db24bc19f52dfe7154b975813f0420f0'
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data);
        var twoHourData = [];
        var twoHourDataPie = [
          {
            value: 0,
            name: '无积水'
          },
          {
            value: 0,
            name: '轻度积水'
          },
          {
            value: 0,
            name: '中度积水'
          },
          {
            value: 0,
            name: '较重积水'
          },
          {
            value: 0,
            name: '严重积水'
          },
        ]
        //console.log(twoHourData);
        for (var i = 0, len = res.data.length; i < len; i++) {
          twoHourData.push([res.data[i].time, res.data[i].depth]);
          twoHourDataPie[getDepthRange(res.data[i].depth)].value++;
        }
        this.initTwo(twoHourData);
        this.initTwoPie(twoHourDataPie);
      }
    });
  },

  get24HourData: function () {
    wx.request({
      url: 'https://rainstormserver.cn/get.php',
      data: {
        db: 'dev',
        table: 'main',
        type: 86400,
        pass: '199131ecce361f8f9695ada54a358985078c9c1446cb7c78d0edd0aafa22ad82db24bc19f52dfe7154b975813f0420f0'
      },
      method: 'GET',
      success: (res) => {
        console.log(res.data);
        var dayHourData = [];
        //console.log(dayHourData);
        for (var i = 0, len = res.data.length; i < len; i++) {
          dayHourData.push([res.data[i].time, res.data[i].depth]);
        }
        this.init24(dayHourData);
      }
    });
  },

  initTwo: function (twoHourData) {
    this.chartTwoHour.init((canvas, width, height) => {
      const cTH = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      cTH.setOption(this.getcTHOption(twoHourData));
      return cTH;
    });
  },

  initTwoPie: function (twoHourDataPie) {
    this.chartTwoHourPie.init((canvas, width, height) => {
      const cTHPie = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      cTHPie.setOption(this.getcTHPieOption(twoHourDataPie));
      return cTHPie;
    });
  },

  init24: function (dayHourData) {
    this.chart24Hour.init((canvas, width, height) => {
      const c24H = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      c24H.setOption(this.getc24HOption(dayHourData));
      return c24H;
    });
  },

  getcTHOption: function (twoHourData) {
    //console.log(twoHourData);
    return {
      title: {
        text: '过去2小时内积水深度',
        left: 'center'
      },
      legend: {
        type: 'plain',
        data: ['积水趋势（左右滑动查看更多）'],
        left: 'center',
        top: 30
      },
      grid: {
        left: 5,
        right: 5,
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'time',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 80,
          end: 100
        }
      ],
      visualMap: {
        top: 10,
        right: 10,
        show: false,
        pieces: [{
          gt: 0,
          lte: 10,
          color: '#096'
        }, {
          gt: 10,
          lte: 50,
          color: '#ffde33'
        }, {
          gt: 50,
          lte: 150,
          color: '#ff9933'
        }, {
          gt: 150,
          lte: 300,
          color: '#cc0033'
        }, {
          gt: 300,
          color: '#7e0023'
        }],
        outOfRange: {
          color: '#999'
        }
      },
      series: [
        {
          name: '积水趋势（左右滑动查看更多）',
          type: 'line',
          smooth: true,
          data: twoHourData,
          markLine: {
            silent: true,
            data: [{
              yAxis: 10
            }, {
              yAxis: 50
            }, {
              yAxis: 150
            }, {
              yAxis: 300
            }]
          }
        },
        /*
        {
          name: '积水深度',
          type: 'bar',
          label: {
            show: true
          },
          data: twoHourData
        }
        */
      ]
    };
  },

  getcTHPieOption: function (twoHourDataPie) {
    //console.log(twoHourData);
    return {
      title: {
        text: '过去2小时内积水深度记录分布',
        left: 'center'
      },
      color: ["#096","#ffde33","#ff9933","#cc0033","#7e0023"],
      legend: {
        orient: 'vertical',
        icon: 'circle',
        left: 0,
        top: 'center'
      },
      series: [
        {
          name: '积水趋势',
          type: 'pie',
          data: twoHourDataPie,
          center: ['50%', '60%'],
          roseType: 'radius', 
          label: {
            show: false            
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 2, 2, 0.3)'
            }
          }
        }
      ],
    };
  },

  getc24HOption: function (dayHourData) {
    //console.log(dayHourData);
    return {
      title: {
        text: '过去24小时内积水深度',
        left: 'center'
      },
      legend: {
        type: 'plain',
        data: ['积水趋势（左右滑动查看更多）',''],
        left: 'center',
        top: 30
      },
      grid: {
        left: 5,
        right: 5,
        bottom: '10%',
        containLabel: true
      },
      xAxis: [{
        type: 'time',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 80,
          end: 100
        }
      ],
      visualMap: {
        top: 10,
        right: 10,
        show: false,
        pieces: [{
          gt: 0,
          lte: 10,
          color: '#096'
        }, {
          gt: 10,
          lte: 50,
          color: '#ffde33'
        }, {
          gt: 50,
          lte: 150,
          color: '#ff9933'
        }, {
          gt: 150,
          lte: 300,
          color: '#cc0033'
        }, {
          gt: 300,
          color: '#7e0023'
        }],
        outOfRange: {
          color: '#999'
        }
      },
      series: [
        {
          name: '积水趋势（左右滑动查看更多）',
          type: 'line',
          smooth: false,
          data: dayHourData,
          markLine: {
            silent: true,
            data: [{
              yAxis: 10
            }, {
              yAxis: 50
            }, {
              yAxis: 150
            }, {
              yAxis: 300
            }]
          }
        },
        /*
        {
          name: '积水深度',
          type: 'bar',
          label: {
            show: true
          },
          data: dayHourData
        }
        */
      ]
    };
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}

Page(pageObject);