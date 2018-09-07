<style type="text/css" lang="less" scoped>
	@import "../../common/index.less";
	@import "./order.less";
	.server{
     width: 30%;
     left: 0;
}
 .server li{
     width: 30%;
     height: 0.5675675675675675rem;
     .bg-image('../../assets/images/mine/myorder/server');
     background-size: 0.5135135135135135rem 0.5675675675675675rem;
     background-position: 0.05405405405405406rem 1px;
     padding-top: 0.6756756756756757rem;
     color: white;
     font-size: 0.32432432432432434rem;
     display: inline-block;
     float: right;
     margin-right: 30%;
}

 .server{
     float: right;
     position: relative;
     top: -0.7567567567567568rem;
}
 // 支付 
 #out_trade_no{
     display: none;
}
 #total_fee{
     display: none;
}
 .ordBtn{
     display: none;
}
 
</style>
<template>
	<div id="orderDetail">
		<header-title title="订单详情"  v-if="arr.IsElectronicContract" source="electronicContract" @showProps="showPropsFn"></header-title>
		<header-title title="订单详情"   v-else @showProps="showPropsFn"></header-title>
		<!-- <div style="height: 44px; width: 100%;"></div>
		<div class="headerHint" v-if="seen">
			<p>商家请求完结订单，您确认完成之后，平台将打款给商户；请谨慎操作！</p>
			<span class="closeHint" v-on:click="closeHint"></span>
		</div> -->
		<div class="header">
			<!-- <div style="font-size:0px;display:inline-block">d</div> -->
			<!-- <div class="headerIcon">;</div> -->
			<div class="headerWord">待支付</div>
			<div class="time">还剩
				<!-- <span id="day_show">0天</span> -->
         		<strong id="hour_show">{{hour}}&nbsp;时</strong>
				<span id="minute_show">{{minutes}}&nbsp;分</span>
				<span id="second1_show">{{second1}}&nbsp;秒</span>
			</div>
			 
		</div>
		<!-- 收货地址 -->
		<!-- <div class="siteSchedule" v-if="cusDeliveryData.success">
			<div class="imgBox"><img src="../../assets/images/mine/myorder/dd-add-t@3x.png" alt=""></div>
			<div class="orderName">{{cusDeliveryData.data.ConsigneeName}}    
				<span class="orderN">{{cusDeliveryData.data.ConsigneeMobile}}</span>
			</div>
			<div class="orderDate">{{cusDeliveryData.data.ProvinceName}}{{cusDeliveryData.data.CityName}}{{cusDeliveryData.data.AreaName}} {{cusDeliveryData.data.Address}}</div>
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
	        <li class="items-list singS" v-for="(item,index) in arr.OrderDetails" :key="index">
		          <!-- 单品  -->
		        <div v-if="item.ProductDetails.length == 0">
			        <div class="listMain">
			            <div class="infos">
			                <div class="innerWrap">
								<span class="imgbox">
									<img class="listImg" :src="item.ThumbImgURL" alt="" />
								</span>
			                  	<div class="brief">
				                    <p>
										<span>{{ item.Name }}</span>
										<span class="numStyle">x{{item.Num}}</span>
				                    </p>
				                    <!-- <p>
				                     类型：有限类型；刻章：不刻章
				                    </p> -->
				                    <p>{{item.ProductType}}</p>
			                  	</div>
			                  	<div class="purchWrap">
									  <span class="nowPrice">￥{{item.Price}}</span> 
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
		        	<div  > 
		               	<h3  class="title" >
			                <span class="themeC"><strong class="font11">套装</strong></span>
			                <span class="themeC">￥{{ item.Price }}</span>  
			                <span class="couBtn themeC" v-if="(item.Price - item.OldPrice) != 0">
			                 	<strong class="font11">立省￥{{ item.Price - item.OldPrice }}</strong>
			                </span> 
		               	</h3>
		            </div>
					<div  v-for="(itemsTemp,index) in item.ProductDetails" :key="index"> 
						<!-- <div>{{itemsTemp}}</div> -->

			            <div class="listMain" >
			              	<div class="checkboxWrap " v-if="0==0"></div>
			              	<div class="infos">
				                <div class="innerWrap">
									<span class="imgbox">
										<img class="listImg" :src="item.ThumbImgURL" alt="" />
									</span>
				                    <div class="brief">
				                         <p >
				                          {{ itemsTemp.Name}}
				                           
				                        </p>
				                         <p>
				                         	{{itemsTemp.ProductType}}
				                        </p> 
				                    </div>
				                    <div class="purchWrap">
				                        <!-- <span {{ itemsTemp.Price}} -->
							    		<span class="themeC  nowPrice">￥{{itemsTemp.Price}}</span>
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
	        <!-- /t套餐 -->
	        </li>
	        
	      </ul>
	    </main>
	    <!-- 订单信息 -->
	    <div class="order" >
	    	<div class="orderNumber">订单编号：<span>{{arr.OrderNumber}}</span>   
	    		<!-- &nbsp&nbsp&nbsp&nbsp<span>复制</span> -->
	    	</div>
	    	<div class="orderTime">下单时间：<span>{{ currentTime }}</span></div>
	    </div>
	    <!-- 支付方式 -->
	    <!-- <div>{{arr.PayType}}</div> -->
	    <!-- <div class="payMethod" >支付方式：<span>{{ payMethod(arr.PayType) }}</span></div> -->
	    <div class="payMethod" >支付方式：<span>在线支付</span></div>
		
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
					<span class="themeC  nowPrice">￥{{money}}</span>
				</div>
		    	<div class="discountMoney" v-if="arr.PreferentialAmount != '0.00'">优惠<span>-¥{{ arr.PreferentialAmount}}</span></div>
				<div class="discountMoney"  v-if="arr.BookkeepCurrency != 0">记账币<span>-¥{{ arr.BookkeepCurrency}}</span></div>
		    </div>
		    <div class="actualMoney"><span>实付款：</span>
				<span class="themeC  nowPrice">￥{{arr.Amount}}</span>
			</div>
	    </div>
	    <div class="finally"><span>————已经到底了————</span></div>
	    <!-- 取消订单 -->
	    <div class="footer">
	    	<span @click="cancelOrder(arr)">取消订单</span> 
			<span @click="toHelpedPay(arr )">找人代付</span>
	    	<span @click="toPayMoney(arr)">立即支付</span>
	    </div>
	    <!-- 淘宝支付方式 -->
	  	<form action="https:/api.wqbol.com/Payment/SubmitAlipay"  novalidate="novalidate"  class="form-horizontal" id="profile-form" method="post"   enctype="application/x-www-form-urlencoded">     
		        <!--订单号  价格   -->
           	<input value="" name="out_trade_no" id="out_trade_no" ref="_Aout_trade_no">
           	<input value="" name="total_fee"    id="total_fee"    ref="_Atotal_fee">
           	<button class="ordBtn" >立即下单</button>
       	</form>
	</div>
