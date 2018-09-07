
<!-- 邀请赚收益 -->
<template>
	<div id="invitePoliteness">
		<div id="promptDialogBox" @click="invitePoliteness_hide" v-show="isShow">
			<div class="politeness">
				<div>请登录</div>
				<div @click="toLogin">有账号</div>
				<div @click="toRegister">去注册</div>
			</div>
		</div>
		 

		<div class="popularity_return">
			<span class="return" @click="returnPrePage()" v-if="!isShowIcon">
				<span></span> 
			</span>
			<span>邀请赚收益</span>
			<span class="share" @click="toShare" v-if="!isShowIcon"></span>
		</div>
		<div class="invitePoliteness">
			<!--动态获取活动时间 -->
			<div class="activity">
				<div class="activityTime" v-if="ActivityStartTime">活动时间：{{ActivityStartTime}}-{{ActivityEndTime}}</div>
				<div class="priceORinvite">
					<div class="price" v-if="ActivityAmount">
						<span>¥</span><span>{{ActivityAmount}}</span>
					</div>
					<div class="price" v-else>
						<span>--</span>
					</div>
					<span  @click="shopping">更多活动规则&gt;&gt;</span>
					<div class="inviteBut"  @click="promptDialogBox">
						立即邀请&nbsp;得奖励
					</div>
				</div>
			</div>
			<div class="militaryExploits">
				<span>我的邀请战绩</span>
				<!--
                	作者：吴铭旨
                	时间：2017-10-13
                	描述：已登录状态
                -->
				<ul id="alreadyLoggedIn" v-if="isLogin">
					<li class="number">{{mySummary.RecommendedNumber}}</li>
					<li class="number">{{mySummary.Rank}}</li>
					<li class="number">{{mySummary.TotalAmount}}</li>
					<li>共邀请公司</li>
					<li>总战绩排名</li>
					<li>获得的奖励</li>
					<li  @click="inviteList">查看详情</li>
				</ul>
				<!--
                	作者：吴铭旨
                	时间：2017-10-13
                	描述：未登录状态
                -->
				<ul id="notLoggedIn" v-if="!isLogin">
					<li class="number">--</li>
					<li class="number">--</li>
					<li class="number">--</li>
					<li>共邀请好友</li>
					<li>总战绩排名</li>
					<li>获得的奖励</li>
					<li @click="toLogin">登录后查看</li>
				</ul>
			</div>
			<div class="rankingList">
				<span>今日奖励排行榜</span>
				<ul>
					<li v-for="data in getRebateRank">
						<span class="ranking" v-if="data.Rank==1">
							<img src="../../assets/images/home/invitePoliteness/gold@3x.png">
						</span>
						<span class="ranking" v-if="data.Rank==2">
							<img src="../../assets/images/home/invitePoliteness/silver@3x.png">
						</span>
						<span class="ranking" v-if="data.Rank==3">
							<img src="../../assets/images/home/invitePoliteness/copper@3x.png">
						</span>
						<span class="ranking" v-if="data.Rank>3">{{data.Rank}}</span>
						<span class="headPortrait">
							<img v-if="data.CustomerHeadPic" :src="data.CustomerHeadPic">
							<img v-else   src="../../assets/images/mine/headerDefault@3x.png"  alt="">
						</span>
						<span class="userName" v-show="data.CustomerNickname">{{data.CustomerNickname}}</span>
						<span class="userName" v-show="!data.CustomerNickname">{{data.CustomerAccount}}</span>
						<div class="rankingRight">
							<span class="orange">{{data.TotalAmount}}元</span>
							<span>推荐公司数<span class="orange">{{data.RecommendedNumber}}</span>个</span>
						</div>
					</li>
					<!-- <li v-for="data in secondData">
						<span class="ranking">
							<img src="../../assets/images/home/invitePoliteness/silver@3x.png">
						</span>
						<span class="headPortrait">
							<img v-if="data.CustomerHeadPic" :src="data.CustomerHeadPic">
							<img v-else   src="../../assets/images/mine/headerDefault@3x.png"  alt="">
						</span>
						<span class="userName" v-show="data.CustomerNickname">{{data.CustomerNickname}}</span>
						<span class="userName" v-show="!data.CustomerNickname">{{data.CustomerAccount}}</span>
						<div class="rankingRight">
							<span class="orange">{{data.TotalAmount}}元</span>
							<span>推荐公司数<span class="orange">{{data.RecommendedNumber}}</span>个</span>
						</div>
					</li>
					<li v-for="data in thirdData">
						<span class="ranking">
							<img src="../../assets/images/home/invitePoliteness/copper@3x.png">
						</span>
						<span class="headPortrait">
							<img v-if="data.CustomerHeadPic" :src="data.CustomerHeadPic">
							<img v-else   src="../../assets/images/mine/headerDefault@3x.png"  alt="">
						</span>
						<span class="userName" v-show="data.CustomerNickname">{{data.CustomerNickname}}</span>
						<span class="userName" v-show="!data.CustomerNickname">{{data.CustomerAccount}}</span>
						<div class="rankingRight">
							<span class="orange">{{data.TotalAmount}}元</span>
							<span>推荐公司数<span class="orange">{{data.RecommendedNumber}}</span>个</span>
						</div>
					</li>
					<li v-for="(data,index) in getRebateRank">
						<span class="ranking">{{index+4}}</span>
						<span class="headPortrait">
							<img v-if="data.CustomerHeadPic" :src="data.CustomerHeadPic">
							<img v-else   src="../../assets/images/mine/headerDefault@3x.png"  alt="">
						</span>
						<span class="userName" v-show="data.CustomerNickname">{{data.CustomerNickname}}</span>
						<span class="userName" v-show="!data.CustomerNickname">{{data.CustomerAccount}}</span>
						<div class="rankingRight">
							<span class="orange">{{data.TotalAmount}}元</span>
							<span>推荐公司数<span class="orange">{{data.RecommendedNumber}}</span>个</span>
						</div>
					</li> -->
				</ul>
			</div>
		</div>
		<mt-popup class="hiddenShopping" v-model="registered" position="bottom">
			<div class="addshopping">
				<div class="addshoppingHeader">
					活动规则
					<img src="../../assets/images/tabBar/closeS@3x.png" class="closeBtn" @click="close">
				</div>
				<div class="detail">
					<p>1、每成功邀请一位新用户奖励5元。</p>
					<!--<table>
						<thead>
							<tr>
								<td style="width:19%;border:1px solid #B2B2B2;background:#EBEBEB">级别</td>
								<td style="width:26%;border:1px solid #B2B2B2;background:#EBEBEB">成为条件</td>
								<td style="width:10%;border:1px solid #B2B2B2;background:#EBEBEB">累计客户</td>
								<td style="width:10%;border:1px solid #B2B2B2;background:#EBEBEB">推荐收益</td>
								<td style="width:36%;border:1px solid #B2B2B2;background:#EBEBEB">推荐返利</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="border:1px solid #B2B2B2">普通用户</td>
								<td style="border:1px solid #B2B2B2">/</td>
								<td style="border:1px solid #B2B2B2">×</td>
								<td style="border:1px solid #B2B2B2">5元</td>
								<td style="border:1px solid #B2B2B2" rowspan="4">
									<p>1. 推荐返利最高可返{{ActivityAmount}}元现金。 </p>
									<p>2. 终身收益最高返订单额3%</p>
									<p>3. 派单收益只有合伙人与VIP 合伙人可享受，最高返订 单额85%（需服务客户）</p>
									<br />
									<p>注：终身收益和派单收益可 二选一，不可同时享受。</p>
								</td>
							</tr>
							<tr>
								<td style="border:1px solid #B2B2B2">代理商</td>
								<td style="border:1px solid #B2B2B2">50个用户或缴纳 平台费9999元</td>
								<td style="border:1px solid #B2B2B2">√</td>
								<td style="border:1px solid #B2B2B2">5元</td>
							</tr>
							<tr>
								<td style="border:1px solid #B2B2B2">合伙人</td>
								<td style="border:1px solid #B2B2B2">200个用户或缴纳 平台费5万元</td>
								<td style="border:1px solid #B2B2B2">√</td>
								<td style="border:1px solid #B2B2B2">5元</td>
							</tr>
							<tr>
								<td style="border:1px solid #B2B2B2">VIP合伙人</td>
								<td style="border:1px solid #B2B2B2">500个用户或缴纳 平台费10万元</td>
								<td style="border:1px solid #B2B2B2">√</td>
								<td style="border:1px solid #B2B2B2">5元</td>
							</tr>
						</tbody>
					</table>-->
					<p>2、推荐的用户必须是企业用户，且在微企宝平台注册并认证<span style="color:#FA2802;">（注：营业执照复印件需加盖公章）</span>。</p>
					<p>3、每月15日和30日审核数据并发放现金。</p>
					<p>4、进入个人中心->我的账户->我的邀请，查看成功邀请用户列表及返利金额。</p>
					<p>5、有任何使用不正当手段参与活动的用户，核实后取消奖励发放。</p>
					<p>6、本活动的最终解释权归深圳微企宝计算机系统有限公司所有，如有疑问请拨打<span style="color:#30A1F8"><a href="tel:400-8822-991">400-8822-991</a></span>。</p>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import { Popup } from 'mint-ui';
