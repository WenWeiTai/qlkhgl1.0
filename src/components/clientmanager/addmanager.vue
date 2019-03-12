<template>
  <div class='addmanagerLine-containter'>
    <div class = 'addmanagerLine'>
      <div class='inputBars'>
        <span style="color:red">*</span><span>客户经理名称:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="nameInput" placeholder="请输入内容" maxlength="20"></el-input>
      </div>
      <!-- <div class='inputBar'>
        <span>手机号:</span><span style="color:red">*</span>
         <span style="margin-right:20px"></span>
        <el-input  class="managerAdd-input" v-model="phoneInput" placeholder="请输入内容" maxlength="11"></el-input>
      </div> -->
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" >
        <el-form-item
    label="手机号:"
    prop="phone"
    :rules="[
      { required: true, message: '手机号不能为空'},
      { type: 'number', message: '手机号必须为数字值'}
    ]"
  >
    <el-input type="age" v-model.number="numberValidateForm.phone" maxlength="11" :disabled="this.isedit"></el-input>
  </el-form-item>
  </el-form>
      <div class='inputBar'>
         <span>网点:</span>
          <span style="margin-right:12px"></span>
          <el-input  class="managerAdd-input" v-model="netInput" placeholder="请输入内容" maxlength="20"></el-input>
      </div>
    </div>
    <div class = 'addmanagerLine'>
      <div class='inputBars'>
        <span>部门:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="departInput" placeholder="请输入内容" maxlength="20"></el-input>
      </div>
      <div class='inputBar'>
        <span>职位:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="jobInput" placeholder="请输入内容" maxlength="11"></el-input>
      </div>
      <!-- <div class='inputBar'>
         <span>邮箱:</span>
          <span style="margin-right:20px"></span>
          <el-input  class="managerAdd-input" v-model="emailInput" placeholder="请输入内容" maxlength="20"></el-input>
      </div> -->
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" >
        <el-form-item
          prop="email"
          label="邮箱:"
          :rules="buyerEmail"
  >
    <el-input  v-model="numberValidateForm.email" ></el-input>
  </el-form-item>
  </el-form>
    </div>
      <div class="managerImg">
    工牌照片：
      <el-upload
          class="avatar-uploader"
          action="/url/smallRoutineAccount/uploadImg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          >
          <img v-if="taskPicDetailUrl" :src="taskPicDetailUrl" class="avatar">
          <div v-else class="avatar-uploader-icon">
              <div class="avatar-tipcon">
                  <div class="avatar-text">背景图格式png jpg</div>
                   <div class="avatar-text">尺寸比例4:3</div>
                  <div class="avatar-text">图片大小不超过10M</div>
                  <el-button type="primary" class="el-icon-plus avatar-btn" round>添加图片</el-button>
              </div>
          </div>
      </el-upload>             
  </div>
  <div class="addMangerbottomBtn">
    <div class="celaddMangerBtn" @click="returnperPage">取消</div>
    <div class="endaddMangerBtn" @click="commit">完成</div>
  </div>
</div>
  
  
</template>

