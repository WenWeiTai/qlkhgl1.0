<template>
<div>
    <RealTimeStatistics></RealTimeStatistics>
    <DailyDetail></DailyDetail>
</div>  
</template>
<script>
    import RealTimeStatistics from '@/components/RealTimeStatistics'
    import DailyDetail from '@/components/DailyDetail'
    export default {
        data(){
            return {
                // username:'zhucbeta',
                uniqueOpened:true
            }
        },
        components:{
            RealTimeStatistics,
            DailyDetail
        },
        computed:{
            userName:{
                get(){
                    return sessionStorage.username;
                },
                set(val){
                    this.$store.state.userName = val;
                }
            }
        },
        mounted(){
            this.$store.state.defaultActive = '报表监控';
            this.$store.state.rightTitle = '报表监控'
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            // 退出
            logout(){
                this.$store.dispatch('logout',{}).then(res=>{
                    if(res.code == '0'){
                        sessionStorage.setItem('islogin',false);
                        sessionStorage.removeItem('username');
                        this.$router.replace('/');
                    }
                });
            },
            handleCommand(command) {
                if(command == 'a'){
                    this.logout();
                }
            }
        }
    }
</script>
<style>
    body{
        margin:0;
    }
    .el-header{
        background-image: linear-gradient(-45deg, #111959 0%, #5DDAF4 100%);
        padding:0 40px 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .logo-container{
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
        font-weight: 600;
    }
    .logo-container img{
        vertical-align: middle;
    }
    .logo-container .logo-title{
        display: inline-block;
        margin-left:16px;
        padding-left:16px;
        border-left:2px solid rgba(255,255,255,0.4);
    }
    .userinfo{
        color:#ffffff;
        font-size: 16px;
        letter-spacing: 0;
        position: relative;
    }
    .userinfo img{
        vertical-align: middle;
    }
    .userinfo .username{
        margin:0 8px;
    }
    .logout-con{
        border: 1px solid #dcdfe6;
        background: #ffffff;
        color: #606266;
        border-radius: 3px;
        position: absolute;
        width: 120px;
        height: 30px;
        line-height: 30px;
    }
    .el-aside{
        background: #F5F5F5;
    }
    .el-menu{
        border-right:none;
        text-align: left;
    }
    .el-menu-item{
        font-size: 16px;
        letter-spacing: 0;
    }
    .el-menu-item img{
        margin-right:8px;
    }
    .el-menu-item.is-active{
        background: rgba(72,130,250,0.08);
        color: #2F78EC;
        border-left:4px solid #2F78EC;
    }
    .el-main{
        padding:24px 39px 39px 39px;
    }
    .main-container{
        background: #FAFAFA;
    }
    .main-container .top-title{
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 0;
        text-align: left;
    }
    .main-container .top-title .lastpath{
        color:#2f78ec;
    }
    .main-container .top-title .menu-title{
        font-size: 20px;
        color: #4A4A4A;
        letter-spacing: 0;
    }
</style>

