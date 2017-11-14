import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    // base: '/ulms/office/',
    routes: [
        // 异步加载组件
        {path: '/', redirect: '/index'},
        {
            path: '/index/:userCode',
            component: function (resolve) {
                require(['@/components/index'], resolve)
            },
            meta: {
                title: '主页'
            }
        },
        {
            path: '/index/',
            component: function (resolve) {
                require(['@/components/index'], resolve)
            },
            meta: {
                title: '主页'
            }
        },
        {
            path: '/reception',
            component: function (resolve) {
                require(['@/components/reception'], resolve)
            },
            meta: {
                title: '领用查询'
            }
        },
        {
            path: '/selfSelection',
            component: function (resolve) {
                require(['@/components/selfSelection'], resolve)
            },
            meta: {
                title: '年度自选'
            }
        },
        {
            path: '/goodsBuy',
            component: function (resolve) {
                require(['@/components/goodsBuy'], resolve)
            },
            meta: {
                title: '购买申请'
            }
        },
        {
            path: '/size',
            component: function (resolve) {
                require(['@/components/size'], resolve)
            },
            meta: {
                title: '信息维护'
            }
        },
        {
            path: '/exchangeGoods',
            component: function (resolve) {
                require(['@/components/exchangeGoods'], resolve)
            },
            meta: {
                title: '尺码互换'
            }
        },
        {
            path: '/afterSales',
            component: function (resolve) {
                require(['@/components/afterSales'], resolve)
            },
            meta: {
                title: '快递签收'
            }
        },
        {
            path: '/mymsg',
            component: function (resolve) {
                require(['@/components/mymsg'], resolve)
            },
            meta: {
                title: '站内消息'
            }
        },
        {
            path: '/youandme',
            component: function (resolve) {
                require(['@/components/youandme'], resolve)
            },
            meta: {
                title: '尺码对照'
            }
        },
        {
            path: '/sorry',
            component: function (resolve) {
                require(['@/components/youandme'], resolve)
            },
            meta: {
                title: 'sorry'
            }
        },
        {
            path: '/idea',
            component: function (resolve) {
                require(['@/components/idea'], resolve)
            },
            meta: {
                title: '意见反馈'
            }
        }
    ]
})
