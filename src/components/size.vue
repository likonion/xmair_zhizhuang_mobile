<template>
    <div>
        <div v-transfer-dom>
        	<!--数据修改弹窗-->
            <popup v-model="popup" :is-transparent="true" @on-hide="cancelOptionalForView">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group :title="currentList.MAT_NAME">
                     	<selector title="国标码" placeholder="请选择国标码" v-model="currentList.NATIONAL_SIZE"  
                              :options="selectSizeList" style="font-size: .8rem"></selector>
                        <cell title="特体需求" style="font-size: .8rem">
                            <div slot="inline-desc"  style="font-size: .8rem">{{currentList.SPECIAL_REQ}}</div>
                        </cell>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="submitOptionalEdit">保存</x-button>
                        <x-button @click.native="cancelOptionalEdit">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>

        <div>
            <button-tab style="margin:10px 10px;">
                <button-tab-item selected @on-item-click="tabIndex=0">个人尺码维护</button-tab-item>
                <button-tab-item @on-item-click="tabIndex=1">收货信息维护</button-tab-item>
            </button-tab>
        </div>
        <div>
            <div class="page-content" style="padding-bottom: 20px; margin-top: 10px;">
                <div v-show="tabIndex === 0">
                    <group title="">
                        <cell :title="allowDate"  >
                            <div slot="inline-desc" style="font-size:.7rem;color:#ababab;" >（最新开放修改时段）</div>
                            <div v-if="allowFlag==2"  style="position: absolute; right: 8px;bottom:12px">
                                <x-icon  type="alert-circled" size="24" style="fill:red"></x-icon>
                            </div>
                        </cell>
                    </group>
                    <x-table :cell-bordered="false"  class="xtable">
                        <thead>
                        <tr >
                            <th width="30%">物资名称 </th>
                            <th width="30%">国标码</th>
                            <th width="40%">尺码类别</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(list, index) in userSizeList" @click="optionalEdit(list, index)" :class="{active: index === currentTrIndex}">
                            <td>
                            	<span v-if="list.CUSTOM_FLAG == '国标码'" style="color:#18ae17">
                                    <x-icon type="unlocked" size="10"  style="fill:#18ae17"></x-icon>
                            		{{list.MAT_NAME}}
                            	</span>
                            	<span v-if="list.CUSTOM_FLAG != '国标码'">
                                    <x-icon type="locked" size="10" style="fill:#858585"></x-icon>
                            		{{list.MAT_NAME}}
                            	</span>
                            </td>
                            <td>
                            	{{list.NATIONAL_SIZE}}
                            </td>
                            <td>{{list.CUSTOM_FLAG}}
                                <span v-if="list.CUSTOM_FLAG != '国标码'">
                                    (不可修改)
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </x-table>
                </div>
                <div v-show="tabIndex === 1" style="padding-top: 0px;">
                <group title="" >
                    <cell :title="addressAllowDate"  >
                        <div slot="inline-desc" style="font-size:.7rem;color:#ababab;" >（最新开放修改时段）</div>
                        <div v-if="addressAllowFlag==2"  style="position: absolute; right: 8px;bottom:12px">
                            <x-icon  type="alert-circled" size="24" style="fill:red"></x-icon>
                        </div>
                    </cell>
                </group>
                <group title="管理我的地址">
                    <x-input v-if="addressAllowFlag==1"   text-align="right" type="text"  title="收&nbsp;&nbsp;件&nbsp;&nbsp;人" placeholder="请输入收货人姓名" v-model="userLinkName" style="font-size:.7rem"></x-input>
                    <cell v-if="addressAllowFlag==2" value-align="right" title="收件人" style="font-size:.7rem">{{userLinkName}}</cell>
                    <x-input  v-if="addressAllowFlag==1"  text-align="right" type="text"   title="联系电话" placeholder="请输入联系电话" v-model="userTel" style="font-size:.7rem"></x-input>
                    <cell v-if="addressAllowFlag==2" value-align="right" title="联系电话" style="font-size:.7rem">{{userTel}}</cell>
                    <x-input  v-if="addressAllowFlag==1"  text-align="right" type="text"   title="备用电话" placeholder="请输入备用电话" v-model="userTelBack" style="font-size:.7rem"></x-input>
                    <cell v-if="addressAllowFlag==2" value-align="right" title="备用电话" style="font-size:.7rem">{{userTelBack}}</cell>
                    <selector  v-if="addressAllowFlag==1" direction="rtl"title="所属省份" placeholder="请选择所属省份" v-model="userProv" :options="selectProv" @on-change="changeProv" style="font-size:.7rem"></selector>
                    <cell v-if="addressAllowFlag==2" value-align="right" title="所属省份" style="font-size:.7rem">{{userProv}}</cell>
                    <selector   v-if="addressAllowFlag==1"  direction="rtl" title="所属城市" placeholder="请选择所属城市" v-model="userCity" :options="selectCity" @on-change="changeCity" style="font-size:.7rem"></selector>
                    <cell v-if="addressAllowFlag==2" value-align="right" title="所属城市" style="font-size:.7rem">{{userCity}}</cell>
                    <selector   v-if="addressAllowFlag==1"  direction="rtl" title="所属区县" placeholder="请选择所属区县" v-model="userCounty" :options="selectCounty" style="font-size:.7rem"></selector>
                    <cell v-if="addressAllowFlag==2" value-align="right" title="所属区县" style="font-size:.7rem">{{userCounty}}</cell>
                    <x-input   v-if="addressAllowFlag==1"type="text"  text-align="right"  title="详细地址" placeholder="无需包含省市县信息" v-model="userDetail" style="font-size:.7rem"></x-input>
                    <cell v-if="addressAllowFlag==2" title="详细地址" style="font-size:.7rem">{{userDetail}}</cell>
                </group>
                <div style="padding:20px 15px;"  v-show="addressAllowFlag==1" >
                    <x-button type="primary" @click.native="submitapply">保存</x-button>
                    <x-button @click.native="closeadd">取消</x-button>
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
        Toast
    } from 'vux'
    import {mapState, mapMutations} from 'vuex'

    let oldSize='';
    let oldSpecial='';
    export default {
        data() {
            return{
                tabIndex:0,
            	allowDate:'------',//允许修改个人尺码的时间段
            	allowFlag:1,//是否允许当前时间修改个人尺码，默认不允许
            	userSizeList:'',//用户需要维护的以及维护好的尺码列表
                popup: false,//尺码编辑框显示标示位
                currentList: '',//当前编辑的行记录数据
                selectSizeList:[],//允许用户选择的尺码列表
                saveFlag:'1',//是否保存标志位
                currentTrIndex: '',
                addressAllowDate:'-------',//允许修改个人快递地址的时间段
                addressAllowFlag:1,//是否允许当前时间修改个人快递邮寄时间
                selectProv:[],
                selectCity:[],
                selectCounty:[],
                userProv:'',
                userCity:'',
                userCounty:'',
                userDetail:'',
                userTel:'',
                userTelBack:'',
                userLinkName:'',
                buserProv:'',
                buserCity:'',
                buserCounty:'',
                buserDetail:'',
                buserTel:'',
                buserTelBack:'',
                buserLinkName:''
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
            Toast
        },
        created() {
            var obj = this;
            //初始化页面时加载允许修改数据的时间段,以及是否允许修改的状态
            axios.get('../phone/userSize/queryAllData.json',{
                params: {
                    userCode: obj.userCode
                },timeout:20000
            }).then(function (data) {
                obj.allowDate = data.data.allowDate;//尺码允许修改时间段
                obj.allowFlag = data.data.allowFlag;//尺码允许修改标准
                obj.addressAllowDate=data.data.addressAllowDate;//个人快递地址修改时间段
                obj.addressAllowFlag=data.data.addressAllowFlag;//个人快递地址修改允许标识
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载初始化数据失败'
                })
            });

            //加载省的数据
            axios.get('../phone/userSize/loadArea.json',{
                params: {
                   code:'',
                    level:'0'
                },timeout:20000
            }).then(function (data) {
                obj.selectProv=data.data;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载收货地址省份信息失败'
                })
            });

            //加载用户的尺码列表
            axios.get('../phone/userSize/queryuserSize.json',{
                params: {
                    userCode: obj.userCode
                },timeout:20000
            }).then(function (data) {
                obj.userSizeList = data.data;
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载初始化数据失败'
                })
            });
            //加载用户的地址信息
            axios.get('../phone/userSize/loadUserAddress.json',{
                params:{
                    userCode: obj.userCode
                },timeout:20000
            }).then(function (data) {
                obj.userProv=data.data.infoLinkProv;
                obj.userCity=data.data.infoLinkCity;
                obj.userCounty=data.data.infoLinkCounty;
                obj.userDetail=data.data.infoLinkDetail;
                obj.userTelBack=data.data.infoLinkTelBack;
                if(data.data.infoLinkName!=''){
                    obj.userLinkName=data.data.infoLinkName;
                    obj.userTel=data.data.infoLinkTel;
                }
                //加载备份数据，用于用户取消修改使用
                obj.buserProv=data.data.infoLinkProv;
                obj.buserCity=data.data.infoLinkCity;
                obj.buserCounty=data.data.infoLinkCounty;
                obj.buserDetail=data.data.infoLinkDetail;
                obj.buserTelBack=data.data.infoLinkTelBack;
                if(data.data.infoLinkName!=''){
                    obj.buserLinkName=data.data.infoLinkName;
                    obj.buserTel=data.data.infoLinkTel;
                }
            }).catch((err) => {
                obj.$vux.toast.show({
                    type: 'warn',
                    text: '加载初始化数据失败'
                })
            });
            
        },
        mounted() {
           
        },
        computed: {
            ...mapState({
                userCode: 'userCode',//用户工号
                pageScrollTop: 'pageScrollTop'
            })
        },
        activated() {
        },
        directives: {
            TransferDom
        },
        methods: {
	            //打开用户编辑物资的尺码列表
	            optionalEdit(list, index) {
	                this.currentTrIndex = index
	                this.saveFlag='1';
		            var obj=this;
		        	if(this.allowFlag=='1'&&list.CUSTOM_FLAG=='国标码'){
		        		 //读取该物资的允许选择的尺码列表
		        		obj.$vux.loading.show({
 							text: 'Loading'
						});
		        		axios.get('../phone/userSize/queryMatCode.json',{
			                params: {
			                    matId: list.STD_MAT_ID
			                },timeout: 20000
			            }).then(function (data) {
			            	obj.$vux.loading.hide();
			                obj.selectSizeList = data.data;
			            }).catch((err) => {
			               obj.$vux.loading.hide();
			               obj.$vux.toast.show({
                    	   		type: 'warn',
                    			text: '尺码数据加载失败'
                			});
			            });
		        		this.popup = true
		        		oldSize=list.NATIONAL_SIZE;
	    				oldSpecial=list.SPECIAL_REQ;
		            	this.currentList = list
		        	}
            },
            // 取消已选物资编辑
            cancelOptionalEdit() {
                this.popup = false;
                this.currentList.NATIONAL_SIZE=oldSize;
                this.currentList.SPECIAL_REQ=oldSpecial;
            },
            cancelOptionalForView() {
            	if(this.saveFlag=='1'){
            		this.popup = false;
                 	this.currentList.NATIONAL_SIZE=oldSize;
                	this.currentList.SPECIAL_REQ=oldSpecial;
            	}
            },
            // 提交已选物资编辑
            submitOptionalEdit() {
            	var obj=this;
            	if(!obj.currentList.NATIONAL_SIZE){
            		obj.$vux.toast.show({
            	   			type: 'warn',
            				text: '请选择国标码以后在提交'
	        		})
	        		return false;
            	}
            	
            	this.$vux.loading.show({
 					text: 'Loading'
				});
				var form = new FormData();
				form.append('userCode',obj.currentList.userCode);
				form.append('matId',obj.currentList.STD_MAT_ID);
				form.append('oldRecord',obj.currentList.SIZE_ID);
				form.append('size',obj.currentList.NATIONAL_SIZE);
				form.append('measureSize',obj.currentList.MEASURE_SIZE);
				form.append('special',obj.currentList.SPECIAL_REQ);
				axios.post('../phone/userSize/saveModifySize.json',
					form,{timeout:30000}
					).then(function (data) {
		            	obj.$vux.loading.hide();
		                if(data.data.flag=='1'){
		                	obj.saveFlag='2';//表示保存成功了，不能还原数据
		                	obj.$vux.toast.show({
	            	   			type: 'success',
	            				text: '保存成功！'
	        				});
	        				obj.popup = false;
		                }else{
		                	obj.popup = true;
		                	obj.$vux.toast.show({
	            	   			type: 'warn',
	            				text: '保存失败请重试！'
	        				});
		                }
	            }).catch((err) => {
	               obj.$vux.loading.hide();
	               obj.$vux.toast.show({
            	   		type: 'warn',
            			text: '保存失败请重试'
        			});
	            });
            },
            changeProv(){//切换省份使用
                var obj=this;
                obj.selectCity=[];
                obj.selectCounty=[];
                axios.get('../phone/userSize/loadArea.json',{
                    params: {
                        code:obj.userProv,
                        level:'1'
                    },timeout:20000
                }).then(function (data) {
                    obj.selectCity=data.data;
                }).catch((err) => {
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载收货地址城市信息失败'
                    })
                });
            },
            changeCity(){//切换
                var obj=this;
                obj.selectCounty=[];
                axios.get('../phone/userSize/loadArea.json',{
                    params: {
                        code:obj.userCity,
                        level:'2'
                    },timeout:20000
                }).then(function (data) {
                    obj.selectCounty=data.data;
                }).catch((err) => {
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载收货地址区县信息失败'
                    })
                });
            },
            closeadd(){//取消修改
                var obj=this;
                obj.userProv=obj.buserProv;
                obj.userCity=obj.buserCity;
                obj.userCounty=obj.buserCounty;
                obj.userDetail=obj.buserDetail;
                obj.userTelBack=obj.buserTelBack;
                obj.userLinkName=obj.buserLinkName;
                obj.userTel=obj.buserTel;
            },
            submitapply(){
                var obj=this;
                if(obj.userProv==''){
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '请选择所属省份'
                    });
                    return false;
                }
                if(obj.userCity==''){
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '请选择所属城市'
                    });
                    return false;
                }
                if(obj.userCounty==''){
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '请选择所属区县'
                    });
                    return false;
                }
                var cityYes=false;
                for(var i=0;i<obj.selectCity.length;i++){
                    if(obj.userCity==obj.selectCity[i]){
                        cityYes=true;
                        break;
                    }
                }
                if(!cityYes){
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '请选择所属城市'
                    });
                    return false;
                }
                var countyYes=false;
                for(var i=0;i<obj.selectCounty.length;i++){
                    if(obj.userCounty==obj.selectCounty[i]){
                        countyYes=true;
                        break;
                    }
                }
                if(!countyYes){
                    console.log('456');
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '请选择所属区县'
                    });
                    return false;
                }
                this.$vux.confirm.show({
                    content:'您确认提交您的地址信息吗？',
                    onConfirm () {
                        obj.$vux.loading.show({
                            text: 'Loading'
                        });
                        var form = new FormData();
                        form.append('userCode',obj.userCode);
                        form.append('linkName',obj.userLinkName);
                        form.append('linkTel',obj.userTel);
                        form.append('linkTelBack',obj.userTelBack);
                        form.append('prov',obj.userProv);
                        form.append('city',obj.userCity);
                        form.append('county',obj.userCounty);
                        form.append('detail',obj.userDetail);
                        axios.post('../phone/userSize/saveUserAddress.json',
                            form,{timeout:30000}
                        ).then(function (data) {
                            obj.$vux.loading.hide();
                            if(data.data.flag=='1'){
                                obj.saveFlag='2';//表示保存成功了，不能还原数据
                                obj.$vux.toast.show({
                                    type: 'success',
                                    text: '保存成功！'
                                });
                                obj.buserProv=obj.userProv;
                                obj.buserCity=obj.userCity;
                                obj.buserCounty=obj.userCounty;
                                obj.buserDetail=obj.userDetail;
                                obj.buserTelBack=obj.userTelBack;
                                obj.buserLinkName=obj.userLinkName;
                                obj.buserTel=obj.userTel;
                            }else{
                                obj.popup = true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: '保存失败请重试！'
                                });
                            }
                        }).catch((err) => {
                            obj.$vux.loading.hide();
                            obj.$vux.toast.show({
                                type: 'warn',
                                text: '保存失败请重试'
                            });
                        });
                    }
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
