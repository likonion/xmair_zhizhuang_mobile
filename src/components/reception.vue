<template>
    <div>
        <div v-transfer-dom>
            <loading v-model="$store.state.isLoading" text="Loading"></loading>
        </div>
        <div style="height: 46px;margin:10px 10px;">
            <button-tab v-model="tabIndex">
                <button-tab-item selected @on-item-click="tabIndex=0">基础配发标准</button-tab-item>
                <button-tab-item @on-item-click="tabIndex=1">发放计划</button-tab-item>
                <button-tab-item badge-background="#38C972" badge-color="#fff" @on-item-click="tabIndex=2">领用历史记录
                </button-tab-item>
            </button-tab>

        </div>

        <div class="page-content" style="padding-bottom: 20px; ">
            <!--领用标准-->
            <div v-show="tabIndex === 0">
                <group title="您当前的配发标准">
                    <cell title="">
                        <div slot="inline-desc" style="font-size:1rem;color:#0000FF;">{{userStand}}</div>
                    </cell>
                </group>
                <x-table :cell-bordered="false" class="xtable">
                    <thead>
                    <tr>
                        <th>物资名称 </th>
                        <th>单位</th>
                        <th>单价</th>
                        <th>首发数量</th>
                        <th>使用年限</th>
                        <th>以后数量</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="usm in userStandMaterial">
                        <td>{{usm.MAT_NAME}}</td>
                        <td>{{usm.MEASURE_UNIT}}</td>
                        <td>{{usm.PLAN_PRICE}}</td>
                        <td>{{usm.STD_FIRST_NUM}}</td>
                        <td>{{usm.STD_BASE_YEAR}}</td>
                        <td>{{usm.STD_BASE_NUM}}</td>
                    </tr>
                    </tbody>
                </x-table>
            </div>
            <!--发放计划-->
            <div v-show="tabIndex === 1">
                <group title="">
                    <selector placeholder="请选择年份" v-model="issueYearForPlan" title="年份" name="district"
                              :options="issueList" @on-change="onChangePlan" style="font-size: .8rem"></selector>
                </group>
                <x-table :cell-bordered="false" class="xtable">
                    <thead>
                    <tr>
                        <th>年份 </th>
                        <th>物资</th>
                        <th>尺码</th>
                        <th>数量</th>
                        <th>领用状态 </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="list in planList">
                        <td>{{list.PLAN_YEAR}}</td>
                        <td>{{list.MAT_NAME}}</td>
                        <th>{{list.NATIONAL_SIZE}}</th>
                        <td>{{list.MAT_NUM}}</td>
                        <td>
                            <badge v-if="list.PLAN_STATE == '0'" text="未分配"></badge>
                            <badge v-if="list.PLAN_STATE == '1'" style="background-color:#50a0e8" text="已分配"></badge>
                            <badge v-if="list.PLAN_STATE == '2'" style="background-color:#e8bd23" text="已通知"></badge>
                            <badge v-if="list.PLAN_STATE == '3'" style="background-color:#00ab00" text="已领取"></badge>
                        </td>
                    </tr>
                    </tbody>
                </x-table>
                <a v-if="planListTotalNo>planListPageNo" class="getMore" @click="getMorePlan()">点击加载更多</a>
            </div>
            <!--领用历史记录-->
            <div v-show="tabIndex === 2">
                <group title="">
                    <selector placeholder="请选择年份" v-model="issueYearForHistory" title="年份" name="district"
                              :options="issueListForRec" @on-change="onChangeHistory"
                              style="font-size: .8rem"></selector>
                </group>
                <x-table :cell-bordered="false" class="xtable">
                    <thead>
                    <tr>
                        <th>物资</th>
                        <th>尺码</th>
                        <th>数量</th>
                        <th>领用时间</th>
                        <th>领用人</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="list in receiveList">
                        <td>{{list.MAT_NAME}}</td>
                        <td>{{list.NATIONAL_SIZE}}</td>
                        <td>{{list.MAT_NUM}}</td>
                        <td>{{list.ADD_DATE}}</td>
                        <td>{{list.DRAWER}}</td>
                    </tr>
                    </tbody>
                </x-table>
                <a v-if="receiveListTotalNo>receiveListPageNo" class="getMore" @click="getMoreHistory()">点击加载更多</a>
            </div>

        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import Mock from 'mockjs'
    import mockData from '../mock/reception'
    import {
        Loading,
        XHeader,
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
        ButtonTab,
        ButtonTabItem
    } from 'vux'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                userStandMaterial: '',//用户对应的标准列表
                issueList: [],//计划查询的年份列表
                issueListForRec: [],//领用历史查询的时间
                issueYearForPlan: '',//发放计划的年份选择值
                issueYearForHistory: '',//领用历史的年份选择值
                planList: '',//发放计划的存储列表
                planListPageNo: 1,//发放计划的当前页码
                planListTotalNo: '',//发放计划总页码数
                receiveList: '',//领用历史记录的页面数据
                receiveListPageNo: 1,//领用历史记录的当前页码
                receiveListTotalNo: '',//领用历史记录的总页码数
                tabIndex: 0,
                userStand: ''//用户所属的标准
            }
        },
        components: {
            Loading,
            XHeader,
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
            ButtonTab,
            ButtonTabItem
        },
        directives: {
            TransferDom
        },
        created() {
            var obj = this;
            //读取计划的时间
            axios.get('../static/phone/receive/createYearForPlan.json', {timeout: 20000}).then(function (data) {
                obj.issueList = data.data.yearList;
                obj.issueYearForPlan = data.data.defa;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '时间列表加载失败'
                })
            });
            // mockjs拦截data.json请求，返回mock数据
            Mock.mock('../static/phone/receive/createYearForPlan.json', mockData.createYearForPlan)
            //读取领用历史记录的时间
            axios.get('../static/phone/receive/createYearForHistory.json', {timeout: 20000}).then(function (data) {
                obj.issueListForRec = data.data.yearList;
                obj.issueYearForHistory = data.data.defa;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '时间列表加载失败'
                })
            });
            Mock.mock('../static/phone/receive/createYearForHistory.json', mockData.createYearForHistory)

            //获取用户标准对应的物资发放规则

            axios.get('../static/phone/receive/receiveStand.json', {
                params: {
                    userCode: obj.userCode
                }, timeout: 30000
            }).then(function (data) {
                obj.userStandMaterial = data.data.data;
                obj.userStand = data.data.standName;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '领用标准加载失败'
                })
            });
            Mock.mock('../static/phone/receive/receiveStand.json?userCode=' + this.userCode, mockData.receiveStand)
            //获取用户的发放计划首页数据
            axios.get('../static/phone/receive/plan.json', {
                params: {
                    userCode: obj.userCode,
                    year: '',
                    page: 1
                },
                timeout: 30000
            }).then(function (data) {
                obj.planList = data.data.result;
                obj.planListTotalNo = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '发放计划加载失败'
                })
            });
            Mock.mock('../static/phone/receive/plan.json?userCode=' + this.userCode+ '&year=&page=1', mockData.plan)
            //获取用户的领用历史记录首页数据
            axios.get('../static/phone/receive/receiveHistory.json', {
                params: {userCode: obj.userCode},
                timeout: 35000
            }).then(function (data) {
                obj.receiveList = data.data.result;//首页结果集
                obj.receiveListTotalNo = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '领用历史加载失败'
                })
            });
            Mock.mock('../static/phone/receive/receiveHistory.json?userCode=' + this.userCode, mockData.receiveHistory)

        },
        mounted() {
            this.$nextTick(function () {
            })
        },
        computed: {
            ...mapState({
                userCode: 'userCode',//用户工号
                pageScrollTop: 'pageScrollTop'
            })
        },
        activated() {
        },
        methods: {
            onChangePlan() { //发放计划年份变更
                var obj = this;
                obj.planList = '';
                obj.planListPageNo = 1
                obj.planListTotalNo = '';
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../static/phone/receive/plan.json', {
                    params: {
                        userCode: obj.userCode,
                        year: obj.issueYearForPlan,
                        page: obj.planListPageNo
                    },
                    timeout: 30000
                }).then(function (data) {
                    obj.planList = data.data.result;
                    obj.planListPageNo = data.data.currentPageNo;
                    obj.planListTotalNo = data.data.totalPageCount;//总结果页数
                    obj.$vux.loading.hide();
                }).catch((err) => {
                    console.log(err);
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '发放计划查询失败'
                    })
                });
                Mock.mock('../static/phone/receive/plan.json?userCode=' + this.userCode + '&year=' + this.issueYearForPlan + '&page=' + this.planListPageNo, mockData.plan)
            },
            onChangeHistory() {//领用历史的年份发生变化
                var obj = this;
                obj.receiveList = "";
                obj.receiveListPageNo = 1;
                obj.receiveListTotalNo = '';
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../static/phone/receive/receiveHistory.json', {
                    params: {
                        userCode: obj.userCode,
                        year: obj.issueYearForHistory,
                        page: obj.receiveListPageNo
                    },
                    timeout: 30000
                }).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.receiveList = data.data.result;
                    obj.receiveListPageNo = data.data.currentPageNo;
                    obj.receiveListTotalNo = data.data.totalPageCount;//总结果页数
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载失败'
                    })
                });
                Mock.mock('../static/phone/receive/receiveHistory.json?userCode=' + this.userCode + '&year=' + this.issueYearForHistory + '&page=' + this.receiveListPageNo, mockData.receiveHistory)
            },
            getMorePlan() {//加载更多计划
                var obj = this;
                obj.planListPageNo = obj.planListPageNo + 1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../static/phone/receive/plan.json', {
                    params: {
                        userCode: obj.userCode,
                        year: obj.issueYearForPlan,
                        page: obj.planListPageNo
                    }, timeout: 30000
                }).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.planList = obj.planList.concat(data.data.result);
                    obj.planListPageNo = data.data.currentPageNo;
                    obj.planListTotalNo = data.data.totalPageCount;//总结果页数
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载失败'
                    })
                });
                Mock.mock('../static/phone/receive/plan.json?userCode=' + this.userCode + '&year=' + this.issueYearForPlan + '&page=' + this.planListPageNo, mockData.plan)
            },
            getMoreHistory() {//分页加载领用历史
                var obj = this;
                obj.receiveListPageNo = obj.receiveListPageNo + 1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                axios.get('../static/phone/receive/receiveHistory.json', {
                    params: {
                        userCode: obj.userCode,
                        year: obj.issueYearForHistory,
                        page: obj.receiveListPageNo
                    }, timeout: 30000
                }).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.receiveList = obj.receiveList.concat(data.data.result);
                    obj.receiveListPageNo = data.data.currentPageNo;
                    obj.receiveListTotalNo = data.data.totalPageCount;//总结果页数
                }).catch((err) => {
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载失败'
                    })
                });
                Mock.mock('../static/phone/receive/receiveHistory.json?userCode=' + this.userCode + '&year=' + this.issueYearForHistory + '&page=' + this.receiveListPageNo, mockData.receiveHistory)
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

</style>
