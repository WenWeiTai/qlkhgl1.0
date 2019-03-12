import Axios from 'axios';
import qs from 'qs';
import router from '../router/index'
import { Message } from "element-ui";

const axios = Axios.create({
	timeout: 80000,
	withCredentials: true,
    transformRequest: function(data) {
        return qs.stringify(data);
    }
});
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['csrfToken'] = '9EA6EC4DCBE5658676919DD8E4686095';

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === "post") {
      // 本处不需要序列化
      // config.data = qs.stringify(config.data)
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    }

    // 若是有做鉴权token , 就给头部带上token
    // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token;
    }
    return config;
  },
  error => {
    // error 的回调信息,看贵公司的定义
    Message({
      //  饿了么的消息弹窗组件,类似toast
      showClose: true,
      message: error,
      type: "error"
    });
    return Promise.reject(error.data);
  }
);

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
      if(res.data.code == '-2'){
        sessionStorage.removeItem('islogin');
        router.replace('/');
      }
    return res;

  },function(error){
  	if (error.response && error.response.status && 403 === error.response.status) {
	    if(error.response.headers.redirect && error.response.headers.redirect === 'REDIRECT'){
	   		window.location = error.response.headers.contentpath
	    }
    } else {
    	Message({
	      //  饿了么的消息弹窗组件,类似toast
	      showClose: true,
	      message: '网络异常',
	      type: "error"
	    });
        return Promise.reject(error);
    }
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default axios;