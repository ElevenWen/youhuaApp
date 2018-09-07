

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'


import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import { Lazyload } from 'mint-ui'
import VueScroller from 'vue-scroller'


Vue.use(Mint);
Vue.use(Lazyload)
Vue.use(VueScroller)


import Vuex from 'vuex'
Vue.use(Vuex)


import axios from 'axios';
Vue.prototype.$https = axios;

import tool from './util/tool';
Vue.prototype.commonTool = tool;


 



import originData from './util/originPackaging';

 
//判断用户登录设备--- 设置是否显示隐藏分享按钮

if (tool.is_weixn() || tool.is_ios() || tool.is_android()) {
	window.flagShare = true
} else {
	window.flagShare = true
}

//关键字变红 参数1关键字 ,参数2匹配后需要替换的字



String.prototype.replaceAll = function (text, search, replacement) {
	var target = text;//当前dom中的innerHTML
	//过滤<em></em>
	var tempChange = /<.*>?/ig;
	if (target.match(tempChange)) { //当前dom中的innerHTML若存在<em> 且替换 
		target = target.replace(/(<.*?>)/ig, "")
	}
	// //console.log(target.match(tempChange))
	// //console.log(search )
	// //console.log(target )
	return target.replace(new RegExp(search, 'g'), replacement);
};


// 调用方法<li v-keyWordChange="变红关键字">{{value.patentName}}</li>
Vue.directive('keyWordChange', {
	bind: function (el, binding, vnode) {
		var dataHTML = el.innerHTML;
		// //console.log( dataHTML  );
		//  //console.log( binding.value  )
		//  //console.log( binding )
		//参数1  dom元素内容 参数2 关键字 参数3  关键添加class
		el.innerHTML = dataHTML.replaceAll(dataHTML, binding.value, "<strong  class='keyWordColor'>" + binding.value + "</strong>")
	}
})

//无限滚动加载
Vue.directive('loadMoreDirectives', {
	bind: function (el, binding, vnode) {
		let pageNum = 1;
		let more = true;
		 
		// //console.log("我看是自定义实现块 还是 index.html", binding.value);
		window.scrollCommonFn = function scrollCommonFn() {
			////console.log(event) // ==> 打印出来为 一个window.event
			if (el.offsetHeight <= 0) {
				return
			};
			//  	// //console.log(vnode)  
			//   // // //console.log(document.documentElement.clientHeight+'---'+window.innerHeight); // 可视区域高度  
			//alert(document.body.scrollTop  || document.documentElement.scrollTop) 

			////console.log(document.body.scrollTop || document.documentElement.scrollTop ); // 滚动高度  
			//   // // //console.log(document.body.offsetHeight); // 文档高度  
			//   // // 判断是否滚动到底部  

			//   // // //console.log(document.body.scrollTop || document.documentElement.scrollTop + window.innerHeight ); // 可视区域高度  
			//  	// //console.log("///////")a

			// //console.log( window.innerHeight )
			// //console.log( el.offsetHeight)

			//   ////console.log(document.getElementById("patentResult").offsetHeight); 
			if ((document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight >= el.offsetHeight - 20) {
			 
				// 如果开关打开则加载数据   
				let fnc = binding.value;
				if (more == true) {
					pageNum++;//页数自增
					// 将开关关闭  
					more = false;
					binding.value(pageNum).then(() => {
						more = true
					});
				}
			}

		}
		vnode.context.$nextTick(() => {
			////console.log(el)
			// window.addEventListener('scroll',window.scrollCommonFn(动态参数1, 动态参数2),false);    //window.scrollCommonFn 是自定义的函数名字

			// 注册scroll事件并监听  
			window.addEventListener('scroll', window.scrollCommonFn, false);
		})
	}

})



Vue.prototype.getToken = function () {
	// console.log( this.commonTool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false)  )
	var mes = this.commonTool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token;
	return mes
}

import WXJSSDKOBJ from "./util/ajax";

//微信分享
Vue.prototype.WXshare = function (title, desc, imgUrl, customURL, WXJSSDK = WXJSSDKOBJ) {  //微信分享 

	//console.log(WXJSSDK);
	//参1 title 参2 content 参3 缩略图 参数4  默认./util/ajax 中的WXJSSDK


	var title = title;
	//console.log( title )
	var desc = desc;

	var imgUrl = imgUrl;

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	// debugger;
	// alert("我是account")
	// alert(this.$route.query.Account)
	//判断二次分享 处理
	if (getQueryString("from") || getQueryString("isappinstalled")) { //用户第二次分享
		//判断是否含有用户推荐码
		// if(getQueryString("Account") ){
		// 	var link=   location.href+"&Account="+this.$route.query.Account;
		// 	var customURL = link;
		// }else{ 
		// 	var link=   location.href;
		// 	var customURL = link;
		// }
		var link = location.href;
		var customURL = customURL;
	} else {
		//用户第一次分享
		var link = location.href;
		var customURL = customURL;//获取活动要求分享的连接
	}

	// var link = "https://192.168.1.169:8180/activity/invitePoliteness"

	// var imgUrl = "https://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg";
	//method, data, success,title,des,link,customURL,imgUrl
	// alert(link)  
	// method, data, success,title,desc,link,customURL,imgUrl
	////console.log(desc,"|||||||||||||")
	return WXJSSDK._ajax({
		method: "GET",
		houtaiURL: "url=" + link,//传入后台url
		success: WXJSSDK._wxShare,
		title: title,
		desc: desc,
		link: link,//暂无用处
		customURL: customURL,//自定义分享url
		imgUrl: imgUrl
	})

}

//参1 title 参2 content 参3 缩略图 参数4 默认分享连接    默认调用 ajax ./util/ajax 中的WXJSSDK
// QQ软件内部分享
Vue.prototype.QQshare = function (title, desc, imgUrl, customURL, WXJSSDK = WXJSSDKOBJ) {
	// body...
	var link = location.href;
	return WXJSSDK._ajax({
		method: "GET",
		houtaiURL: "url=" + link,//传入后台url
		success: WXJSSDK._QQShare,
		title: title,
		desc: desc,
		link: link,//暂无用处
		customURL: customURL,//自定义分享url
		imgUrl: imgUrl
	})
}

//给信分享

//手机QQ分享
Vue.prototype.setShareInfoFn = function ({ title, summary, pic, url }) {
	setShareInfo({
		title: title,
		summary: summary,
		pic: pic,
		url: url,
	});
}

//创建空实例
var Event = new Vue();
Vue.prototype.$eventHandle = Event;

const isDebug_mode = process.env.NODE_ENV !== 'production';


Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;



//判断是否在浏览器

/* eslint-disable no-new */

new Vue({
	el: '#appWrap',
	store,
	router,
	template: '<App/>',
	components: { App },
	data: {
		"flagShare": window.flagShare,
		'originData':originData,
		transName:'rightin'
	}
}) 
