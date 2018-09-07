<template>
	<div id="register">
		<div class="popularity_return">
			<span class="return"><span @click="goBack"></span> </span>
		</div>
		<div class="logo">
			<img src="../../assets/images/mine/register/log@3x.png" />
		</div>
		<div class="register_input register_inputDele">
			<form  @submit.prevent="submit"   >
				<div class="">
				<!-- <div class="phone_numbor"> -->
					<input type="number" v-model="register.phone" placeholder="手机号码" @blur="verifyP"/>
					<span class="eliminate" @click.stop.prevent="empty('phone')" v-if="register.phone"></span>
          			<!-- <label class="fl" v-remind="register.phone"></label> -->
				</div>
				<div class="">
				<!-- <div class="phone_numbor">   -->
					<input type="password" v-model="register.password" placeholder="请输入密码" @blur="verifyPassword"/>
					<span class="eliminate" @click.stop.prevent="empty('password')" v-if="register.password"></span>
				</div>
				<div class="">
				<!-- <div class="phone_numbor"> -->
					<input type="password" v-model="register.enterPassword" placeholder="请确认密码" @blur="verifyEnterPassword"/>
					<span class="eliminate" @click.stop.prevent="empty('enterPassword')" v-if="register.enterPassword"></span>
				</div>

				<div class="">
				<!-- <div class="verification"> -->
					<!-- <input id="verification" type="text"  value="短信验证码" /> -->
					
					<input v-model="register.noteCode" placeholder="短信验证码" @blur="verifyM"/>
					<span class="get_verification get_verification_end"     @click.stop.prevent="getVerification" v-if="isGet">获取验证码</span>
					<span class="get_verification get_verification_waiting"  v-if="!isGet">重新获取{{time}}s</span>
          			<!-- <label class="fl" v-remind="register.noteCode"></label> -->
				</div>
				<div class="">
				<!-- <div class="referrer"> -->
					<!-- <input id="referrer" type="text"  value="推荐人(必填)" /> -->
					<input placeholder="推荐人" v-if="!isDis" v-model="register.rec"/> 
					<input placeholder="推荐人" unselectable="on" onfocus="this.blur()" v-if="isDis" readonly="true" v-model="register.rec"/>
          			<!-- <label class="fl" v-remind="register.rec"></label> -->
				</div>
				<div class="agreement">
					<span @click.stop.prevent="agree()">
						<img class="serve_yes" src="../../assets/images/tabBar/select_boxS@3x.png" v-show="allChecked" />
						<img class="serve_no" src="../../assets/images/tabBar/select_box@3x.png"  v-show="(!allChecked)" />
					</span >
					<span @click.stop.prevent="agree()">已阅读并同意</span>
					<span @click.stop.prevent="goAgreement">《用户服务协议》</span>
				</div>
				<div id="register_button " class="register_button" :class="{active:register.phone&&register.password&&register.enterPassword&&register.noteCode&&allChecked}">
					<button type="submit" :disabled="!register.phone||!register.noteCode||!allChecked">注 册</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
    import { Indicator,Toast } from 'mint-ui';
    import getd from '../../vuex/getData.js';
	import * as types from '../../vuex/mutations_types.js';
	import store from '../../vuex/mine/mine.js';
	import qs from 'qs';
	import tool from '../../util/tool.js';
	import CryptoJS from 'crypto-js'

    export default {
        name: 'app',
        data () {
            return {
            	ab:"aa",
            	allChecked:true,
            	 register: {
                    phone: "",
                    password:"",
                    enterPassword:"",
                    noteCode:"",
                    rec:"",
                }  ,
                time:45,
                isPhone:false,//判断手机号
                password:false,//判断密码
                isCode:false,//判断验证码
                isGet:true,//是否获取验证码
                isLogin:false,//是否可以点击注册
                isDis:false,//推荐人是否可以编辑
                something:"",
                registerResource:0,//注册来源
            }
        },
        created(){
        	if(location.href.indexOf("Account")>0){ 
				this.register.rec = tool.getQueryStringHash("Account");
				this.isDis = true;
			}
        },
        mounted(){
			this.$nextTick(()=>{
				document.getElementById("register").style.height = window.screen.availHeight+ "px";
			})
		},
        methods:{ 
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
				if(!this.register.phone.trim()  ){
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
				if(!this.register.password.trim()  ){
                    return;
                }
				var status = this.commonTool.regularJudgement("password",this.register.password);
				if (status) {
					this.password = true;
				}else{
					this.password = false;
				}
        	}, 
        	//-- 确认密码
        	verifyEnterPassword(){
				if(!this.register.password.trim() || !this.register.enterPassword.trim() ){
                    return;
                }
				var status = this.commonTool.regularJudgement("enterPassword",{
					password:this.register.password,
					enterPassword:this.register.enterPassword
				});
				if (status) {
					this.enterPassword = true;
				}else{
					this.enterPassword = false;
				}
        	}, 
        	//判断验证码
        	verifyM(){
				if(!this.register.noteCode.trim()  ){
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
        	agree(){
            	this.allChecked= !this.allChecked; 
            },
            //注册协议
            goAgreement(){
            	this.$router.push('/mine/agreement');
            },
            submit: function () { 
            	let  passwordEncrypt =  CryptoJS.AES.encrypt(this.register.password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密 
            	//判断终端设备是否为微信浏览器
            	if(tool.is_weixn()){
            		//为公众号
            		this.registerResource = 3;
            	}else{
            		//为app
            		this.registerResource = 0;
            	}
            	
                if( this.isPhone && this.password && this.enterPassword  && this.isCode && this.allChecked){
					var params = {
						Mobile:this.register.phone,
						Password:encodeURI(passwordEncrypt.toString()),
						openSSL:true,
						VerifyCode:this.register.noteCode,
						Recommender:this.register.rec,
						Type:0,
						regSource:this.registerResource,
						datatype:"json"
					};
					getd.getRegister( params )
	        		.then((res)=>{
	        			Indicator.close();
	        			let  passwordEncrypt =  CryptoJS.AES.encrypt(res.data.Password, '59964e5d540e446cf98bc2af78a2ea58');//密码加密 
	        			//注册成功后登陆
	        			var params1 ={
					        LoginName:res.data.Mobile,
    						VerifyCode:"",
    						Password:encodeURI(passwordEncrypt.toString()),
						    openSSL:true,
    						rememberMe:true,
							isBackLogin:true,
							returnUrl:"/mine",
							datatype:"json"
					    };
	            		getd.getLogin(params1)
		        		.then((response)=>{
		        			Indicator.close();
		        			this.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',response.data);
							store.commit(types.LOGIN, response.data.Token);
							//是否在app内
		        			var ua = navigator.userAgent.toLowerCase();
		        			if(ua.match(/wqbol/i)=="wqbol"){
			        			//是否首次登陆
			        			if(response.data.LastLoginTime===null){
			        				store.commit(types.FIRST, true);
			        				//活动是否到期
				        			var str = response.data.ActivityEndTime.slice(6,19);
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
//							//console.log(error);
						})
	        			
	        			
	        		})
	        		.catch((error)=>{
						Indicator.close();
						Toast({
						  message: error.data.msg, 
						  duration: 2000
						});
//						//console.log(error);
					})
                }else if(!this.isPhone){
                	Toast({
					  	message: "手机号码错误", 
					  	duration: 2000
					});
                }else if(!this.password){
                	Toast({
					  	message: "密码错误,请至少输入6位字符", 
					  	duration: 2000
					});
                }else if(!this.isCode){
                	Toast({
					  	message: "验证码错误", 
					  	duration: 2000
					});
                }
            },
            login(){
            	this.$router.push('/mine/login');
            },
            goBack(){
            	this.$router.go(-1);
            }
            
        }
    };
 


</script>

 <style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import '../../../node_modules/mint-ui/lib/swipe/style.css';
	@import 'mine.less';
	.popularity_return {
		padding-left: 0rem;
	}
</style>