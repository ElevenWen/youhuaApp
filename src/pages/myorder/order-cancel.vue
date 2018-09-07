<style type="text/css" lang="less" scoped>
@import "../../common/index.less";
@import "./order.less";
.headerIcon{
     .bg-image("../../assets/images/mine/myorder/hadcancel");
}
 .delete{
     width: 0.3783783783783784rem;
     height: 0.3783783783783784rem;
     .bg-image("../../assets/images/tabBar/deleteIcon");
     background-size: 0.3783783783783784rem 0.3783783783783784rem;
     float: right;
     position: relative;
     top: 0.32432432432432434rem;
     left: 20%;
}
 .delete_b{
	 /*margin-right: 5.333333rem !important;*/
 }
 
 #orderDetail .listImg{
 	width: 2.4rem;
 }
 #orderDetail .footer{
 	display: flex;
 }
 #orderDetail .footer span:nth-child(2){
 	background: #ff6b5f;
 	width: 3.36rem;
 	height: 1.3066rem;
 }
 #orderDetail .footer span:nth-child(1){
 	flex: 1;
 	text-align: left;
 	padding-left: 0.5733rem;
 	color: #666666;
 }
 #orderDetail .actualMoney span:nth-child(1){
 	margin-right: 0.88rem;
 }
</style>
<template>
	<div id="orderDetail">
		<header-title title="订单详情"  v-if="arr.IsElectronicContract" source="electronicContract" @showProps="showPropsFn"></header-title>
		<header-title title="订单详情"  v-else @showProps="showPropsFn"></header-title>
		<!-- <div style="height: 44px; width: 100%;"></div>
		<div class="headerHint" v-if="seen">
			<p>商家请求完结订单，您确认完成之后，平台将打款给商户；请谨慎操作！</p>
			<span class="closeHint" v-on:click="closeHint"></span>
		</div> -->
		<div class="header">
			<!--<div class="headerIcon">;</div>-->
			<div class="headerWord">已取消</div>
			<ul class="server"></ul>
		</div>
		<!-- 收货地址 -->
		<!-- <div class="siteSchedule" v-if="cusDeliveryData.success">
			<div class="orderIcon"><img src="../../assets/images/mine/site@3x.png">地址</div>
			<div class="orderName">{{cusDeliveryData.data.ConsigneeName}}    {{cusDeliveryData.data.ConsigneeMobile}}</div>
			<div class="orderDate">{{cusDeliveryData.data.ProvinceName}}{{cusDeliveryData.data.CityName}}{{cusDeliveryData.data.AreaName}} {{cusDeliveryData.data.Address}}</div>
			<span class="shippingAddress"></span>
		</div> -->
		<div class="addressWrap" v-if="cusDeliveryData.success">
			<div class="addressIcon"></div>
			<div class="addressName">{{cusDeliveryData.data.ConsigneeName}}</div>
			<div class="addressInfo">
				<span>{{cusDeliveryData.data.ConsigneeMobile}}</span>
				<span>{{cusDeliveryData.data.ProvinceName}}{{cusDeliveryData.data.CityName}}{{cusDeliveryData.data.AreaName}} {{cusDeliveryData.data.Address}}</span>
			</div>
		</div>
		<main class="cart-mianWrap"  >
		    <ul class="cart-itemsWrap ">
		        <li class="items-list singS"   v-for="(item,index) in arr.OrderDetails" >
			        <!-- 单品  -->
			        <div v-if="item.ProductDetails.length == 0">
				            <!-- <div>
				              	<h3 class="title">
				                   <span class="themeC"><strong class="font11">满减</strong></span>
				                   <span>购物慢190.00元,可减30.元</span> 
				                </h3>
				            </div> -->
			            <div class="listMain">
				            <div class="infos">
				                <div class="innerWrap">
				                  	<img class="listImg" :src="item.ThumbImgURL" alt="" />
					                <div class="brief">
					                    <p>
											{{ item.Name }}
					                    </p>
					                    <!-- <p>
					                     类型：有限类型；刻章：不刻章
					                    </p> -->
					                    <p>{{item.ProductType}}</p>
					                </div>
					                <div class="purchWrap">
							    		<span class="themeC  nowPrice">{{  item.Price | formatPrice | currency}}<b>{{ item.Price| formatPriceX  }}</b></span> 
					                </div>
				                </div>
				            </div>
			            </div>
				           <!--  	勿删这个div
				            <div class="listfooter">
				              <span>促销&nbsp;&nbsp;</span><span>  ==暂无数据</span>
				            </div> -->
			        </div> 
			    	<!-- /单品  -->
					<!-- t套餐 -->
			        <div v-if="item.ProductDetails.length != 0">  
			        	<div> 
			               	<h3  class="title" >
				                <span class="themeC"><strong class="font11">套装</strong></span>
				                <span class="themeC">{{ item.Price }}</span>  
				                <span class="couBtn themeC" v-if="(item.Price - item.OldPrice) != 0"><strong class="font11">立省￥{{ item.Price - item.OldPrice }}</strong></span> 
			               	</h3>
			            </div>
						<div  v-for="(itemsTemp,index) in item.ProductDetails"> 
				            

				            <div class="listMain" >
				              	<div class="checkboxWrap " v-if="0==0"></div>
				              	<div class="infos">
				                	<div class="innerWrap">
				                   		<img class="listImg"   :src="itemsTemp.ThumbImgURL" alt="" >
				                    	<div class="brief">
				                         	<p >
				                          		{{ itemsTemp.Name}}
				                        	</p>
				                        	 <p>
				                         		{{itemsTemp.ProductType}}
				                        	</p> 
				                   		</div>
					                    <div class="purchWrap">
					                        <span class="themeC  nowPrice">{{ itemsTemp.Price}}
					                        <!-- <b>{{itemsTemp.Price | formatPriceX  }}</b> -->
					                        </span>
					                    </div>
				                	</div> 
				            	</div>
				            </div> 
				        </div>

			            <!-- 预留套餐促销 -->
			            <!-- <div  class="listfooter" v-if="a == 2" >
			                <span>促销&nbsp;&nbsp;</span><span>满199.00减50.00</span>
			            </div>    --> 
			        </div> 
		    	</li>
		    </ul>
	    </main>
	    <!-- 订单信息 -->
	    <div class="order">
	    	<div class="orderNumber">订单编号：<span id="number">{{arr.OrderNumber}}</span>   
	    		<!-- &nbsp&nbsp&nbsp&nbsp<span @click="copyOrderNumber">复制</span> -->
	    	</div>
	    	<div class="orderTime">下单时间：<span>{{ currentTime }}</span></div>
	    </div>
		<!-- 支付方式 -->
	    <div class="payMethod" >支付方式：<span>{{ payMethod(arr.PayType) }}</span></div>
	    <!-- 发票信息 -->
	    <div class="invoice" >
	    	<div class="invoiceType">发票类型：<span>{{ arr.CusInvoiceType }}</span></div>
	    	<div class="invoiceHead">发票抬头：<span>{{ arr.CusInvoiceName }}</span></div>
	    	<div class="invoiceDetail">发票内容：<span>明细</span></div>
	    </div>
	    <div class="moneyWrap">
	    	<!-- 服务金额 -->
		    <div class="money">
				<div class="totalMoney">商品金额
						<span class="themeC  nowPrice">{{ money | formatPrice | currency}}<b>{{ money | formatPriceX  }}</b></span> 
				</div>
		    	<div class="discountMoney" v-if="arr.PreferentialAmount != '0.00'">优惠<span>-¥{{ arr.PreferentialAmount}}</span></div>
				<div class="discountMoney"  v-if="arr.BookkeepCurrency != 0">记账币<span>-¥{{ arr.BookkeepCurrency}}</span></div>
		    </div>
		    <div class="actualMoney"><span>实付款：</span>
						<span class="themeC  nowPrice">{{  arr.Amount | formatPrice | currency}}<b>{{  arr.Amount | formatPriceX  }}</b></span>
			</div>
	    </div>
	    <div class="finally"><span>————已经到底了————</span></div>
	    <!-- 取消订单 -->
	    <div class="footer">
	    	<span @click="deleteOrder(arr)" @showProps="showPropsFn" class="delete_b">删除订单</span>
	    	<span @click="buyAgain(arr)">再次购买</span>
	    </div>
	</div>
