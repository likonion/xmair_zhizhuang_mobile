<template>
    <div>
        <div>
            此功能暂未开放，敬请期待！
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {
        XHeader,
        Card,
        Tab,
        TabItem,
        Cell,
        Checker, CheckerItem,
        Divider,
        Group,
        XTextarea,
        CellBox,
        GroupTitle,
        Sticky,
        Flexbox,
        FlexboxItem,
        TransferDom,
        Previewer,
        XTable,
        Selector,
        Badge,
        LoadMore,
        XButton,
        XInput,
        ButtonTab,
        ButtonTabItem,
        Popup,
        XNumber,
        Toast,
        Panel
    } from 'vux'
    import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                tabIndex: 0
            }
        },
        components: {
            XHeader,
            Card,
            Tab,
            TabItem,
            Cell,
            Checker, CheckerItem,Divider,
            Group,
            XTextarea,
            CellBox,
            GroupTitle,
            Sticky,
            TransferDom,
            Previewer,
            Flexbox,
            FlexboxItem,
            XTable,
            Selector,
            Badge,
            LoadMore,
            XButton,
            XInput,
            ButtonTab,
            ButtonTabItem,
            Popup,
            XNumber,
            Toast,
            Panel
        },
        created() {

        },
        mounted() {
            this.$nextTick(function () {
            })
        },
        computed: {
            ...mapState({
                userCode: 'userCode'//用户工号
            })
        },
        activated() {
        },
        directives: {
            TransferDom
        },
        methods: {}
    }
</script>

<style lang="less">
    @import "../common/styles/shopcart.less";
    @import "../common/styles/foods-wrapper.less";
    .getMore {
        display: block;
        text-align: center;
        padding: 5px;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        color: #353535;
        background-color: #d0d0d0;
        font-size: .8rem;

    }

    .card-demo-flex {
        display: flex;
    }

    .card-demo-content01 {
        padding: 10px 0;
    }

    .card-padding {
        padding: 15px;
    }

    .card-demo-flex > div {
        flex: 1;
        text-align: center;
        font-size: 12px;
    }

    .card-demo-flex span {
        color: #f74c31;
    }



    .demo5-item {
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-bottom: 4px;
        padding: 0 16px;
    }
    .demo5-item-selected {
        background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;
        border-color: #ff4a00;
    }

</style>