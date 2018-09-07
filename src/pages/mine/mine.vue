<template>

    <div id="mine">
			<!-- :on-refresh="refresh" -->
				<!-- <iframe style="width:100%;height:100%" src="https://dut.zoosnet.net/LR/Chatpre.aspx?id=DUT46021401&lng=cn" frameborder="0"></iframe> -->
      	<div class="wrap">
	      	<div class="mine">
						<!-- 消息图标组件 -->
	          <div class="information">
	            <img src="../../assets/images/tabBar/message@3x.png"/>
	          </div>
						<div class="set"  @click="toSet">
							<img src="../../assets/images/mine/new/shezhi@3x.png" class="set_i" alt="">
						</div>
	          <messageIcon   source="mine" class="info cartInformationWrap"></messageIcon>
	          <div class="head_portrait">
	            <div class="portrait" @click="myInformation">
	              <img :src="img" class="img" v-show="img"/>
	            </div>
	            <div class="login" @click="login" v-show="isLogin">登录 / 注册</div>
	            <div class="userName" @click="myInformation" v-show="!isLogin">
	              <span class="userNike">{{user}}</span>
	              <span class="userGrade">LV.{{level}}</span>
	            </div>
	          </div>
	        </div>
	        <div class="bottom_list">
	          <!--分类-->
	          <div class="classify">
	            <ul>
	              <li @click="shareRecommend">
	                <img src="../../assets/images/mine/new/fxtj@3x.png" />
	                <span>分享推荐</span>
	              </li>
	              <li @click="my_invite">
	                <img src="../../assets/images/mine/new/wdtj@3x.png" />
	                <span>我的推荐</span>
	              </li>
	              <li @click="goCollection">
	                <img src="../../assets/images/mine/new/wdsc@3x.png" />
	                <span>我的收藏</span>
	              </li>
	              <li @click.stop="goCompany">
	                <img src="../../assets/images/mine/new/wdgs@3x.png" />
	                <span>我的公司</span>
	              </li>
	            </ul>
	          </div>
						<!-- 余额优惠券 -->
						<div class="second_box">
							<div class="top">
								<ul>
									<li>
										<span>
											<img class="img_r" src="../../assets/images/mine/new/yue@3x.png" alt="">
											<span>余额</span>
										</span>
										<span class="num nowPrice" @click="goBalance()"  v-if="myWalletParticulars.Coupons== '--'">
											{{ myWalletParticulars.Balance  }} 
									    <img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
										</span>
										<span class="num nowPrice" @click="goBalance()"  v-else>
											{{ myWalletParticulars.Balance | formatPrice }}<b style="font-weight: normal;">{{myWalletParticulars.Balance | formatPriceX}}元
											</b> 
									    <img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
										</span>
									</li>
									<li>
										<span>
											<img class="img_r" src="../../assets/images/mine/new/yhq@3x.png" alt="">
											<span>优惠券</span>
										</span>
										<span class="num" @click.stop="coupon" v-if="myWalletParticulars.Coupons== '--'">
											{{myWalletParticulars.Coupons}}&nbsp;<img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
										</span>
										<span class="num" @click.stop="coupon" v-else>
											{{myWalletParticulars.Coupons}}张&nbsp;<img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
										</span>
									</li>
								</ul>
							</div>
							<div class="bottom">
								<span>
									<img class="img_r" src="../../assets/images/mine/new/qb@3x.png" alt="">
									钱包
								</span>
								<span @click="goWallet" class="wallet_s">
									佣金/积分/记账币
									<img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
								</span>
							</div>
						</div>
	          <div class="share common_list">
							<div class="order_form common_div" @click="my_order">
	              <span>我的订单</span> 
	              <img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
	            </div>
	            <div class="im_invite common_div" @click="customerService">
	              <span>联系客服</span>
	              <img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
	            </div>
	            <div class="im_opinion common_div" @click="toFeedBack">
	              <span>意见反馈</span>
	              <img class="img_g" src="../../assets/images/mine/new/go@3x.png" alt="">
	            </div>
	          </div>
	         
	        </div>
	    </div>
      <footer-nav></footer-nav>
    </div>


</template>

