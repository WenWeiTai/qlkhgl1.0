import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axiosConfig'
import url from './api'
import clientmanager from './module/clientmanager'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        clientmanager
    },
    state:{
        realtimeActivity:'',
        detailActivity:'',
        detailStartTime:'',
        detailEndTime:'',
        userName:'zhucbeta',
        defaultActive:'',
        rightTitle:'',
        mainDetailTitle:'',
        realTimeType:'',
        dailyType:''
    },
    mutations:{

    },
    actions:{
        // 所有活动列表
        getAllActivity({
            commit,
            dispatch
        },param){
            return axios.post(url.activityList,param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        // 活动概览
        overview({
            commit,
            dispatch
        },param){
            return axios.get(url.activityView+'?'+param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        // 网点排名
        branchRank({
            commit,
            dispatch
        },param){
            return axios.get(url.branchRank+'?'+param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        // 客户经理排名
        managerSortList({
            commit,
            dispatch
        },param){
            return axios.get(url.managerSortlist+'?'+param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        // 每日详细
        defaultQuery({
            commit,
            dispatch
        },param){
            let tmpurl = url.defaultQuery;
            if(param && param != ''){
                tmpurl = url.defaultQuery + '?'+param;
            }
            return axios.get(tmpurl).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        dayDetail({
            commit,
            dispatch
        },param){
            return axios.get(url.dayDetail+'?'+param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        // 登录
        loginIn({
            commit,
            dispatch
        },param){
            return axios.post(url.loginIn,param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        // 退出登录
        logout({
            commit,
            dispatch
        },param){
            return axios.get(url.logout).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        //客户经理每日明细
        customerManagerDetail({
            commit,
            dispatch
        },param){
            return axios.get(url.customerManagerDetail+'?'+param).then(data=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },



//客户经理接口--------------------------------
        getbossList({
            commit,
            dispatch
        },param){
            return axios.post(url.getbossList,param).then((data)=>{
                let newData = data.data;
                return newData;
            }).catch(err=>{
                console.log(err);
            });
        },
        deleteBoss({
          commit,
          dispatch
        },param){
            return axios.post(url.deleteBoss,param).then((data)=>{
              let newData = data.data;
              return newData;
          }).catch(err=>{
              console.log(err);
          });
        },
        bossDetail({
        commit,
        dispatch
        },param){
            return axios.post(url.bossDetail,param).then((data)=>{
            let newData = data.data;
            return newData;
        }).catch(err=>{
            console.log(err);
            });
        },
        updateBoss({
        commit,
        dispatch
        },param){
            return axios.post(url.updateBoss,param).then((data)=>{
            let newData = data.data;
            return newData;
        }).catch(err=>{
            console.log(err);
        });
      },
         addBoss({
        commit,
        dispatch
        },param){
            return axios.post(url.addBoss,param).then((data)=>{
            let newData = data.data;
            return newData;
        }).catch(err=>{
            console.log(err);
        });
      },
   
    }
})