<script>
import axios from 'axios'
import url from '../../store/api'
export default {
  name:'addmanager',
  data(){
    
    var checkEmail = (rule, value, callback) => {
    const mailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
       
      } else {
        callback(new Error('邮箱格式不对'))
       
      }
    })
  }
    return{
     
      isedit:'',
      nameInput:'',
      phoneInput:'',
      netInput:'',
      departInput:'',
      jobInput:'',
      emailInput:'',
      taskPicDetailUrl:'',
      rightTitle:'',
      numberValidateForm:{
        phone:'',
        email:''
      },
      buyerEmail: [
      { validator: checkEmail, trigger: 'blur' }
    ],
      
    }
  },
  created(){
      let iseditManager = sessionStorage.getItem('TomanagerEditsession');
      if(iseditManager==='true'){
        this.isedit = true
        this.rightTitle = '编辑客户经理'
        this.managerDetail()
      }else{
        this.rightTitle = '添加客户经理'
        this.isedit = false
      }
  },
    mounted(){   
    this.$store.state.defaultActive = '客户经理管理';
    this.$store.state.mainDetailTitle = this.rightTitle;
    this.$store.state.rightTitle = this.rightTitle;
  },
  methods:{
     managerDetail(){
       let managerId = sessionStorage.getItem('accountIdDetail');
       let params = {
        idSCustomManager : managerId
      }
      this.$store.dispatch("bossDetail", params).then(data => {
      console.log('客户经理详情',data)
      this.nameInput = data.data.userName,
      this.bossId = data.data.accountId,
      this.netInput = data.data.bankName,
      this.numberValidateForm.phone =data.data.telephone*1
      this.numberValidateForm.email =data.data.email
      this.bosswechat = data.data.wechatId,
      this.bosstime = data.data.identifyTime,
      this.bossstate = data.data.identify,
      this.taskPicDetailUrl = data.data.userImg,
      this.jobInput = data.data.position,
      this.departInput = data.data.department
      
    });
     },
        beforeAvatarUpload(file) {
        console.log('wenjian',file.type)
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isJPG) { 
          return  this.$message.error('上传图像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          return this.$message.error('上传头像图片大小不能超过 10MB!');
        }
      //上传图片
            let fd = new FormData();
            fd.append('file', file);
             const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
             });
             let config = {
               headers:{
                 'csrfToken':'9EA6EC4DCBE5658676919DD8E4686095'
               }
             }
            axios.post(url.bossimg, fd,config).then(res => {
            console.log('上传图片' ,res.data)
                    loading.close();
                  if(res.data.code ==1){
                    return this.$message.error(res.data.message)
                  }else{
                     this.taskPicDetailUrl = res.data.data.fullPath
                  }
                   
                    //this.urlinput = res.data.data.fullPath     
             })
             return false;
        // return isJPG && isLt2M;
      },
      handleAvatarSuccess(){
         console.log('success')
      },
      commit(){
      if(this.nameInput == ''){
        return this.$message.error('请输入客户经理名称')
        }
      if(this.numberValidateForm.phone == ''){
        return this.$message.error('请输入电话号')
        }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.numberValidateForm.phone))){
        return this.$message.error('输入手机号格式不对')
      }
      // if(this.numberValidateForm.email){
      //   console.log(222,this.noemail)
      //   if(this.noemail == false){
      //    return this.$message.error('请输入正确email')
      //  }
      // }
      if(this.numberValidateForm.email){
         if(!( /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.numberValidateForm.email))){
         return this.$message.error('请输入正确email')
      }
      }
     
     
    let iseditManager = sessionStorage.getItem('TomanagerEditsession');
    let managerId = sessionStorage.getItem('accountIdDetail');
      if(iseditManager==='true'){//编辑
      let params = {
          idSCustomManager:managerId,
          telephone:this.numberValidateForm.phone,
          userName:this.nameInput,
          bankName:this.netInput,
          department:this.departInput,
          position:this.jobInput,
          email:this.numberValidateForm.email,
          userImg:this.taskPicDetailUrl
        }
      this.$store.dispatch("updateBoss", params).then(data => {
      console.log('编辑客户经理',data)
      if(data.code == 1){
        return this.$message.error(data.message)
      }
      this.$router.push('clientmanager')
    });

      }else{//添加
        let params = {
          telephone:this.numberValidateForm.phone,
          userName:this.nameInput,
          bankName:this.netInput,
          department:this.departInput,
          position:this.jobInput,
          email:this.numberValidateForm.email,
          userImg:this.taskPicDetailUrl
        }
      this.$store.dispatch("addBoss", params).then(data => {
      console.log('添加客户经理',data)
      if(data.code == 1){
        return this.$message.error(data.message)
      }
      this.$router.push('clientmanager')
    });
      }
    },
    returnperPage(){
      this.$router.go(-1)
    }
  }
}

</script>

<style>
.addmanagerLine-containter{
  background: #fff;
}
.addmanagerLine{
  display: flex;
  color: #4A4A4A ;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  justify-content:space-between;
  padding-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
}
.managerAdd-input.el-input{
  width: 200px;
  height: 40px;
}
.addmanagerLine .el-form-item__content{
  width: 200px;
}
.addmanagerLine .el-input{
   width: 200px;
}
.inputBar{
  width: 300px;
  text-align: right;
}
.inputBars{
   width: 320px;
  text-align: right;
}
.addmanagerLine .el-input__inner{
  width: 200px;
}
.managerImg{
  display: flex;
  margin-top: 20px;
  margin-left: 60px;
  color: #4A4A4A ;
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.addMangerbottomBtn{
  display: flex;
  text-align: center;
  justify-content:flex-end;
  margin-right: 20px;
}
.celaddMangerBtn{
  width: 64px;
  height: 40px;
  border: 1px solid #5A9AFB;
  border-radius: 5px;
  line-height: 40px;
  color: #5A9AFB;
  margin-right: 16px;
  cursor: pointer;
}
.endaddMangerBtn{
  width: 64px;
  height: 40px;
  background: linear-gradient(-90deg, #3367FA 0%, #5A9AFB 96%);
  border-radius: 5px;
  color: #fff;
  line-height: 40px;
  cursor: pointer;
}
.avatar-uploader{
    margin-left: 12px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #2F78EC;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #9B9B9B;
    width: 333px;
    height: 220px;
    text-align: center;
    display: flex;
    align-items:center;
    justify-content: center;
  }
  .avatar-uploader-icon:hover{
  background: rgba(0,0,0,0.40);;
  opacity: 0.9;
  color: #fff;
}
.avatar {
    width: 333px;
    height: 220px;
    display: block;
}
</style>
