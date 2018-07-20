//app.js
const defaultWorkTime = 25
const defaultTheme = 'green'
const defaultTagsList = [{
  logName: '无所事事'
}]

App({

  globalData:{
    token:null,
  },
  
  onLaunch: function() {
    let workTime = wx.getStorageSync('workTime')
    let tagsList = wx.getStorageSync('tagsList')
    let chosenTheme = wx.getStorageSync('chosenTheme')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultWorkTime
      })
    }
    if (!chosenTheme) {
      wx.setStorage({
        key: 'chosenTheme',
        data: defaultTheme
      })
    }
  },

  globalData: {
    userInfo: null,
    numm:0,
    numn:0,
    //quanju:null
  } 
  
})
