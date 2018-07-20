var m = 0;
Page({
  data: {
    hiddenName1: true,
    hiddenName2: true,
    hiddenName3: true
  },
  onShow: function () {
    m = getApp().globalData.numn;
    if (m > 5000) {
      this.setData({
        hiddenName1: false,//!this.data.hiddenName
        hiddenName2: false,//!this.data.hiddenName
        hiddenName3: false//!this.data.hiddenName
      })
    } else if (m > 1000) {
      this.setData({
        hiddenName1: false,//!this.data.hiddenName
        hiddenName2: false//!this.data.hiddenName
      })
    } else if (m > 500) {
      this.setData({
        hiddenName1: false//!this.data.hiddenName
      })
    }
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
      workTime: wx.getStorageSync('workTime'),
      restTime: wx.getStorageSync('restTime')
    })
  },
  changeWorkTime: function (e) {
    wx.setStorage({
      key: 'workTime',
      data: e.detail.value
    })
  },
  changeRestTime: function (e) {
    wx.setStorage({
      key: 'restTime',
      data: e.detail.value
    })
  },
  start: function () {
    wx.navigateTo({
      url: '../colors/colors',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }


})
