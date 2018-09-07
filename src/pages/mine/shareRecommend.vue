<template>
	<div id="shareRecommend" @click="savaImg">
		<div class="popularity_return">
			<span class="return"  v-if="isShow"><span href="javascript :;" onClick="javascript :history.back(-1);"></span> </span>
			<span>分享收益</span>
			<span class="share" @click.stop.prevent="share" v-if="isShow" ></span>
		</div>
		<div class="bigPortrait">
			<!-- 判断客户有没有头像 -->
			 <img v-if="img" :src="img"  alt=""/>
			 <img v-else  src="../../assets/images/mine/tx@2x.png" alt=""/>

		</div>
		<div id="QR_code">
			<div class="QR_code">
				<img v-if="img" :src="img"  alt=""/>
			    <img v-else src="../../assets/images/mine/logo@2x.png" alt=""/>
			</div>
		</div>
		<div class="myNike">
			<span>我是</span>
			<span v-if="name">{{name}}</span>
			<span v-else>{{accountCode}}</span>
		</div>
		<div class="recomVoice"></div>
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import getd from '../../vuex/getData.js';
import * as types from '../../vuex/mutations_types.js';
import store from '../../vuex/mine/mine.js';
import QRCode from 'qrcodejs2';
	export default {
		data(){
			return {
				name:"",
				img:"",
				// ab: "../../assets/images/mine/tx.png",
				// ab : require('@/assets/images/mine/tx.png'), 
				// bc : require('@/assets/images/mine/logo@2x.png'),
				account:"",
				accountCode: '',	//推荐码
				isShow:this.$root.flagShare,//分享图标
				activityMes:{},//分享信息
				SharSource: 'WeiXin'	//分享途径
			}
		},
		beforeRouteEnter(to, from, next){
			next((vm)=>{
				 // 请求bannner图片
				var params = {
					params: {
						type: 1,
						code: "GG00101"
					}
				};
				getd.getHomeBanner(params)
				.then((res) => {   
							var currenthDate = res.data.list;
							////console.log( currenthDate ,"分享页面轮播图数据");
							currenthDate.forEach((items)=>{
								if(items.Describe == '/activity/newPresent'){//newPresent 分享内容
									vm.activityMes = items; 
								};
							}) 
							
				},(error)=>{
					alert("请重新刷新页面")
				
				});
			})
			

			
		},
		created(){
			////console.log("location.href",location.href);
			
			
			let href = location.href;
			// https://localhost:6110/#/mine/shareRecommend
			let newHref = href.substr(0,href.lastIndexOf("/"));

			////console.log("newHref",newHref);
			// let register;
			let currentHref = newHref + "/register";
			////console.log("currentHref",currentHref);
			//获取当前用户信息
			var params = {
				datatype:"json"
			};
			getd.getCustomerInfo(params)
			.then((res) => {
				//console.log('用户信息',res)
				
				this.account = res.data.Id;
				this.accountCode = res.data.Account;
				//console.log('id~~~~~',this.account,_value)
				this.name = res.data.Nickname;
				this.img = res.data.HeadPicPath;
				
				// var ab = `${currentHref}?Account=${_value}`
				// ////console.log(_value)
				// 制作二维码
			   // qrcode.makeCode(res.data.Account);
			})

			// 展示客户头像调接口
			
			//获取缩略图
			var params = {
				params:{
					type:1,//pc 成为0  app 为1
					code:'ZBGGW1'
				}
			};
			getd.getHomeBanner(params)
			.then((res) => {
				//////console.log( res.data.list[0])
				this.activityMes = res.data.list[0];
				var currenthDate = res.data.list;
				////console.log( currenthDate ,"分享页面轮播图数据");
				currenthDate.forEach((items)=>{
					if(items.Describe == '/activity/newPresent'){//newPresent 分享内容
						this.activityMes = items; 
					};
				})  
			});
 

			

		},
		mounted(){
			this.$nextTick(()=>{
				//二维码
				var _value = this.commonTool.loadFromLocal("login_user_id","login_user_id","login_user_id",false);
				var  dpr = document.documentElement.getAttribute('data-dpr');
				var sizeS = 0
				if(dpr <2){
					sizeS = 110;
				}else if(dpr <=2){
					sizeS = 220;
				}else{
					sizeS = 370;
				}
				var qrcode = new QRCode(document.getElementById("QR_code"), {
				    // text: "https://www.baidu.com?Account=02",
				    // text: `https://192.168.155.1:7380/#/mine/register?Account=${_value}`,
				    // text: `${currentHref}?Account=${_value}`,
				    //text: `https://host.wqbol.net/mine/unionBindBefor?Account=${_value}`, //测试环境
				    text: `https://host.wqbol.com/mine/unionBindBefor?Account=${_value}`,//线上环境
				    width: sizeS,
				    height: sizeS,
				    colorDark : "#000000",   
				    colorLight : "#ffffff",
				    correctLevel : QRCode.CorrectLevel.H,
				});
			})
		},
		components: {
			headerTitle,
		},
		methods: {
			//分享
			share(){ 
				if(!this.account){
					return false	
				}
				wrhShare().sendShare(
					"活动",//bussType_param, bussId_param, title_param, content_param, img_param, href_param
					"000000",
					this.activityMes.LinkName.substring(0,this.activityMes.LinkName.length-1),
					this.activityMes.Remark,
					this.activityMes.ThumbImgURL,
					//"https://host.wqbol.net/mine/unionBindBefor" + "?Account=" + this.account //测试
					"https://host.wqbol.com/mine/unionBindBefor"+"?Account=" +this.account		//线上
				);
				
			},
			
//			immediately(){
//				this.$router.push('/mine/shareRecommend')
//			}
			savaImg(){
			// 	var shareRecommend = document.getElementById("shareRecommend");
			// 	shareRecommend.addEventListener("contextmenu",function(event){
			// 		event.preventDefault();
			// 		shareRecommend.style.display = "block";
			// 		shareRecommend.style.top = event.clientY + "px";
   //  				shareRecommend.style.left = event.clientX + "px";
			// 	})

			// 	// 点击其他地方的时候隐藏邮件菜单
			// 	shareRecommend.addEventListener("touchend",function(evernt){
			// 		shareRecommend.style.display = "none";
			// 	})
			},
		},
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#shareRecommend{
     height: 100%;
     background: #ffffff;
     // -webkit-touch-callout:default;
}
 .popularity_return{
     height: 1.1891891891891893rem !important;
     line-height: 1.1891891891891893rem !important;
     position: relative !important;
}
 .bigPortrait {
     height: 50%;
     width: 100%;
     margin-top: 0rem !important;
     // background-image:url("../../assets/images/mine/tx.png");
}
 .bigPortrait img{
     height: 100%;
     width: 100%;
     margin-top: -0.13513513513513514rem;
}
 #QR_code{
     width: 3.5945945945945947rem;
     height: 3.5945945945945947rem;
     margin: -1.7837837837837838rem auto;
     border-radius: 0.24324324324324326rem;
     position: relative;
     z-index: 99;
     -moz-box-shadow: 1px 1px 0.5405405405405406rem #ccc;
    /* 老的 Firefox */
     box-shadow: 1px 1px 0.5405405405405406rem #ccc;
     background-color: #FFF;
     background-size:100% 100% ;
     padding: 0.32432432432432434rem;
     ;
     .bg-image('../../assets/images/mine/codeBg');
}
 #QR_code img {
     display: block;
     width: 80%;
     margin: 0 auto;
}
 .QR_code{
     width: 1.2162162162162162rem;
     height: 1.2162162162162162rem;
     background: #FFF;
     position: fixed;
     margin: 0.8648648648648649rem;
}
 .QR_code img {
     height: 1.054054054054054rem;
     width: 1.054054054054054rem !important;
     margin: 0.08108108108108109rem !important;
}
// .QR_code .scan_i {
// 	 width: 9.945945945945946rem;
// }
 .myNike{
     position: fixed;
     bottom: 3.2432432432432434rem;
     width: 100%;
     text-align: center;
     margin-top: 3.2432432432432434rem;
     font-size: 0.4594594594594595rem;
}
 .myNike span:nth-child(2){
     color: #FE821B;
     margin-left: 0.13513513513513514rem;
}
 .recomVoice{
     height: 1.4864864864864864rem;
     width: 100%;
     margin: 0 auto;
     background-size: 58% 100%;
     position: fixed;
     bottom: 0.6756756756756757rem;
     background-repeat: no-repeat;
     background-position: center;
     .bg-image('../../assets/images/mine/recomVoice');
}
 .popularity_return {
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.1891891891891893rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     background: #FFF;
}
 .return {
     padding-left: 0.40540540540540543rem;
     height: 1.1891891891891893rem;
     width: 1.1891891891891893rem;
     background-repeat: no-repeat;
     background-size: 0.5405405405405406rem;
     background-position: 0.40540540540540543rem 0.2972972972972973rem;
     position: absolute;
     left: 0;
     .bg-image('../../assets/images/cart/nav_back');
}
 .return span {
     width: 100%;
     height: 100%;
     display: block;
}
 .share{
     padding-left: 0.40540540540540543rem;
     height: 1.1891891891891893rem;
     width: 1.4864864864864864rem;
     background-repeat: no-repeat;
     background-size: 0.5405405405405406rem;
     background-position: 0.7027027027027027rem 0.2972972972972973rem;
     position: absolute;
     right: 0;
     .bg-image('../../assets/images/productDetails/share');
}
 
 
</style>