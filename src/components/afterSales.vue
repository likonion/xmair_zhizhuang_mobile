<template>
    <div>
        <div v-transfer-dom>
            <loading v-model="$store.state.isLoading"  text="Loading"></loading>
        </div>
        <!--存放3个tab页面的搜索条件-->
        <div>
            <!--待收货列表查询框-->
            <popup v-model="waitSearch" position="right">
                <div>
                    <group title="请填写搜索条件">
                        <x-input title="物资名称" text-align="right" placeholder="请输入" v-model="qwmatname" is-type="text" style="font-size: .8rem"></x-input>
                        <x-input title="快递单号" text-align="right" placeholder="请输入" v-model="qwexpress" is-type="text" style="font-size: .8rem"></x-input>
                        <selector title="计划年份" direction="rtl" placeholder="请选择" v-model="qwyear" :options="issueList" style="font-size: .8rem"></selector>
                    </group>
                    <div style="padding:10px; background: none">
                        <flexbox>
                            <flexbox-item>
                                <x-button type="primary" @click.native="querywait()" style="font-size: .9rem">搜索</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="default" @click.native="clearwait()" style="font-size: .9rem;width:99%">重置
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>
            <!--已收货列表查询框-->
            <popup v-model="readySearch" position="right">
                <div>
                    <group title="请填写搜索条件">
                        <x-input title="物资名称" text-align="right"placeholder="请输入" v-model="qrmatname" is-type="text" style="font-size: .8rem"></x-input>
                        <x-input title="快递单号" text-align="right"placeholder="请输入" v-model="qrexpress" is-type="text" style="font-size: .8rem"></x-input>
                        <selector title="计划年份" direction="rtl" placeholder="请选择" v-model="qryear" :options="issueList" style="font-size: .8rem"></selector>
                        <calendar value-align="right" placeholder="开始时间" v-model="qrd1" title="收货确认时间" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                        <calendar value-align="right" placeholder="结束时间" v-model="qrd2" title="--- ---" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                    </group>
                    <div style="padding:10px; background: none">
                        <flexbox>
                            <flexbox-item>
                                <x-button type="primary" @click.native="queryready()" style="font-size: .9rem">搜索</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="default" @click.native="clearready()" style="font-size: .9rem;width:99%">重置
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>
            <!--售后申请查询输入框-->
            <popup v-model="afterSearch" position="right">
                <div>
                    <group title="请填写搜索条件">
                        <x-input title="物资名称" text-align="right" placeholder="请输入"  value-align="right" v-model="qamatname" is-type="text" style="font-size: .8rem"></x-input>
                        <x-input title="快递单号" text-align="right" placeholder="请输入"  value-align="right" v-model="qaexpress" is-type="text" style="font-size: .8rem"></x-input>
                        <selector title="处理状态"  placeholder="请选择" direction="rtl" v-model="qastatus" :options="['全部','待办','已办','暂搁']" style="font-size: .8rem"></selector>
                        <calendar v-model="qad1" value-align="right" placeholder="开始时间" title="提交售后时间" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                        <calendar v-model="qad2" value-align="right" placeholder="结束时间" title="--- ---" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                    </group>
                    <div style="padding:10px; background: none">
                        <flexbox>
                            <flexbox-item>
                                <x-button type="primary" @click.native="queryafter()" style="font-size: .9rem">搜索</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="default" @click.native="clearafter()" style="font-size: .9rem;width:99%">重置
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>

            <!--待收货列表的确认收货操作按钮-->
            <popup v-model="editwait" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="请确认签收">
                        <cell title="物资名称" style="font-size: .8rem">{{currentWait.MAT_NAME}}</cell>
                        <cell title="计划年份" style="font-size: .8rem">{{currentWait.SEND_YEAR}}</cell>
                        <cell title="数量" style="font-size: .8rem">{{currentWait.MAT_NUM}}</cell>
                        <cell title="尺码" style="font-size: .8rem">{{currentWait.EXP_SIZE}}</cell>
                        <cell title="快递单号" style="font-size: .8rem">{{currentWait.EXPRESS_CODE}}</cell>
                        <cell title="发货时间" style="font-size: .8rem">{{currentWait.SEND_DATE}}</cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="sureWait">确认签收</x-button>
                        <x-button @click.native="closeWait">取消</x-button>
                    </div>
                </div>
            </popup>
            <!--提交售后申请的界面-->
            <popup v-model="editready" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="售后申请">
                        <cell title="物资名称" style="font-size: .8rem">{{currentReady.MAT_NAME}}</cell>
                        <cell title="快递单号" style="font-size: .8rem">{{currentReady.EXPRESS_CODE}}</cell>
                        <selector v-model="cmtReason" placeholder="请选择" title="售后原因" style="font-size: .8rem"
                                  :options="[{key:'1',value:'默认收货但未收到快递'},{key:'2',value:'收到的物资与实际应配发的物资不符'},{key:'3',value:'物资尺码不符'},{key:'4',value:'存在质量问题'},{key:'5',value:'此次收到的量身定制类制服非常不合身'},{key:'6',value:'其他'}]"></selector>
                        <x-textarea title="其他原因" v-model="cmtMsg" style="font-size: .8rem" v-if="cmtReason==6"></x-textarea>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="cmtAfter">提交售后</x-button>
                        <x-button @click.native="closeAfter">取消</x-button>
                    </div>
                </div>
            </popup>
            <!--售后详情页面，并且允许用户在符合要求的情况下撤销售后申请-->
            <popup v-model="editafter" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="售后详情">
                        <cell title="处理状态" style="font-size: .8rem">{{currentAfter.statusName}}</cell>
                        <cell title="物资名称" style="font-size: .8rem">{{currentAfter.MAT_NAME}}</cell>
                        <cell title="快递单号" style="font-size: .8rem">{{currentAfter.EXPRESS_ID}}</cell>
                        <cell title="申请时间" style="font-size: .8rem">{{currentAfter.APP_DATE}}</cell>
                        <cell title="申请原因" style="font-size: .8rem">{{currentAfter.OTHER_REASON}}</cell>
                        <cell v-if="currentAfter.AFTERSALE_STATE>0" title="处理时间" style="font-size: .8rem">{{currentAfter.HANDLE_TIME}}</cell>
                        <cell v-if="currentAfter.AFTERSALE_STATE>0" title="处理意见" style="font-size: .8rem">{{currentAfter.HANDLE_OPINION}}</cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button v-if="currentAfter.AFTERSALE_STATE==0" type="primary" @click.native="chexiaoAfter">撤销售后</x-button>
                        <x-button @click.native="closeChexiao">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>
        <!--显示3个功能tab页面-->
        <div>
            <button-tab style="margin:10px 10px;">
                <button-tab-item selected  @on-item-click="tabIndex=0">待签收</button-tab-item>
                <button-tab-item  @on-item-click="tabIndex=1">已签收</button-tab-item>
                <button-tab-item  @on-item-click="tabIndex=2">售后申请</button-tab-item>
            </button-tab>
            <div class="page-content" style="padding-bottom: 20px;">
            	<!--待收货列表显示界面-->
                <div v-show="tabIndex === 0">
                    <group>
                        <cell title="" style="font-size: .7rem">
                            <x-button mini type="default" @click.native="openwaitsearch" style="padding:0 1.31em;margin-top:0">
                                <x-icon type="ios-search-strong" size="18" style="fill:#00000; vertical-align: middle; margin-top: -4px;"></x-icon>
                            </x-button>
                        </cell>
                    </group>
                    <panel :list="waitList" type="5" @on-click-item="clickWait"></panel>
                    <a v-if="waitTotalPage>waitPageNo" class="getMore" @click="morewait()">点击加载更多</a>
                </div>

                <!--已收货列表显示界面-->
                <div v-show="tabIndex === 1">
                    <group>
                        <cell title="" style="font-size: .7rem">
                            <x-button mini type="default" @click.native="openreadysearch()" style="padding:0 1.31em;margin-top:0">
                                <x-icon type="ios-search-strong" size="18" style="fill:#00000; vertical-align: middle; margin-top: -4px;"></x-icon>
                            </x-button>
                        </cell>
                    </group>
                    <panel :list="readyList" type="5" @on-click-item="clickReady"></panel>
                    <a v-if="readyTotalPage>readyPageNo" class="getMore" @click="moreready()">点击加载更多</a>
                </div>

                <!--售后申请显示界面-->
                <div v-show="tabIndex === 2">
                    <group>
                        <cell title="" style="font-size: .7rem">
                            <x-button mini type="default" @click.native="openaftersearch()" style="padding:0 1.31em;margin-top:0">
                                <x-icon type="ios-search-strong" size="18" style="fill:#00000; vertical-align: middle; margin-top: -4px;"></x-icon>
                            </x-button>
                        </cell>
                    </group>
                    <panel :list="afterList" type="5" @on-click-item="clickAfter"></panel>
                    <a v-if="afterTotalPage>afterPageNo" class="getMore" @click="moreafter()">点击加载更多</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import {
        Loading,
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
        Panel,
        Calendar,
        Flexbox,
        FlexboxItem,
        Confirm
    } from 'vux'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                tabIndex: 0,
                issueList: [],//时间列表
                waitSearch:false,//待收货查询条件显示界面控制变量
                readySearch:false,//已收货查询条件显示界面控制变量
                afterSearch:false,//售后查询条件显示控制界面
                qwmatname:'',//待收货列表查询-物资名称
                qwexpress:'',//待收货列表查询-快递单号
                qwyear:'',//待收货列表查询-归属年份
                qrmatname:'',//已收货列表查询-物资名称
                qrexpress:'',//已收货列表查询-快递单号
                qryear:'',//已收货列表查询-归属年份
                qrd1:'',//已收货列表查询-收货时间1
                qrd2:'',//已收货列表查询--收货时间2
                qamatname:'',//售后列表查询--物资名称
                qaexpress:'',//售后列表查询--快递单号
                qastatus:'',//售后列表查询-处理状态
                qad1:'',//售后列表查询--提交时间1
                qad2:'',//售后列表查询--提交时间2
                waitList:[],//待收货列表数据
                waitPageNo:1,//待收货当前页号
                waitTotalPage:'',//待收货总页数
                readyList:[],//已收货列表数据
                readyPageNo:1,//已收货当前页号
                readyTotalPage:'',//已收货总页数
                afterList:[],//售后列表数据
                afterPageNo:1,//售后当前页号
                afterTotalPage:'',//收货总页数
                editwait:false,//控制待收货编辑框显示
                editready:false,//控制已收货编辑框显示
                editafter:false,//控制售后信息编辑框显示
                currentWait:'',//当前选择的待收货记录行
                currentReady:'',//当前选择的已收货记录行
                currentAfter:'',//当前选择的售后列表行
                cmtReason:'',//售后原因类型
                cmtMsg:'',//售后说明
            }
        },
        components: {
            Loading,
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
            Panel,
            Calendar,
            Flexbox,
            FlexboxItem,
            Confirm
        },
        created() {
            var obj=this;
            axios.get('../phone/receive/createYear.json',{timeout:20000}).then(function (data) {
                obj.issueList = data.data;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '时间列表加载失败'
                })
            });
            //加载首页的待收货数据
            axios.get('../phone/changeAndAfter/queryWaitExpress.json',
                {params:{
                    userCode:obj.userCode,
                    page:1,
                    matName:obj.qwmatname,
                    express:obj.qwexpress,
                    year:obj.qwyear
                },timeout:20000}).then(function (data) {
                obj.waitList = data.data.result;
                obj.waitPageNo=data.data.currentPageNo;
                obj.waitTotalPage = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载待收货数据失败'
                })
            });
            //加载首页的已收货数据
            axios.get('../phone/changeAndAfter/queryReadyExpress.json',
                {params:{
                    userCode:obj.userCode,
                    page:1,
                    matName:obj.qrmatname,
                    express:obj.qrexpress,
                    d1:obj.qrd1,
                    d2:obj.qrd2,
                    year:obj.qryear
                },timeout:20000}).then(function (data) {
                obj.readyList = data.data.result;
                obj.readyPageNo=data.data.currentPageNo;
                obj.readyTotalPage = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载已收货数据失败'
                })
            });
            //加载首页的售后数据
            axios.get('../phone/changeAndAfter/queryAfter.json',
                {params:{
                    userCode:obj.userCode,
                    page:1,
                    matName:obj.qamatname,
                    express:obj.qaexpress,
                    d1:obj.qad1,
                    d2:obj.qad2,
                    status:obj.qastatus
                },timeout:20000}).then(function (data) {
                obj.afterList = data.data.result;
                obj.afterPageNo=data.data.currentPageNo;
                obj.afterTotalPage = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载申请售后数据失败'
                })
            });
        },
        mounted() {
            this.$nextTick(function () { })
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
                openwaitsearch(){//打开待收货搜索界面
                    this.waitSearch=true;
                    this.readySearch=false;
                    this.afterSearch=false;
                },
                openreadysearch(){//打开已收货搜索界面
                    this.waitSearch=false;
                    this.readySearch=true;
                    this.afterSearch=false;
                },
                openaftersearch(){//打开售后申请搜索界面
                    this.waitSearch=false;
                    this.readySearch=false;
                    this.afterSearch=true;
                },
                clickWait(item){//点击待收货的列表
                    this.editwait=true;
                    this.editready=false;
                    this.editafter=false;
                    this.currentWait=item;
                },
                clickReady(item){//点击已收货列表
                    if(item.CFGL=='1'){
                        this.editwait=false;
                        this.editready=true;
                        this.editafter=false;
                        this.currentReady=item;
                    }else{
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '当前物资确认收货超过7天不能申请售后了！'
                        });
                    }

                },
                clickAfter(item){//点击售后列表
                    this.editwait=false;
                    this.editready=false;
                    this.editafter=true;
                    this.currentAfter=item;
                },
                querywait(){//搜索待收货列表
                    var obj=this;
                    //加载首页的待收货数据
                    obj.waitPageNo=1;
                    obj.waitList =[];
                    obj.waitTotalPage =1;
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    obj.waitSearch=false;
                    axios.get('../phone/changeAndAfter/queryWaitExpress.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.waitPageNo,
                            matName:obj.qwmatname,
                            express:obj.qwexpress,
                            year:obj.qwyear
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.waitList = data.data.result;
                        obj.waitPageNo=data.data.currentPageNo;
                        obj.waitTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '查询失败'
                        })
                    });
                },
                clearwait(){//重置待收货搜索列表
                    var obj=this;
                    //加载首页的待收货数据
                    obj.waitPageNo=1;
                    obj.waitList =[];
                    obj.waitTotalPage =1;
                    obj.qwmatname='';
                    obj.qwexpress='';
                    obj.qwyear='';
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    obj.waitSearch=false;
                    axios.get('../phone/changeAndAfter/queryWaitExpress.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.waitPageNo,
                            matName:obj.qwmatname,
                            express:obj.qwexpress,
                            year:obj.qwyear
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.waitList = data.data.result;
                        obj.waitPageNo=data.data.currentPageNo;
                        obj.waitTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '重置失败'
                        })
                    });
                },
                morewait(){//待收货列表加载更多
                    var obj=this;
                    //加载首页的待收货数据
                    obj.waitPageNo=obj.waitPageNo+1;
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    axios.get('../phone/changeAndAfter/queryWaitExpress.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.waitPageNo,
                            matName:obj.qwmatname,
                            express:obj.qwexpress,
                            year:obj.qwyear
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.waitList = obj.waitList.concat(data.data.result);
                        obj.waitPageNo=data.data.currentPageNo;
                        obj.waitTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '加载更多失败'
                        })
                    });
                },
                queryready(){//搜索已收货列表
                    var obj=this;
                    //加载首页的待收货数据
                    obj.readyPageNo=1;
                    obj.readyTotalPage=1;
                    obj.readyList=[];
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    obj.readySearch=false;
                    axios.get('../phone/changeAndAfter/queryReadyExpress.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.readyPageNo,
                            matName:obj.qrmatname,
                            express:obj.qrexpress,
                            d1:obj.qrd1,
                            d2:obj.qrd2,
                            year:obj.qryear
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.readyList = obj.readyList.concat(data.data.result);
                        obj.readyPageNo=data.data.currentPageNo;
                        obj.readyTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '加载更多失败'
                        })
                    });
                },
                clearready(){//重置已收货搜索列表
                    var obj=this;
                    //加载首页的待收货数据
                    obj.readyPageNo=1;
                    obj.readyTotalPage=1;
                    obj.readyList=[];
                    obj.qrmatname='';
                    obj.qrexpress='';
                    obj.qrd1='';
                    obj.qrd2='';
                    obj.qryear='';
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    obj.readySearch=false;
                    axios.get('../phone/changeAndAfter/queryReadyExpress.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.readyPageNo,
                            matName:obj.qrmatname,
                            express:obj.qrexpress,
                            d1:obj.qrd1,
                            d2:obj.qrd2,
                            year:obj.qryear
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.readyList = obj.readyList.concat(data.data.result);
                        obj.readyPageNo=data.data.currentPageNo;
                        obj.readyTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '重置失败'
                        })
                    });
                },
                moreready(){//已收货列表加载更多
                    var obj=this;
                    //加载首页的待收货数据
                    obj.readyPageNo=obj.readyPageNo+1;
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    axios.get('../phone/changeAndAfter/queryReadyExpress.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.readyPageNo,
                            matName:obj.qrmatname,
                            express:obj.qrexpress,
                            d1:obj.qrd1,
                            d2:obj.qrd2,
                            year:obj.qryear
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.readyList = obj.readyList.concat(data.data.result);
                        obj.readyPageNo=data.data.currentPageNo;
                        obj.readyTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '加载更多失败'
                        })
                    });
                },
                queryafter(){//搜索售后服务列表
                    var obj=this;
                    obj.afterPageNo=1;
                    obj.afterList=[];
                    obj.afterTotalPage=1;
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    obj.afterSearch=false;
                    axios.get('../phone/changeAndAfter/queryAfter.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.afterPageNo,
                            matName:obj.qamatname,
                            express:obj.qaexpress,
                            d1:obj.qad1,
                            d2:obj.qad2,
                            status:obj.qastatus
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.afterList =data.data.result;
                        obj.afterPageNo=data.data.currentPageNo;
                        obj.afterTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '查询失败'
                        })
                    });
                },
                clearafter(){//重置售后服务列表
                    var obj=this;
                    obj.afterPageNo=1;
                    obj.afterList=[];
                    obj.afterTotalPage=1;
                    obj.qamatname='';
                    obj.qaexpress='';
                    obj.qad1='';
                    obj.qad2='';
                    obj.qastatus='';
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    obj.afterSearch=false;
                    axios.get('../phone/changeAndAfter/queryAfter.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.afterPageNo,
                            matName:obj.qamatname,
                            express:obj.qaexpress,
                            d1:obj.qad1,
                            d2:obj.qad2,
                            status:obj.qastatus
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.afterList =data.data.result;
                        obj.afterPageNo=data.data.currentPageNo;
                        obj.afterTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                        obj.$vux.loading.hide();
                        obj.$vux.toast.show({
                            type: 'warn',
                            text: '重置查询失败'
                        })
                    });
                },
                moreafter(){//售后服务列表加载更多
                    var obj=this;
                    obj.afterPageNo=obj.afterPageNo+1;
                    obj.$vux.loading.show({
                        text: 'Loading'
                    });
                    axios.get('../phone/changeAndAfter/queryAfter.json',
                        {params:{
                            userCode:obj.userCode,
                            page:obj.afterPageNo,
                            matName:obj.qamatname,
                            express:obj.qaexpress,
                            d1:obj.qad1,
                            d2:obj.qad2,
                            status:obj.qastatus
                        },timeout:20000}).then(function (data) {
                        obj.$vux.loading.hide();
                        obj.afterList =obj.afterList.concat(data.data.result);
                        obj.afterPageNo=data.data.currentPageNo;
                        obj.afterTotalPage = data.data.totalPageCount;//总结果页数
                    }).catch((err) => {
                            obj.$vux.loading.hide();
                            obj.$vux.toast.show({
                            type: 'warn',
                            text: '加载更多失败'
                        })
                    });
                },
                sureWait(){//确认收货操作
                    var obj=this;
                    this.$vux.confirm.show({
                        content:'您确认收货吗？',
                        onConfirm () {
                            obj.$vux.loading.show({
                                text: 'Loading'
                            });
                            obj.editwait=false;
                           //提交数据到后台
                            axios.get('../phone/changeAndAfter/sureExpress.json',
                                {params:{id:obj.currentWait.EXPRESS_ID},timeout:20000}).then(function (data) {
                                obj.$vux.loading.hide();
                                if(data.data.flag=='1'){
                                    obj.$vux.toast.show({
                                        type: 'success',
                                        text: '确认收货成功'
                                    });
                                    //刷新两个列表数据
                                    obj.querywait();
                                    obj.queryready();
                                }else{
                                    obj.editwait=true;
                                    obj.$vux.toast.show({
                                        type: 'warn',
                                        text: '确认收货失败，请重试！'
                                    });
                                }
                            }).catch((err) => {
                                console.log(err);
                                obj.$vux.loading.hide();
                                obj.editwait=true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: '确认收货失败，请重试'
                                })
                            });
                        }
                    })
                },
                closeWait(){//关闭确认收货操作
                    this.editwait=false;
                },
                cmtAfter(){//提交售后操作
                    if(this.cmtReason==''){
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '售后原因必须选择'
                        })
                    }else{
                        var obj=this;
                        var form = new FormData();
                        form.append('expressId',obj.currentReady.EXPRESS_ID);
                        form.append('type',obj.cmtReason);
                        form.append('msg',obj.cmtMsg);
                        obj.$vux.loading.show({
                            text: 'Loading'
                        });
                        obj.editready=false;
                        axios.post('../phone/changeAndAfter/commitAfter.json',form,{timeout:30000}).then(function (data) {
                            obj.$vux.loading.hide();
                            if(data.data.flag=='1'){
                                obj.$vux.toast.show({
                                    type: 'success',
                                    text: '提交成功！'
                                });
                                obj.cmtReason='';
                                obj.cmtMsg='';
                                obj.queryafter();
                            }else{
                                obj.editready = true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: '提交失败请重试！'
                                });
                            }
                        }).catch((err) => {
                            obj.editready = true;
                            obj.$vux.loading.hide();
                            obj.$vux.toast.show({
                                type: 'warn',
                                text: '提交失败请重试'
                            });
                        });
                    }
                },
                closeAfter(){//关闭取消售后操作
                    this.editready=false;

                },
                chexiaoAfter(){//撤销售后申请操作
                    var obj=this;
                    this.$vux.confirm.show({
                        content:'您确认撤销吗？',
                        onConfirm () {
                            obj.$vux.loading.show({
                                text: 'Loading'
                            });
                            obj.editafter=false;
                            //提交数据到后台
                            axios.get('../phone/changeAndAfter/reverAfter.json',
                                {params:{afterId:obj. currentAfter.AFTERSALE_ID},timeout:20000}).then(function (data) {
                                obj.$vux.loading.hide();
                                if(data.data.flag=='1'){
                                    obj.$vux.toast.show({
                                        type: 'success',
                                        text: '撤销成功'
                                    });
                                    //刷新两个列表数据
                                    obj.queryafter();
                                }else{
                                    obj.editafter=true;
                                    obj.$vux.toast.show({
                                        type: 'warn',
                                        text: '撤销失败，请重试！'
                                    });
                                }
                            }).catch((err) => {
                                console.log(err);
                                obj.$vux.loading.hide();
                                obj.editafter=true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: '撤销失败失败，请重试'
                                })
                            });
                        }
                    })
                },
                closeChexiao(){//关闭撤销售后操作
                    this.editafter=false;
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

    .tabTopBtn {
    margin-top: 8px;
        padding: 5px 10px 5px;
        background: #ececec;

    }

</style>
