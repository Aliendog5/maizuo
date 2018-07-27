
Page({
  data: {
    type:"now-playing",
    play:[],
    soo:[],
    page:1,
    soopage:1
  },
  changeType2(){
    if (this.data.type ==="now-playing"){
      this.setData({
        type:"coming-soon"
      })    
    }    
  },
  changeType1() {
    if (this.data.type === "coming-soon") {
      this.setData({
        type: "now-playing"
      })     
    }
  },
  onReady() {
    this.getplaying()
    this.getsoon()
  },
  //https://m.maizuo.com/v4/api/film/now-playing?page=1&count=7
  getplaying(){
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/now-playing',
      data: {
        "__t": 1532427886277,
        "page": this.data.page,
        "count":7
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successplaying.bind(this)
    })
  },
  successplaying(res){
    let a=res.data.data.films;
    this.setData({
      play:[...this.data.play,...a]
    })
  },
  //页面上拉触底事件的处理函数
  onReachBottom(){
    this.setData({
      page:this.data.page+1,
      soopage: this.data.soopage+1
    })
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/now-playing',
      data: {
        "__t": 1532427886277,
        "page": this.data.page,
        "count": 7
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successplaying.bind(this)
    })
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/coming-soon',
      data: {
        "page": this.data.soopage,
        "count": 7
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successsoon.bind(this)
    })
  },
  getsoon(){
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/coming-soon',
      data: {
        "page": this.data.page,
        "count": 7
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successsoon.bind(this)
    })
  },
  successsoon(res){
    let a = res.data.data.films;
    this.setData({
      soo: [...this.data.soo, ...a]
    })
  },
  handledetail(e){
    let idd= e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + idd
    })
  }
})
