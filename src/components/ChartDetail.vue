<template>
    <div class="chartdetail">
        <div id="main" style="width:1030px;height:250px;margin:0 auto;"></div>
    </div>
</template>
<script>
    import * as echarts from 'echarts'
    export default{
        data(){
            return {
                list:[]
            }
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
            }
        },
        methods:{
            setOptions(data,data2){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                 
                let interval = Math.ceil(data.length/7)-1;
                var option = {
                    animation: true,
                    title: {
                        left: 'center',
                        text: '',
                        subtext: '',
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
                        top: 43,
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
                            name:'触达人数',
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
                        }

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.clear();
                myChart.setOption(option);
            },
            onloadDefaultData(){
                var data = [];
                var data2 = [];
                this.$store.dispatch('defaultQuery').then(res=>{
                    let param1 ='activityId=30&pageSize=10&pageNo=1&startDate='+res.data.startDate+'&endDate='+res.data.endDate;
                    this.$store.dispatch('dayDetail',param1).then(res1=>{
                        this.list = res1.data.allList;
                        if(this.list){
                            this.list.forEach(element => {
                                data.push([element.dayDate,element.totalShareCount]);
                                data2.push([element.dayDate,element.totalTouchCount]);
                            });
                            this.setOptions(data,data2);
                        }
                        
                    });
                });
            },
            loadSearchData(acid){
                var data = [];
                var data2 = [];
                let param = '';
                if(acid){
                    param = 'activityId='+acid;
                    this.$store.dispatch('defaultQuery',param).then(res=>{
                        console.log("默认",res);
                        let param1 ='activityId='+this.detailActivity+'&pageSize=10&pageNo=1&startDate='+res.data.startDate+'&endDate='+res.data.endDate;
                        this.$store.dispatch('dayDetail',param1).then(res1=>{
                            console.log("======dayDetail",res1);
                            // if(res1.data.allList){
                                this.list = res1.data.allList;
                                this.list.forEach(element => {
                                    data.push([element.dayDate,element.totalShareCount]);
                                    data2.push([element.dayDate,element.totalTouchCount]);
                                });
                            // }
                            this.setOptions(data,data2);
                        });
                    });
                }else{
                    let param1 ='activityId='+this.detailActivity+'&pageSize=10&pageNo=1&startDate='+this.detailStartTime+'&endDate='+this.detailEndTime;
                    this.$store.dispatch('dayDetail',param1).then(res1=>{
                        console.log("======dayDetail",res1);
                        // if(res1.data.allList){
                            this.list = res1.data.allList;
                            this.list.forEach(element => {
                                data.push([element.dayDate,element.totalShareCount]);
                                data2.push([element.dayDate,element.totalTouchCount]);
                            });
                        // }
                        this.setOptions(data,data2);
                    });
                }
                
                
            }
        },
        watch:{
            detailStartTime(newV){
                this.loadSearchData(null);
            },
            // detailEndTime(newV){
            //     this.loadSearchData(null);
            // },
            detailActivity(newV){
                if(this.detailStartTime && this.detailStartTime!=''){
                    this.loadSearchData(null);
                }else{
                    this.loadSearchData(this.detailActivity);
                }
                
            }
        },
        mounted(){
            this.onloadDefaultData();
            
        }
    }
</script>
<style>

</style>

