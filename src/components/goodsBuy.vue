<template>
    <div>
        <div>
            <!--提交购买申请计划-->
            <popup v-model="payAdd" :is-transparent="true" position="top" style="margin-top: 50%">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding:10px 0">
                    <group :title="selectMater.MAT_NAME">
                        <divider  style="font-size: .8rem">请选择尺码</divider>
                        <checker v-model="userWaitSize" default-item-class="demo5-item" selected-item-class="demo5-item-selected" style="text-align:center;padding: 0 10px;">
                            <checker-item v-for="lista in matSize":key="lista" :value="lista" >{{lista}}</checker-item>
                        </checker>
                    </group>
                    <div style="padding:20px 15px;">
                        <flexbox>
                            <flexbox-item><x-button  type="primary"  @click.native="oksize">选好了
                            </x-button></flexbox-item>
                            <flexbox-item><x-button   @click.native="closeSize">关闭</x-button></flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>
            <!---查看用户提交的购买详情-->
            <popup v-model="payDetail" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="购买申请详情">
                        <cell title="物资名称" style="font-size: .8rem">{{currentRow.MAT_NAME}}</cell>
                        <cell title="单位" style="font-size: .8rem">{{currentRow.MEASURE_UNIT}}</cell>
                        <cell title="单价" style="font-size: .8rem">{{currentRow.PLAN_PRICE}}</cell>
                        <cell title="尺码类别" style="font-size: .8rem">{{currentRow.CUSTOM_FLAG}}</cell>
                        <cell v-if="currentRow.CUSTOM_FLAG=='国标码'" title="尺码" style="font-size: .8rem">
                            {{currentRow.NATIONAL_SIZE}}
                        </cell>

                        <cell title="数量" style="font-size: .8rem">{{currentRow.NUM}}</cell>
                        <cell title="金额" style="font-size: .8rem">{{currentRow.TOTALPRICE}}</cell>
                        <cell title="申请时间" style="font-size: .8rem">{{currentRow.ADD_DATE}}</cell>
                        <cell title="申请状态" style="font-size: .8rem">{{currentRow.APP_STATUS_NAME}}</cell>
                        <cell title="付款时间" style="font-size: .8rem">{{currentRow.PAY_TIME}}</cell>
                        <cell title="领用状态" style="font-size: .8rem">{{currentRow.PLAN_STATE_NAME}}</cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button v-if="currentRow.APP_STATUS=='0'" type="primary" @click.native="cancelapply">删除
                        </x-button>
                        <x-button @click.native="closedetail">取消</x-button>
                    </div>
                </div>
            </popup>

        </div>


        <div>
            <button-tab style="margin:10px 10px;" v-model="tabIndex">
                <button-tab-item   @on-item-click="tabIndex=0">购买申请</button-tab-item>
                <button-tab-item   @on-item-click="tabIndex=1">我的购买记录</button-tab-item>
            </button-tab>


            <div v-show="tabIndex === 1">
                <group title="">
                    <selector placeholder="请选择年份" v-model="queryYear" title="年份"
                              :options="issueList" @on-change="changeYear" style="font-size: .8rem"></selector>
                </group>
                <x-table :cell-bordered="false" class="xtable">
                    <thead>
                    <tr>
                        <th>物资名称</th>
                        <th>尺码</th>
                        <th>申请数量</th>
                        <th>申请时间</th>
                        <th>申请状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list,index) in payList" @click="clickRow(list,index)"
                        :class="{active: index === currentTrIndex}">
                        <td>{{list.MAT_NAME}}</td>
                        <td>{{list.NATIONAL_SIZE}}</td>
                        <td>{{list.NUM}}</td>
                        <td>{{list.ADD_DATE_SIMP}}</td>
                        <td>
                            <badge v-if="list.APP_STATUS == '0'" style="background-color:#FFCC99" text="待审核"></badge>
                            <badge v-if="list.APP_STATUS == '1'" style="background-color:#50a0e8" text="已审核未付款"></badge>
                            <badge v-if="list.APP_STATUS == '2'" style="background-color:#FF0000" text="审核未通过"></badge>
                            <badge v-if="list.APP_STATUS == '3'" style="background-color:#FF00CC" text="已付款未领用"></badge>
                            <badge v-if="list.APP_STATUS == '4'" style="background-color:#00ab00" text="已领用"></badge>
                            <badge v-if="list.APP_STATUS == '5'" style="background-color:#FF0000" text="审核未通过"></badge>
                        </td>

                    </tr>
                    </tbody>
                </x-table>
                <a v-if="payTotalPage>payCurrentNo" class="getMore" @click="morePay">点击加载更多</a>
            </div>
            <div v-show="tabIndex === 0">
                <div class="foods-wrapper">
                    <group title="">
                    </group>
                    <ul>
                        <!--循环遍历用户能购买的物资列表-->
                        <li class="food-item vux-1px-b" v-for="(list,index) in waitMat">
                            <div class="icon">
                                <img width="80"  height="100"   :src="list.MAT_IMG" alt="加载中... ...">
                            </div>
                            <div class="content">
                                <h2 class="name">{{list.MAT_NAME}}
                                    <div class="tsba" v-if="list.NORMAL==2">通用</div>
                                </h2>
                                <div class="extra">
                                    <span class="count">尺码类型：{{list.CUSTOM_FLAG}}</span>
                                </div>
                                <div class="extra" v-if="list.CUSTOM_FLAG == '国标码'" >
                                    <span class="count">尺码：{{list.USER_SIZE}}</span>
                                    <span v-if="list.CUSTOM_FLAG == '国标码'"  @click="openApply(list)" class="setSize"><x-icon type="android-arrow-dropright" size="18" ></x-icon>选尺码</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{list.PLAN_PRICE}}<em>/{{list.MEASURE_UNIT}}</em></span>
                                </div>
                                <div class="cartcontrol">
                                    <x-icon type="minus-circled" v-show="list.USER_NUM>0" class="cart-add " @click.stop="decreaseCart(index)"></x-icon>
                                    <div class="cart-count" v-show="list.USER_NUM>0" v-model="list.USER_NUM">{{list.USER_NUM}}</div>
                                    <x-icon type="plus-circled" class="cart-add " @click.stop="addCart(index)"></x-icon>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="shopcart">
                    <div class="content" >
                        <div class="content-left">
                            <div class="logo-wrapper">
                                <div class="logo highlight" >
                                    <x-icon type="navicon" size="30" class="highlight" @click.native="openList"></x-icon>
                                </div>
                                <div class="num" >{{totalNum}}</div>
                            </div>
                            <div class="price" style="font-size: 1rem">合计￥：{{totalPrice}}</div>
                        </div>
                        <div class="content-right" >
                            <div class="pay enough"@click.natice="submitapply" >提交</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Mock from 'mockjs'
    import mockData from '../mock/goodsBuy'
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
                tabIndex: 0,
                issueList: [],//提供查询的年份信息
                queryYear: '',//查询的年份
                payAdd: false,//显示制装购买界面
                payDetail: false,//显示制装购买详情页面
                payList: [],//数据结果
                payCurrentNo: 1,//当前页面
                payTotalPage: '',//总页面
                currentTrIndex: '',//当前点击选中的行
                currentRow: '',//当前选中的行结果
                waitMat: [],//允许用户选择的物资列表
                matSize: [''],//国标码时允许用户选择的尺码
                selectMater:'',//当前选择的物资信息
                waitPayList:[],//存放用户待提交的物资列表数据
                userWaitSize:'',//用户选择的尺码列表
                totalNum:0,//选择的物品数量
                totalPrice:'0.00'//选择的物品总价
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
            var obj = this;
            //进入页面先查询第一页的用户购买记录
            axios.get('../phone/pay/loadUserMat.json',
                {
                    params: {
                        userCode: obj.userCode,
                        page: 1,
                        year: obj.queryYear
                    }, timeout: 20000
                }).then(function (data) {
                obj.payList = data.data.result;
                obj.payTotalPage = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载我的购买记录出错'
                })
            });
            Mock.mock('../phone/pay/loadUserMat.json?userCode=' + this.userCode + '&page=1'+ '&year=' + this.queryYear , mockData.loadUserMat)
            //加载查询时的时间列表框
            axios.get('../phone/receive/createYear.json', {timeout: 20000}).then(function (data) {
                obj.issueList = data.data.yearList;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '时间列表加载失败'
                })
            });
            Mock.mock('../phone/receive/createYear.json' , mockData.createYear)
            this.loadUserMat();
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
        methods: {

            cancelapply() {//提交撤销申请
                var obj = this;
                this.$vux.confirm.show({
                    content: '您确认删除吗？',
                    onConfirm() {
                        obj.$vux.loading.show({
                            text: 'Loading'
                        });
                        obj.payDetail = false;
                        axios.get('../phone/pay/deletePay.json',
                            {params: {payId: obj.currentRow.APPROVE_ID}, timeout: 20000}).then(function (data) {
                            obj.$vux.loading.hide();
                            if (data.data.flag == '1') {//删除成功
                                obj.$vux.toast.show({
                                    type: 'success',
                                    text: '删除成功'
                                })
                                obj.changeYear();
                            } else {//删除失败
                                obj.payDetail = true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: data.data.msg
                                })
                            }
                        }).catch((err) => {
                            obj.payDetail = true;
                            obj.$vux.loading.hide();
                            obj.$vux.toast.show({
                                type: 'warn',
                                text: '删除失败，请重试'
                            })
                        });
                    }
                })
            },
            closedetail() {//关闭购买详情界面
                this.payPrice = this.payDetail = false;
            },
            loadUserMat(){//加载用户能购买的物资列表
                var obj=this;
                this.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../phone/pay/newLoadAllowUserMater.json',
                    {params: {userCode: obj.userCode}, timeout: 20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.waitMat = data.data;
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载允许购买物资列表出错了'
                    })
                });
                Mock.mock('../phone/pay/newLoadAllowUserMater.json?userCode=' + obj.userCode , mockData.newLoadAllowUserMater)
            },
            closeSize(){//关闭尺码选择界面
                this.payAdd=false;
            },
            oksize(){//尺码选好了
                if(this.userWaitSize==''){
                    this.$vux.toast.show({
                        type: 'warn',
                        text: '请选择需要的尺码'
                    });
                }else{
                    this.selectMater.USER_SIZE=this.userWaitSize;
                    this.payAdd = false;
                }
            },
            openApply(mater) {//打开购买申请界面
                this.payAdd = true;
                this.selectMater=mater;
                this.matSize=mater.MAT_SIZE;
                this.userWaitSize=mater.USER_SIZE;
            },
            addCart(index){
                if(this.waitMat[index].USER_NUM ===2){
                    this.$vux.toast.show({
                        type: 'warn',
                        text:"数量已达最高限额"
                    })
                    return ;
                }
                if (this.waitMat[index].USER_NUM < 2) {
                    this.waitMat[index].USER_NUM++
                }
                this.count()
            },
            count() {
                //计算价格
                var tempNum=0;
                var tempPrice=0.00;
                for(var i=0;i<this.waitMat.length;i++){
                    var temp=this.waitMat[i];
                    tempNum=parseInt(tempNum)+parseInt(temp.USER_NUM);
                    tempPrice=parseFloat(tempPrice)+(parseFloat(temp.PLAN_PRICE)*parseInt(temp.USER_NUM));
                }
                this.totalNum=tempNum;
                this.totalPrice=tempPrice;
            },
            decreaseCart (index) {
                this.waitMat[index].USER_NUM--
                this.count()
            },
            openList(){
                this.tabIndex=1;
            },
            submitapply() {//提交购买申请

                this.$vux.toast.show({
                    type: 'warn',
                    text: '暂未开放购买，敬请期待！'
                })
                //等用户同意放开了，这边去掉这段注释就行了
                    /*if(this.totalNum==0){
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '请选择数量后提交！'
                        })
                    }else{//判断是否选择了尺码
                        var flag=true;//是否允许提交标示
                        var cmtid='';
                        var cmtsize='';
                        var cmtnum='';
                        for(var i=0;i<this.waitMat.length;i++){
                            var temp=this.waitMat[i];
                            if(temp.USER_NUM!=0){//需要判断是否为国标码
                                    if(temp.CUSTOM_FLAG=='国标码'){
                                        if(temp.USER_SIZE==''){
                                            this.$vux.toast.show({
                                                type: 'warn',
                                                text: '国标码的物资必须选择尺码才能提交'
                                            });
                                            flag=false;
                                            break;
                                        }else{
                                            cmtid=cmtid+temp.MAT_ID+",";
                                            cmtsize=cmtsize+temp.USER_SIZE+",";
                                            cmtnum=cmtnum+temp.USER_NUM+",";
                                        }
                                    }else{
                                        cmtid=cmtid+temp.MAT_ID+",";
                                        cmtsize=cmtsize+'#00#,';
                                        cmtnum=cmtnum+temp.USER_NUM+",";
                                    }
                            }
                        }
                        if(flag){//允许提交
                            var obj=this;
                            this.$vux.loading.show({
                                text: 'Loading'
                            });
                            var form = new FormData();
                            form.append('userCode',obj.userCode);
                            form.append('matIds',cmtid);
                            form.append('sizes',cmtsize);
                            form.append('nums',cmtnum);
                            axios.post('../phone/pay/newPayMater.json',
                                form,{timeout:30000}
                            ).then(function (data) {
                                obj.$vux.loading.hide();
                                if(data.data.flag=='1'){
                                    obj.$vux.toast.show({
                                        type: 'success',
                                        text: '提交成功！'
                                    });
                                   //重新加载物资列表
                                    obj.loadUserMat();
                                    obj.changeYear();//重新查询列表数据
                                    obj.totalNum=0;
                                    obj.totalPrice='0.00';
                                    obj.tabIndex=1;
                                }else{
                                    obj.$vux.toast.show({
                                        type: 'warn',
                                        text: data.data.msg
                                    });
                                }
                            }).catch((err) => {
                                obj.$vux.loading.hide();
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: '提交失败请重试'
                                });
                            });
                        }
                    }*/
            },
            clickRow(item, index) {//单击行
                this.currentTrIndex = index;
                this.currentRow = item;
                this.payDetail = true;
            },
            changeYear() {//年份变化时查询
                var obj = this;
                obj.payTotalPage = 1;
                obj.payList = [];
                obj.payCurrentNo = 1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                //进入页面先查询第一页的用户购买记录
                axios.get('../phone/pay/loadUserMat.json',
                    {
                        params: {
                            userCode: obj.userCode,
                            page: 1,
                            year: obj.queryYear
                        }, timeout: 20000
                    }).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.payList = data.data.result;
                    obj.payTotalPage = data.data.totalPageCount;//总结果页数
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '查询失败'
                    })
                });
                Mock.mock('../phone/pay/loadUserMat.json?userCode=' + this.userCode + '&page=1'+ '&year=' + this.queryYear , mockData.loadUserMat)
            },
            morePay() {//加载更多数据
                var obj = this;
                obj.payCurrentNo = obj.payCurrentNo + 1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                //进入页面先查询第一页的用户购买记录
                axios.get('../phone/pay/loadUserMat.json',
                    {
                        params: {
                            userCode: obj.userCode,
                            page: obj.payCurrentNo,
                            year: obj.queryYear
                        }, timeout: 20000
                    }).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.payList = obj.payList.concat(data.data.result);
                    obj.payCurrentNo = data.data.currentPageNo;
                    obj.payTotalPage = data.data.totalPageCount;//总结果页数
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '查询失败'
                    })
                });
                Mock.mock('../phone/pay/loadUserMat.json?userCode=' + this.userCode + '&page='+ this.payCurrentNo + '&year=' + this.queryYear , mockData.loadUserMat)
            }
        }
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
