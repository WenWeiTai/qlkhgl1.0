<template>
    <div class="overview-container">
        <div class="table-title">
            活动概览
            <img src="../assets/download.png" alt="" class="exporttable" @click="exportExcel" v-if="canDown">
            <img src="../assets/disableDown.png" alt="" class="exporttable" v-if="disableDown">
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                key="活动海报名称"
                prop="name"
                label="活动海报名称">
            </el-table-column>
            <el-table-column
                key="活动时间"
                prop="time"
                label="活动时间"
                width="170">
            </el-table-column>
            <el-table-column
                key="活动状态"
                prop="status"
                label="活动状态">
            </el-table-column>
            <el-table-column
                key="分享次数"
                prop="sharecount"
                label="分享次数">
            </el-table-column>
            <el-table-column
                key="触达人数"
                prop="touchcount"
                label="触达人数"
                :render-header="renderheader">
            </el-table-column>
            <el-table-column
                key="线上触达人数"
                prop="inline"
                label="线上触达人数">
            </el-table-column>
            <el-table-column
                key="线下触达人数"
                prop="offline"
                label="线下触达人数">
            </el-table-column>
            <el-table-column
                key="下发客户经理数"
                prop="managercount"
                label="下发客户经理数">
            </el-table-column>
            <el-table-column
                key="平均分享次数"
                prop="avgshare"
                label="平均分享次数">
            </el-table-column>
            <el-table-column
                key="平均触达人数"
                prop="avgtouch"
                label="平均触达人数">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import url from '../store/api.js'
    export default{
        data(){
            return {
                tabletitles:[
                    {prop:'name',label:"活动海报名称",width:''},
                    {prop:'time',label:"活动时间",width:'170'},
                    {prop:'status',label:"活动状态",width:''},
                    {prop:'sharecount',label:"分享次数",width:''},
                    {prop:'touchcount',label:"触达人数",width:''},
                    {prop:'inline',label:"线上触达人数",width:''},
                    {prop:'offline',label:"线下触达人数",width:''},
                    {prop:'managercount',label:"下发客户经理数",width:''},
                    {prop:'avgshare',label:"平均分享次数",width:''},
                    {prop:'avgtouch',label:"平均触达人数",width:''}
                ],
                tableData: [],
                canDown: true,
                disableDown: false
            }
        },
        methods:{
            loadDataDefault(){
                 //获取默认的最新活动
                this.$store.dispatch('defaultQuery').then(res=>{
                    this.realtimeActivity = res.data.activityId;
                    let param = 'activityId='+res.data.activityId+'&moduleType='+res.data.moduleType;
                    let tmpdata = [];
                    this.$store.dispatch('overview',param).then(res=>{
                        console.log("活动概览",res);
                        let obj = {
                            name: res.data.activityName,
                            time: res.data.activityStartTime+'至'+res.data.activityEndTime,
                            status: res.data.activityStatusDesc,
                            sharecount:res.data.totalShareCount,
                            touchcount:res.data.totalTouchCount,
                            inline:res.data.onlineTouchCount,
                            offline:res.data.offlineTouchCount,
                            managercount:res.data.managerCount,
                            avgshare:res.data.avgShareCount,
                            avgtouch:res.data.avgTouchCount
                        }
                        tmpdata.push(obj);
                        this.tableData = tmpdata;
                    });
                })
            },
            exportExcel(){
                let param ='activityId='+this.realtimeActivity+'&exportType=av'+'&moduleType='+this.realTimeType
                window.location.href=url.exportExcel+'?'+param;
                this.canDown = false
                this.disableDown = true
                setTimeout(()=>{
                    this.canDown = true
                    this.disableDown = false
                },5000)
            },
            renderheader(h, { column, $index }) {
                return h('span', {}, [
                        h('span', {}, column.label),
                        h('el-popover', { 
                            props: { 
                                        placement: 'top-start', 
                                        width: '200', 
                                        trigger: 'hover', 
                                        content: '触达人数为线上线下人数汇总去重得到' 
                                    }
                            }, [
                        h('span', {slot: 'reference',class:'questionicon'}, '')
                    ])
                ])
            }
        },
        mounted(){
            this.loadDataDefault();
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
            realtimeActivity(newVal){
                let param = 'activityId='+newVal+'&moduleType='+this.realTimeType;
                let tmpdata = [];
                this.$store.dispatch('overview',param).then(res=>{
                    console.log("活动概览",res);
                    let obj = {
                        name: res.data.activityName,
                        time: res.data.activityStartTime+'至'+res.data.activityEndTime,
                        status: res.data.activityStatusDesc,
                        sharecount:res.data.totalShareCount,
                        touchcount:res.data.totalTouchCount,
                        inline:res.data.onlineTouchCount,
                        offline:res.data.offlineTouchCount,
                        managercount:res.data.managerCount,
                        avgshare:res.data.avgShareCount,
                        avgtouch:res.data.avgTouchCount
                    }
                    tmpdata.push(obj);
                    this.tableData = tmpdata;
                });
            }
        }
    }
</script>
<style>
    .el-table th{
        text-align: center;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
    }
    .el-table td{
        font-size: 13px;
        color: #4A4A4A;
        letter-spacing: 0;
    }
    .el-table th.is-leaf{
        border-bottom:none;
    }
    .overview-container .table-title{
        height:61px;
        line-height: 61px;
        border-bottom:1px solid #dddddd;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        /* font-weight: bold; */
        position:relative;
    }
    .overview-container .table-title .exporttable{
        /* border:1px solid #2f78ec;
        color:#2f78ec;
        border-radius: 4px; */
        float: right;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right:23px;
        width:18px;
    }
    .questionicon{
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../assets/question.png) no-repeat center bottom;
        margin-left:2px;
    }
</style>

