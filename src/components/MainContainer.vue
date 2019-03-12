<template>
    <el-container>
        <!-- header -->
        <el-header style="height:72px">
            <div class="logo-container">
                <img src="../assets/GammaLAB.svg">
                <span class="logo-title">小程序管理平台</span>
            </div>
            <el-dropdown trigger="click" @command="handleCommand">
                <div class="userinfo">
                    <img src="../assets/user.svg">
                    <span class="username">{{userName}}</span>
                    <img src="../assets/triangleDown.svg" alt="">
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="logout" command="a">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container style="margin-top:1px;">
            <!-- 左侧菜单栏 -->
            <el-aside :style="{width:asideWidth+'px'}" class="aside-container">
                <div class="menu-top-con">
                    <img @click="isCollapse=!isCollapse" class="menu-title-img" :class="{transformimg:!isCollapse}" src="../assets/collapse.svg" alt="">
                    <div class="menu-title-txt">收起菜单</div>
                </div>
                <el-menu
                    :uniqueOpened="uniqueOpened"
                    :default-active="defaultActive"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose" style="background: #F5F5F5">
                    <!-- <el-submenu index="1"> -->
                        <!-- <template slot="title">
                            <i class="el-icon-menu"></i>
                            <img class="menu-title-img" src="../assets/collapse.svg" alt="">
                            <span class="menu-title-txt">{{showmenu}}</span>
                        </template> -->
                        <el-menu-item v-for="(item,index) in menues" :key="index" :index="item.menu" 
                            style="padding-left:16px;font-size:16px;" 
                            @click="changeMenu(item.path,item.menu)">
                            <template slot="title">
                                <!-- <i class="el-icon-document"></i> -->
                                <img :src="item.iconMenu" alt="" v-if="defaultActive==item.menu">
                                <img :src="item.icongrey" alt="" v-else>
                                <span v-show="isCollapse">{{item.menu}}</span>
                            </template>
                        </el-menu-item>
                    <!-- </el-submenu> -->
                </el-menu>
            </el-aside>
            <!-- 图标展示区域 -->
            <el-main class="main-container">
                <div class="top-title">
                    <div>
                        <span class="firstpath">小程序管理平台</span>
                        <img src="../assets/arrow.svg" alt="">
                        <span :class="{lastpath:mainDetailTitle == ''}" v-if="mainDetailTitle == ''">{{defaultActive}}</span>
                        <span @click="goBack" v-if="mainDetailTitle != ''" style="cursor:pointer;">{{defaultActive}}</span>
                        <span v-if="mainDetailTitle != ''">
                            <img src="../assets/arrow.svg" alt="">
                            <span class="lastpath">{{mainDetailTitle}}</span>
                        </span>
                    </div>
                    <div class="menu-title">
                        {{rightTitle}}
                    </div>
                </div>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        data(){
            return {
                showqi:true,
                asideWidth:240,
                showlabel:true,
                isCollapse:true,
                showmenu:'收起菜单',
                uniqueOpened:true,
                menues:[ 
                    {
                        menu: '报表监控',
                        iconMenu: require('../assets/iconcolor/baobiao.png'),
                        icongrey: require('../assets/icongrey/baobiao.png'),
                        path: ''
                    },
                    {
                        menu: '客户经理管理',
                        iconMenu: require('../assets/iconcolor/user.png'),
                        icongrey: require('../assets/icongrey/user.png'),
                        path: 'clientmanager'
                    },
                      {
                        menu: '客户管理',
                        iconMenu: require('../assets/iconcolor/fenxiao.png'),
                        icongrey: require('../assets/icongrey/fenxiao.png'),
                        path: 'client'
                    },
                ],
                selectedMenuName:'任务管理'
            }
        },
        components:{
        },
        computed:{
            userName:{
                get(){
                    return sessionStorage.username;
                },
                set(val){
                    this.$store.state.reportcontrol.userName = val;
                }
            },
            defaultActive(){
                return this.$store.state.defaultActive
            },
            mainDetailTitle(){
                return this.$store.state.mainDetailTitle
            },
            rightTitle() {
                 return this.$store.state.rightTitle
            }
        },
        watch:{
            isCollapse(newVal){
                if(newVal){
                    this.asideWidth = 240
                }else{
                    this.asideWidth = 70
                }
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                this.showmenu = '收起菜单';
            },
            handleClose(key, keyPath) {
                this.showmenu = '展开菜单';
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
            },
            changeMenu(to,menuname){
                this.$store.state.defaultActive = menuname;
                this.$store.state.rightTitle = this.$store.state.defaultActive;
                this.$store.state.mainDetailTitle = '';
                this.$router.push('/main/'+to);
                this.selectedMenuName = menuname;
            },
            goBack(){
                console.log(77, this.$store.state.rightTitle)
                console.log(88, this.$store.state.defaultActive)
                if(this.$store.state.rightTitle !=this.$store.state.defaultActive){
                    console.log (123)
                }
                this.$store.state.mainDetailTitle = '';
                this.$store.state.rightTitle = this.$store.state.defaultActive;
                this.$router.back(-1);
            }
        }
    }
</script>
<style>
   body{
        margin:0;
    }
    .aside-container{
        transition: all 0.2s linear;
    }
    .transformimg{
        transform: rotateY(180deg);
    }
    .menu-title-img{
        width:18px;
        height:18px;
        vertical-align: middle;
    }
    .menu-title-txt{
        color:#9B9B9B;
        margin-left:8px;
        font-size: 14px;
        letter-spacing: 0;
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
        background:#f5f5f5;
    }
    .el-menu-item{
        font-size: 16px;
        letter-spacing: 0;
        border-left:4px solid #ffffff;
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
        padding:24px 40px 40px 40px;
    }
    .main-container{
        background: #FAFAFA;
    }
    .main-container .top-title{
        font-size: 14px;
        color:#2f78ec;
        letter-spacing: 0;
        text-align: left;
    }
    .main-container .top-title .lastpath{
        /* color:#2f78ec; */
        color: #9B9B9B;
    }
    .main-container .top-title .menu-title{
        font-size: 20px;
        color: #4A4A4A;
        letter-spacing: 0;
    }
    .menu-top-con{
        text-align: left;
        padding: 15px 0 16px 20px;
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 51%;
        white-space: nowrap;
    }
    .Menutitle{
        margin-left:10px;
        font-size: 16px;
    }
</style>