<template>
    <div class="realtime-container">
        <div class="realtime-title-container">
            <div class="realtime-title">
                实时统计
            </div>
            <el-select v-model="realtimeActivity" placeholder="请选择">
                <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <!-- 活动概览 -->
        <ActivityOverview></ActivityOverview>
        <!-- 网点排名 -->
        <DotRank 
            :tablename="dottablename" 
            :totalcount="dottotalcount" 
            :pagesize="dotpagesize"
            :currentpage="dotcurrentpage" 
            :totalpages="dottotalpages" 
            :tabletitles="dottabletitles" 
            :tableData="dottableData" 
            :pagesizes="dotpagesizes" 
            :pages="dotpages" 
            @prev="dotprevpage" 
            @next="dotnextpage"
            @changepage="changeDotCurPage"
            @changepagesize="changeDotPageSize"
            @export="exportExcelBr">
        </DotRank>
        <!-- 客户经理排名 -->
        <DotRank 
            :tablename="managertablename" 
            :totalcount="managertotalcount" 
            :pagesize="managerpagesize" 
            :currentpage="managercurrentpage" 
            :totalpages="managertotalpages" 
            :tabletitles="managertabletitles" 
            :tableData="managertableData" 
            :pagesizes="managerpagesizes" 
            :pages="managerpages" 
            @prev="managerprevpage" 
            @next="managernextpage"
            @changepage="changeManagerCurPage"
            @changepagesize="changeManagerPageSize"
            @export="exportExcelMs">
        </DotRank>
    </div>
