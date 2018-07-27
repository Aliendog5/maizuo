//index.js
//获取应用实例
const app = getApp()

Page({
 data:{
   imgUrls:[],
   playing:[],
   soon:[]
 },
 onReady(){
   this.getBanner();
   this.getHomePlaying()
   this.getHomeSoon()
 },
  getBanner(){
    wx.request({
      url: 'https://m.maizuo.com/v4/api/billboard/home', 
      data: {
        "__t":1532412884819
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successBanner.bind(this)
  })
  },
successBanner(res){
  let data = res.data.data.billboards;
  let urls=[];
  for(let i=0;i<data.length;i++){
    urls.push(data[i].imageUrl)
  }
  this.setData({
    imgUrls:[...urls]
  })
},
//https://m.maizuo.com/v4/api/film/now-playing?__t=1532427886277&page=1&count=5
  getHomePlaying(){
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/now-playing',
      data: {
        "__t": 1532427886277,
        "page":1,
        "count":5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successPlaying.bind(this)
    })
  },
  successPlaying(res){
    let a=res.data.data.films;
    this.setData({
      playing:[...this.data.playing,...a]
    })
  },
  //https://m.maizuo.com/v4/api/film/coming-soon?__t=1532427886279&page=1&count=3
  getHomeSoon() {
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/coming-soon',
      data: {
        "__t": 1532427886279,
        "page": 1,
        "count": 3
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successSoon.bind(this)
    })
  },
  successSoon(res){
    let a = res.data.data.films;
    this.setData({
      playing: [...this.data.playing, ...a]
    })
  }
})
