<template>
	<div id="downloadAPP">
		<header-title title="下载应用"></header-title>
		<div class="downloadAPP">
			<div class="downloadIOS" @click="downloadIOS">
				<img src="../../assets/images/theCoupleRegistered/iPhoneDWL@3x.png" />
			</div>
			<div class="downloadAndroid"  @click="download">
				<img src="../../assets/images/theCoupleRegistered/AndroidDWL@3x.png" />
			</div>
		</div>
		<div id="img" @touchmove.prevent v-if="isOpen"><img src="../../assets/images/mine/download@3x.png"/></div>
	</div>
</template>

<script>
	import headerTitle from "../components/header-title";
	import { MessageBox } from 'mint-ui';
	import tool from '../../util/tool';
	export default {
		data() {
			return {
				 isOpen:false,
			}
		},
		created(){
			// 判断用户手机类型
		    if(tool.is_ios() ){ // ios自动跳转苹果应用商城下载
		    	window.location.href = 'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BC%81%E5%AE%9D/id1313109529?mt=8';
		    }else{
		    	  //is_android  提示浏览器打开这个页面然后自动下载
		    	this.download(); 
		    }
		  
		},
		components: {
			headerTitle,
		},
		methods:{
			download(){//安卓自动下载
				var  ua = navigator.userAgent.toLowerCase();  
				// 如果用户在微信浏览器里打开,则开启模态框提示去浏览器中
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			       this.isOpen = true;
			    } else {  
			        location.href = "https://host.wqbol.com/wqbol.apk";
			    }  
			},
			autoDown(){
				location.href = "https://host.wqbol.com/wqbol.apk";
			},
			downloadIOS(){//苹果应用市场下载
				window.location.href = 'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BC%81%E5%AE%9D/id1313109529?mt=8';
			}	
		},
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less"; 
	#downloadAPP {
     width: 100%;
     height: 94%;
     position: fixed;
}
 .downloadAPP {
     margin-top: 1.1891891891891893rem;
     width: 100%;
     height: 100%;
     margin-bottom: -1.3513513513513513rem;
     background-size: 100% 100%;
     .bg-image('../../assets/images/theCoupleRegistered/background');
}
 .downloadAPP div {
     width: 80%;
    /*/
     / height: 1.5135135135135136rem;
     */
     margin: 0 auto;
}
 .downloadIOS {
     padding-top: 26%;
}
 .downloadAndroid {
     padding-top: 1%;
}
 #img{
     width: 100%;
     position: fixed;
     left: 0;
     top: 0;
     bottom: 0;
     background: #000000;
     opacity: 0.76;
     z-index: 999;
}
 #img img{
     margin-top: 0.2702702702702703rem;
     margin-right: 0.7567567567567568rem;
}
 
</style>