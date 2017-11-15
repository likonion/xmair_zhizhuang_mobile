<template>
    <div>
        <div>
            <popup v-model="queryCon" position="right">
                <div style="width:240px;">
                    <group title="请填写搜索条件">
                        <calendar v-model="myd1" placeholder="开始时间" title="接收时间"  style="font-size: .8rem; " class="vux-1px-t" ></calendar>
                        <calendar v-model="myd2" placeholder="结束时间" title="--- ---" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                    </group>
                    <div style="padding:10px; background: none;">
                        <flexbox>
                            <flexbox-item>
                                <x-button type="primary" @click.native="queryMy()" style="font-size: .9rem">搜索</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="default" @click.native="clearMy()" style="font-size: .9rem;width:99%">重置</x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>

            <!---用户查看自己提交的意见建议-->
            <popup v-model="msgDetail" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="消息通知详情">
                        <cell title="接收时间"  style="font-size: .8rem">{{curRow.date}}</cell>
                        <x-textarea title="消息内容" v-if="curRow" v-model="curRow.method" :height="260" style="font-size:.8rem"></x-textarea>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button  @click.native="closedetail">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>


        <div>
            <div>
                <group>
                    <cell title="快捷菜单" style="font-size: .7rem">
                        <x-button mini type="default" @click.native="openCon" style="padding:0 1.31em;margin-top:0">
                            <x-icon type="ios-search-strong" size="18" style="fill:#00000; vertical-align: middle; margin-top: -4px;"></x-icon>
                        </x-button>
                    </cell>
                </group>
                <x-table :cell-bordered="false" class="xtable">
                    <thead>
                    <tr>
                        <th>接收时间</th>
                        <th>消息内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list,index) in msgList"  @click="clickRow(list,index)" :class="{active: index === currentTrIndex}">
                        <td>{{list.date}}</td>
                        <td>{{list.simp}}</td>
                    </tr>
                    </tbody>
                </x-table>
                <a v-if="totalPage>currentPage" class="getMore" @click="moreMsg">点击加载更多</a>
            </div>


        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import Mock from 'mockjs'
    import mockData from '../mock/mymsg'
    import {
        XHeader,
        Card,
        Tab,
        TabItem,
        Cell,
        Group,
        XTextarea,
        CellBox,
        GroupTitle,
        Sticky,
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
        Flexbox,
        Calendar,
        FlexboxItem
    } from 'vux'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                queryCon:false,//搜索条件显示
                myd1:'',
                myd2:'',
                msgList:[],//消息列表
                currentPage:1,//当前页
                totalPage:1,//当前页
                curRow:'',//用户选择的当前结果行
                currentTrIndex:'',//当前选择的行号记录
                msgDetail:false
            }
        },
        components: {
            XHeader,
            Card,
            Tab,
            TabItem,
            Cell,
            Group,
            XTextarea,
            CellBox,
            GroupTitle,
            Sticky,
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
            Calendar,
            Flexbox,
            FlexboxItem
        },
        created() {

            this.queryInit();

        },
        mounted() {
            this.$nextTick(function () {})
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
        methods: {
            openCon(){
                this.queryCon=true;
            },
            queryMy(){//查询
                this.queryCon=false;
                this.queryInit();
            },
            clearMy(){//清空查询条件
                this.myd1='';
                this.myd2='';
                this.queryCon=false;
                this.queryInit();
            },
            closedetail(){//关闭
                this.msgDetail=false;
            },
            clickRow(item,index){//单击行
                this.currentTrIndex=index;
                this.curRow=item;
                this.msgDetail=true;
            },
            queryInit(){
                var obj=this;
                obj.currentPage=1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                var obj=this;
                axios.get('../phone/other/loadMyMsg.json',
                    {params:{
                        userCode:obj.userCode,
                        d1:obj.myd1,
                        d2:obj.myd2,
                        page:1
                    },timeout:20000}).then(function (data) {
                    obj.msgList = data.data.result;
                    obj.totalPage = data.data.totalPageCount;//总结果页数
                    obj.currentPage=data.data.currentPageNo;//当前页
                    obj.$vux.loading.hide();
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载消息通知列表失败'
                    })
                });
                Mock.mock('../phone/other/loadMyMsg.json?userCode='+ this.userCode + '&d1='+ this.myd1 + '&d2='+this.myd2+'&page=1', mockData.loadMyMsg)

            },
            moreMsg(){//加载更多数据
                var obj=this;
                obj.currentPage=obj.currentPage+1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../phone/other/loadMyMsg.json',
                    {params:{
                        userCode:obj.userCode,
                        d1:obj.myd1,
                        d2:obj.myd1,
                        page:obj.currentPage,
                    },timeout:20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.msgList = obj.msgList.concat(data.data.result);
                    obj.currentPage=data.data.currentPageNo;
                    obj.totalPage = data.data.totalPageCount;//总结果页数
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '查询失败'
                    })
                });
            }
        }
    }
</script>

<style lang="less">
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

</style>
