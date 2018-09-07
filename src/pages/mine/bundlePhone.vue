<template>
	<div id="bundle-phone">
		<div class="bundle-header">
			<span class="return" @click="toReturn"></span>
			绑定手机号
		</div>
		<ul class="bundle-list">
			<li><span>手机号</span><input type="tel" placeholder="请输入手机号" v-model="phone"  @blur="verifyP" maxlength="11"/></li>
			<li>
				<span>验证码</span>
				<input type="Number" placeholder="请输入验证码" v-model="noteCode" @blur="verifyM"/>
				<button @click="getVerification" type="button" :class="isPhone?'active':''" v-if="isGet">获取验证码</button>
				<button type="button" v-if="!isGet">重新获取{{time}}s</button>
			</li>
		</ul>
		<div class="btn" :class="phone&&noteCode?'selected':''" @click="revise">确认</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import { Indicator,Toast } from 'mint-ui';
	import * as types from '../../vuex/mutations_types.js';
	import store from '../../vuex/mine/mine.js';
	import  tool from "../../util/tool";
	export default{
		data(){
			return{
				phone:"",//手机号
				isPhone:false,//判断手机号是否填写整缺
				noteCode:"",//验证码
				isGet:true,//是否获取验证码是否填写整缺
				time:45,
				isCode:false,//判断验证码是否填写整缺
				registerResource:0,//注册来源
			}
		},
		methods:{
			//返回
			toReturn(){
				this.$router.go(-1);
			},
			//判断手机号
        	verifyP(){
				if(this.phone.length <= 0){
					return;
				}
				var status = this.commonTool.regularJudgement("phone",this.phone);
				if (status) {
					this.isPhone = true;
				}else{
					this.isPhone = false;
				}
        	},
        	//获取验证码
        	getVerification(){
        		var timer = null;
        		if(this.isPhone){
        			this.isGet = false;
        			var params = {
	        			mobile:this.phone
	        		};
        			getd.getVerification(params)
	        		.then((res)=>{
	        			
	        		})
	        		//倒计时45s
	        		timer = setInterval(()=>{ 
	        			if(this.time==1){
	        				this.time = 45;
	        				clearInterval(timer);
	        				this.isGet = true;
	        			}else{
	        				this.time--;
	        			}
	        		},1000)
        		}
        	},
        	//判断验证码
        	verifyM(){
				if(this.noteCode.length <= 0){
					return;
				}
				var status = this.commonTool.regularJudgement("noteCode",this.noteCode);
				if (status) {
					this.isCode = true;
				}else{
					this.isCode = false;
				}
        	},
        	//修改
        	revise(){
        		//判断终端设备是否为微信浏览器
            	if(tool.is_weixn()){
            		//为公众号
            		this.registerResource = 3;
            	}else{
            		//为app
            		this.registerResource = 0;
            	}
            	
        		if(this.isPhone&&this.isCode){
        			var params = {
        				type:this.$route.params.type,
        				openId:this.$route.params.openId,
        				accessToken:this.$route.params.accessToken,
        				LoginName:this.phone,
        				VerifyCode:this.noteCode,
        				regSource:this.registerResource,
        				datatype:"json"
        			}
        			getd.bindApp(params)
        			.then((res)=>{
        				//console.log(res);
        				this.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',res.data);
						store.commit(types.LOGIN, res.data.Token);
						//是否在app内
	        			var ua = navigator.userAgent.toLowerCase();
		        		if(ua.match(/wqbol/i)=="wqbol"){
							//是否首次登陆
		        			if(res.data.LastLoginTime===null){
		        				store.commit(types.FIRST, true);
		        				//活动是否到期
			        			var str = res.data.ActivityEndTime.slice(6,19);
		        				var t = new Date().getTime();
			        			if(str>t){
			        				store.commit(types.JUDGE, true);
			        				let redirect = decodeURIComponent(this.$route.query.redirect || '/');
							        this.$router.replace({
							            path: redirect
							        });
			        			}else{
			        				this.$router.replace('/mine/myInformation');
			        			}
		        			}else{
		        				this.$router.replace('/home');
		        			}
	        			}else if(this.$route.params.type == 1){
	        				location.href= "https://host.wqbol.com/home/downloadApp";
	        			}else{
	        				this.$router.replace('/home');
	        			}
        			})
        			.catch((error)=>{
						Indicator.close();
						 Toast({
						   message: error.data.msg, 
						   duration: 2000
						 });
					})
        		}
        	}
		}
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
	input{
		outline: none !important;
		border: none !important;
		font-size: .346667rem !important;	
	}
	#bundle-phone{
     width: 100%;
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
}
 .bundle-header{
     width: 100%;
     text-align: center;
     line-height: 1.1891891891891893rem;
     font-size: 0.4864864864864865rem;
     background: #fff;
     color: #1a1715;
     .border-1pxB(#ccc);
     margin-bottom: 0.32432432432432434rem;
}
 .bundle-header .return{
     position: absolute;
     left: 0;
     top: 0;
     height: 1.1891891891891893rem;
     width: 1.1081081081081081rem;
     display: block;
     background-size: 57%;
     background-position: 0.3783783783783784rem 0.2702702702702703rem;
     .bg-image('../../assets/images/cart/nav_back');
}
 .bundle-list{
     width: 100%;
     padding: 0 0.35135135135135137rem;
     background: #fff;
     margin-bottom: 1.3513513513513513rem;
}
 .bundle-list li{
     width: 100%;
     height: 1.3513513513513513rem;
     display: flex;
}
 .bundle-list li:nth-of-type(1){
     .border-1pxB(#ccc);
}
 .bundle-list li input{
     flex: 1;
     width: 2.7027027027027026rem;
    /*padding-left: 0.6756756756756757rem;
     */
}
 .bundle-list li span{
     font-size: 0.43243243243243246rem;
     line-height: 1.3513513513513513rem;
     display: inline-block;
     width: 2.2432432432432434rem;
}
 .bundle-list li button{
     width: 2.4324324324324325rem;
     height: 0.8108108108108109rem;
     text-align: right;
     padding: 0;
     padding-right: 0.24324324324324326rem;
     margin-top: 0.2702702702702703rem;
     background: #fff;
     outline: none;
     border: none;
     font-size: 0.35135135135135137rem;
     color: #b3b3b3;
}
 .bundle-list li button.active{
     .cff8;
}
 #bundle-phone .btn{
     height: 1.0810810810810811rem;
     background: #d5d5d5;
     color: #fff;
     margin: 0 0.5405405405405406rem;
     font-size: 0.4594594594594595rem;
     text-align: center;
     line-height: 1.0810810810810811rem;
     border-radius: 0.05405405405405406rem;
}
 #bundle-phone .btn.selected{
     background: -webkit-linear-gradient(right,#f95008, #fc7303);
}
 
</style>