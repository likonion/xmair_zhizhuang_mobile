<template>
    <div>
        <div v-transfer-dom>
            <loading v-model="$store.state.isLoading"  text="Loading"></loading>
        </div>
        <swiper :auto="true" :loop="true" >
            <swiper-item class="swiper-demo-img" v-for="(item, index) in demo01_list" :key="index" @click.native="swiperClick(index)">
                <a href="javascript:;">
                    <div class="vux-img"  :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                    <p class="vux-swiper-desc">{{item.title}}</p>
                </a>
            </swiper-item>
        </swiper>
        <grid class="funbox" :cols="4">
            <grid-item link="/reception">
                <span slot="label">
                  <div><x-icon type="ios-search-strong" size="35" style="fill:#3ac13a"></x-icon></div>
                  	领用查询
                </span>
            </grid-item>
            <grid-item link="/selfSelection">
                <span slot="label">
                  <div><x-icon type="tshirt" size="35" style="fill:#f76260"></x-icon></div>
                  	年度自选
                </span>
            </grid-item>
           <!--<grid-item link="/goodsBuy">
                <span slot="label">
                  <div><x-icon type="ios-cart" size="35" style="fill:#10aeff"></x-icon></div>
                 	 购买申请
                </span>
            </grid-item>-->
            <grid-item link="/goodsBuy">
                <span slot="label">
                  <div><x-icon type="ios-cart" size="35" style="fill:#10aeff"></x-icon></div>
                 	 购买申请
                </span>
            </grid-item>
            <grid-item link="/size">
                  <span slot="label">
                  <div><x-icon type="ios-gear" size="35" style="fill:#da130d"></x-icon></div>
                 	 信息维护
                </span>
            </grid-item>
            <grid-item link="/exchangeGoods">
                  <span slot="label">
                  <div><x-icon type="loop" size="35" style="fill:#d90000"></x-icon></div>
                  	尺码互换
                </span>
            </grid-item>
            <!--<grid-item link="/afterSales">
                  <span slot="label">
                  <div><x-icon type="flag" size="35" style="fill:#ffbe00"></x-icon></div>
                 	 快递签收
                </span>
            </grid-item>-->
           <grid-item link="/sorry">
                  <span slot="label">
                  <div><x-icon type="flag" size="35" style="fill:#ffbe00"></x-icon></div>
                 	 快递签收
                </span>
            </grid-item>
            <grid-item link="/mymsg">
                  <span slot="label">
                  <div><x-icon type="email-unread" size="35" style="fill:#00aa01"></x-icon></div>
                 	 站内消息
                 </span>
            </grid-item>
            <grid-item link="/idea">
                  <span slot="label">
                  <div><x-icon type="ios-compose" size="35" style="fill:#13b5de"></x-icon></div>
                 	 意见反馈
                </span>
            </grid-item>
        </grid>


    </div>
</template>

<script>
    import {TransferDom, Loading, Card, Swiper, GroupTitle, SwiperItem, Panel, Grid, GridItem, Icon} from 'vux'
    import {mapState, mapGetters} from 'vuex'
    import img1 from '../assets/img/7.jpg'
    import img2 from '../assets/img/8.jpg'
    import img3 from '../assets/img/9.jpg'

    const baseList = [{
        img: img3,
        title: '欢迎进入厦航制装微生活！'
    }, {
        img: img2,
        title: '欢迎进入厦航制装微生活！'
    }, {
        img: img1,
        title: '点击图片查看手工自助量体标准>>'
    }]
    export default {
        components: {
            TransferDom, Loading, Card, Swiper, GroupTitle, SwiperItem, Panel, Grid, GridItem, Icon
        },
        created() {
            this.$store.commit('updateUserCode', 20211);
        },
        data() {
            return {
                demo01_list: baseList,
                demo01_index: 0
            }
        },
        directives: {
            TransferDom
        },
        computed: {
            ...mapState({}),
            ...mapGetters({})
        },
        methods: {
            swiperClick(index) {
               if (index === 2) {
                   window.location.href="../../phone/measure.png"
               }
            }
        }
    }
</script>

<style scoped lang="less">
    @import '~vux/src/styles/1px.less';

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

    .text-scroll {
        border: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }

    .text-scroll p {
        font-size: 12px;
        text-align: center;
        line-height: 30px;
    }

    .weui-grid {
        background-color: white;

    }
    .weui-grid:before {
        border: none;
    }
    .weui-grid:after {
        border: none;
    }


</style>
