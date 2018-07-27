// pages/cinema/cinema.js
Page({
  data: {
    cinemas:[],
    direct:[]
  },
  onReady() {
    this.getCinemas()
  },
//https://m.maizuo.com/v4/api/cinema?__t=1532500880344
  getCinemas(){
    wx.request({
      url: 'https://m.maizuo.com/v4/api/cinema', //仅为示例，并非真实的接口地址
      data: {
        "__t":1532500880344
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: this.successGetCinemas.bind(this)
    })
  },
  successGetCinemas(res) {   
    let a = res.data.data.cinemas;
    let c = [];
    for(let i=0; i<a.length;i++){
      let bflag=false;
      for(let j=0;j<c.length;j++){
        if (c[j].add === a[i].district.name){
          bflag=true;
        }
      }
      if(!bflag){
        let obj={
          add: a[i].district.name,
          flag:false
        }
        c.push(obj)
      }
    }
    this.setData({
      cinemas: [...a],
      direct:[...c]
    })
    
  },
  tapClick(e){
    let resIndex = e.currentTarget.dataset.index === "" ? 0 : e.currentTarget.dataset.index;
    let arr = this.data.direct;
    arr[resIndex].flag = !arr[resIndex].flag;
    this.setData({
      direct:arr
    })
  }
})