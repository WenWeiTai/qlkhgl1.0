<template>
 <div class="contain">
  <div class="login-left">
   <!-- <img src="../assets/BG.jpg" alt=""> -->
  </div>
  <div class="login-right">
   <div class="login-msg">
    <div class="login-logo-title">{{title1}}</div>
    <div class="login-admin">
     <el-input
         placeholder="请输入您的账号"
         v-model="loginMsg1">
         <i slot="prefix" class="iconfont icon-yonghu"></i>
         <i slot="suffix" class="iconfont icon-guanbi" v-if="loginMsg1" @click="clearMsg('loginMsg1')"></i>
        </el-input>
        <div class="remind-message">{{messageLogin}}</div>
    </div>
    <div>
     <el-input
         placeholder="请输入密码"
         type="password"
         v-model="loginMsg2">
         <i slot="prefix" class="iconfont icon-icon"></i>
         <i slot="suffix" class="iconfont icon-guanbi" v-if="loginMsg2" @click="clearMsg('loginMsg2')"></i>
        </el-input>
        <div class="remind-message">{{messageLoginCode}}</div>
    </div>
    <!-- <div class="change-user-code"><span @click="toUpdateCode">修改密码></span></div>  -->
    <div class="user-login-btn" @click="userLogin">登录</div>
   </div>
  </div>
 </div>
</template>

<script>
import md5 from 'js-md5';
 export default {
  data(){
   return {
    loginMsg1:'',
    loginMsg2:'',
    loginMsg3:'',
    loginMsg4:'',
    loginMsg5:'',
    loginMsg6:'',
    title1:'金融壹账通智能服务平台',
    title2:'修改密码',
    messageLogin:'',
    messageLoginCode:'',
    messageUpdateOld:'',
    messageUpdateNew:'',
    messageUpdateNewSure:'',
    showOrHide:true
   }
  },
  computed:{
      userName:{
        get(){
            return this.$store.state.userName;
        },
        set(val){
            this.$store.state.userName = val;
        }
      }
  },
  methods:{
   toUpdateCode(){
    this.loginMsg1 = ''
    this.loginMsg2 = ''
    this.loginMsg3 = ''
    this.loginMsg4 = ''
    this.loginMsg5 = ''
    this.loginMsg6 = ''
    this.showOrHide = !this.showOrHide
   },
   clearMsg(val){
    if(val == 'loginMsg1'){
     this.loginMsg1 = ''
    }else if(val == 'loginMsg2'){
     this.loginMsg2 = ''
    }else if(val == 'loginMsg3'){
     this.loginMsg3 = ''
    }else if(val == 'loginMsg4'){
     this.loginMsg4 = ''
    }else if(val == 'loginMsg5'){
     this.loginMsg5 = ''
    }else if(val == 'loginMsg6'){
     this.loginMsg6 = ''
    }
   },
   userLogin(){
        // 登录
        var that = this
        if(this.loginMsg1 === ''){
            this.messageLogin = '请填写账号!'
            return;
        }
        if(this.loginMsg2 === ''){
            this.messageLoginCode = '请填写密码!'
            return;
        }
        var obj = {
            userName:this.loginMsg1,
            passWord:md5(md5(this.loginMsg2)+'xcx#456')
            // passWord:md5(md5(this.loginMsg2)+'xcx#456')
        };
        this.$store.dispatch('loginIn',obj).then(data=>{
            console.log(obj)
            console.log("登录",data);
            if(data.code == '0'){
                sessionStorage.setItem('islogin',true);
                sessionStorage.setItem('username',this.loginMsg1);
                this.userName = this.loginMsg1;
                this.$router.push('/main');
            }else{
                this.$alert(data.message)
            }
        })
   }
  }
 }
</script>

<style scoped>
 .contain{
  height:100%;
  overflow: hidden;
 }

 .login-left{
    float:left;
    width:70%;
    height:100%;
    background: #2692EA url(../assets/BG.jpg) center top no-repeat;
    background-size: cover;
 }
 
 .login-left img{
  width:100%;
 } 

 .login-right{
  float:right;
  width:30%;
  height:100%;
  position: relative;
 }

 .login-msg{
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  margin:auto;
  width:100%;
  height:70%;
  box-sizing: border-box;
  padding:0 40px;
 }

 .login-logo-title{
  text-align: center;
  font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
     font-weight: 700;
     font-style: normal;
     font-size: 28px;
     color: #666666;
     text-align: center;
     margin-bottom: 30px;
 }

 .login-admin{
  /*margin-bottom:30px;*/
 }

 .remind-message{
  font-family: '微软雅黑';
     font-weight: 400;
     font-style: normal;
     font-size: 12px;
     color: #FF0000;
     margin-top:10px;
     padding-left:10px;
     box-sizing: border-box;
     height: 20px;
     line-height: 20px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
 }

 .user-login-btn{
     height: 48px;
     background: inherit;
     background-color: rgba(44, 56, 61, 1);
     border: none;
     border-radius: 6px;
     -moz-box-shadow: none;
     -webkit-box-shadow: none;
     box-shadow: none;
     font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑';
     font-weight: 700;
     font-style: normal;
     font-size: 16px;
     color: #FFFFFF;
     text-align: center;
     line-height:48px;
     letter-spacing: 10px;
     cursor:pointer;
 }

 .change-user-code{
  height:20px;
  margin-bottom:20px;
  cursor: pointer;
 }

 .change-user-code span{
  font-family: '微软雅黑';
     font-weight: 400;
     font-style: normal;
     font-size: 14px;
     color: #666666;
     text-align: right;
     display: inline-block;
     float:right;
     line-height:20px;
 }

 .login-title-icon{
  font-family: '微软雅黑';
     font-weight: 409;
     font-style: normal;
     font-size: 16px;
     color: #666666;
     text-align: center;
     position:absolute;
     left:35px;
 }

</style>