import getd from '../../vuex/getData.js';
import tools from "../../util/tool.js";
import Vue from 'vue';

	export default {
		data(){
			return {
				registered:false, //已选点击加载更多
				isLogin:false,//是否登录
				mySummary:{},//我的奖励汇总
				getRebateRank:[],//奖励列表
				firstData:[],//第一名数据
				secondData:[],//第二名数据
				thirdData:[],//第三名数据
				isShow:false,
				account:"",
				isShowIcon:true, //是否显示头部的分享图标  true表示显示  false表示不显示
				activityMes:{},//分享信息
				origin:"",
				ActivityStartTime:'',//活动开始时间
				ActivityEndTime:"",//活动结束时间
				ActivityAmount:"",//活动金额
			}
		},
		components: {
			headerTitle,
			Popup
		},
		beforeRouteEnter(to,from,next){ 
			//判断是否是手机Q 登录
			var params = {
				params:{
					type:1,//pc 成为0  app 为1
					code:'YQYL'
				}
			};
			next(vm=>{  
				//获取缩略图 
				getd.getHomeBanner(params)
					.then((res) => { 
					 
						if(location.hash){
							//console.log("hast")
							//解决app 二次刷新问题  存在则表示用app 
						
									var currenthDate = res.data.list; 
									currenthDate.forEach((items,index,tempCurrenthDate)=>{ 
//										if(items.DataDictionaryName == '/activity/invitePoliteness'){//newPresent 分享内容 //invitePoliteness 分享内容
										if(items.Describe == '/activity/newPresent'){//newPresent 分享内容 //invitePoliteness 分享内容
											vm.ActivityEndTime =tools.formatDate(items.ActivityEndTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
										 
											 
											vm.ActivityStartTime = tools.formatDate(items.ActivityStartTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
										    vm.ActivityAmount = items.ActivityAmount
											Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
											Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
											 
											  
												vm.activityMes =items; 
											 
										}
									})  
						}else{
							if(to.path !== location.pathname  ){ 
								location.replace(location.origin+to.fullPath);  
							}else{
								var currenthDate = res.data.list;
								//console.log( currenthDate ,"微信数据问题");
								currenthDate.forEach((items,index,tempCurrenthDate)=>{ 
									if(items.Describe == '/activity/newPresent'){//newPresent 分享内容 //invitePoliteness 分享内容 
//									if(items.DataDictionaryName == '/activity/invitePoliteness'){//newPresent 分享内容 //invitePoliteness 分享内容 
										vm.ActivityEndTime =tools.formatDate(items.ActivityEndTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
											 
										vm.ActivityStartTime = tools.formatDate(items.ActivityStartTime.replace(/[\/Date(]|[)\/)]/g, ''),'yyyy年MM月dd日');
										vm.ActivityAmount = items.ActivityAmount
										 
										Vue.prototype.QQshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite);
										Vue.prototype.WXshare(items.LinkName.substring(0,items.LinkName.length-1)   ,items.Remark,items.ThumbImgURL,items.LinkWebSite)


										next(vm=>{  
											vm.activityMes = items; 
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
			
			////console.log( "tools.is_app()",tools.is_app() )

			//根据app方法设置 显示和隐藏
			this.isShowIcon = tools.is_weixn();
			  
			if (this.getToken()) {
				this.isLogin = true;
				var params = {
					datatype:"json"
				}
				getd.getMyRebateSummary(params)
				.then((res)=>{
					this.mySummary = res.data;
				})
				 
				//获取当前用户邀请码
				var params = {
					datatype:"json"
				}
				getd.getCustomerInfo(params)
				.then((res)=>{
					//this.account = res.data.Account;
					this.account = res.data.Id;
				})
				
				
			}else{
				this.isLogin = false;
			}
			//获取奖励列表
			getd.getRebateRank()
			.then((res)=>{
				////console.log(res)
				this.getRebateRank = res.data;
			});
		},
		mounted(){
		  
		},
		methods: { 
			returnPrePage(){ 
				 this.$router.go(-1);
 		     	//window.top.postMessage("returnHome",this.origin) 
			},
			//APP 分享
			toShare(){
				if(this.getToken()){
					////console.log("手机分享 if")
					wrhShare().sendShare(
						"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
						"000000",
						this.activityMes.LinkName.substring(0,this.activityMes.LinkName.length-1),
						this.activityMes.Remark,
						this.activityMes.ThumbImgURL,
						this.activityMes.LinkWebSite+"?Account=" +this.account
					)
				}else{
					////console.log("手机分享 else")
					wrhShare().sendShare(
						"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
						"000000",
						this.activityMes.LinkName.substring(0,this.activityMes.LinkName.length-1),
						this.activityMes.Remark,
						this.activityMes.ThumbImgURL,
						this.activityMes.LinkWebSite
					)
				}
			},
			inviteList(){
				this.$router.push('/activity/inviteList');
			},
			toLogin(){// 直接提示下载app查看
				this.isShow = false;

				if(!tools.is_app()){//不在app内,直接下载app 
					location.href= "https://host.wqbol.com/home/downloadApp";//直接下载app
					 
				}else{
					this.$router.push({name:'toLogin',params:{type:1}});//在app内部 提示去登录
				}
				

			},
			toRegister(){//跳转注册 原生
				this.isShow = false;
				if (location.href.indexOf("Account")>0) {
					this.$router.push({path:'/mine/inviteRegister',query:{Account:tools.getQueryStringHash("Account")}});
				}else{
					this.$router.push('/mine/inviteRegister');
				}
			},
			promptDialogBox(){//立即邀请的奖励
				if(!tools.is_app()){ //判断是app 还是其他 
					tools.removeLocal('login_user_id') ;//删除用户token
					//清楚微信token
					if (location.href.indexOf("Account")>0) { //存在邀请码带入邀请码
						this.$router.push({path:'/mine/inviteRegister',query:{Account:tools.getQueryStringHash("Account")}});
					}else{
						this.$router.push('/mine/inviteRegister');
					}
					return false
				};
				if (this.getToken()) {
					wrhShare().sendShare(// 原生
						"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
						"000000",
						this.activityMes.LinkName,
						this.activityMes.Remark,
						this.activityMes.ThumbImgURL,
						this.activityMes.LinkWebSite+ "?Account=" +this.account
					)
				}else{
					this.isShow = true;
				}
			},
			invitePoliteness_hide(){
				this.isShow = false;
			},
			shopping(){
				this.registered = true;
			},
			close(){
				this.registered = false;
			},
		}
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'invitePoliteness.less';
</style>