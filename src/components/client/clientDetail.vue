<template>
    <div class='manager-container'>
        <div class="managerHeader">
          <div class='managerName'>{{customName}}</div>
          <div class="rightManager" v-if="!isRenzheng">
           <div class="editManager"  @click="toeditManager">
             <i class="el-icon-edit"></i><span>编辑</span></div>
           <div class="delectManager" @click="dialogDeletemanager = true">
             <i class="el-icon-delete"></i><span>删除</span></div>
        </div>
        <div class='mangagerBtn' v-else> 
            <el-button  @click="dialogRefusemanager = true" type="danger" plain>认证拒绝</el-button>
            <el-button type="success" plain>认证通过</el-button>
        </div>
        </div>
        <div class="greyBar"></div>
        <div class='line'>
          <div class='left'><span>手机号:</span><span class="managerInfo">{{telephone}}</span></div>
          <div class='middle'><span>微信昵称:</span><span class="managerInfo">{{nickName}}</span></div>
          <div class='right'><span>性别:</span><span class="managerInfo">{{sex}}</span></div>
        </div>
        <div class='line'>
          <div class='left'><span>年龄:</span><span class="managerInfo">{{age}}</span></div>
          <div class='middle'><span>学历:</span><span class="managerInfo">{{educate}}</span></div>
          <div class='right'><span>婚姻状况:</span><span class="managerInfo">{{married}}</span></div>
        </div>
         <div class='line'>
          <div class='left'><span>职业:</span><span class="managerInfo">{{job}}</span></div>
          <div class='middle'><span>真实姓名:</span><span class="managerInfo">{{identificationName}}</span></div>
          <div class='right'><span>身份证号:</span><span class="managerInfo">{{identificationNumber}}</span></div>
        </div>
        <div class='line'>
          <div class='left'><span>沟通意向:</span><span class="managerInfo">{{communicateIntent}}</span></div>
          <div class='middle'><span>成交意向:</span><span class="managerInfo">{{investIntent}}</span></div>
          <div class='right'><span>微信号:</span><span class="managerInfo">{{bosswechat}}</span></div>
        </div>
         <div class='line'>
          <div class='left'><span>常住地址:</span><span class="managerInfo">{{address}}</span></div>
        </div>
          <div class='line'>
          <div class='left'><span>近期出现地点:</span><span class="managerInfo">{{recentShowAddress}}</span></div>
        </div>
         <div class="managerImgInfo">
        <div><span>客户头像：</span></div><img :src="imgsrc" alt=""></div>
          <el-dialog
          title="删除客户经理"
          :visible.sync="dialogDeletemanager"
          width="50%"
          center:false
          :before-close="handleClose">
          <span>将删除客户{{customName}}，该客户将不能再使用营销小程序</span>
          <span slot="footer" class="dialog-footer"> 
            <el-button @click="deletManager">确 定</el-button>
            <el-button type="primary" @click="dialogDeletemanager = false">取 消</el-button>
          </span>
      </el-dialog>
        </div>  
</template>

<script>
import timer from '../common/timer'
export default {
    data(){
      return{
        dialogDeletemanager:false,
        dialogRefusemanager:false,
        imgsrc:'',
        isRenzheng:'',
        formLabelWidth: '120px',
        textarea:'',
        textLength:'',
        sex:'',//客户性别
        customName:'',//客户姓名
        nickName:'',//微信昵称
        telephone:'',//客户电话
        age:'',//客户年龄
        educate:'',//客户学历
        married:'',//婚姻状况
        bosswechat:'',
        investIntent:'',
        communicateIntent:'',//沟通意向
        identificationName:'',//真实姓名
        identificationNumber:'',//身份证号
        bossimg:'',
        job:'',//客户职业
        address:'',//常住地址
        recentShowAddress:'',//近期出现地点
        managerId:''
      }
    },
    updated(){
      this.textLength = this.textarea.length
    },
    created(){
      this.clientdetail()
      let managerSession = sessionStorage.getItem('clientEditsession');
      if(managerSession == 'true'){
        this.isRenzheng = true
      }
    },
    mounted(){   
        this.$store.state.defaultActive = '客户管理';
        this.$store.state.mainDetailTitle = '客户详情';
        this.$store.state.rightTitle = '客户详情';
  },
  methods:{
    clientdetail(){

      let managerId = sessionStorage.getItem('clientIdDetail');
      this.managerId = managerId
      let params = {
        idSCustomInfo : managerId
      }
    this.$store.dispatch("clientDetail", params).then(data => {
      console.log('客户详情',data)
      this.customName = data.data.customName,
      this.nickName = data.data.nickName,
      this.sex = data.data.sex
      this.telephone = data.data.telephone
      this.age = data.data.age
      this.educate = data.data.educate
      this.married = data.data.married
      this.job = data.data.job
      this.bosswechat = data.data.wechatNo,
      this.communicateIntent = data.data.communicateIntent
      this.investIntent = data.data.investIntent
      this.identificationName = data.data.identificationName
      this.identificationNumber = data.data.identificationNumber
      this.address = data.data.address
      this.recentShowAddress = data.data.recentShowAddress
      this.imgsrc = data.data.customImg
    });
    },
    handleClose(done) {
      this.dialogDeletemanager = false
    },
    handlerefuseClose(done){
      this.dialogRefusemanager = false
    },
    toeditManager(){
      sessionStorage.setItem('clientIdDetail',this.managerId)
      let TomanagerEditsession = true;
      sessionStorage.setItem('ToclientEditsession',TomanagerEditsession);
       this.$router.push({
        name: "addclient",
      });
    },
    deletManager(){
     
      let params = {
        idSCustomInfo: this.managerId
      }
    this.$store.dispatch("deleteClient", params).then(data => {
      console.log('删除客户',data)
      this.clientdetail()
      this.dialogDeletemanager = false
    });
    this.$router.push('client')
    }
  }
}
</script>

<style>
.manager-container{
  background: #fff
}
.managerHeader{
  height: 74px;
  display: flex;
  line-height: 74px;
  justify-content:space-between;
}
.rightManager{
  display: flex;
  margin-right: 24px;
}
.managerName { 
  margin-left:24px;
  font-size: 16px;
  color: #4A4A4A;
  font-family: PingFangSC-Medium;
}
.editManager{
  color: #3367FA ;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  margin-right: 43px;
  cursor:pointer;
}
.delectManager{
  color: #3367FA ;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  cursor: pointer;
}
.greyBar{
  height: 1px;
  margin: 0 24px;
  background: #ddd;
}
.line{
  height: 74px;
  display: flex;
  line-height: 74px;
  justify-content:space-between;
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.left{
 margin-left: 20px;
 width: 300px;
text-align: left;
}
.middle{
  width: 220px;
  text-align: left;
}
.right{
  width: 240px;
  text-align: left;
  margin-right: 20px;
}
.managerInfo{
  margin-left: 10px;
}
.managerImgInfo{
  color: #4A4A4A ;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  text-align: left;
  margin-left: 20px;
  margin-top: 19px;
  display: flex;
}
.managerImgInfo img{
  width: 300px;
  height: 180px;
  border: 2px dashed #2F78EC;
  border-radius: 4px;
  margin-left: 10px;
  display: inline-block;
}
.mangagerBtn{
  margin-right: 20px;
}
.refuseBtn{
  margin-top: 20px;
  text-align: right;
}
.fontnum{
  text-align: right
}

</style>
