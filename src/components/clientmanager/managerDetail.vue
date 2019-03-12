<template>
    <div class='manager-container'>
        <div class="managerHeader">
          <div class='managerName'>{{bossName}}</div>
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
          <div class='left'><span>当前积分:</span><span class="managerInfo">{{bossId}}</span></div>
          <div class='middle'><span>手机号:</span><span class="managerInfo">{{bosstelephone}}</span></div>
          <div class='right'><span>微信昵称:</span><span class="managerInfo">{{bosswechat}}</span></div>
        </div>
        <div class='line'>
          <div class='left'><span>网点:</span><span class="managerInfo">{{bossbank}}</span></div>
          <div class='middle'><span>认证时间:</span><span class="managerInfo">{{bosstime}}</span></div>
          <div class='right'><span>认证状态:</span><span class="managerInfo">{{bossstate}}</span></div>
        </div>
         <div class='line'>
          <div class='left'><span>部门:</span><span class="managerInfo">{{bossapart}}</span></div>
          <div class='middle'><span>职位:</span><span class="managerInfo">{{bossjob}}</span></div>
          <div class='right'><span>邮箱:</span><span class="managerInfo">{{bossemail}}</span></div>
        </div>
         <div class="managerImgInfo">
        <div><span>工牌照片：</span></div><img :src="imgsrc" alt=""></div>
          <el-dialog
          title="删除客户经理"
          :visible.sync="dialogDeletemanager"
          width="50%"
          center:false
          :before-close="handleClose">
          <span>将删除客户经理{{bossName}}，该客户经理将不能再使用营销小程序</span>
          <span slot="footer" class="dialog-footer"> 
            <el-button @click="deletManager">确 定</el-button>
            <el-button type="primary" @click="dialogDeletemanager = false">取 消</el-button>
          </span>
      </el-dialog>
         <el-dialog
          title="填写拒绝理由"
          :visible.sync="dialogRefusemanager"
          width="50%"
          center:false
          :before-close="handlerefuseClose">
          <div class='refuseinputDiv'>
            <div style="display:flex">
              <div style="width:100px">拒绝理由：</div>
              <el-input
                type="textarea"
                :rows="2"
                maxlength='36'
                placeholder="请输入拒绝理由，不超过36个字"
                v-model="textarea">
                
              </el-input>
             
            </div>
          </div>
           <div class="fontnum">{{textLength}}/36</div>
          <div class='refuseBtn'>
              <el-button plain @click="dialogRefusemanager = false">取消</el-button>
              <el-button type="primary">完成</el-button>
          </div>
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
        form:{
          input:''
        },
        formLabelWidth: '120px',
        textarea:'',
        textLength:'',
        bossName:'',
        bossId:'',
        bosstelephone:'',
        bosswechat:'',
        bosstime:'',
        bossstate:'',
        bossimg:'',
        bossbank:'',
        bossjob:'',//职位
        bossemail:'',//邮箱
        bossapart:'',//部门
        managerId:''
      }
    },
    updated(){
      this.textLength = this.textarea.length
    },
    created(){
      this.bossdetail()
      let managerSession = sessionStorage.getItem('managerEditsession');
      if(managerSession == 'true'){
        this.isRenzheng = true
      }
    },
    mounted(){   
        this.$store.state.defaultActive = '客户经理管理';
        this.$store.state.mainDetailTitle = '客户经理详情';
        this.$store.state.rightTitle = '客户经理详情';
  },
  methods:{
    bossdetail(){

      let managerId = sessionStorage.getItem('accountIdDetail');
      this.managerId = managerId
      let params = {
        idSCustomManager : managerId
      }
    this.$store.dispatch("bossDetail", params).then(data => {
      console.log('客户经理详情',data)
      this.bossName = data.data.userName,
      this.bossId = data.data.integral,
      this.bossbank = data.data.bankName
      this.bosstelephone =data.data.telephone
      this.bosswechat = data.data.nickName,
      this.bosstime = timer(data.data.identifyTime)
      if(data.data.identify == '0'){
        this.bossstate = '已认证'
      }else{
        this.bossstate = '未认证'
      }
      this.bossimg = data.data.imgurl,
      this.bossjob = data.data.position
      this.bossemail = data.data.email
      this.bossapart = data.data.department,
      this.imgsrc = data.data.userImg
    });
    },
    handleClose(done) {
      this.dialogDeletemanager = false
    },
    handlerefuseClose(done){
      this.dialogRefusemanager = false
    },
    toeditManager(){
      sessionStorage.setItem('accountIdDetail',this.managerId)
      let TomanagerEditsession = true;
      sessionStorage.setItem('TomanagerEditsession',TomanagerEditsession);
       this.$router.push({
        name: "addmanager",
      });
    },
    deletManager(){
     
      let params = {
        idSCustomManager: this.managerId
      }
    this.$store.dispatch("deleteBoss", params).then(data => {
      console.log('删除经理',data)
      this.managerListarr()
      this.dialogDeletemanager = false
    });
    this.$router.push('clientmanager')
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
  width: 200px;
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
