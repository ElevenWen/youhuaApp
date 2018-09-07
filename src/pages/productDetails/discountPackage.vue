<style lang="less" type="stylesheet/css" scoped >
@import "../../common/index.less";
	#wrap{
     position:fixed;
     left:0;
     top:0;
     bottom:0;
     z-index:99;
     width: 100%;
     background-color: #EFEFF4;
}
 .header{
     height: 1.2162162162162162rem;
     background-color: white;
}
 .header .img{
     width: 1.1891891891891893rem;
     height: 1.1891891891891893rem;
     float: left;
}
 .back{
     width: 0.2972972972972973rem;
     height: 0.4864864864864865rem;
     margin-left:0.32432432432432434rem;
     margin-top: 0.3783783783783784rem;
}
 .headTitle{
     display: inline-block;
     margin-left:30%;
     font-size: 0.43243243243243246rem;
     line-height: 1.2162162162162162rem;
}
 .img-cart{
     float: right;
     margin-right: 0.2972972972972973rem;
     height: 1.1891891891891893rem;
}
 .headerShopp{
     width: 0.6216216216216216rem;
     height: 0.6216216216216216rem;
     margin-top: 0.3783783783783784rem;
}
 .package{
     margin-top: 0.32432432432432434rem;
     padding-bottom: 0.2702702702702703rem;
     background: white;
     // display: none;
}
 .packageOne{
     height: 1.3783783783783783rem;
     line-height: 1.3783783783783783rem;
     // border-bottom: 1px solid lightgray;
}
 .packageOneTitle{
     // flex:1 1 1.8918918918918919rem;
     // text-align: center;
     font-size: 0.43243243243243246rem;
     margin-left: 0.32432432432432434rem;
}
 .packageOnePrice{
     margin-left: 0.4594594594594595rem;
     color: red;
     font-weight: 600;
}
 .packageOneDiscount{
     font-size: 0.32432432432432434rem;
     color: red;
     padding: 0.0.13513513513513514rem 1px;
     border: 1px solid red;
     border-radius: 0.08108108108108109rem;
     font-weight: 400;
}
 .withdraw_Drop{
     width: 0.3783783783783784rem;
     height: 0.21621621621621623rem;
     float: right;
     margin: 0.5405405405405406rem;
}
 .withdraw_up{
     width: 0.3783783783783784rem;
     height: 0.21621621621621623rem;
     float: right;
     margin: 0.5405405405405406rem;
     display: none;
}
 .pkgDetail{
     height: 2.945945945945946rem;
}
 .companyImg{
     width: 2.4054054054054053rem;
     height: 2.4054054054054053rem;
     margin:0.2702702702702703rem 0 0 0.32432432432432434rem;
     border-radius: 0.13513513513513514rem;
}
 .pkgDetailRight{
     width: 62%;
     // height: 2.945945945945946rem;
     display: inline-block;
     margin-left: 0.32432432432432434rem;
     vertical-align:top;
}
 .right{
     width: 0.1891891891891892rem;
     height: 0.3783783783783784rem;
}
 .pkgDetailRightTitle{
     margin-top: 0.40540540540540543rem;
     font-size: 0.43243243243243246rem;
}
 .rightDetail{
     display: flex;
     margin-top:0.40540540540540543rem;
}
 .detail{
     color: gray;
     font-size: 0.35135135135135137rem;
     flex:1 1 2.5675675675675675rem;
     text-align: left;
}
 .pkgDetailTwo{
     height: 4.4324324324324325rem;
     background-color: white;
}
 .shopping{
     height: 0.972972972972973rem;
     margin:0 auto;
     .bg-image('../../assets/images/productDetails/addshopping');
     background-size: 100% 0.972972972972973rem;
     margin: 0 auto;
     border-radius: 0.08108108108108109rem;
     color: white;
     text-align: center;
     line-height: 0.972972972972973rem;
     font-size: 0.43243243243243246rem;
}
 .hidden{
    /*display: none;
     */
}
 
