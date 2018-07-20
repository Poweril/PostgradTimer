var num=0;
var app = getApp();
var num11=0;
var num22 = 0;
var num33 = 0;
//var totalll=0;
var brushtime = 40
var app = getApp();
const util = require('../../utils/util.js')
var tagsList = [{
  logName: '英语'
}, {
  logName: '政治'
}, {
  logName: '高数'
}]
const themeColor = {
  green: '#5cb85c',
  peach: '#ffebcc',
  blue: '#37c6c0',
  purple: '#d5c9f9'
}
const defaultTagsList = [{
  logName: '无所事事'
}]
const actionName = {
  stop: '停止',
  start: '开始'
}

const initDeg = {
  left: 45,
  right: -45,
}

Page({

  data: {

    tagsList: [{
      logName: '无所事事'
    }],
    remainTimeText: '',
    timerType: '休息',
    newTag: '',
    log: {},
    bgColor: '',
    completed: false,
    isRuning: false,
    leftDeg: initDeg.left,
    rightDeg: initDeg.right,
  },

 
  onLoad: function () {
  },



  onShow: function() {
    if (this.data.isRuning) return
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
    let bgColor = this.data.bgColor
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00',
      tagsList: tagsList,
      bgColor: themeColor[wx.getStorageSync('chosenTheme')],
    });
  },

  // change slide bar
  changeWorkTime: function (e) {
    wx.setStorage({
      key: 'workTime',
      data: e.detail.value
    })
    let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
    this.setData({
      workTime: workTime,
      remainTimeText: workTime + ':00'
    })
  },

  startTimer: function(e) {
    let startTime = Date.now()
    let startime1=Date.now()/////////////////////////////////
    let startime2=Date.now()/////////////////////////////
    let isRuning = this.data.isRuning
    let timerType = e.currentTarget.dataset.logname
    let showTime = this.data['workTime']
    let keepTime = showTime * 60 * 1000

    let settime = getApp().globalData.numn//////////////////////////////

    let logName = e.currentTarget.dataset.logname
    //let totalling = 0;/////////////////////////////////////////
    if (!isRuning) {
      this.timer = setInterval((function() {
        this.updateTimer()
        this.startNameAnimation()
      }).bind(this), 1000)
    } else {
      this.stopTimer()
    }

    this.setData({
      isRuning: !isRuning,
      completed: false,
      timerType: e.currentTarget.dataset.logname,
      remainTimeText: showTime + ':00',
      taskName: logName,
    })

    this.data.log = {
      name: logName,
      startTime: Date.now(),

      startime1: [isRuning?Date.now():0],
      startime2: [isRuning?0:Date.now()],

      keepTime: keepTime,   // setted worktime
      endTime: keepTime + startTime,    // expected
      action: actionName[isRuning ? 'stop' : 'start'],
      runTime: [isRuning ? (Date.now() - getApp().globalData.numm) : ''], // actual worktime
      setting: [isRuning ? (Date.now() - getApp().globalData.numm) : 0]
    }
    getApp().globalData.numn = Number(getApp().globalData.numn)+Number(this.data.log.setting)
   // console.log(getApp().globalData.numn   )
    if(startime1!==0) {
      getApp().globalData.numm = startime1}
    this.saveLog(this.data.log)
  },

  startNameAnimation: function() {
    let animation = wx.createAnimation({
      duration: 450
    })
    animation.opacity(0.2).step()
    animation.opacity(1).step()
    this.setData({
      nameAnimation: animation.export()
    })
  },

  stopTimer: function() {
    // reset circle progress
    this.setData({
      leftDeg: initDeg.left,
      rightDeg: initDeg.right
    })

    // clear timer
    this.timer && clearInterval(this.timer)
  },

  updateTimer: function() {
    let log = this.data.log
    let now = Date.now()
    let remainingTime = Math.round((log.endTime - now) / 1000)
    let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
    let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
    let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
    let halfTime

    // update timer text
    if (remainingTime > 0) {
      let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
      this.setData({
        remainTimeText: remainTimeText
      })
    } else if (remainingTime == 0) {
      this.setData({
        completed: true
      })
      this.stopTimer()
      return
    }

    // update circle progress
    halfTime = log.keepTime / 2
    if ((remainingTime * 1000) > halfTime) {
      this.setData({
        leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
      })
    } else {
      this.setData({
        leftDeg: -135
      })
      this.setData({
        rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
      })
    }
  },

  //add new tag
  addTag: function (e) {
    this.setData({
      newTag: e.detail.value
    })
  },

  //submit new tag
  submitTag() {
    let newTag = ''
    if (this.data.newTag != '') {
      newTag = this.data.newTag
    }
    else {
      wx.showToast({
        title: '任务不能为空！',
      })
      return;
    }

    // check if existed
    for (var index = 0; index < tagsList.length; index++) {
      if (tagsList[index].logName == newTag) {
        wx.showToast({
          title: '任务已存在！',
        })
        return;
      }
    }
    // add the new tag to the array
    tagsList.push({
      logName: newTag
    })
    // refresh list
    this.setData({
      tagsList: tagsList,
      newTag: ''
    });
  },

  // long tap delete tag
  deleteTag: function (e) {
    for (var index = 0; index < tagsList.length; index++) {
      if (tagsList[index].logName == e.currentTarget.dataset.logname)
        tagsList.splice(index, 1);
    }
    // refresh list
    this.setData({
      tagsList: tagsList
    });
    // toast
    wx.showToast({
      title: '任务已移除！',
    })
    console.log('Tag deleted. ')
  },

  changeLogName: function (e) {
    this.logName = e.detail.value
  },
