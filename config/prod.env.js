'use strict'
// module.exports = {
//   NODE_ENV: '"production"',
//   // 定义测试和生产环境的常量
//   // API_PATH_HTTP: "'http://103.28.215.253:10981'",
//   // API_PATH_HTTPS: "'https://103.28.215.253:10982'",
//   // API_PATH_PROD: "'https://aimkt.pingan.com'"
// }


const target = process.env.npm_lifecycle_event;
if (target == 'build') {
    //生产
    var obj = {
        NODE_ENV: '"production"',
        //post用当前域名
        API_ROOT: '""',
        //数据字典
        API_ROOT_DICT:'"https://aimkt.pingan.com"',
    }
}else if(target == 'test'){
    //http测试
    var obj = {
        NODE_ENV: '"production"',
        //post用当前域名
        API_ROOT: '""',
        //数据字典
        API_ROOT_DICT:'"http://103.28.215.253:10981"',
    }
} else {
  //https测试
  var obj = {
    NODE_ENV: '"production"',
    //post用当前域名
    API_ROOT: '""',
    //数据字典
    API_ROOT_DICT:'"https://103.28.215.253:10982"',
  }
}
module.exports = obj;
