// 线上
// var baseUrl = 'https://wechat2.ddjf.com.cn'

// uat
var baseUrl = 'https://wechatmini.ddjf.com.cn'

// sit
// var baseUrl = 'http://10.1.108.118'

// 开发服务器
// var baseUrl = 'http://10.1.108.119'

var preToolsUrl = baseUrl + '/tools'; // 工具
var preCoreUrl = baseUrl + '/core'// 核心
var preActivity = baseUrl + '/activity' // 活动

var APIS = {
    getSessionKey: preCoreUrl + '/api/core/login/getSessionKey', //获取session地址
    getuserinfoMortgage: preCoreUrl + '/api/core/common/getuserinfo' // 获取用户信息
}

export default {
    APIS,
    DEBUG: true
}