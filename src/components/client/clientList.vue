<template>
  <div>
    <div class="searchZone">
      <div class='header'>查询条件</div>
      <div class='searchInput'>
        <div class='searchFont'>客户姓名：
           <span style="margin-right:20px"></span>
          <el-input class='managerName-input' v-model="Nameinput" placeholder="请输入内容"></el-input>
        </div>
        <div class='searchFont'>客户手机号：
           <span style="margin-right:20px"></span>
          <el-input class='managerName-input' v-model="Telinput" placeholder="请输入内容" maxlength="11"></el-input>
        </div>
         <div class='searchFont'>客户经理手机号：
           <span style="margin-right:20px"></span>
          <el-input class='managerName-input' v-model="bossTelinput" placeholder="请输入内容" maxlength="11"></el-input>
        </div>
        
        <div class='searchFont'> 沟通意向：
           <span style="margin-right:20px"></span>
        <el-select class='managerName-input' v-model="goutongvalue" placeholder="请选择" clearable>
          <el-option
            v-for="item in goutongoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>

        <div class='searchFont'> 投资意向：
           <span style="margin-right:20px"></span>
        <el-select class='managerName-input' v-model="touzivalue" placeholder="请选择" clearable>
          <el-option
            v-for="item in touzioptions"
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
        <button class="btn_addManger"@click="addManagerclick">添加客户</button>
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
           <a href="../../static/客户模板.xlsx " >下载表格</a >
           </div>
      </div>
       <el-table
    :data="tableData"
    style="width: 100%">
 
    <el-table-column
      prop="customName"
      label="客户姓名"
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
      label="客户手机号"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="customManagerName"
      label="所属客户经理姓名"
      width=""
      align="center">
    </el-table-column>

    <el-table-column
      prop="customManagerPhone"
      label="所属客户经理手机号"
      width=""
      align="center">
    </el-table-column>
    <el-table-column
      prop="communicateIntent"
      label="沟通意向"
      width=""
      align="center">
    </el-table-column>
     <el-table-column
      prop="investIntent"
      label="成交意向"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="insertDate"
      label="创建时间"
      width="150"
      align="center">
    </el-table-column>
 
    <el-table-column
      label="操作"
      width=""
      align="center">
      <template slot-scope="scope">
        <div>
          <el-button @click="editClick(scope.row)"type="text" size="small">编辑</el-button>
          <el-button @click="deletmanager(scope.row)"type="text" size="small">删除</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> 
        </div>
      </template>
    </el-table-column>
  </el-table>
     <DotRank 
            :totalcount="clientListcount" 
            :pagesize="clientListpagesize" 
            :currentpage="clientListcurrentpage" 
            :totalpages="clientListtotalpages" 
            :tabletitles="clientListtabletitles" 
            :tableData="clientListtableData" 
            :pagesizes="clientListpagesizes" 
            :pages="clientpages" 
            @prev="clientListprevpage" 
            @next="clientListnextpage"
            @changepage="changeClientCurPage"
            @changepagesize="changeClientPageSize">
      </DotRank>
           <el-dialog
          title="删除客户"
          :visible.sync="dialogDeletemanager"
          width="50%"
          center:false
          :before-close="handleClose">
          <span>将删除客户 {{managerName}} ，该客户数据将被清除</span>
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
import url from '../../store/api'
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
      touzioptions:[{value:'强'},{value:'中'},{value:'弱'}],
      goutongoptions:[
        {value:'待沟通'},{value:'沟通中'},{value:'沟通结束'}
      ],
      clientListcount:'',
      clientListpagesize:10,
      clientListcurrentpage:1,
      clientListtotalpages:'',
      clientListtabletitles:'',
      clientListtableData:[],
      clientListpagesizes:'',
      clientpages:'',
      tableData:[],
      managerId:'',
      Netdotinput:'',
      managerName:'',
      goutongvalue:'',
      touzivalue:'',
      bossTelinput:''
    }
  },
  components:{
    DotRank
  },
  created(){
      let params = {
        pageSize:10,
        pageNo:this.clientListcurrentpage
      }
    this.clientListarr(params)
    // axios.post('http://172.19.19.45:8080/smallRoutineAccount/getAccountList',params).then((data)=>{
    //          console.log(data)
    //       })
 
  },
  methods:{
    clientListarr(params){
    this.$store.dispatch("getclientList", params).then(data => {
      console.log('客户列表',data)
      this.tableData = data.data.recordList
      for(let i =0;i<this.tableData.length;i++){
        this.tableData[i].insertDate = timer(this.tableData[i].insertDate)
      }
      this.clientListcount = data.data.totalCount
      this.clientListtotalpages = data.data.totalPageCount
      var pagecountArr = []
        for(let i= 1;i<=data.data.totalPageCount;i++){
            pagecountArr.push({
              value:i,
              label:i
            })
        }
      this.clientpages =  pagecountArr 

    });
    },
    confirm(){
      this.clientListcurrentpage = 1
      let params = {
        pageSize:10,
        pageNo:this.clientListcurrentpage,
        customName:this.Nameinput,
        telephone:this.Telinput,
        customManagerPhone:this.bossTelinput,
        communicateIntent:this.goutongvalue,
        investIntent:this.touzivalue
      }
      this.clientListarr(params)
    // this.$store.dispatch("getclientList", params).then(data => {
    //   console.log('搜索客户列表',data)
    //   this.tableData = data.data.recordList
    //   this.clientListcount = data.data.totalCount
    //   this.clientListtotalpages = data.data.totalPageCount
    //   var pagecountArr = []
    //     for(let i= 1;i<=data.data.totalPageCount;i++){
    //         pagecountArr.push({
    //           value:i,
    //           label:i
    //         })
    //     }
    //   this.clientpages =  pagecountArr 

    // });
    },
    reset(){
      this.Nameinput = '' 
      this.Telinput = ''
      this.Netdotinput = ''
      this.Networkvalue = ''
      this.clientListcurrentpage = 1
      this.goutongvalue = '',
      this.touzivalue = '',
      this.bossTelinput = ''
      let params = {
        pageSize:10,
        pageNo:this.clientListcurrentpage,
        customName:this.Nameinput,
        telephone:this.Telinput,
        customManagerPhone:this.bossTelinput,
        communicateIntent:this.goutongvalue,
        investIntent:this.touzivalue
      }
      this.clientListarr(params)
    },
    handleClose(done) {
      this.dialogDeletemanager = false
    },
    editClick(row){
      let TomanagerEditsession = true;
      sessionStorage.setItem('ToclientEditsession',TomanagerEditsession);
      sessionStorage.setItem('clientIdDetail',row.idSCustomInfo)
      this.$router.push({
        name: "addclient",
      });
    },
    handleClick(row){
      console.log(row)
        let clientEditsession = false;
        sessionStorage.setItem('clientEditsession',clientEditsession);
        this.$store.state.mainDetailTitle = "客户详情";
      // }
      sessionStorage.setItem('clientIdDetail',row.idSCustomInfo)
      this.$router.push({
        name: "clientDeatil",
        params: {
          id: row.idSCustomInfo
        }
      });
    },
    addManagerclick(){
      let TomanagerEditsession = false;
      sessionStorage.setItem('ToclientEditsession',TomanagerEditsession);
      this.$router.push({
        name: "addclient",
      });
    },
    deletmanager(row){
        this.dialogDeletemanager = true
        console.log(row)
        this.managerId = row.idSCustomInfo
        this.managerName = row.customName
    },
    deleteManager(row){
     
      let params = {
        idSCustomInfo: this.managerId
      }
    this.$store.dispatch("deleteClient", params).then(data => {
      console.log('删除客户',data)
      let param = {
        pageSize:10,
        pageNo:this.clientListcurrentpage,
        customName:this.Nameinput,
        telephone:this.Telinput,
        customManagerPhone:this.bossTelinput,
        communicateIntent:this.goutongvalue,
        investIntent:this.touzivalue
      }
      this.clientListarr(param)
      this.dialogDeletemanager = false

    });
    },
    clientListprevpage(){
    if(this.clientListcurrentpage > 1){
        this.clientListcurrentpage--;              
    }else{
        this.$message.error('已经第一页');
    }
       let params = {
        pageSize:10,
        pageNo:this.clientListcurrentpage,
        customName:this.Nameinput,
        telephone:this.Telinput,
        customManagerPhone:this.bossTelinput,
        communicateIntent:this.goutongvalue,
        investIntent:this.touzivalue
      }
      this.clientListarr(params)
    },
    clientListnextpage(){
    if(this.clientListcurrentpage < this.clientListtotalpages){
                  this.clientListcurrentpage++;
      }else{
         this.$message.error('已经是最后一页');
              }
      let params = {
        pageSize:10,
        pageNo:this.clientListcurrentpage,
        customName:this.Nameinput,
        telephone:this.Telinput,
        customManagerPhone:this.bossTelinput,
        communicateIntent:this.goutongvalue,
        investIntent:this.touzivalue
      }
      this.clientListarr(params)
    },
    changeClientCurPage(val){
      console.log('haha',val)
      this.clientListcurrentpage = val
        let params = {
        pageSize:10,
        pageNo:this.clientListcurrentpage,
        customName:this.Nameinput,
        telephone:this.Telinput,
        customManagerPhone:this.bossTelinput,
        communicateIntent:this.goutongvalue,
        investIntent:this.touzivalue
      }
      this.clientListarr(params)
    },
    changeClientPageSize(val){
      console.log('xixi',val) 
    },
    handleAvatarSuccess(res){
      if(res.code == 0){
          this.$message({
          message: '批量上传客户成功',
          type: 'success'
        });
      }else{
       return this.$message.error('上传失败,'+res.message)  
      }  
    },
    UploadUrl(file){
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
            axios.post(url.uploadclientFile, fd,config).then(res => {
            console.log('上传用户' ,res.data)
            loading.close(); 
            this.reset();  
            if(res.data.code ==1){
              this.$message.error(res.data.message)
            }else{
                 this.$message({
                 message: '批量上传客户成功',
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
  text-align: right;
  width: 300px;
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
