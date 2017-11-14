<template>
    <div class="mainWarpper">

        <div v-transfer-dom>
            <loading v-model="$store.state.isLoading"></loading>
        </div>
        <!--点击订单弹出菜单-->
        <div v-transfer-dom>
            <!--<popup v-model="$store.state.orderMenu" height="220px" is-transparent>-->
            <!--<div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">-->
            <!--<div style="padding:20px 15px;">-->
            <!--<x-button type="primary" :link="viewOrderUrl" @click.native="$store.commit('changeOrderMenu')">-->
            <!--查看订单-->
            <!--</x-button>-->
            <!--<x-button :link="ManOrderUrl" @click.native="$store.commit('changeOrderMenu')" type="primary">-->
            <!--处理订单-->
            <!--</x-button>-->
            <!--<x-button @click.native="$store.commit('changeOrderMenu')">Cancel</x-button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</popup>-->
            <!--<popup v-model="editList" height="270px" is-transparent>-->
                <!--<div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">-->
                    <!--<group>-->
                        <!--<x-number title="数量" v-model="checkList.count" :fillable="true"></x-number>-->
                    <!--</group>-->
                    <!--<div style="padding:20px 15px;">-->
                        <!--<x-button type="primary" @click.native="submitOwnCheckList">提交</x-button>-->
                        <!--<x-button type="warn">删除</x-button>-->
                        <!--<x-button @click.native="changeEditList">取消</x-button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</popup>-->
        </div>
        <drawer
                width="200px;"
                :show.sync="drawerVisibility"
                :show-mode="showModeValue"
                :placement="showPlacementValue"
                :drawer-style="{'background-color':'#35495e', width: '250px'}">
            <!-- drawer content -->
            <div slot="drawer">
                <group title="订单搜索" style="margin-top:20px;">
                    <calendar v-model="starDate" title="开始时间"></calendar>
                    <calendar v-model="endDate" title="结束时间" disable-future></calendar>
                    <popup-picker title="处理状态" :data="orderState" v-model="selectState"
                                  placeholder="请选择"></popup-picker>
                    <x-input title="关键字" placeholder="请输入" v-model="keyword" is-type="text"></x-input>
                </group>
                <div style="padding:10px; background: none">
                    <flexbox>
                        <flexbox-item>
                            <x-button type="primary" @click.native="">搜索</x-button>
                        </flexbox-item>
                        <flexbox-item>
                            <x-button type="default" @click.native="">重置</x-button>
                        </flexbox-item>
                    </flexbox>
                </div>

            </div>

            <!-- main content -->
            <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="0">
                <x-header slot="header"
                          style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                          :left-options="leftOptions"
                          :right-options="rightOptions"
                          :title="headTitle"
                          @on-click-more="onClickMore">
          <span
                  v-if="$route.path === '/' || $route.path === '/home' || $route.path === '/orderList' || $route.path === '/about'"
                  slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
                    <span
                            v-if="$route.path === '/' || $route.path === '/home' || $route.path === '/orderList' || $route.path === '/about'"
                            slot="right" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="ios-search-strong" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
                </x-header>
                <keep-alive>
                    <router-view class="router-view"></router-view>
                </keep-alive>
            </view-box>

        </drawer>


    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'
    import {
        XHeader,
        Tabbar,
        TabbarItem,
        Card,
        TransferDom,
        Group,
        Cell,
        XButton,
        Drawer,
        ViewBox,
        Radio,
        Loading,
        Calendar,
        Selector,
        PopupPicker,
        Picker,
        XInput,
        Flexbox,
        FlexboxItem,
        Popup,
        XNumber
    } from 'vux'

    export default {
        components: {
            XHeader,
            Tabbar,
            TabbarItem,
            Card,
            TransferDom,
            Group,
            Cell,
            XButton,
            Drawer,
            ViewBox,
            Radio,
            Loading,
            Calendar,
            Selector,
            PopupPicker,
            Picker,
            XInput,
            Flexbox,
            FlexboxItem,
            Popup,
            XNumber
        },
        directives: {
            TransferDom
        },
        watch: {},
        mounted() {
            // 添加滚动监听事件
//            this.$nextTick(function () {
//                if (this.$route.path == '/orderList' || this.$route.path == '/waitOrderList') {
//                    setTimeout(() => {
//                        this.box = document.querySelector('#vux_view_box_body')
//                        if (this.box) {
//                            this.box.removeEventListener('scroll', this.handler, false)
//                            this.box.addEventListener('scroll', this.handler, false)
//                        }
//                    }, 1000)
//                }
//            })
            // 滚动事件
//            this.handler = () => {
//                if (this.$route.path === '/orderList' || this.$route.path == '/waitOrderList') {
//                    this.box = document.querySelector('#vux_view_box_body')
//                    let scrollTop = this.box.scrollTop
//                    this.$store.commit('updatePagePosition', {top: scrollTop})
//                }
//            }
        },
        data() {
            return {
                show: true,
                drawerVisibility: false,
                showMode: 'overlay',
                showModeValue: 'overlay',
                showPlacement: 'right',
                showPlacementValue: 'right',
                starDate: '2017-07-13',
                endDate: '2017-07-13',
                keyword: '',
                selectState: ['请选择'],
                orderState: [['未处理', '处理中', '已处理']],
                show7: true,
                path: this.$route.path
            }
        },
        computed: {
            ...mapState({
                editList: 'editList',
                orders: 'orders',
                clickOrderIndex: 'clickOrderIndex',
                checkList: 'checkList'
            }),
            ...mapGetters({
                waitOrders: 'waitOrders',
                waitOrdersNum: 'waitOrdersNum',
                currentOrder: 'currentOrder'
            }),
            ...mapMutations({
                changeEditList: 'changeEditList',
                submitOwnCheckList: 'submitOwnCheckList'
            }),
            headTitle() {
                if (this.$route.params.id) {
                    return this.currentOrder.number
                } else {
                    return this.$route.name
                }
            },
            viewOrderUrl() {
                if (this.clickOrderIndex !== '') {
                    return '/orderview/' + this.currentOrder.id
                }
            },
            ManOrderUrl() {
                if (this.clickOrderIndex !== '') {
                    return '/orderManage/' + this.currentOrder.id
                }
            },
            leftOptions() {
                return {
                    showBack: this.$route.path !== '/'
                }
            },
            rightOptions() {
                return {
                    showMore: false
                }
            }
        },

        methods: {
            clickTab() {
                console.log('in')
            },
            onClickMore() {
                this.showMenu = true
            },
            onShowModeChange(val) {
                /** hide drawer before changing showMode **/
                this.drawerVisibility = false
                setTimeout(one => {
                    this.showModeValue = val
                }, 400)
            },
            onPlacementChange(val) {
                /** hide drawer before changing position **/
                this.drawerVisibility = false
                setTimeout(one => {
                    this.showPlacementValue = val
                }, 400)
            }
        }
    }
