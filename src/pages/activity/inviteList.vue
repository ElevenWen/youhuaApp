<!-- 我的邀请记录 -->
<template>
	<div id="inviteList">
		<div class="popularity_return">
			<span class="return" @click="returnPrePage()">
				<span v-if="isShowIcon"></span> 
			</span>
			<span>我的邀请记录</span>
			<span class="share" @click="share" v-if="isShowIcon"></span>
		</div>
		<div class="inviteList">
			<div class="inviteList_img">
				<div class="agent">&nbsp;普通用户</div>
			</div>
			<div class="inviteExplain">
				<p>邀请好友注册并下载微企宝APP后，输入您的邀请码， 双方都将获取丰厚奖励！</p>
				<span @click="invitePoliteness">查看活动</span>
			</div>
			<div class="commission">
				<div>
					<span>已获佣金（元）</span>
					<span>{{mySummary.TotalAmount}}</span>
				</div>
				<div>
					<span>已邀公司</span>
					<span>{{mySummary.RecommendedNumber}}</span>
				</div>
			</div>
			<div class="titileBg">我的邀请</div>
			<div class="yizhuce_list" v-if="isInvite">
				<table style="width: 100%;">
					<thead  class="list_title">
						<tr>
							<td style="width:1.1081081081081081rem">序号</td>
							<td  style="width:1.1081081081081081rem">头像</td>
							<td class="afterTd" style="width:4.594594594594595rem">公司名称</td> 
						</tr>

					</thead>
					<tbody>
						<!-- :class="{'td_green':items.ReviewStatus==0, '':items.ReviewStatus==1,'td_red':items.ReviewStatus==2}"  -->
						<!-- 0 代表未审核(灰色)  1代表通过(绿色)   2代表驳回(红色)      -->
						<tr class="list_list"  :class="{'':items.ReviewStatus==0, 'td_green':items.ReviewStatus==1,'td_red':items.ReviewStatus==2}"    v-for="(items,index) in myRebateList" @click="openModle(items)">
							<td style="width:1.1081081081081081rem">{{index+1}}</td>
							<td style="width:1.1081081081081081rem">
								<img v-if="items.InvitationCustomerHeadPic" :src="items.InvitationCustomerHeadPic" alt="">
								<img v-else   src="../../assets/images/mine/headerDefault@3x.png"  alt="">
							</td>
							<td   style="width:4.594594594594595rem;text-align:left;padding:0 0.40540540540540543rem;"><span>{{items.CompanyName}}</span></td>
							<!-- <td style="width:86px"  v-if="items.ReviewStatus==0">审核中</td>
							<td style="width:86px" v-else-if="items.ReviewStatus==1">已审核</td>
							<td style="width:86px" v-else="items.ReviewStatus==2">资料不完整</td> -->
						</tr>
					</tbody>
				</table>
				<div id="modelTableWrap" v-if="modelToggleFlag">
					<div id="modelTable">
						<div class="titleWrap">
							<p class="title" >详细信息</p>
							<span class="closeModel"  @click.stop.prevent="closeModel"></span>
						</div>
						<ul class="contentWrap"  v-for="(items,index) in detailData">
							<li>
								<span>公司名称:</span>
								<span>{{items.CompanyName}}</span>
							</li>
							<li>
								<span>联系电话:</span>
								<span>{{items.InvitationCustomerMobile}}</span>
							</li>
							<li>
								<span>获取佣金:</span>
								<span>{{items.Amount}}</span>
							</li>
							<li   :class="{'':items.ReviewStatus==0, 'td_green':items.ReviewStatus==1,'td_red':items.ReviewStatus==2}">
								<span>当前状态:</span>
								<span v-if="items.ReviewStatus==0">未审核</span>
								<span v-else-if="items.ReviewStatus==1">已审核</span>
								<span v-if="items.ReviewStatus==2">资料不完整</span> 
							</li>
						</ul>

					</div> 

				</div>
			 
			</div>
			<!--
            	作者：吴铭旨
            	时间：2017-10-13
            	描述：无邀请数据显示
            -->
			<div class="immediately" v-if="!isInvite">
				<span>亲！您还没邀请到好友哦!</span>
				<span @click="share">立即邀请</span>
			</div>
		</div>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import { Popup } from 'mint-ui';
import getd from '../../vuex/getData.js';
import tools from "../../util/tool.js";
import Vue from 'vue';

	export default {
		components: {
			headerTitle,
			Popup
		},
		data(){
			return{
				// registered:false, //已选点击加载更多
				isInvite:false,
				mySummary:{},
				myRebateList:[],
				account:"",
				isShowIcon: true , //是否显示头部的分享图标  true表示显示  false表示不显示
				activityMes:{},//分享信息
				modelToggleFlag:false,//弹框
				detailData:[]//弹框里面的数据
			}
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
							//console.log("hast")
							//解决app 二次刷新问题  存在则表示用app 
						
									var currenthDate = res.data.list; 
									currenthDate.forEach((items,index,tempCurrenthDate)=>{ 
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

			//根据app方法设置 显示和隐藏
			this.isShowIcon = tools.is_app(); 
			
			if (this.getToken()) {
				//获取我的奖励汇总
				getd.getMyRebateSummary()
				.then((res)=>{
					// //console.log(res);
					// //console.log("获取奖励汇总")
					this.mySummary = res.data;
				})
				
				//获取我的奖励列表
				getd.getMyRebateList()
				.then((res)=>{
					////console.log(res,"???????")
					if (res.data.length>0) {
						this.isInvite = true;
						this.myRebateList = res.data;
					}else{
						this.isInvite = false;
					}
				})
				//获取当前用户邀请码
				var params = {
					datatype:"json"
				}
				getd.getCustomerInfo(params)
				.then((res)=>{
				//	this.account = res.data.Account;
					this.account = res.data.Id;
				}) 
				
			};
		},
		mounted(){
			
		},
		methods: {
			returnPrePage(){
				this.$router.push('/mine');
			},
			invitePoliteness(){
				this.$router.push('/activity/invitePoliteness');
			},
 
			//分享
			share(){
				 

				if (this.getToken()) { 
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
				
			},
			openModle(value){
				//弹框 
				document.getElementsByTagName('html')[0].style.overflowY="hidden";
				document.getElementsByTagName('body')[0].style.overflowY="hidden";
				this.detailData=[];
				this.detailData.push(value)
				this.modelToggleFlag = true;
			},
			closeModel(){//关闭模态窗口
				document.getElementsByTagName('html')[0].style.overflowY="scroll";
				document.getElementsByTagName('body')[0].style.overflowY="scroll";
				this.modelToggleFlag = false;
			}
		}
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	@import 'invitePoliteness.less';
	.list_title{

	}
	.afterTd{
     position: relative;
     &:after{
         content: "";
         position: absolute;
         bottom: 0;
         left: -0.58rem;
         display: block;
         height: 0.006666666666666667rem;
         background: #ebe5e1;
         width: 138%;
    }
}
 
</style>