<template>
	<div id="register">
		<div class="popularity_return">
			<span class="return" @click="goBack"><span></span> </span>
		</div>
		<div class="logo">
			<img src="../../assets/images/mine/register/log@3x.png" />
		</div>
		<div class="register_input">
			<form  @submit.prevent="submit"   >
				<div class="phone_numbor">
					<input type="tel" v-model="register.phone" placeholder="手机号码" @blur="verifyP" maxlength="11"/>
					<span class="eliminate" @click.stop.prevent="empty('phone')" v-if="register.phone"></span>
				</div>
				<div class="phone_numbor password">
					<input type="password" v-model="register.password" placeholder="请输入密码" @blur="verifyPassword"/>
					<span class="eliminate" @click.stop.prevent="empty('password')" v-if="register.password"></span>
				</div>
				<!-- <div class="verification">
					
					<input v-model="register.noteCode" placeholder="短信验证码" @blur="verifyM"/>
					<span class="get_verification" @click.stop.prevent="getVerification" v-if="isGet">获取验证码</span>
					<span class="get_verification" v-if="!isGet">重新获取{{time}}s</span>
				</div> -->
				
				<div class="register_button" :class="{active:register.phone&&register.password }">
					<button type="submit" :disabled="!register.phone||!register.password ">登录</button>
				</div>
				<div id="fl">
					<span class="forgetPassword"  @click="goforgetPassword">
							忘记密码
					</span>
					<span class="goLogin" @click="goRegister">
							注册
					</span>
				</div>
			</form>
		</div>
		<!--第三方登录-->
		 <div class="boundary" v-if="isApp">
			<hr>
			<span class="boundary_span">其他方式登录</span>
			<ul>
				<li class="wechat" @click="toWx(0)" v-if="isHaveWeiXin">微信登录</li>
				<li class="microblog" @click="toWx(2)">新浪微博登录</li>
				<li class="tencentQQ" @click="toWx(1)">QQ登录</li>
			</ul>
		</div> 
	</div>
</template>