</template>
<script>
import headerTitle from '../components/header-title';
import util from '../../util/tool';
import axios from "axios";
import getData from '../../vuex/getData.js';
	export default {
		data(){
			return {
			//	ab : require('@/assets/images/test.png'), 
			cusDeliveryData:{},//收货地址
			}
		},
		components:{
			headerTitle,
		},
		computed:{
			arr(){
				var arrTemp = this.$store.state.myorder.productDetail;
				if(arrTemp == undefined){
					return 
				}
				////console.log("1234555555",arrTemp.OrderDetails); 
				let local = {};
				local.isProvideContract = arrTemp.ElectronicContractTemplate;
				local.isSignContract = arrTemp.IsSignedElectronicContract;
				local.status = arrTemp.Status;
				local.contractId = arrTemp.ContractID;
				local.ContractTemplateID = arrTemp.ContractTemplateID;
				local.IsSignedElectronicContract = arrTemp.IsSignedElectronicContract;
				// console.log("1234555555",local);
				util.saveToLocal("orderDetail123","orderDetail123","orderDetail123",local);
				return arrTemp;
			},
			money(){
				var arrTemp = this.$store.state.myorder.productDetail;
				// var moneyTemp = Number(arrTemp.Amount) + Number(arrTemp.PreferentialAmount);
				// var moneyTemp1 = moneyTemp.toString().split(".");
				// // 实现保留两位小数
				// if(moneyTemp1.length==1){
				//  	moneyTemp=moneyTemp.toString()+".00";
				//  	return moneyTemp;
				// }
				// if(moneyTemp1.length>1){
				//  	if(moneyTemp1[1].length<2){
				//   		moneyTemp=moneyTemp.toString()+"0";
				// 	}
				// 	return moneyTemp;
				// }
				return arrTemp.OldAmount;
			},
			phone(){
				var phoneTemp = this.$store.state.myorder.telphone;
				// //console.log("phoneTemp",phoneTemp);
				return phoneTemp;
			},
			currentTime(){
				let Create = this.$store.state.myorder.productDetail.CreateTime;
				if(Create == undefined){
					return 
				}
				let timer = Create.substring(6,Create.lastIndexOf(")"));
				let time = new Date(parseInt(timer));
				var year = time.getFullYear();
				var month = time.getMonth()+1;
				var date = time.getDate();
				var day = time.getDay();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				var currentTime = year+"/"+month+"/"+date+" "+h+":"+mm+":"+s;
				////console.log("currentTime",currentTime);
				return currentTime;
			}
		},
		created(){
			//获取收货地址数据
			let params = {
				id:this.$route.query.id,
				"dataType":'json'
			}
			getData.getOrderAddress(params).then((res)=>{ //获取收货地址
				this.cusDeliveryData = res;
				console.log("this.cusDeliveryData",this.cusDeliveryData)
			}).catch(err=>{
				console.log(err)
			})
			// //console.log("id",this.$route.query.id.Id);
			// 订单详情请求数据
			var data = {
		   		  "params": {
		   		  		"id": this.$route.query.id
		   			}
					
				};
			this.$store.dispatch("request_data_orderDetail",data);
		},
		methods:{
			payMethod(val){
				switch(val){
					case "Alipay":
						return "支付宝支付";
						break;
					case "WeChat":
						return "微信支付";
						break;
					case "Balance":
						return "余额支付";
						break;
					case "Unionpay":
						return "银联支付";
						break;
					case "Substitute":
						return "朋友代付";
						break;
					case "BookCurrency":
						return "记账币支付";
						break;	
				}
			},
			buyAgain(value){
			// //console.log("dfdsf222",value);
				//清除购物车的本地记录 防止重复
				util.removeLocal('_CART');
				var id = {
					"params": {
						"id": value.Id
					}
				};

				// 再次购买调接口
				this.$store.dispatch("request_data_bugagain",id).then((res) => {
					
					if(!this.$store.state.myorder.buyagain){
						return
					}
					
					// 再次购买接口成功调起后再调购物车列表接口
					this.$store.dispatch("request_data_cart").then((res)=>{
						
						let localS = {
							"list" : [],
							"recordCount" : this.$store.state.myorder.buyagain.recordCount,
						}	
						localS.list = this.$store.state.myorder.buyagain.list;
						
						
						
						// //console.log("取消订单本地存储",localS.list);
						// 本地存储
						var  localstorage = util.saveToLocal("_CART",this.getToken(),"data",localS);
	 
						// 跳转到确认订单页面
						this.$router.push({path:'/cart/comfirmOrder',query:{id:value.Id}});
					});
				});
 
			},
			copyOrderNumber(){
				var copyDOM = document.querySelector('#number');    
				var range = document.createRange();    
				  // 选中需要复制的节点  
				range.selectNode(copyDOM);  
				  // 执行选中元素  
				window.getSelection().addRange(range);  
				  // 执行 copy 操作  
				var successful = document.execCommand('copy');    
				  try {    
					var msg = document.getElementById('number').innerHTML;
				  } catch(err) {    
				    // //console.log('Oops, unable to copy');    
				  }
				// 粘贴
				document.addEventListener('paste',function copy (e) {  
		            // e.preventDefault(); 
		            // msg.collapse(false); 
		        });   

				// 移除选中的元素  
				// window.getSelection().removeAllRanges(); 
			},
			showPropsFn(data){
				this.$emit("showProps",true );
			},
			deleteOrder(value){
				// //console.log("+++++",value);

				var dataV = {
					data:{
						"params":{
							"ids": value.Id,
						}
					},
					value:value
				};
				// 订单列表——删除订单
				this.$store.dispatch("request_data_orderDelete",dataV).then((res)=>{
					// 同时刷新订单列表的视图层
				 	this.$store.dispatch("request_data_myorder",{"type":""});

					this.$router.push("/mine/toMyOrder");
				 
			    }).catch(function(error){
			       // //console.log("删除订单出了问题",error);
			     });
			},
		},
		filters:{
		    formatPrice(detail){
				return util.formatPrice(detail);
			},
			formatPriceX(detail){
				return util.formatPriceX(detail);
			},
			currency(detail){
				return util.currency(detail);
			},
		}
	}
</script>