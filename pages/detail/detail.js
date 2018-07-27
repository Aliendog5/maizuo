// pages/detail/detail.js
Page({
  data: {
    id:"",
    film:[]
  },
  onLoad(option) {
    this.setData({
      id:option.id
    })   
  },
  onReady(){
    this.getdetail()
  },
  getdetail(){
    wx.request({
      url: 'https://m.maizuo.com/v4/api/film/'+this.data.id, //仅为示例，并非真实的接口地址
      data: {
        "__t":1532519887672
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successdetail.bind(this)
    })
  },
  successdetail(res) {   
    let films = res.data.data.film
    this.setData({
      film: films
    })
  }
})