var util = require('../../utils/util.js')
//var totalll = getApp().globalData.totall;
Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true
  },
  onShow: function() {    
    wx.setNavigationBarTitle({
      title: '任务记录'
    })
    this.getLogs();
  },
  set: function() {

  },
  getLogs: function() {
    let logs = wx.getStorageSync('logs')
    logs.forEach(function(log) {
      log.runTime = (log.runTime / 60000).toFixed(0) + "′" + ((log.runTime % 60000) / 1000).toFixed(0) + "″"
    })
    this.setData({
      logs: logs,
    })
  },
  onLoad: function() {

  },
  switchModal: function() {
    getApp().globalData.numn=0
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function(e) {
    wx.setStorageSync('logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