</template>
<script>
import headerTitle from '../components/header-title';
import util from '../../util/tool';
import { Indicator,MessageBox } from 'mint-ui';  
import getData from '../../vuex/getData.js';
	export default {
		data(){
			return {
			//	ab : require('@/assets/images/test.png'),
				hour:"",
				minutes:"",
				second1:"",
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
				let local = {};
				local.isProvideContract = arrTemp.ElectronicContractTemplate;
				local.isSignContract = arrTemp.IsSignedElectronicContract;
				local.status = arrTemp.Status;
				local.contractId = arrTemp.ContractID;
				local.ContractTemplateID = arrTemp.ContractTemplateID;
				local.IsSignedElectronicContract = arrTemp.IsSignedElectronicContract;
				util.saveToLocal("orderDetail123","orderDetail123","orderDetail123",local);
				// console.log("待支付",local);
				//console.log("123452222",arrTemp.CreateTime);
				// //console.log("123452222",arrTemp.CreateTime); 
				return arrTemp;
			},
			money(){
				var arrTemp = this.$store.state.myorder.productDetail;
				return arrTemp.OldAmount;
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
				// return moneyTemp1;
			},
			currentTime(){

				let Create = this.$store.state.myorder.productDetail.CreateTime;
				// //console.log(Create,"<<<<");
				if(Create ==  undefined){
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
				// //console.log("currentTime",currentTime);
				return currentTime;
			}
		},
		created(){
			console.log(1)
			//获取收货地址数据
			let params = {
				id:this.$route.query.id,
				"dataType":'json'
			}
			getData.getOrderAddress(params).then((res)=>{ //获取收货地址
				this.cusDeliveryData = res;
			}).catch(err=>{
				console.log(err)
			})
			var self = this;
			var data = {
		   		  "params": {
						"id": self.$route.query.id,
		   			}
					
				};
				// 订单详情请求数据
			self.$store.dispatch("request_data_orderDetail",data);
			 
			// 支付进度请求数据
			self.$store.dispatch("request_data_pay",data).then(()=>{
				var endtime = self.$store.state.myorder.payData;

				//支付倒计时时间-- --格式化时间
			// 客户的下单时间 把后台的时间转换为时间戳
			var daojishi =  self.$store.state.myorder.payData.CreateTime;
			   	daojishi = new Date(Date.parse(daojishi.replace(/-/g, "/")));
			   	daojishi = daojishi.getTime();
			   	// 距离客户下单时间后的24小时内
			var endtime = Number(daojishi + 24*60*60*1000-1000);

			 // 当前时间
			var nowTime = new Date().getTime();

			var cha =Number(endtime) - Number(nowTime);

			//支付倒计时-- --格式化时间
			var timerMiao = setInterval(function() {
				//保持2位数
				function toTwo(x) {
					var x = x < 10 ? ("0" + x) : x;
					return x;
				};
				var x11 = miaosha(cha);
				var timeS = toTwo(x11.s);
				var timeM = toTwo(x11.fen);
				var timeH = toTwo(x11.h);
				if(x11.h == 0  && x11.fen ==0  && x11.s==0) {
					clearInterval(timerMiao);
				};
				cha-=1000;
		 	    self.hour = timeH ;
		 	    self.minutes  = timeM ;
		 	    self.second1   = timeS ;
			}, 1000);

		//格式化时间 miaosha()
			function miaosha(cha) {
				if(cha >= 0) {
					var obj = {
						// 秒转换为分   秒 == 秒/60 取余
						//分 = 秒 /60 取整
						//时 = 分/60 取整
						"s": Math.floor(cha / 1000 % 60),
						"fen": Math.floor(cha / 1000 / 60 % 60),
						"h": Math.floor(cha / 1000 / 60 / 60 % 24),
					};
				} else {
					var obj = {
						"s": 0,
						"fen": 0,
						"h": 0
					};

					var data = {
						"params":{
							"ids": self.$store.state.myorder.payData.Id,
						}
					}
					// 如果超过支付时间，则取消订单
					self.$store.dispatch("request_data_cancelOrder",data).then((res) => {
						MessageBox({
		                title: '',
		                message: '您的订单已过期！',
		                showConfirmButton: true,
		            });

						// 当订单改变状态后，刷新视图层
						self.$store.dispatch("request_data_myorder",{"type":""}).then((res) => {
							self.$router.push({path:"/mine/toMyOrder"});
						})
					}).catch(function(error){
			       // //console.log("支付订单超出时间跳回有问题",error);
			     });
					
				}
				return obj;
			}

			});
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
					return "余额";
					break;
				}
			},
			showPropsFn(data){
				 this.$emit("showProps",true );
			},
			toHelpedPay({OrderNumber,Amount}){//找人代付
				 this.$router.push({path:'/findFriendPay',query:{orderNum:OrderNumber,actPrice:Amount}});
			},
			cancelOrder(value){
			   	var data = {
			   		  "params": {
							"ids": value.Id,
			   			}
						
					};
				// 订单列表——取消订单
				this.$store.dispatch("request_data_cancelOrder",data); 
				this.$router.push("/mine/toMyOrder");
				// 当点击取消订单后重新调订单列表接口来刷新页面
				this.$store.dispatch("request_data_myorder",{"type":""}); 
			},
			toPayMoney(detail){
				console.log(detail,'d')
       			this.$router.push({path:'/cart/comfirmOrder/payMethod',query:{orderNum:detail.OrderNumber,actPrice:detail.Amount}}) ;				
			},
			alibaba(){
				document.getElementById("profile-form").submit();
			},
			toEvaluation(val,index){
				var orderD = val.OrderDetails;
				orderD.forEach((item,index) => {
					// //console.log("ProductId",item.ProductId);
					var _ProductId = item.ProductId;
					this.$router.push({path: '/mine/toMyOrder/toEvaluate', query: {ProductId: _ProductId}});
					return _ProductId;
				})
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