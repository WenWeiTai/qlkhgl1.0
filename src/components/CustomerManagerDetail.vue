<template>
    <div class="cusmanager-container">
        <!-- 客户经理每日明细-->
        <DotRank
            :tablename="cusmanagertablename"
            :totalcount="cusmanagertotalcount" 
            :pagesize="cusmanagerpagesize"
            :currentpage="cusmanagercurrentpage" 
            :totalpages="cusmanagertotalpages" 
            :tabletitles="cusmanagertabletitles" 
            :tableData="cusmanagertableData" 
            :pagesizes="cusmanagerpagesizes" 
            :pages="cusmanagerpages" 
            @prev="cusmanagerprevpage" 
            @next="cusmanagernextpage"
            @changepage="changeCusmanagerCurPage"
            @export="exportExcelMd">
        </DotRank>
    </div>
</template>
<script>
    import url from '../store/api.js'
    import DotRank from '@/components/DotRank'
    export default{
        data(){
            return{
                value:'',
                options: [],
                cusmanagertablename:'客户经理每日明细',
                cusmanagertotalcount:0, // 总条数
                cusmanagerpagesize:'10', // 一页数量 
                cusmanagercurrentpage:1,   // 当前页
                cusmanagertotalpages:3, // 总页数
                cusmanagertabletitles:[ //  单元格标题
                    {prop:'time',label:"日期",width:'180'},
                    {prop:'name',label:"客户经理姓名",width:''},
                    {prop:'dotname',label:"网点名称",width:''},
                    {prop:'telephone',label:"手机号",width:''},
                    {prop:'sharecount',label:"分享次数",width:''},
                    {prop:'touchcount',label:"触达人数",width:''},
                    {prop:'inline',label:"线上触达人数",width:''},
                    {prop:'offline',label:"线下触达人数",width:''},
                ],
                cusmanagertableData: [
                    {}
                ],
                cusmanagerpagesizes:[
                    {value:'10',label:'10'}
                ],
                cusmanagerpages:[
                ],
                startDate:'',
                endDate:''
            }
        },
        components:{
            DotRank
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
            cusmanagercurrentpage(newV){
                this.getActivityCusmanagerRank();
            },
            detailActivity(newVal){
                this.cusmanagercurrentpage = 1;
                this.getActivityCusmanagerRank();
            },
            detailStartTime(newVal){
                this.cusmanagercurrentpage = 1;
                this.getActivityCusmanagerRank();
            },
            detailEndTime(newVal){
                this.cusmanagercurrentpage = 1;
                this.getActivityCusmanagerRank();
            }
        },
        methods:{
            cusmanagerprevpage(){
                if(this.cusmanagercurrentpage > 1){
                    this.cusmanagercurrentpage--;
                    
                }
            },
            cusmanagernextpage(){
                if(this.cusmanagercurrentpage < this.cusmanagertotalpages){
                    this.cusmanagercurrentpage++;
                }
            },
            changeCusmanagerCurPage(val){
                this.cusmanagercurrentpage = val;
                this.getActivityCusmanagerRank();
            },
            getCustomerManagerDetailDefault(){
                this.$store.dispatch('defaultQuery',{}).then(res=>{
                    this.detailActivity = res.data.activityId;
                    this.dailyType = res.data.moduleType;
                    this.getActivityCusmanagerRank();
                });
            },
            getActivityCusmanagerRank(){
                if(this.detailStartTime && this.detailEndTime && this.detailStartTime!='' && this.detailEndTime!=''){
                    let param1 = 'activityId='+this.detailActivity+'&pageSize=10&pageNo='+this.cusmanagercurrentpage+'&startDate='+this.detailStartTime+'&endDate='+this.detailEndTime+'&moduleType='+this.dailyType;
                    
                    this.$store.dispatch('customerManagerDetail',param1).then(res=>{
                        console.log("客户经理每日明细",res);
                        this.cusmanagertableData=[];
                        this.cusmanagerpages = [];
                        if(res.code == '0'){
                            this.cusmanagertotalcount = res.data.totalCount;
                            this.cusmanagertotalpages = res.data.totalPageCount;
                            for(let i=1;i<=res.data.totalPageCount;i++){
                                this.cusmanagerpages.push({
                                    value:i,
                                    label:i
                                });
                            }
                            res.data.recordList.forEach(element=>{
                                this.cusmanagertableData.push({
                                    time:element.dayDate,
                                    name:element.userName,
                                    dotname:element.department,
                                    telephone:element.telephone,
                                    sharecount:element.shareCount,
                                    touchcount:element.touchCount,
                                    inline:element.onlineTouchCount,
                                    offline:element.offlineTouchCount
                                });
                            });
                        }
                    });
                }else{
                    let param = '';
                    param = 'activityId='+this.detailActivity;
                    this.$store.dispatch('defaultQuery',param).then(res=>{
                        this.startDate = res.data.startDate;
                        this.endDate = res.data.endDate;
                        let param1 = 'activityId='+this.detailActivity+'&pageSize=10&pageNo='+this.cusmanagercurrentpage+'&startDate='+res.data.startDate+'&endDate='+res.data.endDate+'&moduleType='+this.dailyType;
                        this.$store.dispatch('customerManagerDetail',param1).then(res=>{
                            console.log("客户经理每日明细",res);
                            this.cusmanagertableData=[];
                            this.cusmanagerpages = [];
                            if(res.code == '0'){
                                this.cusmanagertotalcount = res.data.totalCount;
                                this.cusmanagertotalpages = res.data.totalPageCount;
                                for(let i=1;i<=res.data.totalPageCount;i++){
                                    this.cusmanagerpages.push({
                                        value:i,
                                        label:i
                                    });
                                }
                                res.data.recordList.forEach(element=>{
                                    this.cusmanagertableData.push({
                                        time:element.dayDate,
                                        name:element.userName,
                                        dotname:element.department,
                                        telephone:element.telephone,
                                        sharecount:element.shareCount,
                                        touchcount:element.touchCount,
                                        inline:element.onlineTouchCount,
                                        offline:element.offlineTouchCount
                                    });
                                });
                            }
                        });
                    });
                }
                
            },
            exportExcelMd(){
                if(this.detailStartTime && this.detailEndTime && this.detailStartTime!='' && this.detailEndTime!=''){
                    let param ='activityId='+this.detailActivity+'&startDate='+this.detailStartTime+'&endDate='+this.detailEndTime+'&exportType=md&moduleType='+this.dailyType
                    window.location.href=url.exportExcel+'?'+param;
                    
                }else{
                    let param ='activityId='+this.detailActivity+'&startDate='+this.startDate+'&endDate='+this.endDate+'&exportType=md&moduleType='+this.dailyType
                    window.location.href=url.exportExcel+'?'+param;
                }
                
            }

        },
        mounted(){
            this.getCustomerManagerDetailDefault();
            
        }
    }
</script>
<style>
    .cusmanager-container{
        background: #FFFFFF;
        margin-top:23px;
        padding-bottom:29px;
    }
</style>

