// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './vuex/store'
import axios from 'axios'

import {
    BusPlugin,
    DatetimePlugin,
    LocalePlugin,
    DevicePlugin,
    ToastPlugin,
    AlertPlugin,
    ConfirmPlugin,
    LoadingPlugin,
    WechatPlugin,
    AjaxPlugin,
    AppPlugin
} from 'vux'

import router from './router/router'

axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
// axios.interceptors.request.use(config => {
//     // element ui Loading方法
//     console.log(config)
//     let urlPath = config.url.slice(2)
//     config.url = 'static' + urlPath
//     return config
// }, error => {
//     loadinginstace.close()
//     Message.error({
//         message: '加载超时'
//     })
//     return Promise.reject(error)
// })


router.beforeEach(function (to, from, next) {
    // 页面切换显示loading
    let toPath = to.path
    let fromPath = from.path
    store.commit('updateLoadingStatus', {isLoading: true})
    next()
})
router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {isLoading: false})
})
Vue.use(require('vue-wechat-title'))
// plugins

Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(VueRouter)

FastClick.attach(document.body)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
