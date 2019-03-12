<template>
    <div class="daily-container">
        <div class="daily-title-container">
            <div class="daily-title">
                每日明细
            </div>
            <div>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerBeginDateBefore">
                </el-date-picker>
            </div>
        </div>
        <!-- 图表 -->
        <div class="chartdetail" v-show="isChartShow">
            <div id="main" style="width:1030px;height:250px;margin:0 auto;margin-top:20px;"></div>
        </div>
        <!-- 活动明细 -->
        <DotRank 
            :tablename="detailtablename" 
            :totalcount="detailtotalcount" 
            :pagesize="detailpagesize" 
            :currentpage="detailcurrentpage" 
            :totalpages="detailtotalpages" 
            :tabletitles="detailtabletitles" 
            :tableData="detailtableData" 
            :pagesizes="detailpagesizes" 
            :pages="detailpages" 
            @prev="detailprevpage" 
            @next="detailnextpage"
            @changepage="changeManagerCurPage"
            @changepagesize="changeManagerPageSize"
            exportType="dd"
            :activityId="detailActivity"
            @export="exportExcelDd">
        </DotRank>
        <CustomerManagerDetail></CustomerManagerDetail>
    </div>
</template>
<script>
    import url from '../store/api.js'
    import * as echarts from 'echarts'
    import DotRank from '@/components/DotRank'
    import CustomerManagerDetail from '@/components/CustomerManagerDetail'
    export default{
        data(){
            return{
                isChartShow:true,
                value6:'',
                value:'',
                options: [],
                detailtablename:'某某活动明细',
                detailtotalcount:0,
                detailpagesize:'10',
                detailcurrentpage:1,
                detailtotalpages:3,
                detailtabletitles:[
                    {prop:'date',label:"日期",width:''},
                    {prop:'sharecount',label:"分享次数",width:''},
                    {prop:'touchcount',label:"触达人数",width:''},
                    {prop:'inline',label:"线上触达人数",width:''},
                    {prop:'offline',label:"线下触达人数",width:''}
                ],
                detailtableData: [],
                detailpagesizes:[
                    {value:'10',label:'10'}
                ],
                detailpages:[
                ],
                pickerBeginDateBefore:{
                    disabledDate(time){
                        return time.getTime() > Date.now();
                    }
                
                },
                startDate:'',
                endDate:''
            }
        },
        components:{
            DotRank,
            CustomerManagerDetail
        },
        computed:{
            detailActivity:{
                get(){
                    return this.$store.state.detailActivity;
                },
                set(val){
                    this.$store.state.detailActivity = val;
                }
            },
            detailStartTime:{
                get(){
                    return this.$store.state.detailStartTime;
                },
                set(val){
                    this.$store.state.detailStartTime = val;
                }
            },
            detailEndTime:{
                get(){
                    return this.$store.state.detailEndTime;
                },
                set(val){
                    this.$store.state.detailEndTime = val;
                }
            },
            dailyType:{
                get(){
                    return this.$store.state.dailyType;
                },
                set(val){
                    this.$store.state.dailyType = val;
                }
            }
        },
        watch:{
            value(newVal){
                //查找活动ID对应的type
                let obj_tmp = this.options.find((element,index,arr)=>{
                    return element.value == newVal;
                });
                if(obj_tmp){
                    this.dailyType = obj_tmp.type;
                }
                this.detailActivity = newVal;
                this.detailcurrentpage = 1;
                let obj = {};
                obj = this.options.find((item)=>{
                    return item.value === newVal;
                });
                this.detailtablename = obj.label+'活动明细';
                if(this.value6){
                    this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                }else{
                    this.getDayDetailByDefault(newVal);
                }
                
            },
            value6(newVal){
                this.detailcurrentpage = 1;
                if(newVal){
                    this.detailStartTime = this.formatDate(new Date(newVal[0]).getFullYear(),new Date(newVal[0]).getMonth()+1,new Date(newVal[0]).getDate());
                    this.detailEndTime = this.formatDate(new Date(newVal[1]).getFullYear(),new Date(newVal[1]).getMonth()+1,new Date(newVal[1]).getDate());;
                    
                    if(this.detailActivity){
                        this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                    }
                }else{
                    this.detailStartTime = null;
                    this.detailEndTime = null;
                    this.getDayDetailByDefault(this.detailActivity);
                }
            },
            detailcurrentpage(newV){
                this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                
            },
        },
        methods:{
            formatDate(y,m,d){
                let mm = m>=10?m:'0'+m;
                let dd = d>=10?d:'0'+d;
                return y+'-'+mm+'-'+dd;
            },
            detailprevpage(){
                if(this.detailcurrentpage > 1){
                    this.detailcurrentpage--;
                    if(this.value6){
                        this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                    }else{
                        this.getDayDetailByDefault(this.detailActivity);
                    }
                }
            },
            detailnextpage(){
                if(this.detailcurrentpage < this.detailtotalpages){
                    this.detailcurrentpage++;
                    if(this.value6){
                        this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                    }else{
                        this.getDayDetailByDefault(this.detailActivity);
                    }
                }
            },
            getDayDetail(aid,pagesize,pageNo,startDate,endDate){
                let param1 ='activityId='+aid+'&pageSize='+pagesize+'&pageNo='+pageNo+'&startDate='+startDate+'&endDate='+endDate+'&moduleType='+this.dailyType;
                var data = [];
                var data2 = [];
                var data3 = [];
                var data4 = [];
                this.$store.dispatch('dayDetail',param1).then(res1=>{
                    console.log("每日明细",res1);
                    //图表数据
                    this.list = res1.data.allList;
                    if(this.list && this.list.length > 0){
                        this.isChartShow = true;
                        this.list.forEach(element => {
                            data.push([element.dayDate,element.totalShareCount]);
                            data2.push([element.dayDate,element.onlineTouchCount]);
                            data3.push([element.dayDate,element.offlineTouchCount]);
                            data4.push([element.dayDate,element.totalTouchCount]);
                            
                        });
                        this.setOptions(data,data2,data3,data4);
                    }else{
                        this.isChartShow = false;
                    }
                    //分页数据
                    this.detailtableData = [];
                    this.detailpages = [];
                    if(res1.data.pageBean){
                        this.detailtotalcount = res1.data.pageBean.totalCount;
                        this.detailtotalpages = res1.data.pageBean.totalPageCount;
                        for(let i=1;i<=res1.data.pageBean.totalPageCount;i++){
                            this.detailpages.push({
                                value:i,
                                label:i
                            });
                        }
                        if(res1.data.pageBean && res1.data.pageBean.recordList){
                            res1.data.pageBean.recordList.forEach(element => {
                                this.detailtableData.push({
                                    date:element.dayDate,
                                    sharecount: element.totalShareCount,
                                    touchcount: element.totalTouchCount,
                                    inline:element.onlineTouchCount,
                                    offline:element.offlineTouchCount
                                });
                            });
                        }
                        
                    }
                });
                
            },
            getDayDetailByDefault(acid){
                let param = '';
                if(acid){
                    param = 'activityId='+acid;
                }
                this.$store.dispatch('defaultQuery',param).then(res=>{
                    console.log("默认",res);
                    if(!acid){
                        this.detailActivity = res.data.activityId;
                        this.value = res.data.activityId;
                    }
                    this.startDate = res.data.startDate;
                    this.endDate = res.data.endDate;
                    this.detailtablename = res.data.activityName+'活动明细';
                    this.dailyType = res.data.moduleType;
                    this.getDayDetail(this.detailActivity,10,this.detailcurrentpage,res.data.startDate,res.data.endDate);
                });
            },
            changeManagerCurPage(val){
                this.detailcurrentpage = val;
                if(this.value6){
                    this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                
                }else{
                    this.getDayDetailByDefault(this.detailActivity);
                }
                
            },
            changeManagerPageSize(val){
                this.detailpagesize = val;
                if(this.value6){
                    this.getDayDetail(this.detailActivity,this.detailpagesize,this.detailcurrentpage,this.detailStartTime,this.detailEndTime);
                
                }else{
                    this.getDayDetailByDefault(this.detailActivity);
                }
            },
             setOptions(data,data2,data3,data4){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                 
                let interval = Math.ceil(data.length/7)-1;
                var option = {
                    animation: true,
                    title: {
                        left: 'center',
                        text: '每日波动图',
                        subtext: '',
                        textStyle:{
                            color:'#4a4a4a',
                            fontWeight:'normal'
                        }
                    },
                    legend: {
                        top: 'bottom',
                        data:['意向']
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel:{
                            interval:interval
                        },
                        // splitNumber:7,
                        splitLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: {
                            inside: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                type:'dashed'
                            }
                        },
                        axisLabel: {
                            inside: false,
                            formatter: '{value}\n'
                        },
                        z: 10
                    },
                    grid: {
                        top: 50,
                        left: 35,
                        right: 35,
                        height: 160
                    },
                    // dataZoom: [{
                    //     type: 'inside',
                    //     throttle: 50
                    // }],
                    series: [
                        {
                            name:'分享次数',
                            type:'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 5,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#2F78EC'
                                }
                            },
                            stack: null,
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#2F78EC'
                                    }, {
                                        offset: 1,
                                        color: '#2F78EC'
                                    }])
                                }
                            },
                            data: data
                        },
                        {
                            name:'线上触达人数',
                            type:'line',
                            smooth:true,
                            stack: null,
                            symbol: 'circle',
                            symbolSize: 5,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#F5A623'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#FDF6EA'
                                    }, {
                                        offset: 1,
                                        color: '#FDF6EA'
                                    }])
                                }
                            },
                            data: data2
                        },
                        {
                            name:'线下触达人数',
                            type:'line',
                            smooth:true,
                            stack: null,
                            symbol: 'circle',
                            symbolSize: 5,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#006A00'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#006A00'
                                    }, {
                                        offset: 1,
                                        color: '#006A00'
                                    }])
                                }
                            },
                            data: data3
                        },
                        {
                            name:'触达人数',
                            type:'line',
                            smooth:true,
                            stack: null,
                            symbol: 'circle',
                            symbolSize: 5,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#DE7F7B'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#DE7F7B'
                                    }, {
                                        offset: 1,
                                        color: '#DE7F7B'
                                    }])
                                }
                            },
                            data: data4
                        }

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.clear();
                myChart.setOption(option);
            },
            exportExcelDd(){
                if(this.detailStartTime && this.detailEndTime){
                    let param ='activityId='+this.detailActivity+'&exportType=dd&startDate='+this.detailStartTime+'&endDate='+this.detailEndTime+'&moduleType='+this.dailyType
                    window.location.href=url.exportExcel+'?'+param;
                }else{
                    let param ='activityId='+this.detailActivity+'&exportType=dd&startDate='+this.startDate+'&endDate='+this.endDate+'&moduleType='+this.dailyType
                    window.location.href=url.exportExcel+'?'+param;
                }
                
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
            this.getDayDetailByDefault(null);
        }
    }
</script>
<style>
    .daily-container{
        background: #FFFFFF;
        margin-top:23px;
        padding-bottom:29px;
    }
    .daily-title-container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:10px 19px 10px 23px;
        border-bottom:1px solid #dddddd;
        /* font-weight: bold; */
    }
    .daily-title-container .el-select{
        width: 160px;
        height: 40px;
        margin-right:26px;
    }
</style>