<script>
	import footerNav from '../../footer-nav';
	import getd from '../../vuex/getData.js';
	import { mapState,mapActions,mapGetters} from 'vuex';
	import messageIcon from '../message/messageIcon';
  import  tool from "../../util/tool";
	
	export default {
		data() {
			return {
				isLogin: true,
				user: "",
				level:"",
				img:""//头像
			}
		},
		computed:{
			...mapState(
				"mine_index",{
					"myWalletParticulars":"myWalletParticulars" 
				}
			),
		 
			arr(){
				var arrTemp = this.$store.state.myorder.dataValue.list;
				var lengths = [];
				for(var i = 0; i < arrTemp.length;i++){
					var type = arrTemp[i].ProcessingState;
					if( type != "Canceled"){
						lengths.push(type);
					}
				}
				return lengths;
			},
	 
		},
		created() {
      console.log( 'mine.vue页面的dpr' )
			
      console.log( document.querySelector('meta[name="viewport"]').getAttribute('content'))
			 //清除服务缓存
      tool.removeLocal('sever_index')
			// this.system_msg();
			// this.server_msg();
			// this.active_msg();
			// //console.log("this.activeMsgData",this.activeMsgData);
			//记录哪个页面进收货地址
			window.localStorage.setItem('AddressPage',this.$route.path)


			var mes = this.commonTool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false);
			if(mes) {
				var params = {
					datatype:"json"
				};
				//获取用户等级
				getd.getMyScore(params)
				.then((res)=>{
					this.level = res.data.LevelDes.slice(0,1);
				}).catch((error)=>{
					//console.log(error)
				})
				this.user = mes.Mobile;
				this.isLogin = false;

				//获取用户头像
				getd.getCustomerInfo(params)
				.then((res)=>{
					this.img = res.data.HeadPicPath;
				})
				.catch((error)=>{
					//console.log(error)
				})


			 
			//	console.log(this.mine.dispatch('REQUEST_BALANCE'))
				
				// console.log(this.mine.$dispatch('REQUEST_BALANCE'))

				console.log()
				
		  	//获取 帐户余额 奖励佣金 记账币 积分
				this.REQUEST_MYWALLETPARTICULARS();
			 
				
			} else {
					this.isLogin = true;
			}

		},
		activated: function () {
			// console.log('activ')
	    // var mes = this.commonTool.loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false);
			// if(mes) {
			// 	var params = {
			// 		datatype:"json"
			// 	};
			// 	//获取用户等级
			// 	getd.getMyScore(params)
			// 	.then((res)=>{
			// 		this.level = res.data.LevelDes.slice(0,1);
			// 	})
			// 	this.user = mes.Mobile;
			// 	this.isLogin = false;

			// 	//获取用户头像
			// 	getd.getCustomerInfo(params)
			// 	.then((res)=>{
			// 		this.img = res.data.HeadPicPath;
			// 	})
			// 	.catch((error)=>{
			// 		//console.log(error)
			// 	})

	    //    console.log(this.REQUEST_BALANCE)
			// 	//获取用户余额
			// 	this.REQUEST_BALANCE().then((res)=>{
			// 		console.log(1)
			// 	})
			// } else {
			// 	this.isLogin = true;
			// }

	 	 },
		components: {
			footerNav,
			messageIcon
		},
		methods: {
			...mapActions(
		      "mine_index",{ 
    			   REQUEST_MYWALLETPARTICULARS: "REQUEST_MYWALLETPARTICULARS"//获取 帐户余额 奖励佣金 记账币 积分 
		        }
				),
			 
      refresh (done) {
          setTimeout(()=>{
            done()  //表示刷新结束
          },1000)  
      },
			//去我的钱包
			goWallet(){
				console.log('去我的钱包')
				this.$router.push('/mine/myWallet');
			},
			//登录页面
			login() {
				this.$router.push('/mine/login');
			},
			//我的订单
			my_order() {
				this.$router.push('/mine/toMyOrder');
			},
			//我的优惠卷
			coupon() {
				this.$router.push('/mine/coupon');
			},
			//我的积分
			myInformation() {
				this.$router.push('/mine/myInformation');
			},
			//我的公司页面
			goCompany() {
				this.$router.push('/mine/goCompany');
			},
			//积分页面
			integral() {
				this.$router.push('/mine/integral');
			},
			//我的邀请页面
			my_invite() {
				this.$router.push('/activity/inviteList');
			},
			//分享页面
			shareRecommend(){
				this.$router.push('/mine/shareRecommend');
			},
			//收藏页面
			goCollection(){
				this.$router.push('/mine/collection');
			},
			toFeedBack(){ //意见反馈页面
				this.$router.push("/mine/feedback");
			},
			customerService(){ //客服聊天页面
				//window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0')
				this.$router.push('/userChatSever')
			},
			//设置
			toSet(){
				// console.log('什么鬼')
				this.$router.push("/mine/settings");
			},
			my_message(){ //跳转到消息页面
				this.$router.push("/message");
			},
			discount(){ //跳转限时优惠页面
				this.$router.push("/mine/discount");
			},
			toNew(){
				this.$router.push("/mine/forgetPassword");
			},
			//余额
			goBalance(){
				this.$router.push({name:'balance'});
			}
             
		},
		 filters:{
      formatPrice (value) { 
				if(value == '--' || value == undefined){return }  
        let _value = value.toFixed(2).toString()
        return   tool.formatPrice(_value ) ;
      },
      formatPriceX:value =>{
        if(value == '--' || value == undefined){return } 
        let _value = value.toFixed(2).toString()
        return tool.formatPriceX( _value ) ;
      },
      currency :value =>   {
				if(value == '--' || value == undefined){return } 
        let _value = (Number(value)).toString();
        return tool.currency( _value);
      }
    }
	};
</script>

<style lang="less" type="stylesheet/css" scoped>
  
	@import "../../common/index.less"; @import './mine.less';
	.img{
     height: 1.7297297297297298rem;
     width: 1.7297297297297298rem;
     border-radius: 50%;
}
 //改变小数点样式 
 .nowPrice(0.32432432432432434rem);
 
 .img_g{
	 width: 0.21621621621621623rem;
   height: 0.3783783783783784rem;
 
 }
 .img_r{
	 width: 0.4864864864864865rem;
   height: 0.4864864864864865rem; 
 }


 .wallet_s{
	 margin-right: 0.21621621621621623rem;
 }
 .num{
	 margin-right: 0.05405405405405406rem;
 }
</style>