<script>
	import Vue from "vue";
    import { Indicator,Toast } from 'mint-ui';
    import getd from '../../vuex/getData.js';
    import * as types from '../../vuex/mutations_types.js';
	import store from '../../vuex/mine/mine.js';
	import md5 from 'js-md5';
	import forgetPassword from  '@/pages/mine/forgetPassword';
	import  tool from "../../util/tool";
	import CryptoJS from 'crypto-js'
    export default {
        name: 'app',
        data () {
            return {
            	ab:"aa",
            	 register: {//显示span
                    phone: "",
                    password:"",
                    enterPassword:"",
                    noteCode:"",
                    rec:"",
                }  ,
                time:45,
                isPhone:false,//判断手机号是否填写整缺
                isCode:false,//判断验证码是否填写整缺
                isGet:true,//是否获取验证码是否填写整缺
                password:false,//判断密码
                isLogin:false,//是否可以点击登录,
                type:"",//第三方登录类型
                isApp:false,//是否在app
                isHaveWeiXin: true,	//是否安装微信
            }
        },
        components:{
        	forgetPassword,
        },
		created(){
			

			//判断是否安装微信	
			document.addEventListener( "plusready", onPlusReady, false );
			var that = this;
			//监测是否安装微信
        	function onPlusReady() {
					//console.log("微信监测来了~~");
				if(plus.runtime.isApplicationExist({pname:'com.tencent.mm',action:'weixin://'})){
						//console.log("微信应用已安装");
						
					}else{
						that.isHaveWeiXin = false
						//console.log("微信应用未安装");
					}
			}	
			setTimeout(onPlusReady,30);
			
		},
        mounted(){
			//是否微信中登陆 --兼容样式
			 
			if(tool.is_weixn() || tool.is_MQQBrower()){
				this.isApp = false;
				this.$nextTick(()=>{
					 
				})
			};
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/wqbol/i)=="wqbol"){
				this.isApp = true;
			}
		},
        methods:{
        	
        	goBack(){
        		this.$router.go(-1); 
        		
        	},
        	goforgetPassword(){
        		this.$router.push({name:'forgetPassword'});
        	},
        	goRegister(){
        		if (this.$route.params.type == 1) {//type =1 代表从活动页面进来的
        			this.$router.push('/mine/inviteRegister');
        		}else{
        			this.$router.push('/mine/register');
        		}
        	},
        	empty(value){ //清空输入框内容
        		switch(value){
        			case "phone":
        			this.register[value] = "" 
        			break;
        			case 'password': 
        			this.register[value] = ""
        			break;
        			case 'enterPassword':
        			this.register[value] = ""
        			break;
        		} 
        	},
        	//判断手机号
        	verifyP(){
				if(!this.register.phone.trim()){
					return;
				}
				var status = this.commonTool.regularJudgement("phone",this.register.phone);
				if (status) {
					this.isPhone = true;
				}else{
					this.isPhone = false;
				}
        	},
        	//判断密码 
        	verifyPassword(){
				if(!this.register.password.trim()){
					return;
				}
				var status = this.commonTool.regularJudgement("password",this.register.password);
				if (status) {
					this.password = true;
				}else{
					this.password = false;
				}
        	}, 
        	
        	//判断验证码
        	verifyM(){
				if(!this.register.noteCode.trim()){
					return;
				}
				var status = this.commonTool.regularJudgement("noteCode",this.register.noteCode);
				if (status) {
					this.isCode = true;
				}else{
					this.isCode = false;
				}
        	},
        	
        	//获取验证码
        	getVerification(){
        		var timer = null;
        		if(this.isPhone){
        			this.isGet = false;
        			var params = {
	        			mobile:this.register.phone
	        		};
        			getd.getVerification(params)
	        		.then((res)=>{
	        			Indicator.close();
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
        	//登录
            submit: function () {  
            	var self = this;
				let  passwordEncrypt =  CryptoJS.AES.encrypt(this.register.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密 
				console.log(this.isPhone  , this.password )
                if( this.isPhone  && this.password ){
            		var params ={
				        LoginName:this.register.phone,
				        Password:encodeURI(passwordEncrypt.toString()),
				        openSSL:true,
			  			rememberMe:false,
						isBackLogin:false,
						returnUrl:"/mine",
						datatype:"json"
				    };
            		getd.getLogin(params)
	        		.then((res)=>{
						Indicator.close();
						// sessionStorage.setItem('login_user_id',JSON.stringify(res.data))
						// console.log( sessionStorage.getItem('login_user_id') )
						// console.log( sessionStorage.getItem('login_user_id').Token )
						
						// if(tool.is_iosMQQBrower()){ //QQ浏览器登陆
						// 	sessionStorage.setItem('login_user_id',JSON.stringify(res.data))

						// }else if(tool.is_weixn()){ //微信浏览器登陆
						// 	sessionStorage.setItem('login_user_id',JSON.stringify(res.data))
						 
						// }else{
							
						 
						// }
						this.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',res.data);
						store.commit(types.LOGIN, res.data.Token);
						//取出扫描到的数据
						if(self.$route.query.tag == 'YunAccount'){
							self.$router.replace('/YunAccount')
							return
						 }

						var rec = tool.loadFromLocal("isScan","isScan","isScan",false);
						if(rec&&self.$route.params.type==2){
							self.$router.replace({name:'scanLogin',params:{url:rec}});
							return
						}

						if(rec&&self.$route.params.type==3){ 
							self.$router.replace({name:'helpFriendPay',query:{orderNum:rec.orderNum,actPrice:rec.actPrice}});
							return
						};

						if(rec&&self.$route.params.type==4){ 
							self.$router.replace({name:'findFriendPay',query:{orderNum:rec.orderNum,actPrice:rec.actPrice}});
							return
						};
						
						if(this.$route.query.orderNum!=undefined){ 
							this.$router.replace({name:'helpFriendPay',query:{orderNum:this.$route.query.orderNum,actPrice:this.$route.query.actPrice}});
							return 
						};


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
						//console.log(error);
					})
                }
            },
            //微信登录
            toWx(num){
            	var self = this;
            	if(num==0){
					//微信绑定
					this.type = 1;
				}else if(num==1){
					//qq绑定
					this.type = 0;
				}else if(num==2){
					//新浪微博绑定
					this.type = 2;
				}
            	//获取登录授权认证服务列表
            	plus.oauth.getServices( function(services){
					if(services.length>0){
						auths = services;
//						console.log(JSON.stringify(auths))
						var s=null;
						for(var i=0;i<auths.length;i++){
							if(num==0&&auths[i].id=="weixin"){
								s = auths[i];
								break;
							}else if(num==1&&auths[i].id=="qq"){
								s = auths[i];
								break;
							}else if(num==2&&auths[i].id=="sinaweibo"){
								s = auths[i];
								break;
							}
						}
						if ( !s.authResult ) {
							s.login( function(e){
								// 获取登录操作结果
								var result = e.target.authResult;
//								console.log( "登录认证成功："+JSON.stringify(result) );
								var id = result.unionid ? result.unionid : result.openid;
								var params = {
									type:self.type,
									openId:id,
									accessToken:result.access_token,
									datatype:"json"
								}
								getd.openPlatform(params)
								.then((res)=>{
									//console.log(res);
									self.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',res.data);
									store.commit(types.LOGIN, res.data.Token);
									//取出扫描到的数据
									var rec = tool.loadFromLocal("isScan","isScan","isScan",false);
									if(rec&&self.$route.params.type==2){
										self.$router.replace({name:'scanLogin',params:{url:rec}});
										return
									}
									
									if(rec&&self.$route.params.type==3){ 
										self.$router.replace({name:'helpFriendPay',query:{orderNum:rec.orderNum,actPrice:rec.actPrice}});
										return
									};

									if(rec&&self.$route.params.type==4){ 
										self.$router.replace({name:'findFriendPay',query:{orderNum:rec.orderNum,actPrice:rec.actPrice}});
										return
									};

									if(self.$route.query.orderNum!=undefined){ 
										self.$router.replace({path:'/helpFriendPay',query:{orderNum:self.$route.query.orderNum,actPrice:self.$route.query.actPrice}});
										return 
									};

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
						        				let redirect = decodeURIComponent(self.$route.query.redirect || '/');
										        self.$router.replace({
										            path: redirect
										        });
						        			}else{
						        				self.$router.replace('/mine/myInformation');
						        			}
					        			}else{
					        				self.$router.replace('/home');
					        			}
				        			}else if(self.$route.params.type == 1){
				        				location.href= "https://host.wqbol.com/home/downloadApp";
				        			}else{
				        				self.$router.replace('/home');
				        			}
								})
								.catch((error)=>{
									Indicator.close();
									//console.log(error)
									if(error.data.msg=="没有绑定账号"){
										self.$router.replace({name:"bundlePhone",params:{type:self.type,openId:params.openId,accessToken:result.access_token}})
									}
								})
							}, function(e){
								//console.log( "登录认证失败："+e.message+" - "+e.code );
							} );
						}else{
							//console.log( "已经登录认证！" );
							s.getUserInfo( function(e){
								//console.log( "获取用户信息成功："+JSON.stringify(s.userInfo) );
								var result = e.target.authResult;
//								console.log(JSON.stringify(e.target.authResult))
								var id = result.unionid ? result.unionid : result.openid;
								var params = {
									type:self.type,
									openId:id,
									accessToken:result.access_token,
									datatype:"json"
								}
								getd.openPlatform(params)
								.then((res)=>{
									//console.log(res);
									self.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',res.data);
									store.commit(types.LOGIN, res.data.Token);
									//取出扫描到的数据
									var rec = tool.loadFromLocal("isScan","isScan","isScan",false);
									if(rec&&self.$route.params.type==2){
										self.$router.replace({name:'scanLogin',params:{url:rec}});
										return
									}
									
									if(rec&&self.$route.params.type==3){ 
										self.$router.replace({name:'helpFriendPay',query:{orderNum:rec.orderNum,actPrice:rec.actPrice}});
										return
									};

									if(rec&&self.$route.params.type==4){ 
										self.$router.replace({name:'findFriendPay',query:{orderNum:rec.orderNum,actPrice:rec.actPrice}});
										return
									};
									
									if(self.$route.query.orderNum!=undefined){ 
										self.$router.replace({path:'/helpFriendPay',query:{orderNum:self.$route.query.orderNum,actPrice:self.$route.query.actPrice}});
										return 
									};

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
						        				let redirect = decodeURIComponent(self.$route.query.redirect || '/');
										        self.$router.replace({
										            path: redirect
										        });
						        			}else{
						        				self.$router.replace('/mine/myInformation');
						        			}
					        			}else{
					        				self.$router.replace('/home');
					        			}
				        			}else if(self.$route.params.type == 1){
				        				location.href= "https://host.wqbol.com/home/downloadApp";
				        			}else{
				        				self.$router.replace('/home');
				        			}
								})
								.catch((error)=>{
									Indicator.close();
									//console.log(error)
									if(error.data.msg=="没有绑定账号"){
										self.$router.replace({name:"bundlePhone",params:{type:self.type,openId:params.openId,accessToken:result.access_token}})
									}
								})
							}, function(e){
								//console.log( "获取用户信息失败："+e.message+" - "+e.code );
							} );
						}
					}else{
						alert("当前运行环境不支持登录授权认证服务！");
					}
				}, function(e){
					//console.log( "获取登录授权认证服务列表："+e.message+" - "+e.code );
				} );
            },
		},
		beforeDestroy(){
			 
		}
    } 

</script>

 <style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import '../../../node_modules/mint-ui/lib/swipe/style.css';
	@import 'mine.less';
	.register_button{
	 margin-top: 1.3513513513513513rem;
	 button{
		 font-size: 0.4864864864864865rem;
	 }
}
 .popularity_return {
     padding-left: 0rem;
}
 #fl{
	 border: none;
	 font-size: 0.373333rem;
    color: #04abef;
    border: none;
	padding: 1.066667rem 0;
	display: flex;
	justify-content:space-between;
	span{

	}
 }


</style>