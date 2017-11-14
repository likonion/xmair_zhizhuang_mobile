import Mock from "mockjs"

export default Mock.mock({
    "createYearForPlan": {
        "yearList": ["2012", "2013", "2014", "2015", "2016", "2017"],
        "defa": "2017"
    },
    "createYearForHistory": {
        "yearList": ["2012", "2013", "2014", "2015", "2016", "2017"],
        "defa": "2017"
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
                "NATIONAL_SIZE": null,
                "STAFF_CODE": "20211",
                "PAY_TIME": "",
                "MAT_NAME": "肥皂",
                "MAT_NORMAL": "否",
                "MAT_ID": "2",
                "MEMO": null,
                "APP_STATUS_NAME": "库存不足",
                "PLAN_PRICE": "4",
                "APP_STATUS": "5",
                "PLAN_STATE": null,
                "MEASURE_UNIT": "块",
                "PURCHASE_ID": "85050",
                "NUM": "1",
                "ADD_DATE_SIMP": "2017-10-25"
            }
        ]
    },
    "receiveStand": {
        "data|10": [{
            "PLAN_PRICE|1-200.1": 1,
            "STD_FIRST_NUM|1-6": 1,
            "STD_BASE_NUM|1-6": 1,
            "MEASURE_UNIT": "条",
            "MAT_NAME|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"],
            "STD_BASE_YEAR|1-6": 1
        }],
        "standName": "男地面行政标准"
    },
    "plan": {
        "result|30": [
            {
                "MEMO|1": ["基础配发", "自选"],
                "PLAN_STATE|1": [0, 1, 2, 3],
                "MAT_NUM|1-5": 1,
                "PLAN_YEAR": "2018",
                "NATIONAL_SIZE|29-40": 1,
                "MAT_NAME|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"]
            }
        ],
        "start": 0,
        "totalCount": 16,
        "pageSize": 20,
        "totalPageCount": 5,
        "currentPageNo": 1,
        "hasNextPage": false,
        "hasPreviousPage": false,
        "pageNo": 1
    },
    "receiveHistory": {
        "result|30": [
            {
                "MEMO": "基础配发",
                "ADD_DATE": "2017-10-30",
                "MAT_NUM|1-5": 1,
                "PLAN_YEAR": null,
                "NATIONAL_SIZE": "XL",
                "DRAWER": "@cname",
                "MAT_NAME|1": ["男行政春秋上衣", "领带", "男长袖衬衣", "连体雨衣", "男夏制衣", "男行政春秋制裤", "乘务裙（浅蓝）"]
            }
        ],
        "start": 0,
        "totalCount": 100,
        "pageSize": 20,
        "totalPageCount": 5,
        "currentPageNo": 1,
        "hasNextPage": true,
        "hasPreviousPage": false,
        "pageNo": 1
    }

})
