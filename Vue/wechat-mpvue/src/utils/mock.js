import config from './config'

var APIS = config.APIS

var mock = {}

mock[APIS.getSessionKey] = {
    "errMsg": "request:ok",
    "data": {
        "retCode": "1",
        "retMsg": "成功",
        "data": '123456'
    },
    "statusCode": 200
}

mock[APIS.getuserinfoMortgage] = {
    "errMsg": "request:ok",
    "data": {
        "retCode": "1",
        "retMsg": "成功",
        "data": {
            "userFlag": "01",
            "mobileNo": "18855669988",
            "realName": "张三",
            "cityCode": "440100",
            "companyName": "大道金服",
            // "managerName": "李四",
            // "managerPhone": "18566997788"

            // "mobileNo": "",
            // "realName": "",
            // "cityCode": "",
            // "companyName": "",
            "managerName": "王四",
            "managerPhone": "18555555555"
        }
    },
    "statusCode": 200
}