//---------------------------------------------
//---------------------------------------------
//---------------------------------------------
//---------------------------------------------
  saveLog: function (log) {
    var logs = wx.getStorageSync('logs')
    //console.log(logs[logs.length - 1])
    console.log(logs)
    logs.unshift(log)
    wx.setStorageSync('logs', logs)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  //播放
  listenerButtonPlay: function () {
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/5106429.m4a?fromtag=46',
      title: '薛之谦',
      //图片地址地址
      coverImgUrl: 'http://i.gtimg.cn/music/photo/mid_album_90/a/F/000QgFcm0v8WaF.jpg'

    })
  },
  //监听button暂停按钮
  listenerButtonPause: function () {
    wx.pauseBackgroundAudio({
    });
    console.log('暂停播放')
  },
  /**
   * 播放状态
   */
  listenerButtonGetPlayState: function () {
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        // success
        //duration  选定音频的长度（单位：s），只有在当前有音乐播放时返回
        console.log('duration:' + res.duration)
        console.log('currentPosition:' + res.currentPosition)
        //status    播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
        console.log('status:' + res.status)
        console.log('downloadPercent:' + res.downloadPercent)
        //dataUrl   歌曲数据链接，只有在当前有音乐播放时返回 
        console.log('dataUrl:' + res.dataUrl)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /**
   * 设置进度
   */
  listenerButtonSeek: function () {
    wx.seekBackgroundAudio({
      position: 40
    })
  },
  /**
   * 停止播放
   */
  listenerButtonStop: function () {
    wx.stopBackgroundAudio({
    })
    console.log('停止播放')
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数  
    /** 
     * 监听音乐播放 
     */
    wx.onBackgroundAudioPlay(function () {
      // callback
      console.log('onBackgroundAudioPlay')
    })
    /**
     * 监听音乐暂停
     */
    wx.onBackgroundAudioPause(function () {
      // callback
      console.log('onBackgroundAudioPause')
    })
    /**
     * 监听音乐停止
     */
    wx.onBackgroundAudioStop(function () {
      // callback
      console.log('onBackgroundAudioStop')
    })
  }


})

getApp().globalData.token = brushtime
