<template>
    <div id="app">
        <div v-transfer-dom>
            <loading v-model="$store.state.isLoading" text="Loading"></loading>
        </div>
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>
    import {TransferDom, Loading} from 'vux'

    export default {
        name: 'app',
        created() {

        },
        components: {TransferDom, Loading},
        directives: {
            TransferDom
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import "./common/styles/xtable.less";

    body {
        background-color: #fbf9fe;
    }

    #app {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }


</style>
