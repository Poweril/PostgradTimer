//var num = 0;
Page({
  // initial background color setting
  data: {
    themes: [
      { name: 'green', title: '优雅浅绿', text: '盛夏的一抹绿', color: '#5cb85c'},
      { name: 'peach', title: '宁静粉桃', text: '清淡的桃粉色', color: '#ffebcc'},
      { name: 'blue', title: '安心蔚蓝', text: '低饱和度的蓝色，带来清凉和安心', color: '#37c6c0'},
      { name: 'purple', title: '淡雅暗紫', text: '紫罗兰的永恒花园', color: '#d5c9f9'},
    ],
    chosenTheme: 'green'
  },

  onLoad: function () {
    let chosenTheme = wx.getStorageSync('chosenTheme')
  // 改变背景颜色
  // changeColor: function () {
  //  var bgColor = this.data.pageBackgroundColor == 'red' ? '#5cb85c' : 'red';
  // 设置背景颜色数据
  //  this.setData({
  //    pageBackgroundColor: bgColor
  //  });
  },


  changeTheme: function (e) {
    wx.setStorage({
      key: 'chosenTheme',
      data: e.detail.value
    })
    wx.showToast({
      title: '选择成功',
      icon: 'success',
      duration: 3000
    });
    wx.navigateTo({
      url: '../settings/settings',
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
    console.log('jump')
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