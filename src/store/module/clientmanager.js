import axios from '../axiosConfig'
import url from '../api'
export default {
  state: {
      whichProduct:'',
      multipleSelection:[],
      productSelection:[],
  },
  mutations: {

  },
  actions: {
    getclientList({
          commit,
          dispatch
      },param){
          return axios.post(url.getclientList,param).then((data)=>{
              let newData = data.data;
              return newData;
          }).catch(err=>{
              console.log(err);
          });
      },
      deleteClient({
          commit,
          dispatch
      },param){
          return axios.post(url.deleteClient,param).then((data)=>{
              let newData = data.data;
              return newData;
          }).catch(err=>{
              console.log(err);
          });
      },
      clientDetail({
          commit,
          dispatch
      },param){
          return axios.post(url.clientDetail,param).then((data)=>{
              let newData = data.data;
              return newData;
          }).catch(err=>{
              console.log(err);
          });
      },
      updateClient({
          commit,
          dispatch
      },param){
          return axios.post(url.updateClient,param).then((data)=>{
              let newData = data.data;
              return newData;
          }).catch(err=>{
              console.log(err);
          });
      },
      addClient({
          commit,
          dispatch
      },param){
          return axios.post(url.addClient,param).then((data)=>{
              let newData = data.data;
              return newData;
          }).catch(err=>{
              console.log(err);
          });
      },
  }
}