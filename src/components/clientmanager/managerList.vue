<template>
  <div>
    <div class="searchZone">
      <div class='header'>查询条件</div>
      <div class='searchInput'>
        <div class='searchFont'>客户经理姓名：
           <span style="margin-right:20px"></span>
          <el-input class='managerName-input' v-model="Nameinput" placeholder="请输入内容"></el-input>
        </div>
        <div class='searchFont'>手机号：
           <span style="margin-right:20px"></span>
          <el-input class='managerName-input' v-model="Telinput" placeholder="请输入内容" maxlength="11"></el-input>
        </div>
        <div class='searchFont'> 所属网点：
           <span style="margin-right:20px"></span>
          <el-input class='managerName-input' v-model="Netdotinput" placeholder="请输入内容"></el-input>
        </div>
        <div class='searchFont'> 认证状态：
           <span style="margin-right:20px"></span>
        <el-select class='managerName-input' v-model="Networkvalue" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
       </div>
       <div class="managerSearchBtn">
         <button class="btn_confirm" @click="confirm">查询</button>
         <button class="btn_reset" @click="reset">重置</button>
       </div>
    </div>
    <div class="listZone">
      <div class='addManager'>
         <!-- <el-button  @click="addManagerclick" class="managerListadd" type="primary">添加客户经理</el-button>
         <el-button class="managerListadd" type="primary" plain>批量导入</el-button> -->
        <button class="btn_addManger"@click="addManagerclick">添加客户经理</button>
        <el-upload
          class="btn_inster"
          :action="UploadUrl()"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          >
        <!-- <button class="btn_inster" @click="reset">批量导入</button> -->
         <div>批量导入</div>
        </el-upload>
         <div class='downloadList'>
           <a href="../../static/客户经理模板.xlsx " >下载表格</a >
           </div>
      </div>
       <el-table
    :data="tableData"
    style="width: 100%">
 
    <el-table-column
      prop="userName"
      label="真实姓名"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="微信昵称"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="telephone"
      label="手机号"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="bankName"
      label="所属网点"
      width=""
      align="center">
    </el-table-column>

    <el-table-column
      prop="identify"
      label="认证状态"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="identifyTime"
      label="认证时间"
      width="150"
      align="center">
    </el-table-column>
    <el-table-column
      prop="integral"
      label="当前积分"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      width=""
      align="center">
      <template slot-scope="scope">
        <div  v-if="scope.row.staute == null">
          <el-button @click="editClick(scope.row)"type="text" size="small">编辑</el-button>
          <el-button @click="deletmanager(scope.row)"type="text" size="small">删除</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> 
        </div>
        <div v-else>
         <div   @click="handleClick(scope.row)" class= 'goAuthentication'>去认证></div>
        </div>
      </template>
    </el-table-column>
  </el-table>
     <DotRank 
            :totalcount="managerListcount" 
            :pagesize="managerListpagesize" 
            :currentpage="managerListcurrentpage" 
            :totalpages="managerListtotalpages" 
            :tabletitles="managerListtabletitles" 
            :tableData="managerListtableData" 
            :pagesizes="managerListpagesizes" 
            :pages="managerpages" 
            @prev="managerListprevpage" 
            @next="managerListnextpage"
            @changepage="changeManagerCurPage"
            @changepagesize="changeManagerPageSize">
      </DotRank>
           <el-dialog
          title="删除客户经理"
          :visible.sync="dialogDeletemanager"
          width="50%"
          center:false
          :before-close="handleClose">
          <span>将删除客户经理 {{managerName}} ，该客户经理将不能再使用营销小程序</span>
          <span slot="footer" class="dialog-footer"> 
            <el-button @click="deleteManager()">确 定</el-button>
            <el-button type="primary" @click="dialogDeletemanager = false">取 消</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DotRank from "../common/chooseBar";
