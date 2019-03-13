<template>
    <div class="dotrank-container">
        <div class="table-title">
            {{tablename}}
            <!-- <button class="exporttable" @click="exportExcel">导出表格</button> -->
            <!-- <img src="../assets/download.png" alt="" class="exporttable" @click="exportExcel"> -->
            <img src="../assets/download.png" alt="" class="exporttable" @click="exportExcel" v-if="canDown">
            <img src="../assets/disableDown.png" alt="" class="exporttable" v-if="disableDown">
        </div>
        <el-table
            height="288"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                v-for="tmp in tabletitles"
                :key="tmp.label"
                :prop="tmp.prop"
                :label="tmp.label"
                :width="tmp.width"
                align= 'center'>
            </el-table-column>
        </el-table>
        <div class="pagegination">
            共 {{totalcount}} 条记录，每页展示
            <el-select class="pagesize" disabled v-model="pagesize" @change="changepagesize">
                <el-option
                v-for="item in pagesizes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <img class="arrow-left" src="../assets/arrow.svg" @click="prevpage">
            <el-select class="pages" :value="currentpage" @change="changecurrentpage">
                <el-option
                v-for="item in pages"
                :key="item.value"
                :label="'第'+item.label+'页'"
                :value="item.value">
                </el-option>
            </el-select>
            <img src="../assets/arrow.svg" @click="nextpage">
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                currentpagetmp:1,
                pagesize:10,
                canDown: true,
                disableDown: false
            }
        },
        props:{
            'tablename':{},
            'totalcount':{},
            'currentpage': {
                default:1
            },
            'totalpages':{},
            'tabletitles':{},
            'tableData':{},
            'pagesizes':{},
            'pages':{}
        },
        methods:{
            prevpage(){
                if(this.currentpagetmp > 1){
                    this.currentpagetmp--;
                    
                }
                this.$emit('prev');
            },
            nextpage(){
                if(this.currentpagetmp < this.totalpages){
                    this.currentpagetmp++;
                }
                this.$emit('next');
            },
            changecurrentpage(val){
                this.$emit('changepage',val);
            },
            changepagesize(val){
                this.$emit('changepagesize',val);
            },
            exportExcel(){
                this.canDown = false
                this.disableDown = true
                this.$emit('export');
                setTimeout(()=>{
                    this.canDown = true
                    this.disableDown = false
                },5000)
            }
        },
        watch:{
            dotcurrentpage(newV){
                this.currentpagetmp = newV;
            },
            managercurrentpage(newV){
                this.currentpagetmp = newV;
            },
            detailcurrentpage(){
                this.currentpagetmp = newV;
            }
        }
    }
</script>
<style>
    .el-table th{
        text-align: center;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        font-weight:normal;
    }
    .el-table td{
        font-size: 13px;
        color: #4A4A4A;
        letter-spacing: 0;
        /* 表格内容居中 */
        /* text-align: center; */
    }
    .el-table th.is-leaf{
        border-bottom:none;
        text-align: center;
    }
    .dotrank-container .table-title{
        height:61px;
        line-height: 61px;
        border-bottom:1px solid #dddddd;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        /* font-weight: bold; */
        margin-top:19px;
        /* display: flex;
        justify-content: space-between;*/
        /* padding-right:23px;  */
        position:relative;
    }
    .dotrank-container .table-title .exporttable{
        /* border:1px solid #2f78ec;
        color:#2f78ec;
        border-radius: 4px; */
        float: right;
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        right:23px;
        width:18px;
    }
    .pagegination{
        font-size: 14px;
        color: #9B9B9B;
        letter-spacing: 0;
        text-align: right;
        padding:25px 34px 0 0;
    }
    .pagegination .el-input__inner{
        border:none;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 0;
        padding-left:10px;
        text-align: center;
    }
    .pagegination .el-select.pagesize{
        width:62px;
    }
    .pagegination img{
        width:12px;
        height:12px;
    }
    .pagegination .arrow-left{
        transform: rotateY(180deg);
        margin-left:32px;
    }
    .pagegination .el-select.pages{
        width:90px;
    }
    .pagesize.el-select .el-input.is-disabled .el-input__inner{
            background-color: #ffffff; 
            border: none; 
            color: #4A4A4A;
            cursor: auto;
    }
    .pagesize .el-input.is-disabled .el-input__icon{
        cursor: auto;
    }
</style>

