<template>
    <div>
        <div>

            <!---用户查看自己提交的意见建议-->
            <popup v-model="ideaDetail" :is-transparent="true">
                <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group title="意见建议详情">
                        <cell title="填写时间"  style="font-size: .8rem">{{curRow.ideaAddDate}}</cell>
                        <x-textarea title="意见建议" v-if="curRow" v-model="curRow.ideaMethod" :height="260" style="font-size:.8rem"></x-textarea>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button @click.native="closedetail">关闭</x-button>
                    </div>
                </div>
            </popup>

        </div>


        <div>
            <div>
                <div style="background-color:#fff;margin:0 auto;border-radius:5px;">
                    <group title="请输入您的宝贵意见及建议">
                        <x-textarea title="" v-model="myIdea" :max=200 placeholder="我们将为您不断改进！不少于4个字哦~ " style="font-size: .2rem"></x-textarea>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="submitIdea">发表</x-button>
                    </div>
                </div>
                <x-table :cell-bordered="false" class="xtable">
                    <thead>
                    <tr>
                        <th>发表时间</th>
                        <th>内容</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list,index) in ideaList"  @click="clickRow(list,index)" :class="{active: index === currentTrIndex}">
                        <td>{{list.ideaAddDate}}</td>
                        <td>{{list.ideaUserName}}</td>
                    </tr>
                    </tbody>
                </x-table>
                <a v-if="totalPage>currentPage" class="getMore" @click="moreIdea">点击加载更多</a>
            </div>


        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import Mock from 'mockjs'
    import mockData from '../mock/idea'
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

    export default {
        data() {
            return {
                addView:false,//控制新增意见建议界面展示
                ideaDetail:false,//控制详情展示
                ideaList:[],//列表数据
                currentPage:1,//当前页
                totalPage:1,//当前页
                curRow:'',//用户选择的当前结果行
                currentTrIndex:'',//当前选择的行号记录
                myIdea:''//我的意见
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
            closedetail(){//关闭购买详情界面
                this.ideaDetail=false;
            },
            openIdeaAdd(){//打开提交界面
                this.addView=true;
                this.myIdea='';
            },
            closeadd(){//关闭新增页面
                this.addView=false;
                this.myIdea='';
            },
            submitIdea(){
                var obj=this;
                if(this.myIdea==''||this.myIdea.length<4){
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '请填写您的宝贵意见及建议后在提交,最少4个字'
                    })
                    return false;
                }
                this.$vux.confirm.show({
                    content: '您确认提交吗？',
                    onConfirm () {
                        obj.$vux.loading.show({
                            text: 'Loading'
                        });
                        obj.addView=false;
                        var form = new FormData();
                        form.append('userCode',obj.userCode);
                        form.append('idea',obj.myIdea);
                        axios.post('../phone/other/saveIdea.json',
                            form,{timeout:30000}
                        ).then(function (data) {
                            obj.$vux.loading.hide();
                            if(data.data.flag=='1'){
                                obj.$vux.toast.show({
                                    type: 'success',
                                    text: '保存成功！'
                                });
                                obj.queryInit();
                                obj.myIdea='';
                                obj.addView=false;

                            }else{
                                obj.addView=true;
                                obj.$vux.toast.show({
                                    type: 'warn',
                                    text: data.data.msg
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
            },

            clickRow(item,index){//单击行
                this.currentTrIndex=index;
                this.curRow=item;
                this.ideaDetail=true;
            },
            queryInit(){
                var obj=this;
                obj.currentPage=1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                var obj=this;
                axios.get('../phone/other/loadUserIdea.json',
                    {params:{
                        userCode:obj.userCode,
                        page:1
                    },timeout:20000}).then(function (data) {
                    obj.ideaList = data.data.result;
                    obj.totalPage = data.data.totalPageCount;//总结果页数
                    obj.currentPage=data.data.currentPageNo;//当前页
                    obj.$vux.loading.hide();
                }).catch((err) => {
                    obj.$vux.loading.hide();
                    obj.$vux.toast.show({
                        type: 'warn',
                        text: '加载我的意见建议时出错了'
                    })
                });
                Mock.mock('../phone/other/loadUserIdea.json?userCode='+ this.userCode + '&page=1', mockData.loadUserIdea)

            },
            moreIdea(){//加载更多数据
                var obj=this;
                obj.currentPage=obj.currentPage+1;
                obj.$vux.loading.show({
                    text: 'Loading'
                });
                //进入页面先查询第一页的用户购买记录
                axios.get('../phone/other/loadUserIdea.json',
                    {params:{
                        userCode:obj.userCode,
                        page:obj.currentPage,
                    },timeout:20000}).then(function (data) {
                    obj.$vux.loading.hide();
                    obj.ideaList = obj.ideaList.concat(data.data.result);
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
