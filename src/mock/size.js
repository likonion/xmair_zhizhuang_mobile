import Mock from "mockjs"

export default Mock.mock({
    "queryAllData": {
        "allowDate": "@date-@date",
        "allowFlag|2-3": 1,
        "addressAllowFlag": 1,
        "addressAllowDate": "@date-@date",
        "allowTitle": "2017",
        "allowYear": 23
    },
    "loadArea": {
        "selectProv": [1,2,3],
        "selectCity":[4,5,6],
        "selectCounty": [7,8,9]
    },
    "queryuserSize|10": [
        {
            "SIZE_ID": "14724005",
            "STD_MAT_ID": "15",
            "CUSTOM_FLAG|1": ["无尺码","定制码","国标码"],
            "userCode": "20211",
            "MEASURE_SIZE": null,
            "NATIONAL_SIZE": null,
            "SPECIAL_REQ": null,
            "MAT_NAME|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"],
        }
    ],
    "loadUserAddress": {
        "infoId": "1",
        "infoDate": null,
        "infoUserCode": "20211",
        "infoLinkName": "王乐",
        "infoLinkTel": "13459254818",
        "infoLinkTelBack": "11111",
        "infoLinkProv": "福建省",
        "infoLinkCity": "厦门市",
        "infoLinkCounty": "思明区",
        "infoLinkDetail": "龙山路"
    },
    "newSelectMater|10": [{
        "PLAN_PRICE|10-100.1": 1,
        "MAT_IMG": "./static/phone/1.png",
        "MAT_SIZE": ["68",
            "70",
            "72",
            "74",
            "76",
            "78",
            "80",
            "82",
            "84",
            "86",
            "88",
            "90",
            "92",
            "94",
            "96",
            "98",
            "100",
            "102",
            "104",
            "106",
            "108",
            "110",
            "112",
            "114",
            "116"],
        "CUSTOM_FLAG|1": ["无尺码", "国标码"],
        "USER_SIZE": "",
        "NORMAL|1": [0,1],
        "MEASURE_UNIT": "条",
        "MAT_NAME|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"],
        "USER_NUM": 0,
        "MAT_ID": "15"
    }],
    "newLoadBaseList": {
        "result|5": [
            {
                "nationalSize": null,
                "customFlag": "无尺码",
                "measureUnit": "条",
                "matCode": "4001.0016",
                "payStatus": null,
                "planYear": "2018",
                "choiceMaterId": null,
                "matName|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"],
                "matId": "15",
                "planPrice": "39.6",
                "spareMoney": "0",
                "matNum": "1"
            },
        ],
        "start": 0,
        "totalCount": 6,
        "pageSize": 2147483647,
        "totalPageCount": 1,
        "currentPageNo": 1,
        "hasNextPage": false,
        "hasPreviousPage": false,
        "pageNo": 1
    },
    "newLoadSelectList": {
        "result|5": [
            {
                "nationalSize": null,
                "customFlag": "无尺码",
                "measureUnit": "条",
                "matCode": "4001.0016",
                "payStatus": null,
                "planYear": "2018",
                "choiceMaterId": null,
                "matName|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"],
                "matId": "15",
                "planPrice": "39.6",
                "spareMoney": "0",
                "matNum": "1"
            },
        ],
        "start": 0,
        "totalCount": 0,
        "pageSize": 2147483647,
        "totalPageCount": 0,
        "currentPageNo": 1,
        "hasNextPage": false,
        "hasPreviousPage": false,
        "pageNo": 1
    },
    "queryLimit": {
        "curUseMoney": "0",
        "needPayMoney": "1169.91",
        "curSurplusMoney": "-1169.91",
        "curTotalMoney": "223.69",
        "accountMoney": "0",
        "lastSurplusMoney": "223.69",
        "curAddstdMoney": "223.69"
    }

})
