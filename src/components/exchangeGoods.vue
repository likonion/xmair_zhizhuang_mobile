<template>
    <div>
        <div v-transfer-dom>
            <loading v-model="$store.state.isLoading"  text="Loading"></loading>
        </div>
        <div>
        	<!--我的换货申请搜索框-->
            <popup v-model="ssmy" position="right">
                <div>
                    <group title="请填写搜索条件">
                        <x-input title="物资名称" placeholder="请输入" text-align="right" v-model="myMatName" is-type="text" style="font-size: .8rem"></x-input>
                        <calendar v-model="myd1" placeholder="开始时间" title="发布时间" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                        <calendar v-model="myd2" placeholder="结束时间" title="--- ---" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                    </group>
                    <div style="padding:10px; background: none">
                        <flexbox>
                            <flexbox-item>
                                <x-button type="primary" @click.native="queryMy()" style="font-size: .9rem">搜索</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="default" @click.native="clearMy()" style="font-size: .9rem;width:99%">重置
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>
            <!--全部换货信息的查询栏目-->
            <popup v-model="ssall" position="right">
                <div>
                    <group title="请填写搜索条件">
                        <x-input title="物资名称" placeholder="请输入" v-model="allMatName" is-type="text" text-align="right" style="font-size: .8rem"></x-input>
                        <x-input title="目标尺码" placeholder="请输入" v-model="allSize" is-type="text" text-align="right" style="font-size: .8rem"></x-input>
                        <x-input title="发布人工号" placeholder="请输入" v-model="allCode" is-type="text" text-align="right" style="font-size: .8rem"></x-input>
                        <selector title="所在地区"   placeholder="请选择" v-model="allAddress" direction="rtl"  :options="addressList" style="font-size: .8rem"></selector>
                        <calendar v-model="alld1" placeholder="开始时间" title="发布时间" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                        <calendar v-model="alld2" placeholder="结束时间" title="--- ---" style="font-size: .8rem; " class="vux-1px-t"></calendar>
                    </group>
                    <div style="padding:10px; background: none">
                        <flexbox>
                            <flexbox-item>
                                <x-button type="primary" @click.native="queryAll()" style="font-size: .9rem">搜索</x-button>
                            </flexbox-item>
                            <flexbox-item>
                                <x-button type="default" @click.native="clearAll()" style="font-size: .9rem;width:99%">重置
                                </x-button>
                            </flexbox-item>
                        </flexbox>
                    </div>
                </div>
            </popup>
            <!--新增换货申请界面-->
            <popup v-model="applyChange" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="添加对换详情">
                        <selector v-model="addMat"  direction="rtl" placeholder="请选择" title="物资名称" style="font-size: .8rem"
                                  :options="userAllMat" @on-change="onChangeMat"></selector>
                        <selector v-model="addOldSize"  direction="rtl" placeholder="请选择" title="原始尺码" style="font-size: .8rem"
                                  :options="userWaitSize"></selector>
                        <selector v-model="addNewSize"  direction="rtl" placeholder="请选择" title="对换尺码" style="font-size: .8rem"
                                  :options="userWaitSize"></selector>
                        <selector v-model="addNum"   direction="rtl" placeholder="请选择" title="数量" style="font-size: .8rem"
                                  :options="[1,2,3,4,5,6,7,8,9,10]"></selector>
                        <selector v-model="addAddress"  direction="rtl" title="所在地区" placeholder="请选择" :options="addressList" style="font-size: .8rem"></selector>
						<x-input  v-model="addPhone" text-align="right"  title="联系电话" placeholder="请输入" is-type="text" style="font-size: .8rem"></x-input>

                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="submitApplyChange">发布</x-button>
                        <x-button @click.native="closeApplyChange">取消</x-button>
                    </div>
                </div>
            </popup>
            <!--取消换货申请界面-->
            <popup v-model="cancelApply" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group :title="currentMy.MAT_NAME">
                        <cell title="申请时间" style="font-size: .8rem">{{currentMy.APP_CHANGE_DATE}}</cell>
                    </group>

                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="submitCancelApply">撤销申请</x-button>
                        <x-button @click.native="closeCancelApply">关闭</x-button>
                    </div>
                </div>
            </popup>
            <popup v-model="viewInfo" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group :title="cuurentAll.MAT_NAME">
                        <cell title="发布人" style="font-size: .8rem">{{cuurentAll.STAFF_NAME}}</cell>
                        <cell title="工号" style="font-size: .8rem">{{cuurentAll.STAFF_CODE}}</cell>
                        <cell title="部门／处室" style="font-size: .8rem">{{cuurentAll.work}}</cell>
                        <cell title="联系电话" style="font-size: .8rem">{{cuurentAll.PHONE}}</cell>
                        <cell title="所在地区" style="font-size: .8rem">{{cuurentAll.ADDRESS}}</cell>
                        <cell title="发布时间" style="font-size: .8rem">{{cuurentAll.APP_CHANGE_DATE}}</cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button @click.native="closeViewInfo">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>
        <div>
            <button-tab  style="margin:10px 10px;">
                <button-tab-item selected @on-item-click="tabIndex=0">在线互换平台</button-tab-item>
                <button-tab-item  @on-item-click="tabIndex=1">我发布的信息</button-tab-item>
            </button-tab>
            <!--我的换货记录-->
            <div class="page-content" style="padding-bottom: 20px; ">
                <div v-show="tabIndex === 1">
                    <group>
                        <cell title="快捷菜单" style="font-size: .7rem">
                            <x-button mini type="primary" @click.native="applyChangePopup">我要对换</x-button>
                            <x-button mini type="default" @click.native="showMySeach" style="padding:0 1.31em;margin-top:0">
                                <x-icon type="ios-search-strong" size="18" style="fill:#00000; vertical-align: middle; margin-top: -4px;"></x-icon>
                            </x-button>
                        </cell>
                    </group>
                    <div class="foods-wrapper">
                        <ul>
                            <!--循环遍历用户能购买的物资列表-->
                            <li class="food-item vux-1px-b" v-for="(list,index) in myChangeList" @click="cancelApplyPopup(list)">
                                <div class="icon">
                                    <img width="80"  height="100"   :src="list.MAT_IMG" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{list.MAT_NAME}}</h2>
                                    <div class="extra">
                                        <span class="count">{{list.HA}}</span>
                                        &nbsp;&nbsp;
                                        <span class="count">{{list.HB}}</span>
                                    </div>
                                    <div class="tsba" v-if="list.CHANGE_FLAG=='已撤销'" style="background-color:red;">已撤销</div>
                                    <div class="extra">
                                        <span class="count">{{list.ADDRESS}}</span>
                                    </div>
                                    <div class="price" style="font-size:0.8em;color: #93999f; ">
                                        {{list.APP_CHANGE_DATE}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <a v-if="myChangeTotalPage>myChangePageNo" class="getMore" @click="getMoreMy()">点击加载更多</a>
                </div>
                
                <!--换货信息发布栏的数据-->
                <div v-show="tabIndex === 0">
                    <group>
                        <cell  title="快捷菜单" style="font-size: .7rem">
                            <x-button mini type="default" @click.native="showAllSearch" style="padding:0 1.31em;margin-top:0">
                                <x-icon type="ios-search-strong" size="18" style="fill:#00000; vertical-align: middle; margin-top: -4px;"></x-icon>
                            </x-button>
                        </cell>
                    </group>
                    <div class="foods-wrapper">
                        <ul>
                            <!--循环遍历用户能购买的物资列表-->
                            <li class="food-item vux-1px-b" v-for="(list,index) in allChangeList" @click="viewInfoPopup(list)">
                                <div class="icon">
                                    <img width="80"  height="100"   :src="list.MAT_IMG" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{list.MAT_NAME}}</h2>
                                    <div class="extra">
                                        <span class="count">{{list.HA}}</span>
                                        &nbsp;&nbsp;
                                        <span class="count">{{list.HB}}</span>
                                    </div>
                                    <div class="extra">
                                        <span class="count">{{list.ADDRESS}}</span>
                                    </div>
                                    <div class="price" style="font-size:0.8em;color: #93999f; ">
                                        {{list.APP_CHANGE_DATE_SIMP}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <a v-if="allChangeTotalPage>allChangePageNo" class="getMore" @click="getMoreAll()">点击加载更多</a>
                </div>

            </div>

        </div>

    </div>
</template>
<script>
	import axios from 'axios'
    import Mock from 'mockjs'
    import mockData from '../mock/exchangeGoods'
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
        FlexboxItem
    } from 'vux'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
             	tabIndex: 0,
            	ssmy:false,//显示我的换货申请搜索的搜索框标志位
            	ssall:false,//显示全部的换货申请搜索的搜索框标志位
            	applyStatusList:['全部','已发布','已撤销'],
            	addressList:[],//查询全部时的地址下拉列表
            	myMatName:'',//我的搜索物资名称
            	myStatus:'',//我的搜索状态
            	myd1:'',//我的搜索时间
            	myd2:'',//我的搜索时间
                myChangeList:[],//我的换货记录列表
                myChangePageNo:1,//我的换货记录当前显示页面
                myChangeTotalPage:'',//我的换货记录总记录页
                allMatName:'',//总的搜索物资名称
                allCode:'',//总的搜索用户工号
                alld1:'',//总的搜索时间
                alld2:'',//总的搜索时间
                allSize:'',//总的搜索尺码
                allAddress:'',//搜索全部时的所在地区
                allChangeList:[],//总的换货记录的申请列表
                totalCount:0,//总的记录数
                allChangePageNo:1,//总的换货记录当前显示页
                allChangeTotalPage:'',//总的换货记录当前总页数
                userAllMat:[],//用户领取的所有物资列表
                userWaitSize:[],//用户选择的该物资的尺码待选列表
                addMat:'',//添加换货申请时的物资名称
                addOldSize:'',//添加换货申请时的原尺码
                addNewSize:'',//添加换货申请时的申请尺码
                addNum:'',//添加换货申请时的申请数量
                addPhone:'',//添加换货申请时的联系电话
                addAddress:'',//添加换货申请时的所在地区
                cancelApply: false,//控制我的换货取消显示区域
                viewInfo: false,
                applyChange: false,
                currentMy:'',//当前选中的我的申请列表行
                cuurentAll:''//当前选中的总记录行
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
            FlexboxItem
        },
        created() {
        	var obj = this;
        	//查询我的换货记录首页数据
            axios.get('../phone/changeAndAfter/querymc.json',
            	{params:{
                    userCode:obj.userCode,
                    page:1,
                    status:'',
                    matName:'',
                    d1:'',
                    d2:''
                },timeout:20000}).then(function (data) {
                obj.myChangeList = data.data.result;
                obj.myChangeTotalPage = data.data.totalPageCount;//总结果页数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载我的换货记录失败'
                })
            });
            Mock.mock('../phone/changeAndAfter/querymc.json?userCode='+ this.userCode + '&page=1&status=&matName=&d1=&d2=', mockData.querymc)

            //查询全部的换货记录
            axios.get('../phone/changeAndAfter/queryAll.json',
            	{params:{
                    userCode:'',
                    page:1,
                    matName:'',
                    d1:'',
                    d2:'',
                    size:'',
                    address:'',
                },timeout:20000}).then(function (data) {
                obj.allChangeList = data.data.result;
                obj.allChangeTotalPage = data.data.totalPageCount;//总结果页数
                obj.totalCount=data.data.totalCount;//总的记录数
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载换货信息发布栏数据失败'
                })
            });
            Mock.mock('../phone/changeAndAfter/queryAll.json?userCode=&page=1&matName=&d1=&d2=&size=&address=', mockData.queryAll)


            //加载查询全部时的所在地区
            axios.get('../phone/changeAndAfter/queryAllCompany.json',
            	{timeout:20000}).then(function (data) {
                obj.addressList = data.data;
            }).catch((err) => {
//                obj.$vux.toast.show({
//                    type: 'warn',
//                    text: '加载所在地区失败'
//                })
            });
            //加载用户提交换货申请时需要的基础数据
            axios.get('../phone/changeAndAfter/queryAddInit.json',
            	{params:{userCode:obj.userCode},timeout:20000}).then(function (data) {
                	obj.userAllMat=data.data.mat;
               		obj.addPhone=data.data.phone;
                	obj.addAddress=data.data.unit;
            }).catch((err) => {
//                obj.$vux.toast.show({
//                    type: 'warn',
//                    text: '加载初始化数据失败'
//                })
            });
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
        	showMySeach(){//显示我的换货申请搜索栏
        		this.ssmy=true;
        		this.ssall=false;
        	},
        	showAllSearch(){//显示全部换货申请搜索栏
        		this.ssall=true;
        		this.ssmy=false;
        	},
        	getMoreMy(){//我的换货申请加载更多
            	var obj = this;
            	obj.myChangePageNo=obj.myChangePageNo+1;
            	obj.$vux.loading.show({
                    text: 'Loading'
                });
	            axios.get('../phone/changeAndAfter/querymc.json',
	            	{params:{
	                    userCode:obj.userCode ,
	                    page:obj.myChangePageNo,
	                    status:obj.myStatus,
	                    matName:obj.myMatName,
	                    d1:obj.myd1,
	                    d2:obj.myd2
	                },timeout:20000}).then(function (data) {
	                obj.$vux.loading.hide();
	                obj.myChangeList = obj.myChangeList.concat(data.data.result);
	                obj.myChangePageNo=data.data.currentPageNo;
	                obj.myChangeTotalPage = data.data.totalPageCount;//总结果页数
	            }).catch((err) => {
	                obj.$vux.toast.show({
	                    type: 'warn',
	                    text: '加载更多失败'
	                })
	            });
            },
            getMoreAll(){//全部换货申请加载更多
            	var obj = this;
            	obj.allChangePageNo=obj.allChangePageNo+1;
            	obj.$vux.loading.show({
                    text: 'Loading'
                });
	            axios.get('../phone/changeAndAfter/queryAll.json',
	            	{params:{
	                    userCode:obj.allCode,
	                    page:obj.allChangePageNo,
	                    matName:obj.myMatName,
	                    d1:obj.alld1,
	                    d2:obj.alld2,
	                    matName:obj.allMatName,
	                    size:obj.allSize,
	                    address:obj.allAddress
	                },timeout:20000}).then(function (data) {
	                	obj.$vux.loading.hide();
	                	obj.allChangeList = obj.allChangeList.concat(data.data.result);
	                	obj.allChangePageNo=data.data.currentPageNo;
	                	obj.allChangeTotalPage = data.data.totalPageCount;//总结果页数
	            	}).catch((err) => {
		                obj.$vux.toast.show({
		                    type: 'warn',
		                    text: '加载更多失败'
		                })
	            });	
            },
            queryMy(){
            	var obj = this;
            	obj.myChangePageNo=1;
            	obj.myChangeList=[];
            	obj.myChangeTotalPage=1;
            	obj.$vux.loading.show({
                    text: 'Loading'
                });
                this.ssmy=false;
	            axios.get('../phone/changeAndAfter/querymc.json',
	            	{params:{
	                    userCode:obj.userCode,
	                    page:obj.myChangePageNo,
	                    status:obj.myStatus,
	                    matName:obj.myMatName,
	                    d1:obj.myd1,
	                    d2:obj.myd2
	                },timeout:20000}).then(function (data) {
		                obj.$vux.loading.hide();
		                obj.myChangeList = obj.myChangeList.concat(data.data.result);
		                obj.myChangePageNo = data.data.currentPageNo;
		                obj.myChangeTotalPage = data.data.totalPageCount;//总结果页数
	            	}).catch((err) => {
		                obj.$vux.toast.show({
		                    type: 'warn',
		                    text: '查询失败'
		                })
	            });
            },
            clearMy(){//我的申请记录查询条件清除
            	var obj = this;
            	obj.myChangePageNo=1;
            	obj.myChangeList=[];
            	obj.myChangeTotalPage=1;
            	obj.myStatus='';
	            obj.myMatName='';
	            obj.myd1='';
	            obj.myd2='';
            	obj.$vux.loading.show({
                    text: 'Loading'
                });
                this.ssmy=false;
	            axios.get('../phone/changeAndAfter/querymc.json',
	            	{params:{
	                    userCode:obj.userCode,
	                    page:obj.myChangePageNo,
	                    status:obj.myStatus,
	                    matName:obj.myMatName,
	                    d1:obj.myd1,
	                    d2:obj.myd2
	                },timeout:20000}).then(function (data) {
		                obj.$vux.loading.hide();
		                obj.myChangeList = obj.myChangeList.concat(data.data.result);
		                obj.myChangePageNo = data.data.currentPageNo;
		                obj.myChangeTotalPage = data.data.totalPageCount;//总结果页数
	            	}).catch((err) => {
		                obj.$vux.toast.show({
		                    type: 'warn',
		                    text: '查询失败'
		                })
	            });
            },
            applyChangePopup() {//打开换货申请新增输入界面
                this.addMat='';
                this.addOldSize='';
                this.addNewSize='';
                this.addNum='';
                this.applyChange = true;
            },
            closeApplyChange() {//关闭换货申请新增输入界面
                this.applyChange = false
            },
            onChangeMat(){//加载物资尺码信息
            	var obj = this;
            	obj.$vux.loading.show({
 					text: 'Loading'
				});
        		axios.get('../phone/userSize/queryMatCode.json',{
	                params: {
	                    matId: obj.addMat
	                },timeout: 20000
	            }).then(function (data) {
	            	obj.$vux.loading.hide();
	                obj.userWaitSize = data.data;
	            }).catch((err) => {
	               obj.$vux.loading.hide();
	               obj.$vux.toast.show({
            	   		type: 'warn',
            			text: '尺码数据加载失败'
        			});
	            });
	           
            },
            submitApplyChange() {//提交换货申请
                //this.applyChange = false;
                //判断用户提交的数据是否有问题
                if(this.addMat==''){
                	this.$vux.toast.show({
                    	type: 'warn',
                    	text: '请选择物资！'
                	})
                	return false;
                }
                if(this.addOldSize==''){
                	this.$vux.toast.show({
                    	type: 'warn',
                    	text: '请选择原尺码'
                	})
                	return false;
                }
                if(this.addNewSize==''){
                	this.$vux.toast.show({
                    	type: 'warn',
                    	text: '请选择申请尺码'
                	})
                	return false;
                }
                if(this.addNum==''){
                	this.$vux.toast.show({
                    	type: 'warn',
                    	text: '请选择数量'
                	})
                	return false;
                }
                if(this.addAddress==''){
                	this.$vux.toast.show({
                    	type: 'warn',
                    	text: '请选择所在地区'
                	})
                	return false;
                }
                if(this.addPhone==''){
                	this.$vux.toast.show({
                    	type: 'warn',
                    	text: '请填写联系电话'
                	})
                	return false;
                }
                var obj = this;
                var form = new FormData();
				form.append('userCode',obj.userCode);
				form.append('matId',obj.addMat);
				form.append('mySize',obj.addOldSize);
				form.append('targetSize',obj.addNewSize);
				form.append('address',obj.addAddress);
				form.append('num',obj.addNum);
                form.append('phone',obj.addPhone);
                this.applyChange = false;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                axios.post('../phone/changeAndAfter/saveMyChange.json',
					form,{timeout:30000}
					).then(function (data) {
		            	obj.$vux.loading.hide();
		                if(data.data.flag=='1'){
		                	obj.$vux.toast.show({
	            	   			type: 'success',
	            				text: '保存成功！'
	        				});
	        				obj.queryMy();
	        				//同时也要刷新信息发布栏
                            obj.queryAll();
		                }else{
		                	obj.applyChange = true;
		                	obj.$vux.toast.show({
	            	   			type: 'warn',
	            				text: '保存失败请重试！'
	        				});
		                }
	            }).catch((err) => {
	               obj.applyChange = true;
	               obj.$vux.loading.hide();
	               obj.$vux.toast.show({
            	   		type: 'warn',
            			text: '保存失败请重试'
        			});
	            });
            },
            //显示撤销申请界面
            cancelApplyPopup(item) {
            	if(item.CHANGE_FLAG=='正常'){
            		 this.currentMy = item
                	 this.cancelApply = true
            	}
               
            },
            //提交用户的撤销请求
            submitCancelApply(){
             	this.cancelApply = false;
             	var obj=this;
             	obj.$vux.loading.show({
                    text: 'Loading'
                });
            	axios.get('../phone/changeAndAfter/chexiaoApply.json',{
	                params: {
	                    matId: obj.currentMy.CHANGE_ID
	                },timeout: 20000
	            }).then(function (data) {
	            	obj.$vux.loading.hide();
	            	if(data.data.flag=='1'){
	            		obj.queryMy();
                        obj.queryAll();
	            		obj.$vux.toast.show({
                    		type: 'success',
                    		text: '撤销成功！'
                		});
	            	}else{
	            		obj.$vux.toast.show({
                    		type: 'warn',
                    		text: '撤销失败，请重试！'
                		});
	            	}
	            	
	            	
	            }).catch((err) => {
	               obj.$vux.loading.hide();
	               obj.$vux.toast.show({
            	   		type: 'warn',
            			text: '处理失败，请重试'
        			});
	            });
            },
            closeCancelApply() {//关闭换货申请提交页面
                this.cancelApply = false
            },
            queryAll(){//全部换货列表查询功能
	            var obj = this;
            	obj.allChangePageNo=1;
            	obj.allChangeList=[];
            	obj.allChangeTotalPage=1
            	obj.$vux.loading.show({
                    text: 'Loading'
                });
                obj.ssall=false;
	            axios.get('../phone/changeAndAfter/queryAll.json',
	            	{params:{
	                    userCode:obj.allCode,
	                    page:obj.allChangePageNo,
	                    matName:obj.myMatName,
	                    d1:obj.alld1,
	                    d2:obj.alld2,
	                    matName:obj.allMatName,
	                    size:obj.allSize,
	                    address:obj.allAddress
	                },timeout:20000}).then(function (data) {
	                	obj.$vux.loading.hide();
	                	obj.allChangeList = data.data.result;
	                	obj.allChangePageNo=data.data.currentPageNo;
	                	obj.allChangeTotalPage = data.data.totalPageCount;//总结果页数
	            	}).catch((err) => {
		                obj.$vux.toast.show({
		                    type: 'warn',
		                    text: '查询失败'
		                })
	            });	
            },
            clearAll(){//清空换货列表的查询条件
             	var obj = this;
            	obj.allChangeList=[];
            	obj.allChangeTotalPage=1
     			obj.allCode='',
                obj.allChangePageNo=1;
                obj.myMatName='';
                obj.alld1='';
                obj.alld2='';
                obj.allMatName='';
                obj.allSize='';
                obj.allAddress='';
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                obj.ssall=false;
                axios.get('../phone/changeAndAfter/queryAll.json',
	            	{params:{
	                    userCode:obj.allCode,
	                    page:obj.allChangePageNo,
	                    matName:obj.myMatName,
	                    d1:obj.alld1,
	                    d2:obj.alld2,
	                    matName:obj.allMatName,
	                    size:obj.allSize,
	                    address:obj.allAddress
	                },timeout:20000}).then(function (data) {
	                	obj.$vux.loading.hide();
	                	obj.allChangeList = data.data.result;
	                	obj.allChangePageNo=data.data.currentPageNo;
	                	obj.allChangeTotalPage = data.data.totalPageCount;//总结果页数
	            	}).catch((err) => {
		                obj.$vux.toast.show({
		                    type: 'warn',
		                    text: '重置查询失败'
		                })
	            });	
            },
            // 显示联系信息
            viewInfoPopup(item) {
                this.cuurentAll = item
                this.viewInfo = true
            },
            // 关闭窗口
            closeViewInfo() {
                this.viewInfo = false
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

    .tabTopBtn {
        margin-top: 8px;
        padding: 5px 10px 5px;
        background: #ececec;

    }
</style>
