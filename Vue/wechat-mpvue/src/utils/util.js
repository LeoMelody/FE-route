import config from './config'
import mock from './mock'
import store from '../store'

const util = {
    getUserSession(cb) {
        var that = this
        var session = wx.getStorageSync('session')
        if (session) {
            typeof cb == "function" && cb(session)
        } else {
            wx.login({
                success: function (data) {
                  wx.getUserInfo({
                    withCredentials: true,
                    success: function (res) {
                    //   that.globalData.wxUserInfo = res.userInfo // 修改为store
                      store.commit('setWxUserInfo', res.userInfo)
                      var params = {};
                      params.jsCode = data.code;
                      params.iv = res.iv;
                      params.encryptedData = res.encryptedData;
                      params.userType = "06"; //大道云贷小程序
                      that.querySession(params, function (data) {
                        wx.setStorageSync('session', data)
                        typeof cb == "function" && cb(data);
                        // that.globalData.session = data
                        // typeof cb == "function" && cb(that.globalData.session);
                      })
                    },
                    fail: function (res) {
                      if (wx.openSetting) {
                        wx.showModal({
                          content: '必须授权才能进行操作，是否重新授权？',
                          success: function (res) {
                            if (res.confirm) {
                              wx.openSetting({
                                success: (res) => {
                                  console.log(res)
                                  if (res && res.authSetting && res.authSetting["scope.userInfo"] == true) {
                                    
                                    wx.getUserInfo({
                                      withCredentials: true,
                                      success: function (res) {
                                        that.globalData.wxUserInfo = res.userInfo
                                        var params = {};
                                        params.jsCode = data.code;
                                        params.iv = res.iv;
                                        params.encryptedData = res.encryptedData;
                                        params.userType = "06"; //大道微服务小程序
                                        util.getUserSession(params, function (data) {
                                          wx.setStorageSync('session', data)
                                          typeof cb == "function" && cb(data);
                                          // that.globalData.session = data
                                          // typeof cb == "function" && cb(that.globalData.session);
                                        })
                                      }
                                    })
                                  }
        
                                }
                              })
                            } else if (res.cancel) {
                              console.log('用户点击取消')
                            }
                          }
                        })
        
                      } else {
                        wx.showModal({
                          title: '授权提示',
                          content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
                        })
                      }
                    }
                  })
                }
              })    
        }
    },
    querySession(params, call) {
        // todo 测试代码
        typeof call == "function" && call('')
    },
    clearSession() {
        wx.removeStorageSync('session')
    },
    sendRequest(params) {
        var that = this
        if (!params.header) {
            params.header = {};
        }
        var session = wx.getStorageSync('session')
        if (session) {
            params.header.sessionKey = session.sessionKey;
        }
        // params.header.sessionKey = '123456';
        // if (!(/^(http|https)/).test(params.url)) {
        //     params.url = config.preUrl + params.url
        // } // 基本没啥用了
        if (!config.DEBUG) {
            that.requestFun(params)
        }
        else {
            var result = mock[params.url];
            if (result) {
                if (result.statusCode === 200) {
                    params.success && params.success(result);
                } else {
                    params.fail && params.fail(result);
                }
                if (result.statusCode === 401 || result.statusCode === 403) {
                    that.getUserSession()
                    that.errorToast()
                    return
                }
                params.complete && params.complete(result);
            } else {
                that.requestFun(params)
            }
        }
    }
}

export default util