</style>
<template>

	<div id="wrap">
		<!-- 头部 -->
		<div class="header">
			<div class="img" @click="backUpper"><img src="../../assets/images/tabBar/back@3x.png" class="back" /></div>
			<div class="headTitle">优惠套餐</div>
			<div class="img-cart" @click="goShopping"><img src="../../assets/images/productDetails/shoppingCar@3x.png" class="headerShopp" /></div>
		</div>
		<div class="package">
			<div class="packageOne">
				<span class="packageOneTitle">优惠套装1</span>
				<span class="packageOnePrice">￥{{content.Price}}</span>
				<span class="packageOneDiscount">立省￥{{content.OriginalPrice-content.Price}}</span>
				<img src="../../assets/images/productDetails/unfolded@3x.png" class="withdraw_up" id="withdraw_up" @click="more" />
				<img src="../../assets/images/productDetails/recover@3x.png" class="withdraw_Drop" id="withdraw_Drop" @click="more" />
			</div>
			<div class="hidden" id="hidden">
				<div class="pkgDetail" v-for="data in content.ProPackageDetailModels" @click="goProduct(data.ProductIdd)">
					<img :src="data.ThumbImgURL" class="companyImg" />
					<div class="pkgDetailRight">
						<div class="pkgDetailRightTitle">{{data.Name}}</div>
						<div class="rightDetail">
							<!--<img src="../../assets/images/tabBar/right_arrow@3x.png" class="right" />-->
						</div>
					</div>
					<!-- 灰色分隔线 -->
					<div style="width:95%;height:1px;background-color:lightgray;margin:0 auto;" v-show="content.ProPackageDetailModels.length==1?false:true"></div>
				</div>
				<div style="margin:12px 12px 0 12px;">
					<div class="shopping" @click="addshoppingP">加入购物车</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import getd from '../../vuex/getData.js';
	import {Toast} from 'mint-ui';
	export default {
		data(){
			return {
				returnUp: false, //传回到父组件的值(productDetail)
				// id:this.$route.query.id,
				content:{}
			}
		},
		 created(){
		 	var params = {
				id:this.$route.query.id
			};
			getd.getDetailData('/ProPackage/GetProckageInfoById',params)
			.then((res)=>{
				this.content = res.data;
			})
		 },
		methods:{
			goProduct(id){
				this.$router.push({path:'/home/productDetails',query:{id:id,type:0,style:0}});
			},
			backUpper(){ 
				this.$emit("return" );
				// this.$router.push({path:'/home/productDetails',query:{id:this.$route.params.id,type:this.$route.params.type,style:this.$route.params.style}});
				this.$router.go(-1);
			},
			more(){
				var hidden = document.getElementById("hidden");
				var withdraw = document.getElementById("withdraw_Drop");
				var withdrawUp = document.getElementById("withdraw_up");
				if(hidden.style.display == "none"){
					withdraw.style.display = "block";
					withdrawUp.style.display = "none";
		        	hidden.style.display = "block";
		        }else{
		        	withdraw.style.display = "none";
		        	withdrawUp.style.display = "block";
					hidden.style.display = "none";
		        }
			},
			//跳转购物车页面
			goShopping(){
				if (this.getToken()) {
					this.$router.replace({ path: '/cart',replace:true})
				}else{
					this.$router.replace('/mine/login')
				}
				
			},
			//加入购物车
			addshoppingP(){
				if (this.getToken()) {
					var params = {
						productId:this.$route.query.id,
						price:this.content.Price,
						oldPrice: this.content.OriginalPrice,
						num:1
					};
					getd.createdShoppingCart(params)
					.then((res)=>{
						Toast({
							message: '加入购物车成功',
						  	position: 'middle',
						  	duration: 2000
						})
						this.$router.push('/cart');
					})
				}else{
					this.$router.replace('/mine/login')
				}
				
			}
		},
	}
</script>