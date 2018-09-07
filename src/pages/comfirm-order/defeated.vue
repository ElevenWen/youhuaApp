<template>
  <div id="defeated">
	<div class="popularity_return"> 
		   <span class="title_name">交易详情</span>
	</div>
	<div class="mainWrap">
		<div class="details">
			<img :src="ab" alt=""    />
			<p class=" ">支付失败</p>
			<p class=" " v-cloak>¥{{money}}</p>
		</div> 
		<!--<div class="company">
			<span>收款方</span><span>深圳市荣灿控股集团</span>
		</div>-->
		<div class="complete" @touchend="goHome()">
		返回我的订单
		</div>
	</div>
  </div>
</template>

<script>
import headerTitle from '../components/header-title';
import  tool from "../../util/tool";

export default {
	data(){
		return {
			title:"交易详情",
			money:"",
			ab :require('@/assets/images/comfirm-order/defeated@3x.png'), 	
		}
	},
	components:{
	   headerTitle,
	},
	created(){  
      	tool.getQueryString("Amount");
      	this.money = tool.getQueryString("Amount")
    },
	methods:{
		goHome(){
			//点击完成跳转 我的订单
			window.location.href="file:///data/user/0/com.rongcan.wqb/files/apps/1106428143/www/index.html#/mine/toMyOrder";
			 this.$router.push({"path": '/mine/toMyOrder'});
		}
	}
}
 

</script>

<style lang="less" type="stylesheet/css" scoped>
	@import "../../common/index.less";
	#defeated{
		padding-top:1.1891891891891893rem;
		position: absolute;
		height: 100%;
		width: 100%;
		background: white;
	}
	.popularity_return {
		position: fixed;
		top:0;
		left:0;
		height: 1.1891891891891893rem;
		width: 100%;
		text-align: center;
		line-height: 1.162162162162162rem;
		font-size: 0.4864864864864865rem;
		color: #1F1F1F;
		border-bottom: 1px solid #EBE5E1;
		background-color: #fff;
	}
	.return{
		position: absolute;
		height: 1.0810810810810811rem;
		width: 0.6486486486486487rem;
		top:0;
		left:0.40540540540540543rem;
		.bg-image('../../assets/images/tabBar/nav_back');
		background-size: 100%;
		background-position:0rem 0.24324324324324326rem;
	}
	.confirm{
		width: 1.0810810810810811rem;
		height: 1.2162162162162162rem;
		top:0;
		right: 0.5405405405405406rem;
		line-height: 1.1891891891891893rem;
		font-size: 0.43243243243243246rem;
		position: absolute;
		z-index: 9999;
		color: #FF5000;
	}
	.mainWrap{
		padding:0 0.5405405405405406rem;
	}
	.details{
		padding-top:0.8108108108108109rem;
		img{
			display: block;
			margin:0 auto;
			width: 1.9189189189189189rem;
			height: 1.9189189189189189rem;
		}
		p{
			height: 0.5135135135135135rem;
			line-height:0.5135135135135135rem;
			text-align: center;
		}
		>p:nth-child(2){
			margin-top: 0.40540540540540543rem;
			font-size: 0.4594594594594595rem;
		}
		>p:nth-child(3){
			margin-top: 0.5405405405405406rem;
			font-size: 0.6216216216216216rem;
			font-weight: bold;
		}
	}
	.company{
		margin-top: 1.3513513513513513rem;
		height: 1.4054054054054055rem;
		line-height: 1.3513513513513513rem;
		font-size: 0.40540540540540543rem;
		.border-1pxT(#EBE5E1);
		.border-1pxB(#EBE5E1);
		span:nth-child(2){
			float:right;
		}
	}
	.complete{
		margin-top: 0.8108108108108109rem;
		background: linear-gradient(to right, #FC7303, #F95008);
		text-align: center;
		.c(#fff);
		height: 1.135135135135135rem;
		line-height: 1.135135135135135rem;
		font-size: 0.40540540540540543rem;
	}
 
</style>