</script>

<style lang="less">
    @import '~vux/src/styles/reset.less';
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/tap.less';

    body {
        background-color: #fbf9fe;
    }

    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .weui-cell {
        font-size: 14px;
    }

    .mainWarpper {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .m-tablebox {
        font-size: .7rem;
        background-color: #fff;
        thead {
            white-space: nowrap;
            th {
                padding: 0.5rem;
                color: white;
                font-weight: 700;
                background-color: #2196F3;
                > div {
                    height: 1.2rem;
                    line-height: 1.2rem;
                }
            }
        }
        tbody {
            padding-top: 100px;
            background-color: white;
            tr {

                &:nth-child(even) {
                    background-color: rgba(239, 239, 244, 0.37);
                }
                &.active {
                    background-color: rgba(253, 181, 0, 0.27);
                    a {
                        color: #fff;
                    }
                }
                td {
                    padding: 0.5rem;
                    color: #666;
                    &:first-child {
                        color: blue;
                    }
                    > div {
                        white-space: nowrap;
                    }
                }
            }
        }
    }

    .demo-icon-22 {
        font-family: 'vux-demo';
        font-size: 22px;
        color: #888;
    }

    .vux-demo-tabbar {
        .weui-tabbar__item {
            .vux-x-icon {
                fill: #999;
            }
            &.weui-bar__item_on {
                .vux-x-icon {
                    fill: #09BB07;
                }
            }
        }
    }

    .weui-tabbar.vux-demo-tabbar {
        /** backdrop-filter: blur(10px);
        background-color: none;
        background: rgba(247, 247, 250, 0.5);**/
    }

    .vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
        color: #F70968;
    }

    .vux-demo-tabbar .weui-tabbar_item.weui-bar__item_on .vux-demo-tabbar-icon-home {
        color: rgb(53, 73, 94);
    }

    .demo-icon-22:before {
        content: attr(icon);
    }

    .vux-demo-tabbar-component {
        background-color: #F70968;
        color: #fff;
        border-radius: 7px;
        padding: 0 4px;
        line-height: 14px;
    }

    .weui-tabbar__icon + .weui-tabbar__label {
        margin-top: 0 !important;
    }

    .vux-demo-header-box {
        z-index: 100;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }

    @font-face {
        font-family: 'vux-demo';  /* project id 70323 */
        src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot');
        src: url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix') format('embedded-opentype'),
        url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff') format('woff'),
        url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf') format('truetype'),
        url('https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont') format('svg');
    }

    .demo-icon {
        font-family: 'vux-demo';
        font-size: 20px;
        color: #04BE02;
    }

    .demo-icon-big {
        font-size: 28px;
    }

    .demo-icon:before {
        content: attr(icon);
    }

    .router-view {
        width: 100%;
        top: 46px;
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
        will-change: transform;
        transition: all 500ms;
        height: 100%;
        top: 46px;
        position: absolute;
        backface-visibility: hidden;
        perspective: 1000;
    }

    .vux-pop-out-enter {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .vux-pop-out-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .vux-pop-in-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0);
    }

    .menu-title {
        color: #888;
    }
</style>
