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
            realtimeActivity:{
                get(){
                    return this.$store.state.realtimeActivity;
                },
                set(val){
                    this.$store.state.realtimeActivity = val;
                }
            },
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
            // value(newVal){
            //     this.realtimeActivity = newVal;
            // },
            dotcurrentpage(newV){
                this.getActivityDotRank();
            },
            managercurrentpage(newV){
                this.getManagerRank();
            },
            realtimeActivity(newVal){
                //查找活动ID对应的type
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
            dotprevpage(){
                if(this.dotcurrentpage > 1){
                    this.dotcurrentpage--;
                    
                }
            },
            dotnextpage(){
                if(this.dotcurrentpage < this.dottotalpages){
                    this.dotcurrentpage++;
                }
            },
            managerprevpage(){
                if(this.managercurrentpage > 1){
                    this.managercurrentpage--;
                    
                }
            },
            managernextpage(){
                if(this.managercurrentpage < this.managertotalpages){
                    this.managercurrentpage++;
                }
            },
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
            changeManagerCurPage(val){
                this.managercurrentpage = val;
                this.getManagerRank();
            },
            changeDotCurPage(val){
                this.dotcurrentpage = val;
                this.getActivityDotRank();
            },
            changeManagerPageSize(val){
                this.managerpagesize = val;
                this.getManagerRank();
            },
            changeDotPageSize(val){
                this.dotpagesize = val;
                this.getActivityDotRank();
            },
            exportExcelBr(){
                let param ='activityId='+this.realtimeActivity+'&exportType=br'+'&moduleType='+this.realTimeType;
                window.location.href=url.exportExcel+'?'+param;
            },
            exportExcelMs(){
                let param ='activityId='+this.realtimeActivity+'&exportType=ms'+'&moduleType='+this.realTimeType;
                window.location.href=url.exportExcel+'?'+param;
            }

        },
        mounted(){
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
                this.realtimeActivity = res.data.activityId;
                this.realTimeType = res.data.moduleType;
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

