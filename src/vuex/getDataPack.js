import axios from 'axios'
import qs from 'qs'
import { Indicator, MessageBox, Toast } from 'mint-ui';
import tool from '../util/tool.js'
import * as types from './mutations_types.js'
import store from './mine/mine.js'
import message from './message/message.js'
import storeI from '../vuex/index.js';
import router from '../router/index.js';
import Vue from 'vue'


axios.defaults.timeout = 123123;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 线下开发环境
axios.defaults.baseURL = 'https://api.wqbol.net/'; 

// 线上生产环境
//    axios.defaults.baseURL = 'https://api.wqbol.com/';  
//POST传参序列化
axios.interceptors.request.use((config) => {
    //如果是获取人气专场数据，则不需要显示Indicator
	var reg = new RegExp('Product/GetAllList');
	if(!reg.test(config.url)){
		Indicator.open({
	        text: '加载中...',
	        spinnerType: 'fading-circle'
	    });
	}
    //  //只要登录了，自带token
    if (tool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token) {
        var token = tool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token;
        if (config.method === 'post') {
            //判断营业执照识别接口是否需要序列化
            var patt1 = new RegExp("https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json");
            //判断图片上传是否需要序列化
            var patt2 = new RegExp("/Upload/Save");
            if (!patt1.test(config.url) && !patt2.test(config.url)) {
                config.data.Token = token;
                config.data = qs.stringify(config.data);
            }

        } else if (config.method === 'get') {
            if (config.params) {
                //当属性存在覆盖
                config.params.Token = token;
                config.params.datatype = "json";
            } else {
                //不存在添加 
                config.params = {
                    "Token": token,
                    "datatype": "json"
                }
            }
        }
    } 
    // else if(sessionStorage.getItem('login_user_id')){
    //     if(sessionStorage.getItem('login_user_id').Token){
    //         var token = sessionStorage.getItem('login_user_id').Token;
    //         if (config.method === 'post') {
    //             //判断营业执照识别接口是否需要序列化
    //             var patt1 = new RegExp("https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json");
    //             //判断图片上传是否需要序列化
    //             var patt2 = new RegExp("/Upload/Save");
    //             if (!patt1.test(config.url) && !patt2.test(config.url)) {
    //             
                    
    //                 config.data.Token = token;
    //                 config.data = qs.stringify(config.data);
    //             }

    //         } else if (config.method === 'get') {
    //             if (config.params) {
    //                 //当属性存在覆盖
    //                 config.params.Token = token;
    //                 config.params.datatype = "json";
    //             } else {
    //                 //不存在添加 
    //                 config.params = {
    //                     "Token": token,
    //                     "datatype": "json"
    //                 }
    //             }
    //         }
    //     }
    // }
    else{
        if (config.method === 'post') {
            //判断营业执照识别接口是否需要序列化
            var patt1 = new RegExp("https://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json");
            if (!patt1.test(config.url)) {
                //console.log('222222222',config ) 
                config.data = qs.stringify(config.data);
            }
        }
    }

    return config;
}, (error) => {
    // console.log("==============")
//       console.log(error)

    Indicator.close();
    MessageBox({
        title: 'Error',
        message: 'Error',
        showCancelButton: true
    });
    ////console.log(error,"qqqq")
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
//        console.log(res); 
    //用来判断天眼查接口 不可随意变动
    if (!res.data.success) {
        //用来判断调取阿里巴巴营业执照识别接口后返回值
        if (res.data.outputs) {
            return res;
        }
        //失败返回
        if (res.data.error_code == "0") {
            return res;
        } else {

            //==============天眼查 数据临时存储 不可随意修改
            if (res.data.total != 0 && res.data.hasOwnProperty("total")) {
                return Promise.reject(res);
            }
            //==============数据临时存储 
            //新增公司错误判断
            
            //没有登录
	        if(res.data.code == "300001"){
	        	localStorage.removeItem("login_user_id");
			    sessionStorage.removeItem("_systemLength_");
			    store.commit(types.LOGOUT);
				
				
				storeI.commit('message/setSysten',0);
				storeI.dispatch('mine_index/REQUEST_MYWALLETPARTICULARS','false').then(()=>{
					if(router.currentRoute.fullPath == "/home"){
						
					}else{
						router.replace({
		                    path: '/mine/login',
		                    query: { redirect: router.currentRoute.fullPath }
		                })
					}
				})
	        }
            return Promise.reject(res);
        }
    }

    return res;
}, (error) => {
   
      console.log(error,"失败");
      
    Indicator.close();
    
    var reg = /(timeout)|(exceeded)/;
    //超时处理
    if(reg.test(error)){
        
    }
    
    //若token失效，跳转登录页
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 401 清除token信息并跳转到登录页面
                store.commit(types.LOGOUT);
                router.replace({
                    path: '/mine/login',
                    query: { redirect: router.currentRoute.fullPath }
                })
        }
    }

    return Promise.reject(error).then(function (reason) { 
        //console.log(reason)
        // 未被调用
    }, function (reason) {
        //console.log(reason) 
    });
});
export default {
    fetch(type, url, params) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case 'post': 
                    axios.post(url, params)
                        .then(response => {
                            Indicator.close();
                            resolve(response.data); 
                        })
                        .catch((error) => {
                            // console.log(err,"post");
                            reject(error);
                            setTimeout(function () {
                                Indicator.close();
                            }, 2000);
                        })
                    break;
                case 'get': 
                    axios.get(url, params)
                        .then(response => {
                            Indicator.close(); 
                            resolve(response.data);
                        })
                        .catch((error) => {
                            Indicator.close();
                            // console.log(error,"get2222222222")
                            reject(error);
                             
                        })
                    break;
            }

        })
    }
}

