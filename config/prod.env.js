'use strict'
// module.exports = {
//   NODE_ENV: '"production"'
// }


const target = process.env.npm_lifecycle_event;
if (target == 'build') {
    //生产
    var obj = {
        NODE_ENV: '"production"',
        API_ROOT: '"https://aimkt.pingan.com"'
    }
}else if(target == 'test'){
    //测试
    var obj = {
        NODE_ENV: '"production"',
        API_ROOT: '"https://aimkt02-stg.jryzt.com"'
    }
} else {
  // 测试443
  var obj = {
    NODE_ENV: '"production"',
    API_ROOT: '"https://103.28.215.253:10982"'
  }
}

console.log(target)
module.exports = obj;