import boss from '../../store/api'
import axios from 'axios'
import qs from 'qs'
import timer from '../common/timer'
export default {
  name:'managerList',
  data(){
    return{
      dialogDeletemanager:false,
      Nameinput:'',
      Telinput:'',
      Authenticationvalue:'',//认证状态
      Networkvalue:'',//网点
      options1:[],
      options2:[
        {value:'已认证'},{value:'未认证'}
      ],
      managerListcount:'',
      managerListpagesize:10,
      managerListcurrentpage:1,
      managerListtotalpages:'',
      managerListtabletitles:'',
      managerListtableData:[],
      managerListpagesizes:'',
      managerpages:'',
      tableData:[],
      managerId:'',
      Netdotinput:'',
      managerName:''
    }
  },
  components:{
    DotRank
  },
  created(){
        let params = {
        pageSize:10,
        pageNo:this.managerListcurrentpage
      }
      this.managerListarr(params)
    // axios.post('http://172.19.19.45:8080/smallRoutineAccount/getAccountList',params).then((data)=>{
    //          console.log(data)
    //       })
     for(let i = 0;i<this.tableData.length;i++){
      if(this.tableData[i].staute == 1){
      this.tableData[i].staute = '认证成功'
    }else{
      this.tableData[i].staute = '待认证'
      }
     }
 
  },
  methods:{
    managerListarr(params){
      // let params = {
      //   pageSize:10,
      //   pageNo:this.managerListcurrentpage
      // }
    this.$store.dispatch("getbossList", params).then(data => {
      console.log('客户经理列表',data)
      this.tableData = data.data.recordList
      for(let i =0;i<this.tableData.length;i++){
        this.tableData[i].identifyTime = timer(this.tableData[i].identifyTime)
      }
      this.managerListcount = data.data.totalCount
      this.managerListtotalpages = data.data.totalPageCount
      var pagecountArr = []
        for(let i= 1;i<=data.data.totalPageCount;i++){
            pagecountArr.push({
              value:i,
              label:i
            })
        }
      for(let i =0;i<this.tableData.length;i++)
      if(this.tableData[i].identify == '0'){
        this.tableData[i].identify = '已认证'
      }else if(this.tableData[i].identify == '1'){
         this.tableData[i].identify = '未认证'
      }
      this.managerpages =  pagecountArr 
    });
    },
    confirm(){
      this.managerListcurrentpage = 1
      let identifyState 
      console.log(this.Networkvalue)
      if(this.Networkvalue === '已认证'){
        identifyState = 0
      }else if(this.Networkvalue === '未认证'){
        identifyState = 1
      }else{
        identifyState = this.Networkvalue
      }
      let params = {
        pageSize:10,
        pageNo:1,
        userName:this.Nameinput,
        telephone:this.Telinput,
        bankName:this.Netdotinput,
        identify:identifyState
      }
      this.managerListarr(params)
    // this.$store.dispatch("getbossList", params).then(data => {
    //   console.log('搜索客户经理列表',data)
    //   this.tableData = data.data.recordList
    //   this.managerListcount = data.data.totalCount
    //   this.managerListtotalpages = data.data.totalPageCount
    //   var pagecountArr = []
    //     for(let i= 1;i<=data.data.totalPageCount;i++){
    //         pagecountArr.push({
    //           value:i,
    //           label:i
    //         })
    //     }
    //   this.managerpages =  pagecountArr 

    // });
    },
    reset(){
      this.Nameinput = '' 
      this.Telinput = ''
      this.Netdotinput = ''
      this.Networkvalue = ''
      this.managerListcurrentpage = 1
      let identifyState 
      console.log(this.Networkvalue)
      if(this.Networkvalue === '已认证'){
        identifyState = 0
      }else if(this.Networkvalue === '未认证'){
        identifyState = 1
      }else{
        identifyState = this.Networkvalue
      }
      let params = {
        pageSize:10,
        pageNo:1,
        userName:this.Nameinput,
        telephone:this.Telinput,
        bankName:this.Netdotinput,
        identify:identifyState
      }
      this.managerListarr(params)
    },
    handleClose(done) {
      this.dialogDeletemanager = false
    },
    editClick(row){
      let TomanagerEditsession = true;
      sessionStorage.setItem('TomanagerEditsession',TomanagerEditsession);
      sessionStorage.setItem('accountIdDetail',row.idSCustomManager)
      console.log(row)
      this.$router.push({
        name: "addmanager",
      });
    },
    handleClick(row){
      console.log(row)
      if(row.staute =='待认证'){
        this.$store.state.mainDetailTitle = "客户经理认证";
        let managerEditsession = true;
        sessionStorage.setItem('managerEditsession',managerEditsession);
      }else{
        let managerEditsession = false;
        sessionStorage.setItem('managerEditsession',managerEditsession);
        this.$store.state.mainDetailTitle = "客户经理详情详情";
      }
      sessionStorage.setItem('accountIdDetail',row.idSCustomManager)
      this.$router.push({
        name: "managerDeatil",
        params: {
          id: row.accountId
        }
      });
    },
    addManagerclick(){
      let TomanagerEditsession = false;
      sessionStorage.setItem('TomanagerEditsession',TomanagerEditsession);
      this.$router.push({
        name: "addmanager",
      });
    },
    deletmanager(row){
        this.dialogDeletemanager = true
        console.log(row.accountId)
        this.managerId = row.idSCustomManager
        this.managerName = row.userName
    },
    deleteManager(row){
     
      let params = {
        idSCustomManager: this.managerId
      }
    this.$store.dispatch("deleteBoss", params).then(data => {
      console.log('删除经理',data)
      let identifyState 
      console.log(this.Networkvalue)
      if(this.Networkvalue === '已认证'){
        identifyState = 0
      }else if(this.Networkvalue === '未认证'){
        identifyState = 1
      }else{
        identifyState = this.Networkvalue
      }
      let param = {
        pageSize:10,
        pageNo:this.managerListcurrentpage,
        userName:this.Nameinput,
        telephone:this.Telinput,
        bankName:this.Netdotinput,
        identify:identifyState
      }
      this.managerListarr(param)
      this.dialogDeletemanager = false

    });
    },
    managerListprevpage(){
    if(this.managerListcurrentpage > 1){
        this.managerListcurrentpage--;              
    }else{
        this.$message.error('已经第一页');
    }
    let identifyState 
      console.log(this.Networkvalue)
      if(this.Networkvalue === '已认证'){
        identifyState = 0
      }else if(this.Networkvalue === '未认证'){
        identifyState = 1
      }else{
        identifyState = this.Networkvalue
      }
    let params = {
        pageSize:10,
        pageNo:this.managerListcurrentpage,
        userName:this.Nameinput,
        telephone:this.Telinput,
        bankName:this.Netdotinput,
        identify:identifyState
      }
       this.managerListarr(params)  
    },
    managerListnextpage(){
    if(this.managerListcurrentpage < this.managerListtotalpages){
                  this.managerListcurrentpage++;
      }else{
         this.$message.error('已经是最后一页');
              }
    let identifyState 
      console.log(this.Networkvalue)
      if(this.Networkvalue === '已认证'){
        identifyState = 0
      }else if(this.Networkvalue === '未认证'){
        identifyState = 1
      }else{
        identifyState = this.Networkvalue
      }
       let params = {
        pageSize:10,
        pageNo:this.managerListcurrentpage,
        userName:this.Nameinput,
        telephone:this.Telinput,
        bankName:this.Netdotinput,
        identify:identifyState
      }       
      this.managerListarr(params)
    },
    changeManagerCurPage(val){
      console.log('haha',val)
      let identifyState 
      console.log(this.Networkvalue)
      if(this.Networkvalue === '已认证'){
        identifyState = 0
      }else if(this.Networkvalue === '未认证'){
        identifyState = 1
      }else{
        identifyState = this.Networkvalue
      }
      this.managerListcurrentpage = val
        let params = {
        pageSize:10,
        pageNo:this.managerListcurrentpage,
        userName:this.Nameinput,
        telephone:this.Telinput,
        bankName:this.Netdotinput,
        identify:identifyState
      }       
      this.managerListarr(params)
    },
    changeManagerPageSize(val){
      console.log('xixi',val) 
    },
    handleAvatarSuccess(res){
      if(res.code == 0){
          this.$message({
          message: '批量上传客户经理成功',
          type: 'success'
        });
      }else{
          return this.$message.error('上传失败,'+res.message)  
        // this.$message.error('上传失败')
      }
     
    },
    UploadUrl(){
      return ''
    },
    beforeAvatarUpload(file){
        const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isExcel) { 
           this.$message.error('上传文件只能是 XLSX/XLS 格式!');
            return false;
        }
    
      //上传文件
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
            axios.post(boss.uploadFile, fd,config).then(res => {
            console.log('上传用户经理' ,res.data)
            loading.close();
            let params = {
                pageSize:10,
                pageNo:1
              }
            this.managerListarr(params)
            if(res.data.code ==1){
              this.$message.error(res.data.message)
            }else{
                this.$message({
                 message: '批量上传客户经理成功',
                 type: 'success'
             });
            }  
             })
       
    }
  }
}
</script>

