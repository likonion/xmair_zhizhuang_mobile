import Mock from "mockjs"

export default Mock.mock({
    "queryInit": {
        "allowDate": "@date-@date",
        "allowFlag": 1,
        "allowTitle": "2017",
        "allowYear": 23
    },
    "loadUserMat": {
        "result|30": [
            {
                "TOTALPRICE": "4",
                "APPROVE_ID": "4028821d5f528207015f52963e770001",
                "ADD_DATE": "2017-10-25 16:11:38",
                "CUSTOM_FLAG": "无尺码",
                "MEASURE_SIZE": null,
                "PLAN_YEAR": "2017",
                "NATIONAL_SIZE|30-100": 1,
                "STAFF_CODE": "20211",
                "PAY_TIME": "",
                "MAT_NAME|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"],
                "MAT_NORMAL": "否",
                "MAT_ID": "2",
                "MEMO": null,
                "APP_STATUS_NAME": "库存不足",
                "PLAN_PRICE": "4",
                "APP_STATUS|1-5": 1,
                "PLAN_STATE": null,
                "MEASURE_UNIT": "块",
                "PURCHASE_ID": "85050",
                "NUM|1-8": 1,
                "ADD_DATE_SIMP": "@date"
            }
        ]
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
