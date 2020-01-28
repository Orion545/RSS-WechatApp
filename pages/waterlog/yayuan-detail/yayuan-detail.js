// pages/yayuan-detail/yayuan-detail.js
import * as echarts from '../../../ec-canvas/echarts';

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
    },
    chart24HourPie: {
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
    this.chart24HourPie = this.selectComponent("#chart24HourPie");
    this.getTwoHourData();
    this.get24HourData();
  },

  /**
   * 向服务器请求数据
   * getTwoHourData: 请求近2小时数据
   * get24HourData: 请求近24小时数据
   */
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
          {
            value: 0.001,
            name: ''
          }
        ];
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
        var dayHourDataPie = [
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
          {
            value: 0.001,
            name: ''
          }
        ];
        //console.log(dayHourData);
        for (var i = 0, len = res.data.length; i < len; i++) {
          dayHourData.push([res.data[i].time, res.data[i].depth]);
          dayHourDataPie[getDepthRange(res.data[i].depth)].value++;
        }
        this.init24(dayHourData);
        this.init24Pie(dayHourDataPie);
      }
    });
  },

  /**
   * 初始化各个图表
   * initTwo: 2小时折线图
   * initTwoPie: 2小时饼图
   * init24: 24小时折线图
   * init24Pie: 24小时饼图
   */
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

  init24Pie: function (dayHourDataPie) {
    this.chart24HourPie.init((canvas, width, height) => {
      const c24HPie = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      c24HPie.setOption(this.getc24HPieOption(dayHourDataPie));
      return c24HPie;
    });
  },

  /**
   * 生成2小时的两个图表的option
   * Line和Pie
   */

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
          start: 60,
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
      color: ["#096","#ffde33","#ff9933","#cc0033","#7e0023","#fff"],
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
          center: ['60%', '50%'], 
          radius: ['40%', '70%'],
          roseType: 'radius',
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              formatter: '{b}\n{d}%',
              lineHeight: 36,
              textStyle: {
                fontSize: '28',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
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
          start: 60,
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

  getc24HPieOption: function (dayHourDataPie) {
    //console.log(twoHourData);
    return {
      title: {
        text: '过去24小时内积水深度记录分布',
        left: 'center'
      },
      color: ["#096", "#ffde33", "#ff9933", "#cc0033", "#7e0023","#fff"],
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
          data: dayHourDataPie,
          center: ['60%', '50%'],
          radius: ['40%', '70%'],
          roseType: 'radius',
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              formatter: '{b}\n{d}%',
              lineHeight: 36,
              textStyle: {
                fontSize: '28',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}

Page(pageObject);