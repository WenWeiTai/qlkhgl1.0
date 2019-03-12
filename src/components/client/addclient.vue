<template>
  <div class='addmanagerLine-containter'>
    <div class = 'addmanagerLine'>
      <div class='inputBars'>
        <span style="color:red">*</span><span>客户姓名:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="nameInput" placeholder="请输入内容" maxlength="20"></el-input>
      </div>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" >
        <el-form-item
    label="手机号:"
    prop="phone"
    :rules="[
      { required: true, message: '手机号不能为空'},
      { type: 'number', message: '手机号必须为数字值'}
    ]"
  >
    <el-input type="age" v-model.number="numberValidateForm.phone" maxlength="11"></el-input>
  </el-form-item>
  </el-form>
      <div class='inputBar'>
         <span>微信昵称:</span>
          <span style="margin-right:12px"></span>
          <el-input  class="managerAdd-input" v-model="nicknameInput" placeholder="请输入内容" maxlength="20"></el-input>
      </div>
    </div>
    <div class = 'addmanagerLine'>
      <div class='inputBars'>
        <span>性别:</span>
         <span style="margin-right:12px"></span>
         <el-select v-model="sexvalue" placeholder="请选择">
          <el-option
            v-for="item in sexoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select>
      </div>
      <div class='inputBars'>
        <span>年龄:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="ageInput" placeholder="请输入内容" maxlength="3"></el-input>
      </div>
      <div class='inputBars'>
        <span>学历:</span>
         <span style="margin-right:12px"></span>
         <el-select v-model="eduvalue" placeholder="请选择">
          <el-option
            v-for="item in eduoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select>
      </div>
   
    </div>
    <div class="addmanagerLine">
         <div class='inputBars'>
        <span>婚姻状况:</span>
         <span style="margin-right:12px"></span>
         <el-select v-model="marvalue" placeholder="请选择">
          <el-option
            v-for="item in maroptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select>
      </div>
      <div class='inputBar'>
        <span>职业:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="jobInput" placeholder="请输入内容" maxlength="11"></el-input>
      </div>
      <div class='inputBar'>
        <span>常住地址:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="addressInput" placeholder="请输入内容" maxlength=""></el-input>
      </div>
    </div>
    <div class="addmanagerLine">
      <div class='inputBars'>
        <span>近期出现地点:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="currentInput" placeholder="请输入内容" maxlength=""></el-input>
      </div>
      <div class='inputBars'>
        <span>真实姓名:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="truenameInput" placeholder="请输入内容" maxlength=""></el-input>
      </div>
        <div class='inputBars'>
        <span>身份证号:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="idcardInput" placeholder="请输入内容" maxlength="18"></el-input>
      </div>
    </div>
    <div class='addmanagerLine'>
      <div class='inputBars'>
        <span>沟通意向:</span>
         <span style="margin-right:12px"></span>
         <el-select v-model="goutongvalue" placeholder="请选择">
          <el-option
            v-for="item in goutongoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select>
      </div>
      <div class='inputBars'>
        <span>成交意向:</span>
         <span style="margin-right:12px"></span>
         <el-select v-model="chengjiaovalue" placeholder="请选择">
          <el-option
            v-for="item in chengjiaooptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
         </el-select>
      </div>
      <div class='inputBars'>
        <span>微信号:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="wechatInput" placeholder="请输入内容" maxlength=""></el-input>
      </div>
    </div>
    <div class='addmanagerLine'>
        <div class='inputBars'>
        <span style="color:red">*</span><span>所属客户经理:</span>
         <span style="margin-right:12px"></span>
        <el-input  class="managerAdd-input" v-model="managerInput" placeholder="请输入内容" maxlength=""></el-input>
      </div>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="200px" >
        <el-form-item
            label="所属客户经理手机号:"
            prop="managerphone"
            :rules="[
              { required: true, message: '手机号不能为空'},
              { type: 'number', message: '手机号必须为数字值'}
            ]"
  >
    <el-input type="age" v-model.number="numberValidateForm.managerphone" maxlength="11"></el-input>
  </el-form-item>
  </el-form>
    </div>
      <div class="managerImg">
    客户头像：
      <el-upload
          class="avatar-uploader"
          action="url/smallRoutineCustom/uploadImg"
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
import idCard from '../common/Idcard'
export default {
  name:'addmanager',
  data(){
    return{
      nameInput:'',
      phoneInput:'',
      nicknameInput:'',
      ageInput:'',
      jobInput:'',
      addressInput:'',
      truenameInput:'',
      idcardInput:'',
      wechatInput:'',
      managerInput:'',
      currentInput:'',
      taskPicDetailUrl:'',
      rightTitle:'',
      numberValidateForms:'',
      numberValidateForm:{
        phone:'',
        managerphone:''
      },
        sexoptions: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        sexvalue:'',
        eduvalue:'',
        eduoptions:[{
          value:'高中及以下',
          label:'高中及以下'
        },{
          value:'大专',
          label:'大专'
        },{
          value:'本科',
          label:'本科'
        },{
          value:'硕士',
          label:'硕士'
        },{
          value:'博士及以上',
          label:'博士及以上'
        }],
        marvalue:'',
        maroptions:[{
          value:'已婚',
          label:'已婚'
        },{
          value:'未婚',
          label:'未婚'
        }],
        goutongoptions:[{
          value:'待沟通',
          label:'待沟通'
        },{
          value:'沟通中',
          label:'沟通中'
        },{
          value:'沟通结束',
          label:'沟通结束'
        }],
        goutongvalue:'',
        chengjiaovalue:'',
        chengjiaooptions:[{
          value:'强',
          label:'强'
        },{
          value:'中',
          label:'中'
        },{
          value:'弱',
          label:'弱'
        }]
    }
  },
  created(){
      let iseditManager = sessionStorage.getItem('ToclientEditsession');
      if(iseditManager==='true'){
        this.rightTitle = '编辑客户'
        this.managerDetail()
      }else{
        this.rightTitle = '添加客户'
      }
  },
    mounted(){   
    this.$store.state.defaultActive = '客户管理';
    this.$store.state.mainDetailTitle = this.rightTitle;
    this.$store.state.rightTitle = this.rightTitle;
  },
  methods:{
     managerDetail(){
       let managerId = sessionStorage.getItem('clientIdDetail');
       let params = {
        idSCustomInfo : managerId
      }
      this.$store.dispatch("clientDetail", params).then(data => {
      console.log('客户详情',data)
        this.nameInput = data.data.customName,
        this.numberValidateForm.phone = data.data.telephone,
        this.nicknameInput = data.data.nickName,
        this.sexvalue = data.data.sex,
        this.ageInput = data.data.age,
        this.eduvalue = data.data.educate,
        this.marvalue = data.data.married,
        this.jobInput = data.data.job,
        this.currentInput = data.data.recentShowAddress,
        this.truenameInput = data.data.identificationName,
        this.addressInput = data.data.address,
        this.idcardInput = data.data.identificationNumber,
        this.goutongvalue = data.data.communicateIntent,
        this.chengjiaovalue = data.data.investIntent,
        this.wechatInput = data.data.wechatNo,
        this.numberValidateForm.managerphone = data.data.customManagerPhone,
        this.managerInput = data.data.customManagerName,
        this.taskPicDetailUrl = data.data.customImg
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
            axios.post(url.clientimg, fd,config).then(res => {
            console.log('上传图片' ,res.data)
                    loading.close();
                    if(res.data.code==1)
                    {
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
        return this.$message.error('请输入客户名称')
        }
      if(this.numberValidateForm.phone == ''){
        return this.$message.error('请输入电话号')
        }
      if(this.managerInput == ''){
        return this.$message.error('请输入所属客户经理姓名')
      }
      if(this.numberValidateForm.managerphone == ''){
        return this.$message.error('请输入所属客户经理手机号')
      }
      if(this.idcardInput != ""){
        if(idCard(this.idcardInput)==false){
          return this.$message.error('身份证格式输入错误')
        } 
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.numberValidateForm.phone))){
        return this.$message.error('输入手机号格式不对')
      }
       if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.numberValidateForm.managerphone))){
        return this.$message.error('输入手机号格式不对')
      }
    let iseditManager = sessionStorage.getItem('ToclientEditsession');
    let managerId = sessionStorage.getItem('clientIdDetail');
      console.log('jieguo',iseditManager)
      if(iseditManager ==='true'){//编辑
      let params = {
          idSCustomInfo:managerId,
          customName:this.nameInput,
          telephone:this.numberValidateForm.phone,
          nickName:this.nicknameInput,
          sex:this.sexvalue,
          age:this.ageInput,
          educate:this.eduvalue,
          married:this.marvalue,
          job:this.jobInput,
          recentShowAddress:this.currentInput,
          identificationName:this.truenameInput,
          address:this.addressInput,
          identificationNumber:this.idcardInput,
          communicateIntent:this.goutongvalue,
          investIntent:this.chengjiaovalue,
          wechatNo:this.wechatInput,
          customManagerPhone:this.numberValidateForm.managerphone,
          customManagerName:this.managerInput,
          customImg:this.taskPicDetailUrl
        }
      this.$store.dispatch("updateClient", params).then(data => {
      console.log('编辑客户',data.message)
      if(data.code == 1){
        return this.$message.error(data.message)
      }
      this.$router.push('client')
    });

      }else{//添加
        let params = {
          customName:this.nameInput,
          telephone:this.numberValidateForm.phone,
          nickName:this.nicknameInput,
          sex:this.sexvalue,
          age:this.ageInput,
          educate:this.eduvalue,
          married:this.marvalue,
          job:this.jobInput,
          recentShowAddress:this.currentInput,
          identificationName:this.truenameInput,
          address:this.addressInput,
          identificationNumber:this.idcardInput,
          communicateIntent:this.goutongvalue,
          investIntent:this.chengjiaovalue,
          wechatNo:this.wechatInput,
          customManagerPhone:this.numberValidateForm.managerphone,
          customManagerName:this.managerInput,
          customImg:this.taskPicDetailUrl
        }
      this.$store.dispatch("addClient", params).then(data => {
      console.log('添加客户',data)
      if(data.code == 1){
        return this.$message.error(data.message)
      }
      this.$router.push('client')
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
  height: 62px;
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