</template>
<script>
    import url from '../store/api.js'
    import ActivityOverview from '@/components/ActivityOverview'
    import DotRank from '@/components/DotRank'
    export default{
        data(){
            return{
                value:'',
                options: [],
                dottablename:'网点排名',
                dottotalcount:0,
                dotpagesize:'10',
                dotcurrentpage:1,
                dottotalpages:3,
                dottabletitles:[
                    {prop:'rank',label:"排名",width:'180'},
                    {prop:'name',label:"网点名称",width:'340'},
                    {prop:'totalshare',label:"总分享次数",width:''},
                    {prop:'totaltouch',label:"总触达人数",width:''},
                    {prop:'inline',label:"线上触达人数",width:''},
                    {prop:'offline',label:"线下触达人数",width:''}
                ],
                dottableData: [],
                dotpagesizes:[
                    {value:'10',label:'10'}
                ],
                dotpages:[
                ],
                managertablename:'客户经理排名',
                managertotalcount:0,
                managerpagesize:'10',
                managercurrentpage:1,
                managertotalpages:3,
                managertabletitles:[
                    {prop:'rank',label:"排名",width:''},
                    {prop:'name',label:"客户经理名称",width:''},
                    {prop:'telephone',label:"手机号码",width:''},
                    {prop:'dotname',label:"所属网点",width:'250'},
                    {prop:'sharecount',label:"分享次数",width:'150'},
                    {prop:'touchcount',label:"触达人数",width:'150'},
                    {prop:'inline',label:"线上触达人数",width:''},
                    {prop:'offline',label:"线下触达人数",width:''}
                ],
                managertableData: [],
                managerpagesizes:[
                    {value:'10',label:'10'}
                ],
                managerpages:[
                ]
            }
        },
        components:{
            ActivityOverview,
            DotRank
        },
        computed:{
            /**
             * 实时统计选择项
             */
            realtimeActivity:{
                get(){
                    return this.$store.state.realtimeActivity;
                },
                set(val){
                    this.$store.state.realtimeActivity = val;
                }
            },
            /**
             * 实时统计选择项的type
             */
            realTimeType:{
                get(){
                    return this.$store.state.realTimeType;
                },
                set(val){
                    this.$store.state.realTimeType = val;
                }
            }
        },
        watch:{
            /**
             * 监听网点排名当前页的变化，获取对应数据
             */
            dotcurrentpage(newV){
                this.getActivityDotRank();
            },
            /**
             * 监听客户经理排名当前页的变化，获取对应数据
             */
            managercurrentpage(newV){
                this.getManagerRank();
            },
            /**
             * 查找活动ID对应的type,拿到选择的数据
             */
            realtimeActivity(newVal){
                let obj_tmp = this.options.find((element,index,arr)=>{
                    return element.value == newVal;
                });
                if(obj_tmp){
                    this.realTimeType = obj_tmp.type;
                }
                this.dotcurrentpage = 1;
                this.managercurrentpage = 1;
                this.getActivityDotRank();
                this.getManagerRank();
            }
        },
        methods:{
            /**
             * 网点排名上一页
             */
            dotprevpage(){
                if(this.dotcurrentpage > 1){
                    this.dotcurrentpage--;
                    
                }
            },
            /**
             * 网点排名下一页
             */
            dotnextpage(){
                if(this.dotcurrentpage < this.dottotalpages){
                    this.dotcurrentpage++;
                }
            },
            /**
             * 客户经理排名上一页
             */
            managerprevpage(){
                if(this.managercurrentpage > 1){
                    this.managercurrentpage--;
                    
                }
            },
            /**
             * 客户经理排名下一页
             */
            managernextpage(){
                if(this.managercurrentpage < this.managertotalpages){
                    this.managercurrentpage++;
                }
            },
            /**
             * 网点排名的数据请求
             */
            getActivityDotRank(){
                let param1 ='activityId='+this.realtimeActivity+'&pageSize='+this.dotpagesize+'&pageNo='+this.dotcurrentpage+'&moduleType='+this.realTimeType;
                this.$store.dispatch('branchRank',param1).then(res=>{
                    console.log("网点排名",res);
                    this.dottableData=[];
                    this.dotpages = [];
                    if(res.code == '0'){
                        this.dottotalcount = res.data.totalCount;
                        this.dottotalpages = res.data.totalPageCount;
                        for(let i=1;i<=res.data.totalPageCount;i++){
                            this.dotpages.push({
                                value:i,
                                label:i
                            });
                        }
                        res.data.recordList.forEach(element=>{
                            this.dottableData.push({
                                rank:element.rankNo?element.rankNo:'暂无排名',
                                name:element.branchName,
                                totalshare: element.totalShareCount,
                                totaltouch: element.totalTouchCount,
                                inline:element.onlineTouchCount,
                                offline:element.offlineTouchCount
                            });
                        });
                    }
                });
            },
            /**
             * 客户经理排名的数据请求
             */
            getManagerRank(){
                let param2 = 'idPoster='+this.realtimeActivity+'&pageSize='+this.managerpagesize+'&pageNo='+this.managercurrentpage+'&moduleType='+this.realTimeType;
                this.$store.dispatch('managerSortList',param2).then(res=>{
                    console.log("客户经理排名",res);
                    this.managertableData = [];
                    this.managerpages = [];
                    if(res.code == '0'){
                        this.managertotalcount = res.data.totalCount;
                        this.managertotalpages = res.data.totalPageCount;
                        
                        for(let i=1;i<=res.data.totalPageCount;i++){
                            this.managerpages.push({
                                value:i,
                                label:i
                            });
                        }
                        res.data.recordList.forEach(element=>{
                            this.managertableData.push({
                                rank:element.currentRank?element.currentRank:'暂无排名',
                                name: element.userName,
                                telephone:element.telephone,
                                dotname:element.department?element.department:'暂未分配网点',
                                sharecount: element.shareCount,
                                touchcount: element.touchCount,
                                inline:element.onlineTouchCount,
                                offline:element.offlineTouchCount
                            });
                        });
                    }
                });
            },
            /**
             * 客户经理排名改变当前页
             */
            changeManagerCurPage(val){
                this.managercurrentpage = val;
                this.getManagerRank();
            },
            /**
             * 网点排名改变当前页
             */
            changeDotCurPage(val){
                this.dotcurrentpage = val;
                this.getActivityDotRank();
            },
            /**
             * 改变客户经理排名页条数   —— 未使用
             */
            changeManagerPageSize(val){
                console.log(val)
                this.managerpagesize = val;
                this.getManagerRank();
            },
            /**
             * 改变网点排名页条数   —— 未使用
             */
            changeDotPageSize(val){
                this.dotpagesize = val;
                this.getActivityDotRank();
            },
            /**
             * 网点排名报表下载
             */
            exportExcelBr(){
                let param ='activityId='+this.realtimeActivity+'&exportType=br'+'&moduleType='+this.realTimeType;
                window.location.href=url.exportExcel+'?'+param;
            },
            /**
             * 客户经理排名报表下载
             */
            exportExcelMs(){
                let param ='activityId='+this.realtimeActivity+'&exportType=ms'+'&moduleType='+this.realTimeType;
                window.location.href=url.exportExcel+'?'+param;
            }

        },
        mounted(){
            /**
             * 获取所有活动（下拉）的数据
             */
            this.$store.dispatch('getAllActivity',{}).then(res=>{
                console.log("活动列表",res);
                let tmplist = [];
                res.data.forEach(element => {
                    let tmpobj = {
                        value: element.idSPoster,
                        label: element.title,
                        type: element.moduleType
                    }
                    tmplist.push(tmpobj);
                });
                this.options = tmplist;
            });
            //获取默认的最新活动
            this.$store.dispatch('defaultQuery').then(res=>{
                console.log('defaultQuery',res)
                this.realtimeActivity = res.data.activityId;    // 1122388
                this.realTimeType = res.data.moduleType;    // poster
                this.getActivityDotRank();
                this.getManagerRank();
            });
            
        }
    }
</script>
<style>
    .realtime-container{
        background: #FFFFFF;
        margin-top:23px;
        padding-bottom:29px;
    }
    .realtime-title-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:10px 19px 10px 23px;
        border-bottom:1px solid #dddddd;
    }
    .realtime-title-container .el-select{
        width: 160px;
        height: 40px;
    }
    .realtime-title{
        /* font-weight: bold; */
    }
</style>

