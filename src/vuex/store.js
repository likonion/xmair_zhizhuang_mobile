import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// import plugins from './plugins'
Vue.use(Vuex)
const myPlugin = store => {
    // 当 store 初始化后调用
    store.subscribe((mutation, {menu}) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
        // window.localStorage.setItem('menu', JSON.stringify(menu))
    })
}
const state = {
    userCode: '',//用户厦航ID
    isLoading: false,
}

const getters = {
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
    // plugins: [myPlugin],
})
