<template>
	<div id="redeem">
		<!--头部-->
		<div class="redeem-header">
			<span  class="return" @click.stop="goBack()"></span>
			积分兑换专区
		</div>
		<!--图片-->
		<div class="redeem-img"><img src="../../assets/images/mine/integral/ad@3x.png"/></div>
		<!--券-->
		<div class="redeem-coupon">
			<ul class="redeem-list">
				<li v-for="data in scoreList">
					<div class="list-left">
						<div class="list-rmb"><span>¥</span><span>{{data.Coupon.Money}}</span></div>
						<div class="list-type">通用券</div>
					</div>
					<div class="list-right">
						<p>{{data.Title}}</p>
						<p>积分:&nbsp;&nbsp;{{data.Score}}</p>
						<p>库存:&nbsp;&nbsp;{{data.Coupon.Num}}</p>
						<div class="now-redeem" @click="toRedeem(data.Id)">立即兑换</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import getd from '../../vuex/getData.js';
	import { Toast,Indicator } from 'mint-ui';
	export default{
		data(){
			return{
				scoreList:[],//能兑换的优惠券列表
			}
		},
		created(){
			var params = {
					type:0
				}
			getd.getScoreList(params)
			.then((res)=>{
				this.scoreList = res.data;
				//console.log(res.data)
			})
		},
		methods:{
			//返回
			goBack(){
				this.$router.go(-1);
			},
			//立即兑换
			toRedeem(id){
				var param = {
					params:{
						id:id
					}
				}
				getd.getScoreMall(param)
				.then((res)=>{
					Toast({
				   		message: "兑换成功", 
				   		duration: 2000
				 	});
				})
				.catch((error)=>{
					Indicator.close();
					Toast({
				   		message: error.data.msg, 
				   		duration: 2000
				 	});
				})
			}
		},
	}
</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#redeem{
     position: absolute;
     left: 0;
     top: 0;
     bottom: 0;
     width: 100%;
}
/*头部*/
 .redeem-header{
     background: #fff;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1F1F1F;
     border-bottom: 1px solid #EBE5E1;
     background:white;
}
 .redeem-header .return{
     padding-left: 0.40540540540540543rem;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     .bg-image('../../assets/images/tabBar/nav_back');
     background-size: 100%;
     background-position: 0.40540540540540543rem 0.24324324324324326rem;
     position: absolute;
     left: 0;
}
 #redeem .redeem-img{
     width: 100%;
     height: 3.5135135135135136rem;
}
 #redeem .redeem-img img{
     width: 100%;
     height: 100%;
}
 .redeem-coupon{
     background: #eee;
     width: 100%;
     padding: 0.32432432432432434rem;
}
 .redeem-list li{
     width: 100%;
     height: 2.7027027027027026rem;
     display: flex;
     .bg-image('../../assets/images/mine/coupon/couponBgS');
     background-size: 100% 100%;
     margin-bottom: 0.32432432432432434rem;
}
 .redeem-list li .list-left{
     width: 3.5945945945945947rem;
}
 .list-rmb{
     margin-top: 0.6216216216216216rem;
     margin-left: 0.32432432432432434rem;
     margin-bottom: 0.40540540540540543rem;
}
 .list-rmb span:nth-of-type(1){
     font-size: 0.4594594594594595rem;
     color: #fff;
}
 .list-rmb span:nth-of-type(2){
     font-size: 1.027027027027027rem;
     color: #fff;
}
 .list-type{
     font-size: 0.3783783783783784rem;
     color: #fff;
     margin-left: 0.5945945945945946rem;
}
 .list-right{
     position: relative;
     flex: 1;
     padding-left: 0.2702702702702703rem;
     padding-top: 0.5405405405405406rem;
}
 .list-right p:nth-of-type(1){
     width: 85%;
     font-size: 0.3783783783783784rem;
     color: #1f1f1f;
     margin-bottom: 0.5135135135135135rem;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
}
 .list-right p:nth-of-type(2){
     font-size: 0.32432432432432434rem;
     color: #666;
}
 .list-right p:nth-of-type(3){
     font-size: 0.32432432432432434rem;
     color: #666;
     line-height: 0.7567567567567568rem;
}
 .now-redeem{
     width: 1.6216216216216217rem;
     height: 0.5405405405405406rem;
     position: absolute;
     right: 0.2702702702702703rem;
     bottom: 0.5405405405405406rem;
     font-size: 0.32432432432432434rem;
     color: #45b0da;
     border: 1px solid #4fc6ff;
     border-radius: 0.2702702702702703rem;
     line-height: 0.4594594594594595rem;
     text-align: center;
}
 
</style>