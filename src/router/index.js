import Vue from 'vue'
import Router from 'vue-router'
import ReportForm from '@/components/ReportForm'
import Login from '@/components/login'
import MainContainer from '@/components/MainContainer'
//客户经理管理
import Clientmanager from '@/components/clientmanager/index.vue'
import ManagerDeatil from '@/components/clientmanager/managerDetail'
import Addmanager from '@/components/clientmanager/addmanager'
//客户管理
import Client from '@/components/client/index.vue'
import clientDeatil from '@/components/client/clientDetail'
import Addclient from '@/components/client/addclient'
import clientList from '@/components/client/clientList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      component: MainContainer,
      children: [{
        path: '/',
        name: 'ReportForm',
        component: ReportForm
      },
      {
        path: 'clientmanager',
        name: 'clientmanager',
        component: Clientmanager
      },
      {
        path: 'managerDeatil',
        name: 'managerDeatil',
        component: ManagerDeatil
      },
      {
        path: 'addmanager',
        name: 'addmanager',
        component: Addmanager
      },
      {
        path: 'client',
        name: 'client',
        component: Client
      },
      {
        path: 'clientDeatil',
        name: 'clientDeatil',
        component: clientDeatil
      },
      {
        path: 'addclient',
        name: 'addclient',
        component: Addclient
      },
      {
        path: 'clientList',
        name: 'clientList',
        component: clientList
      }
  ]
    }  
  ]
})
