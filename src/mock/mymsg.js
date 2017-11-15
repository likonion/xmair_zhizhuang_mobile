import Mock from "mockjs"

export default Mock.mock({
    "loadMyMsg": {
        "result|15": [
            {
                "method": "@cparagraph",
                "date": "@datetime",
                "simp": "@csentence"
            }
        ],
        "start": 0,
        "totalCount": 15,
        "pageSize": 10,
        "totalPageCount": 5,
        "currentPageNo": 1,
        "hasNextPage": true,
        "hasPreviousPage": true,
        "pageNo": 1
    }

})
