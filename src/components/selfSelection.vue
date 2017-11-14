<template>
    <div>
        <div>
            <!---查看用户自选列表记录详情-->
            <popup v-model="selfDetail" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="自选物资详情">
                        <cell title="年份" style="font-size: .8rem">{{currentRowSelf.planYear}}</cell>
                        <cell title="物资名称" style="font-size: .8rem">{{currentRowSelf.matName}}</cell>
                        <cell title="单位" style="font-size: .8rem">{{currentRowSelf.measureUnit}}</cell>
                        <cell title="单价" style="font-size: .8rem">{{currentRowSelf.planPrice}}</cell>
                        <cell title="尺码类别" style="font-size: .8rem">{{currentRowSelf.customFlag}}</cell>
                        <cell v-if="currentRowSelf.customFlag=='国标码'" title="尺码" style="font-size: .8rem">
                            {{currentRowSelf.nationalSize}}
                        </cell>
                        <cell title="数量" style="font-size: .8rem">{{currentRowSelf.matNum}}</cell>
                        <cell title="使用自选金额" style="font-size: .8rem">{{currentRowSelf.totalMoney}}</cell>
                        <cell title="自费金额" style="font-size: .8rem">{{currentRowSelf.spareMoney}}</cell>
                        <cell v-if="currentRowSelf.spareMoney>0" title="缴费状态" style="font-size: .8rem">
                            <badge v-if="currentRowSelf.payStatus == '0'" style="background-color:#ff0000"
                                   text="未缴费"></badge>
                            <badge v-if="currentRowSelf.payStatus == '1'" style="background-color:#00CC00"
                                   text="已缴费"></badge>
                        </cell>
                    </group>
                    <div style="padding:20px 15px;">
                  <!--  <x-button v-if="currentRowSelf.payStatus=='0'" type="primary" @click.native="openModify">修改数量
                        </x-button> -->
                        <x-button v-if="currentRowSelf.payStatus=='0'" type="warn" @click.native="deleteSelf">删除
                        </x-button>
                        <x-button @click.native="closeSelfDetail">取消</x-button>
                    </div>
                </div>
            </popup>


            <popup v-model="modifyselfDetail" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="修改我的自选物资数量">
                        <cell title="物资名称" style="font-size: .8rem">{{currentRowSelf.matName}}</cell>
                        <cell title="单价" style="font-size: .8rem">{{currentRowSelf.planPrice}}</cell>
                        <cell title="单位" style="font-size: .8rem">{{currentRowSelf.measureUnit}}</cell>
                        <selector v-model="currentRowSelf.matNum" placeholder="请选择" title="数量" style="font-size: .8rem"
                                  :options="numOpts"></selector>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="saveEdit">保存</x-button>
                        <x-button @click.native="cancelEdit">取消</x-button>
                    </div>
                </div>
            </popup>


            <popup v-model="showMoneyDetail" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="余额详情">
                        <cell title="上年结余" style="font-size: .8rem">{{money.lastSurplusMoney}}</cell>
                        <cell title="当年新增" style="font-size: .8rem">{{money.curAddstdMoney}}</cell>
                        <cell title="当年总额" style="font-size: .8rem">{{money.curTotalMoney}}</cell>
                        <cell title="可用余额" style="font-size: .8rem">{{money.curSurplusMoney}}</cell>
                        <cell title="待缴金额" style="font-size: .8rem">{{money.needPayMoney}}</cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="showMoneyDetail=false">关闭</x-button>
                    </div>
                </div>
            </popup>


        </div>


        <div>
            <button-tab style="margin:10px 10px;" v-model="tabIndex">
                <button-tab-item @on-item-click="tabIndex=0">年度自选</button-tab-item>
                <button-tab-item @on-item-click="tabIndex=1">年度发放清单</button-tab-item>
            </button-tab>


            <div v-show="tabIndex === 1">

                <cell title="基础配发物资"
                      is-link
                      :border-intent="false"
                      :arrow-direction="showOthera ? 'up' : 'down'"
                      @click.native="showOthera = !showOthera"></cell>
                <x-table :cell-bordered="false" class="xtable"  v-show="showOthera">
                    <thead>
                    <tr>
                        <th width="15%">年份</th>
                        <th width="40%">物资名称</th>
                        <th width="15%">尺码</th>
                        <th width="15%">数量</th>
                        <th width="15%">单位</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(listb,index) in listForBase">
                        <td>{{listb.planYear}}</td>
                        <td>{{listb.matName}}</td>
                        <td>{{listb.nationalSize}}</td>
                        <td>{{listb.matNum}}</td>
                        <td>{{listb.measureUnit}}</td>
                    </tr>
                    </tbody>
                </x-table>

                <cell title="我的自选物资" is-link
                      :border-intent="false"
                      :arrow-direction="showOtherb ? 'up' : 'down'"
                      @click.native="showOtherb = !showOtherb"></cell>
                <x-table :cell-bordered="false" class="xtable" v-show="showOtherb">
                    <thead>
                    <tr>
                        <th width="15%">年份</th>
                        <th width="40%">物资名称</th>
                        <th width="15%">尺码</th>
                        <th width="15%">数量</th>
                        <th width="15%">自费金额</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(lista,index) in listForSelf" @click="clickRowForSelf(lista,index)"
                        :class="{active: index === currentTrIndexa}">
                        <td>{{lista.planYear}}</td>
                        <td>{{lista.matName}}</td>
                        <td>{{lista.nationalSize}}</td>
                        <td>{{lista.matNum}}</td>
                        <td>{{lista.spareMoney}}</td>
                    </tr>
                    </tbody>
                </x-table>



            </div>
            <div v-show="tabIndex === 0">
                <group>
                    <cell style="font-size: 1rem;color:blue"
                          :title="allowTitle"
                          :border-intent="false"></cell>
                </group>
                <div class="foods-wrapper">
                    <cell :title="allowDate" style="font-size: 0.8rem" v-show="showOther" inline-desc="(开放自选时间段)">
                        <div style="position: absolute; right: 8px;bottom:12px">
                            <div  v-if="allowFlag==2"  >
                                <x-icon type="alert-circled" size="24" style="fill:red"></x-icon>
                            </div>
                            <badge  v-if="allowFlag==3" style="background-color: red;font-size: .7rem"
                                   text="您当前标准变更不满1年，无法自选"></badge>
                        </div>
                    </cell>
                    <ul>
                        <!--循环遍历用户能购买的物资列表-->
                        <li class="food-item vux-1px-b" v-for="(list,index) in waitMat">
                            <div class="icon">
                                <img width="80" height="100" :src="list.MAT_IMG" alt="加载中... ...">
                            </div>
                            <div class="content">
                                <h4 class="name">{{list.MAT_NAME}}</h4>
                                <div class="extra">
                                    <span class="count">尺码类型：{{list.CUSTOM_FLAG}} </span>
                                </div>
                                <div class="extra">
                                   <span v-if="list.CUSTOM_FLAG == '国标码'"
                                         class="count">尺码：{{list.NATIONAL_SIZE}}
                                   </span>
                                </div>

                                <div class="price">
                                    <span class="now">¥{{list.PLAN_PRICE}}<em>/{{list.MEASURE_UNIT}}</em></span>
                                </div>
                                <!--<div class="cartcontrol-wrapper">-->
                                    <!--<x-number style="font-size: .8rem" v-model="list.USER_NUM" button-style="round"-->
                                              <!--:min="0" :max="list.MAX_NUM" @on-change="changeNum(list)"-->
                                              <!--@click.native="numclick(list)"></x-number>-->
                                <!--</div>-->
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
                    <div class="content">
                        <div class="content-left">
                            <div class="logo-wrapper">
                                <div class="logo highlight">
                                    <x-icon type="navicon" size="30" class="highlight" @click.native="openList"></x-icon>
                                </div>
                                <div class="num">{{totalNum}}</div>
                            </div>
                            <div class="price" @click.natice="openmoneyDetail">
                                余额：{{money.curSurplusMoney}}
                                <x-icon type="chevron-up" size="12" style="fill:#C8C8CD"></x-icon>
                            </div>
                        </div>
                        <div class="content-right">
                            <div class="pay enough" @click.natice="submitapply">提交</div>
                        </div>
                    </div>
                </div>
            </div>
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
                tabIndex: 0,
                showOther: true,
                showOthera:true,
                showOtherb:true,
                listForBase: [],//存放用户基础配发的数据
                listForSelf: [],//存放用户自选的物资列表
                currentTrIndexa: '',//自选列表当前点击选中的行
                currentRowSelf: '',//选中的我的自选列表记录
                selfDetail: false,//控制自选详情展示
                waitMat: [],//允许用户选择的物资列表
                selectMater: '',//当前选择的物资信息
                userWaitSize: '',//用户选择的尺码列表
                totalNum: 0,//选择的物品数量
                modifyselfDetail: false,
                showMoneyDetail: false,
                numOpts: [],//允许用户选择的修改物品尺码数据
                tempNum: 0,//临时保存的用户修改的购买数量备份数据
                money: '',
                backMoney: '',
                allowDate: '',//允许自选的时间段
                allowFlag: 1,//允许自己的状态位
                allowTitle: '',//自选提醒的标题
                backYue:'',//备份余额
                backWaitY:''//备份代缴费金额
            }
        },
        components: {
            XHeader,
            Card,
            Tab,
            TabItem,
            Cell,
            Checker, CheckerItem, Divider,
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
            this.loadProMsg();
            //加载用户能自选的物资列表
            this.loadUserMat();
            //加载用户基础配发数据
            this.loadBaseMaterList();
            //加载用户自选数据
            this.loadSelfMaterList();
            //加载相关的金额数据
            this.loadTotalMoney();
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
            openmoneyDetail(){
                this.showMoneyDetail=true;
            },
            loadProMsg() { //加载限定信息
                var obj = this;
                this.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../phone/selected/queryInit.json', {
                    params: {userCode: obj.userCode},
                    timeout: 30000
                }).then(function (data) {
                    obj.allowDate = data.data.allowDate;//允许自选的时间段
                    obj.allowFlag = data.data.allowFlag;//允许自己的状态位
                    obj.allowTitle = data.data.allowTitle;//自选提醒的标题
                    obj.allYear = data.data.allowYear;
                }).catch((err) => {
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '初始化个性自选数据失败'
                    })
                });
            },
            //加载用户能购买的物资列表
            loadUserMat() {
                var obj = this;
                this.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../phone/selected/newSelectMater.json',
                    {params: {userCode: obj.userCode}, timeout: 20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.waitMat = data.data;
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载允许您自选物资信息出错了'
                    })
                });
            },
            //加载用户基础配发的数据
            loadBaseMaterList() {
                var obj = this;
                this.$vux.loading.show({
                    text: 'Loading'
                });

                axios.get('../phone/selected/newLoadBaseList.json',
                    {params: {userCode: obj.userCode}, timeout: 20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.listForBase = data.data.result;
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载您的基础配发信息时出错了'
                    })
                });

            },
            //加载用户自选的数据
            loadSelfMaterList() {
                var obj = this;
                this.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../phone/selected/newLoadSelectList.json',
                    {params: {userCode: obj.userCode}, timeout: 20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.listForSelf = data.data.result;
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载您的自选信息时出错了'
                    })
                });
            },
            loadTotalMoney() {//加载相关的金额数据
                var obj = this;
                this.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../phone/selected/queryLimit.json',
                    {params: {userCode: obj.userCode}, timeout: 20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.money = data.data;
                    obj.backMoney = data.data;//备份金额数据，数量发生变化，直接用备份的数据来更新
                    obj.backYue=data.data.curSurplusMoney;//备份余额
                    obj.backWaitY=data.data.needPayMoney;//备份代缴费金额
                    console.log(data.data);
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载您的费用信息时出错了'
                    })
                });
            },

            openModify() {
                this.selfDetail = false;
                this.modifyselfDetail = true;
                this.tempNum = this.currentRowSelf.matNum;
                if (this.currentRowSelf.customFlag == '国标码' || this.currentRowSelf.customFlag == '无尺码') {
                    this.numOpts = [1, 2, 3, 4, 5];
                } else {
                    this.numOpts = [1, 2];
                }
            },
            cancelEdit() {//取消数量修改
                this.currentRowSelf.matNum = this.tempNum;
                this.modifyselfDetail = false

            },
            saveEdit() {
                var obj = this;
                if (this.tempNum == this.currentRowSelf.matNum) {
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '数量未发生改变，请修改后再保存！'
                    })
                } else {
                    this.$vux.confirm.show({
                        content: '您确定保存修改的数量吗？',
                        onConfirm() {
                            obj.$vux.loading.show({
                                text: 'Loading'
                            });
                            obj.modifyselfDetail = false;
                            axios.get('../phone/selected/modifyUserSelf.json',
                                {
                                    params: {
                                        id: obj.currentRowSelf.choiceMaterId,
                                        num: obj.currentRowSelf.matNum,
                                        userCode: obj.userCode
                                    }, timeout: 20000
                                }).then(function (data) {
                                obj.$vux.loading.hide();
                                if (data.data.flag == '1') {
                                    obj.$vux.toast.show({
                                        type: 'success',
                                        text: '保存成功'
                                    })
                                    //刷新自旋列表
                                    obj.loadSelfMaterList();
                                    //刷新金额
                                    obj.loadTotalMoney();

                                } else {//保存失败
                                    obj.modifyselfDetail = true;
                                    obj.$vux.toast.show({
                                        type: 'warn',
                                        text: data.data.msg
                                    })
                                }
                            }).catch((err) => {
                                obj.modifyselfDetail = true;
                                obj.$vux.loading.hide();
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: '保存失败，请重试'
                                })
                            });

                        }
                    })
                }

            },
            clickRowForSelf(item, index) {//单击行
                this.currentTrIndexa = index;
                this.currentRowSelf = item;
                this.selfDetail = true;
            },
            deleteSelf() {//删除用户的自选物资详情
                var obj = this;
                this.$vux.confirm.show({
                    content: '您确认删除吗？',
                    onConfirm() {
                        obj.$vux.loading.show({
                            text: 'Loading'
                        });
                        obj.selfDetail = false;
                        axios.get('../phone/selected/deleteUserSelf.json',
                            {
                                params: {id: obj.currentRowSelf.choiceMaterId, userCode: obj.userCode},
                                timeout: 20000
                            }).then(function (data) {
                            obj.$vux.loading.hide();
                            if (data.data.flag == '1') {//删除成功
                                obj.$vux.toast.show({
                                    type: 'success',
                                    text: '删除成功'
                                })
                                //刷新自旋列表
                                obj.loadSelfMaterList();
                                //刷新金额
                                obj.loadTotalMoney();
                            } else {//删除失败
                                obj.selfDetail = true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: data.data.msg
                                })
                            }
                        }).catch((err) => {
                            obj.selfDetail = true;
                            obj.$vux.loading.hide();
                            obj.$vux.toast.show({
                                type: 'warn',
                                text: '删除失败，请重试'
                            })
                        });
                    }
                })
            },
            closeSelfDetail() {//关闭购买详情界面
                this.selfDetail = false;
            },
            addCart(index){
                if(this.waitMat[index].CUSTOM_FLAG=='国标码'||this.waitMat[index].CUSTOM_FLAG=='无尺码'){
                    if(this.waitMat[index].USER_NUM === 5){
                        this.$vux.toast.show({
                            type: 'warn',
                            text:"数量已达最高限额"
                        })
                        return ;
                    }
                    if (this.waitMat[index].USER_NUM < 5) {
                        this.waitMat[index].USER_NUM++
                    }
                    this.changeNum();
                }else{
                    if(this.waitMat[index].USER_NUM === 2){
                        this.$vux.toast.show({
                            type: 'warn',
                            text:"数量已达最高限额"
                        })
                        return ;
                    }
                    if (this.waitMat[index].USER_NUM < 2) {
                        this.waitMat[index].USER_NUM++
                    }
                    this.changeNum();
                }


            },
            decreaseCart (index) {
                this.waitMat[index].USER_NUM--;
                this.changeNum()
            },
            changeNum() {//用户选择的数量发生改变
                //计算价格--待完善，需要根据用户的需求进行价格的改变计算
                var tempNum = 0;
                var tempPrice = 0.00;
                for (var i = 0; i < this.waitMat.length; i++) {
                    var temp = this.waitMat[i];
                    tempNum = parseInt(tempNum) + parseInt(temp.USER_NUM);//汇总购买了多少件
                    tempPrice = parseInt(tempPrice)+(parseFloat(temp.PLAN_PRICE)*100) * parseInt(temp.USER_NUM);
                   // tempPrice = parseInt(tempPrice) + (parseFloat(temp.PLAN_PRICE*100) * parseInt(temp.USER_NUM));//汇总购买总价
                }
                this.totalNum = tempNum;//更新总数
                //计算价格
                //var keyongyue=this.backMoney.curSurplusMoney;//可用余额
                //var jiaofeijin=this.backMoney.needPayMoney;//待缴费金额
                var keyongyue=this.backYue;//备份余额
                var jiaofeijin=this.backWaitY;//待缴金额备份
                var tempkeyongyue=(parseFloat(keyongyue)-parseFloat(tempPrice/100)).toFixed(2);
                if(tempkeyongyue>=0){//还有可用余额
                    this.money.curSurplusMoney=Number(tempkeyongyue.toString().match(/^[+-]?\d*\.?\d{0,3}$/));
                    this.money.needPayMoney=jiaofeijin;
                    //不处理待缴费金额
                }else{//需要缴费了
                    this.money.curSurplusMoney=0.00;
                    var ddd=(parseFloat(jiaofeijin)+parseFloat(tempPrice/100)-parseFloat(keyongyue)).toFixed(2);
                    this.money.needPayMoney=Number(ddd.toString().match(/^[+-]?\d*\.?\d{0,2}$/));
                }
            },
            numclick(oop) {
                var obj = this;
                setTimeout((function () {
                    if (oop.CUSTOM_FLAG == '国标码' || oop.CUSTOM_FLAG == '无尺码') {//最多只能选择5件
                        if (oop.USER_NUM > 5) {
                            oop.USER_NUM = 5;
                            obj.$vux.toast.show({
                                type: 'warn',
                                text: "数量已达最高限额"
                            })
                            return;
                        }
                    } else {
                        if (oop.USER_NUM > 2) {
                            oop.USER_NUM = 2;
                            obj.$vux.toast.show({
                                type: 'warn',
                                text: "数量已达最高限额"
                            })
                            return
                        }
                    }
                }), 200)
            },
            openList() {
                this.tabIndex = 1;
            },
            submitapply() {//提交购买申请
                if(this.allowFlag!=1){//不允许自选
                    if(this.allowFlag==2){
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '当前时段未开放自选！'
                        })
                    }else{
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '您当前标准变更不满1年，无法自选!'
                        })
                    }
                }else{
                    if (this.totalNum == 0) {
                        this.$vux.toast.show({
                            type: 'warn',
                            text: '请选择数量后提交！'
                        })
                    } else {//判断是否选择了尺码
                        var flag = true;//是否允许提交标示
                        var cmtid = '';
                        var cmtsize = '';
                        var cmtnum = '';
                        for (var i = 0; i < this.waitMat.length; i++) {
                            var temp = this.waitMat[i];
                            if (temp.USER_NUM != 0) {//需要判断是否为国标码
                                if (temp.CUSTOM_FLAG == '国标码') {
                                    cmtid = cmtid + temp.MAT_ID + ",";
                                    cmtsize = cmtsize + temp.NATIONAL_SIZE + ",";
                                    cmtnum = cmtnum + temp.USER_NUM + ",";
                                } else {
                                    cmtid = cmtid + temp.MAT_ID + ",";
                                    cmtsize = cmtsize + '#00#,';
                                    cmtnum = cmtnum + temp.USER_NUM + ",";
                                }
                            }
                        }
                        if (flag) {//允许提交
                            var obj = this;
                            //判断提醒用户交钱的相关情况
                            var msg="";
                            if(obj.money.needPayMoney>0){
                                msg="您需要补缴"+obj.money.needPayMoney+"元，确定提交吗？"
                            }else{
                                msg= "您确定提交吗？";
                            }

                            this.$vux.confirm.show({
                                content: msg,
                                onConfirm() {
                                    obj.$vux.loading.show({
                                        text: 'Loading'
                                    });
                                    var form = new FormData();
                                    form.append('userCode', obj.userCode);
                                    form.append('matIds', cmtid);
                                    form.append('sizes', cmtsize);
                                    form.append('nums', cmtnum);
                                    axios.post('../phone/selected/newCommitSelect.json',
                                        form, {timeout: 30000}
                                    ).then(function (data) {
                                        obj.$vux.loading.hide();
                                        if (data.data.flag == '1') {
                                            obj.$vux.toast.show({
                                                type: 'success',
                                                text: '提交成功！'
                                            });
                                            //重新加载物资列表
                                            obj.loadUserMat();
                                            obj.tabIndex = 1;
                                            //刷新自旋列表
                                            obj.loadSelfMaterList();
                                            //刷新金额
                                            obj.loadTotalMoney();
                                            //数量归位
                                            obj.totalNum = 0;
                                        } else {
                                            console.log(data.data);
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
                            });
                        }
                    }
                }
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
