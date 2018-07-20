import * as echarts from '../ec-canvas/echarts';

var app = getApp( );
var token1 = app.globalData.token;

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };

  // get logs
  var logs = wx.getStorageSync('logs')
  // set data
  option.series[0].data.push({})
  if (logs.length != 0) {
    let lastLogAction = '开始'
    logs.forEach(function (log) {
      let nameExisted = 0
      // check if name exited
      option.series[0].data.forEach(function (data) {
        // sum up time
        if (data.name == log.name) {
          // normal circumstances
          if ((lastLogAction == '停止') && (log.action == '开始')) {
            data.value -= log.startTime
          }
          else if ((lastLogAction == '开始') && (log.action == '停止')) {
            data.value += log.startTime
          }
          // this timing didn't finish
          else if ((lastLogAction == '开始') && (log.action == '开始')) {
          }
          nameExisted = 1
        }
      })
      // name not existed, push new data
      if ((nameExisted == 0) && (log.action == '停止')) {
        option.series[0].data.push({
          value: log.startTime,
          name: log.name
        })
      }
      lastLogAction = log.action
    })
  }
  option.series[0].data.splice(0, 1)
  if (option.series[0].data[option.series[0].data.length - 1])

  // check if got data
  if (option.series[0].data.length != 0)
    chart.setOption(option);
  else {
    wx.showToast({
      title: '无记录！',
    })
    return;
  }
  return chart;
}

Page({
 
  onShareAppMessage: function (res) {
    return {
      title: '快来统计考研的复习情况吧！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },


  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});