<style>
  .searchZone{
    margin-top: 15px;
    background: #fff;
    text-align: left
  }
  .searchZone .header{
    font-size: 12px;
    margin-left: 20px;
    padding-top: 10px;
  }
  .listZone{
    margin-top: 20px;
    background: #fff
  }
  .searchInput{
    display: flex;
    color: #4A4A4A;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    flex-wrap:wrap;
  }
.managerName-input.el-input{
  width: 160px;
  height: 40px;
}
.managerName-input.el-select{
  width: 160px;
  height: 40px;
}
.searchFont{
  margin-left: 20px;
  padding-top: 10px;
}
.managerSearchBtn{
  margin-top: 20px;
  margin-left: 20px;
  padding-bottom: 20px;
}
.managerListadd .el-button{
  width: 20px;
}
.addManager{
  display: flex;
  text-align: left; 
  padding-top: 15px;
  margin-left: 15px;
}
.downloadList{
  height: 32px;
  line-height: 32px;
  display: inline;
  text-decoration: underline;
  color:  #3367fa;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
}
.goAuthentication{
  background-image: linear-gradient(-90deg, #3367fa 0%, #5a9afb 96%);
  color: #fff;
  border-radius: 5px;
  font-family: PingFangSC-Medium;
  cursor: pointer;
}
.btn_confirm{
  width:64px;
  height:32px;
  font-size: 14px;
  background-image: linear-gradient(-90deg,#5A9AFB 0%, #3367FA  96%);
  color:#ffffff;
  border-radius: 4px;
  border:none;
  cursor: pointer;
}
.btn_reset{
  width:64px;
  height:32px;
  border-radius: 4px;
  border:1px solid #2F78EC;
  background:#ffffff;
  color:#2F78EC;
  margin-left:16px;
  cursor: pointer;
}
.btn_addManger{ 
  width:100px;
  height:32px;
  font-size: 14px;
  background-image: linear-gradient(-90deg,#5A9AFB 0%, #3367FA  96%);
  color:#ffffff;
  border-radius: 4px;
  border:none;
  cursor: pointer;
}
.btn_inster{
  font-size: 14px;
  width:100px;
  height:32px;
  border-radius: 4px;
  border:1px solid #2F78EC;
  background:#ffffff;
  color:#2F78EC;
  margin-left:16px;
  cursor: pointer;
  text-align: center;
  line-height: 32px;
}
.uploadFile{
  text-align: center
}
</style>
