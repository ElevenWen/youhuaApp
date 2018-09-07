<!--旧活动页面2018.6.21，请勿删除-->

<!-- 注册有礼 -->

<template>
	<div id="newPresent">

		<div id="promptDialogBox" @click="invitePoliteness_hide" v-show="isShow">
			<div class="politeness">
				<div>请登录</div>
				<div @click="toLogin">有账号</div>
				<div @click="toRegister">去注册</div>
			</div>
		</div>
 

		<!-- 下载页面 -->
		<!-- <div class="theRegistered" id="theRegistered" v-if="isShow">
			<div class="close" @click="close"></div>
			<div class="discounts">
				<span>2888</span>
				<span>优惠券</span>
			</div>
			<div class="hint">亲可以在“我的-优惠券” 中找到优惠券哦！</div>
			<div class="getButton" @click="downloadAPP">立即下载APP</div>
		</div> -->
		<!-- /下载页面 v-if="isShowIcon"-->
		<div class="popularity_return">
			<span class="return" v-if="!isShowIcon">
				<span   @click="returnPrePage()"  ></span> 
			</span>
			<span>注册有礼</span>
			<span class="share" v-if="!isShowIcon" @click="toShare"></span>
		</div>
		<div class="marginObj"></div>
		<div class="newPresent">
			<span class="activity_date">活动时间：{{ActivityStartTime}}-{{ActivityEndTime}}</span>
			<!-- <div class="particulars">
				<div class="number">
					<input type="number" placeholder="输入手机号" v-model="phone" @blur="verifyP"/>
				</div>
				<div class="auth_code">
					<input type="text" placeholder="输入验证码" v-model="noteCode" @blur="verifyM"/>
					<label class="get_auth_code" @click.stop.prevent="getVerification" v-if="isGet">获取验证码</label>
					<label class="get_auth_code" @click.stop.prevent="getVerification" v-if="!isGet">重新获取{{time}}s</label>
				</div>
			</div> -->
			<!-- <div class="consent">
				<span @click.stop.prevent="agree()">
					<img src="../../assets/images/TheCoupleRegistered/consentS@3x.png" v-show="allChecked"/>
					<img src="../../assets/images/TheCoupleRegistered/consent@3x.png" style="background: white;" v-show="!allChecked"/>
				</span>
				同意<span @click="goAgreement">《服务协议》</span>
			</div> -->
			<div class="promptlyGetWrap" @click="goRegister">
				<span class="promptlyGet"  >立即领取{{ActivityAmount}}元</span>
				<!--<img src="static/test.png" alt="">-->
			</div>
		</div>
		<div class="promptly_list">
			<span class="dashed"></span>
			<span class="yizhuce">现已注册用户</span>
			<span>已有{{num}}人注册，你还在等什么！</span>
			<div class="yizhuce_list">
				<table>
					<thead>
						<tr>
							<td>序号</td>
							<td>手机号码</td>
							<td>奖励红包</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in userList">
							<td>{{data.Sequence}}</td>
							<td>{{data.Mobile}}</td>
							<td>{{ActivityAmount}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<br /><br />
			<span class="dashed"></span>
			<span class="yizhuce">新手福利攻略</span>
			<div class="strategy">
				<p>1、活动对象：活动期间微企宝注册的所有新用户 </p>
				<p>2、微企宝新用户专享礼包为组合礼包，内含多张优惠劵 </p>
				<p>3、优惠劵领取后30天内有效，购买产品可以冲抵相应金额（官费等第三方产生的费用不在冲抵范围之内）</p>
				<p>4、优惠劵领取成功后可到“个人中心——我的优惠劵”查看</p>
				<p>5、活动的最终解释权归深圳市微企宝计算机系统有限公司所有，如有疑问可关注微企宝官方公众号 (szwqbol）后直接咨询，或直接与客服中心联系：400-8822-991</p>
			</div>
		</div>
		<div id="img" @touchmove.prevent v-if="isOpen"><img src="../../assets/images/mine/download@3x.png"/></div>
	</div>
</template>



<script>
	//	document.getElementById("LRdiv3").style.display = 'none';


	import footerNav from '../../footer-nav';
	import headerTitle from "../components/header-title";
	import getd from '../../vuex/getData.js';
	import * as types from '../../vuex/mutations_types.js';
	import store from '../../vuex/mine/mine.js';
	import { Indicator,Toast } from 'mint-ui';
  	import tools from "../../util/tool.js";
  	import Vue from 'vue';


	export default {
		data() {
			return {
				isShow:false,
				isShowYouHui:false,
				userList:[],
				phone:"",
				noteCode:"",
				isPhone:false,//判断手机号
                isCode:false,//判断验证码
                isGet:true,//是否获取验证码
                time:45,
                allChecked:true,
                num:1,
                isOpen:false,
                isShowIcon:true, //是否显示头部的分享图标  true表示显示  false表示不显示
				activityMes:{},//分享信息
				Id:"",
				fromPage:"",//回退页面地址,
				origin:"",
				account:"",
				ActivityStartTime:'',//活动开始时间
				ActivityEndTime:"",//活动结束时间
				ActivityAmount:"",//活动金额
			}
		},
		components: {
			footerNav,
			headerTitle
		},
		beforeRouteEnter(to,from,next){ 
			var params = {
				params:{
					type:1,//pc 成为0  app 为1
					code:'GG00101'
				}
			};
 
 			next(vm=>{  
				//获取缩略图 
				getd.getHomeBanner(params)
					.then((res) => {  
						//console.log(res.data.list,"11111?????")
						if(location.hash){
							//解决app 二次刷新问题  存在则表示用app  
									var currenthDate = res.data.list; 
									currenthDate.forEach((items)=>{ 
										if(items.Describe == "/activity/newPresent"){//newPresent 分享内容 //invitePoliteness 分享内容 
//										if(items.DataDictionaryName == "/activity/newPresent"){//newPresent 分享内容 //invitePoliteness 分享内容 
											vm.ActivityEndTime =tools.formatDate(items.ActivityEndTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
											vm.ActivityStartTime = tools.formatDate(items.ActivityStartTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
										    vm.ActivityAmount = items.ActivityAmount
											Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
											Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
												vm.activityMes = items;  
										}
									}) 
							
						}else{
							if(to.path !== location.pathname  ){ 
								location.replace(location.origin+to.fullPath);  
							}else{
								var currenthDate = res.data.list; 
								currenthDate.forEach((items)=>{  
									if(items.Describe == '/activity/newPresent'){//newPresent 分享内容
//									if(items.DataDictionaryName == '/activity/newPresent'){//newPresent 分享内容
										vm.ActivityEndTime =tools.formatDate(items.ActivityEndTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
										vm.ActivityStartTime = tools.formatDate(items.ActivityStartTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
									    vm.ActivityAmount = items.ActivityAmount;
										//console.log(items.LinkName.substring(0,items.LinkName.length-1))
										Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
										Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite)
										next(vm=>{  
											vm.activityMes =items; 
										})
									}
								}) 
							} 
					}  
				},(error)=>{
					alert("请重新刷新页面")
				});
			})
		},
		created(){

			//根据app方法设置 显示和隐藏
			this.isShowIcon = tools.is_weixn();
		 	//获取rurl 参数 
			//获取最新注册用户列表
			getd.getLatestRegisterList()
			.then((res)=>{ 
				this.userList = res.data.list;
				this.num = res.data.recordCount;
			})		

			if (this.getToken()) {
				//获取当前用户邀请码
				var params = {
					datatype:"json"
				}
				getd.getCustomerInfo(params)
				.then((res)=>{
					this.account = res.data.Account;
				});
			}
		},
		mounted(){ 
			 
 
		},
		methods: { 
			//注册协议
            goAgreement(){
            	this.$router.push('/mine/agreement');
            },
			getButton(){
				this.$router.replace('/mine/coupon')
			},
			close(){
				var the = document.getElementById("theRegistered");
				the.style.display = "none";
			},
			downloadAPP() {
				var  ua = navigator.userAgent.toLowerCase();  
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
			       this.isOpen = true;
			    } else {  
			        this.$router.push('/home/downloadAPP');
			    }
			},
			returnPrePage(){
				 this.$router.go(-1);
				// //console.log("===================================");
				// // //console.log(top.localStorage.getItem("_activity")); ;

				// //console.log(">>>>",window.top)
				// //console.log("从子页面传输数据给父页面")
 		 //     	// window.parent.contentWindow.postMessage("returnHome",this.origin)
 		 //     	window.parent.postMessage("returnHome",this.origin)
				//window.frames[0].postMessage('flag','https://host.wqbol.com')
				//this.$router.push({name:tools.getQueryString("fromPage")});
			},
			//判断手机号
        	verifyP(){
				var status = this.commonTool.regularJudgement("phone",this.phone);
				if (status) {
					this.isPhone = true;
				}else{
					this.isPhone = false;
				}
        	},
        	//判断验证码
        	verifyM(){
				var status = this.commonTool.regularJudgement("noteCode",this.noteCode);
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
	        			mobile:this.phone
	        		}
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
        	//立即领取
        	goRegister(){
        		//现在修改为 和invitePoliteness 页面功能一样
       		 	//<div class="inviteBut"  @click="promptDialogBox">
				// 		立即邀请&nbsp;得奖励
				// </div>
        		if (this.getToken()) {
					wrhShare().sendShare(
						"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
						"000000",
						this.activityMes.LinkName.substring(0,this.activityMes.LinkName.length-1),
						this.activityMes.Remark,
						this.activityMes.ThumbImgURL,
						this.activityMes.LinkWebSite+ "?Account=" +this.account
					)
				}else{
					this.isShow = true;
				}

        		/*if( this.isPhone && this.isCode && this.allChecked){
					var params = {
						Mobile:this.phone,
						VerifyCode:this.noteCode,
						Type:0,
						Recommender:this.Id,
						datatype:"json"
					}
					getd.getRegister( params )
	        		.then((res)=>{
	        			Indicator.close();
	        			//注册成功后登陆
	        			var params1 ={
					        LoginName:res.data.Mobile,
    						VerifyCode:"",
    						Password:res.data.Password,
    						rememberMe:true,
							isBackLogin:true,
							returnUrl:"/mine",
							datatype:"json"
					    };
	            		getd.getLogin(params1)
		        		.then((response)=>{
		        			Indicator.close();
		        			this.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',response.data);
							store.commit(types.LOGIN, response.data.Token)
							//是否在app内
							var ua = navigator.userAgent.toLowerCase();
		        			if(ua.match(/wqbol/i)=="wqbol"){
		        				//是否首次登陆
			        			if(response.data.LastLoginTime===null){
			        				store.commit(types.FIRST, true)
			        				//活动是否到期
			        				var str = response.data.ActivityEndTime.slice(6,19)
			        				var t = new Date().getTime();
				        			if(str>t){
				        				store.commit(types.JUDGE, true);
				        				this.$router.replace('/home');
				        			}else{
				        				this.$router.replace('/mine/myInformation');
				        			}
			        			}else{
			        				this.$router.replace('/home');
			        			}
		        			}else{
		        				this.isShow = true;
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
						
	        		})
	        		.catch((error)=>{
						Indicator.close();
						Toast({
						  message: error.data.msg, 
						  duration: 2000
						});
						//console.log(error);
					})
                }*/
        	},
			toLogin(){
				this.isShow = false;
				this.$router.push({name:'toLogin',params:{type:1}});
			},
			toRegister(){
				this.isShow = false;
				if (location.href.indexOf("Account")>0) {
					this.$router.push({path:'/mine/inviteRegister',query:{Account:tools.getQueryStringHash("Account")}});
				}else{
					this.$router.push('/mine/inviteRegister');
				}
			},

			invitePoliteness_hide(){
				this.isShow = false;
			},


        	// 分享
        	toShare(){
        		//console.log("手机分享  ")
        		if(this.getToken()){
        			//console.log("手机分享 if")
					wrhShare().sendShare(
						"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
						"000000",
						this.activityMes.LinkName.substring(0,this.activityMes.LinkName.length-1),
						this.activityMes.Remark,
						this.activityMes.ThumbImgURL,
						this.activityMes.LinkWebSite+"?Account=" +this.account
					)
				}else{ 
					wrhShare().sendShare(
						"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
						"000000",
						this.activityMes.LinkName.substring(0,this.activityMes.LinkName.length-1),
						this.activityMes.Remark,
						this.activityMes.ThumbImgURL,
						this.activityMes.LinkWebSite
					)
				}
        	}
		}
	};
</script>



<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less"; 
	@import 'newPresent.less';
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