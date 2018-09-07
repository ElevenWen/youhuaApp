<!-- 邀请赚收益 -->
<template>
	<div id="invitePoliteness">
		<div class="popularity_return">
			<span class="return" v-if="!isShowIcon">
				<span   @click="returnPrePage()"  ></span> 
			</span>
			<span>注册有礼</span>
			<span class="share" v-if="!isShowIcon" @click="toShare"></span>
		</div>
		
		<div class="scroll-content">
			<div class="head" @click="goRegister">
				<div class="receive">
					立即领取
				</div>
			</div>
			
			<div class="wrap">
				<div class="wrap-img">
				   <div class="img" v-for="data in couponLazy">
				   	<img v-lazy.invitePoliteness="data"/>
				   </div>
				</div>
				<div class="bottom">
					<p>备注：每次服务优惠券仅限一次使用</p>
					<p>最终解释权归“深圳微企宝计算机系统有限公司”所有</p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import getd from '../../vuex/getData.js';
import tools from "../../util/tool.js";
import {  Toast } from "mint-ui";
import Vue from 'vue';
	export default {
		data(){
			return {
				account:'',
				isShowIcon:true, //是否显示头部的分享图标  true表示显示  false表示不显示
				activityMes:{},//分享信息
				couponLazy:['static/img/activity/group-one@2x.png',
				'static/img/activity/group-two@2x.png','static/img/activity/group-third@2x.png',
				'static/img/activity/group-four@2x.png','static/img/activity/group-five@2x.png',
				'static/img/activity/group-six@2x.png','static/img/activity/group-seven@2x.png',
				'static/img/activity/group-eight@2x.png','static/img/activity/group-nine@2x.png',
				'static/img/activity/group-ten@2x.png','static/img/activity/group-eleven@2x.png',
				'static/img/activity/group-twelve@2x.png','static/img/activity/group-thirteen@2x.png',
				'static/img/activity/group-fourteen@2x.png'],//打包app去掉../../../，打包服务器加上../../../
				ActivityStartTime:'',//活动开始时间
				ActivityEndTime:"",//活动结束时间
				ActivityAmount:"",//活动金额
			}
		},
		components: {
			headerTitle,
		},
		beforeRouteEnter(to,from,next){ 
			//判断是否是手机Q 登录
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
					 
						if(location.hash){
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
//					alert("请重新刷新页面")
				});
			})
		},
		created(){ 
			//根据app方法设置 显示和隐藏
			this.isShowIcon = tools.is_weixn();
			  
			if (this.getToken()) {
				//获取当前用户邀请码
				var params = {
					datatype:"json"
				}
				getd.getCustomerInfo(params)
				.then((res)=>{
					//this.account = res.data.Account;
					this.account = res.data.Id;
				})
				
				
			}
		},
		methods: { 
			goRegister(){
				if(this.getToken()){
					Toast("您已领过新人大礼包，不能重复领取哦");
				}else{
					this.$router.push('/mine/register');
				}
			},
			returnPrePage(){
				 this.$router.go(-1);
			},
			// 分享
        	toShare(){
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
</style>