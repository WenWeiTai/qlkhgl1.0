
let url = '/pro';
// let url = 'https://aimkt.pingan.com';
// let url = 'https://sales-engine-leshan.credoo.org:27100';
// let url = 'http://103.28.215.253:10981';

export default {
    activityList:url+'/report/activityList',//下拉列表
    activityView:url+'/report/activityView',//活动概览
    branchRank:url+'/report/branchRank',//网点排名
    managerSortlist:url+'/selfCenter/managerSortlist',//客户经理排名
    defaultQuery:url+'/report/defaultQuery',// 下拉列表默认
    dayDetail:url+'/report/dayDetail',// 每日明细
    loginIn:url+'/userLogin/login',
    logout:url+'/userLogin/logout',
    customerManagerDetail:url+'/report/managerDayDetail',// 客户经理每日明细
    exportExcel:url+'/reportExport/excelExport', //下载excel



    getbossList:url + '/smallRoutineAccount/getAccountList',//获取客户经理列表
    deleteBoss:url + '/smallRoutineAccount/delAccount',//删除客户经理
    bossDetail:url + '/smallRoutineAccount/accountDetail',//客户经理详情
    updateBoss:url + '/smallRoutineAccount/updateAccount',//更新客户经理
    addBoss:url + '/smallRoutineAccount/addAccount',//添加客户经理
    bossimg:url + '/smallRoutineAccount/uploadImg',//上传客户经理工牌
    uploadFile:url + '/smallRoutineAccount/importManage',//批量导入客户经理

    getclientList:url + '/smallRoutineCustom/getCustomList',//获取客户列表
    deleteClient:url + '/smallRoutineCustom/delCustom',//删除客户
    clientDetail:url + '/smallRoutineCustom/detailCustom',//客户详情
    updateClient:url + '/smallRoutineCustom/updateCustom',//更新客户
    addClient:url + '/smallRoutineCustom/addCustom',//添加客户
    clientimg:url + '/smallRoutineCustom/uploadImg',//上传客户头像
    uploadclientFile:url + '/smallRoutineCustom/importCustom',//批量导入客户
}