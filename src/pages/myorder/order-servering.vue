<template>
	<div id="orderServering">
		<header-title title="订单详情"   v-if="arr.IsElectronicContract" source="electronicContract" @showProps="showPropsFn"></header-title>
		<header-title title="订单详情"   v-else @showProps="showPropsFn"></header-title>
		<!-- <div style="height: 44px; width: 100%;"></div>
		<div class="headerHint" v-if="seen">
			<p>商家请求完结订单，您确认完成之后，平台将打款给商户；请谨慎操作！</p>
			<span class="closeHint" v-on:click="closeHint"></span>
		</div> -->
		<div class="header">
			<!-- <div class="headerIcon">;</div> -->
			<div class="headerWord">办理中</div>
			<ul class="server">
				<li>
					<a  :href="'tel:'+telphone"  @click="contact(arr); return false;">联系业务员</a>
				</li>
				<li @click="customerService">客服</li>
			</ul>
		</div>
		<!-- 服务进度 -->
		<!-- <div class="orderSchedule" @click="orderSchedule">
			<div class="orderIcon"><img src="../../assets/images/mine/schedule@3x.png"></div>
			<div class="orderName">领取营业执照并寄出</div>
			<div class="orderDate">2018-12-25 12:25:36</div>
		</div> -->
		<div class="swiperWrap" v-if="processArr.length != 0">
			<mt-swipe :show-indicators="false" :auto="5000" >
				<mt-swipe-item v-for="(items,index) in productArr" :key="index">
					<div class="processWrap" @click.stop.prevent="orderSchedule">
						<div class="processCompany">{{items.ProductName}}</div>
						<div :class="processArr.TaskState == 0 ? 'processDetailWrap1' : 'processDetailWrap'">
							<div class="processTime">
								<div>{{year}}</div>
								<div>{{hours}}</div>
							</div>
							<div class="processIcon"><div></div></div>
							<div class="processDetail">
								<div>{{status}}</div>
								<div>第{{step}}步  {{name}}（预估{{workHour}}）</div>
							</div>
							<div class="rightArrow"></div>
						</div>
					</div>
				</mt-swipe-item>
			</mt-swipe>
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
	        <li class="items-list singS"   v-for="(item,index) in arr.OrderDetails" :key="index">
		          <!-- 单品  -->
		        <div v-if="item.ProductDetails.length == 0">
		        	<!-- <div class="waitPay">
			    		<span class="corporationName">深圳自创工业有限公司<img src="../../assets/images/mine/myorder/corporationArrows@3x.png"></span>
			    		<span>联系客服</span>
			    	</div> -->
			        <div class="listMain">
			            <div class="infos">
			                <div class="innerWrap">
								<span class="imgbox">
			                  		<img class="listImg" :src="item.ThumbImgURL" alt="" />
								</span>
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
									<span class="themeC  nowPrice">{{  item.Price| formatPrice | currency}}<b>{{  item.Price | formatPriceX  }}</b></span> 
				                   
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
			                 	<span class="themeC">￥{{ item.Price }}</span>  
			                 	<span class="couBtn themeC" v-if="(item.Price - item.OldPrice) != 0">
			                 		<strong class="font11">立省￥{{ item.Price - item.OldPrice }}</strong>
			                 	</span> 
			               	</h3>
			        </div>
					<div  v-for="(itemsTemp,index) in item.ProductDetails" :key="index"> 
			            <!-- <div> 
			               	<h3  class="title" >
			                 	<span class="themeC"><strong class="font11">套装</strong></span>
			                 	<span class="themeC">{{ itemsTemp.Price }}</span>  
			                 	<span class="couBtn themeC" v-if="(itemsTemp.Price - itemsTemp.OldPrice) != 0">
			                 		<strong class="font11">立省￥{{ itemsTemp.Price - itemsTemp.OldPrice }}</strong>
			                 	</span> 
			               	</h3>
			            </div> -->

			            <!-- <div class="waitPay">
				    		<span class="corporationName">深圳自创工业有限公司<img src="../../assets/images/mine/myorder/corporationArrows@3x.png"></span>
				    		<span>联系客服</span>
				    	</div> -->
			            <div class="listMain" >
			              	<div class="checkboxWrap " v-if="0==0"></div> 
			              	<div class="infos">
				                <div class="innerWrap">
									<span class="imgbox">
				                   		<img class="listImg"   :src="itemsTemp.ThumbImgURL" alt="" >
									</span>
				                    <div class="brief">
				                        <p >
				                          {{ itemsTemp.Name}}
				                        </p>
				                        <p v-if="itemsTemp.ProductType">
				                         类型{{itemsTemp.ProductType}}
				                        </p>
				                    </div>
				                    <div class="purchWrap">
									<span class="themeC  nowPrice">{{  itemsTemp.Price| formatPrice | currency}}<b>{{  itemsTemp.Price | formatPriceX  }}</b></span> 
										 
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
	    <div class="order">
	    	<div class="orderNumber">订单编号：<span ref="orderNumber" id="orderNumber">{{arr.OrderNumber}}</span>  
	    		<!-- &nbsp&nbsp&nbsp&nbsp<span @touchend="copy" id="copy">复制</span> -->
	    	</div>

	    	<!-- <div class="orderNumber">订单编号：<input type="Number" ref="orderNumber" id="orderNumber" :value="arr.OrderNumber">  
	    		&nbsp&nbsp&nbsp&nbsp<span @touchend="copy" id="copy">复制</span>
	    	</div> -->
	    	<div class="orderTime">下单时间：<span>{{ currentTime }}</span></div>
	    </div>
	    <!-- 支付方式 -->
	    <div class="payMethod">支付方式：<span>{{ payMethod(arr.PayType) }}</span></div>
	    <!-- 发票信息 -->
	    <div class="invoice">
	    	<div class="invoiceType">发票类型：<span>{{arr.CusInvoiceType}}</span> 
	    		<!-- <a :href="'https://112.74.135.230:3214'+arr.InvoicePath" v-if="arr.InvoicePath != null" download="发票" class="seeInvoice" @click="checkInvoice">
	    			测试发票
	    		</a> -->
	    		<a :href="'https://manage.wqbol.cn'+arr.InvoicePath" v-if="arr.InvoicePath != null" download="发票" class="seeInvoice" @click="checkInvoice">
	    			发票
	    		</a>
	    	</div>
	    	<div class="invoiceHead">发票抬头：<span>{{ arr.CusInvoiceName }}</span></div>
	    	<div class="invoiceDetail">发票内容：<span>明细</span></div>
	    </div>
		<!-- 完善资料信息 -->
		<div class="completeInfo">
			<div class="companyNameInfo">公司全称：<span>{{ arr.ContactsCompany }}</span></div>
			<div class="person">联系人：<span>{{arr.Contacts}}</span></div>
			<div class="personTel">联系电话：<span>{{arr.ContactsMobile}}</span></div>
		</div>
	    <div class="moneyWrap">
	    	<!-- 服务金额 -->
		    <div class="money">
				<div class="totalMoney">服务金额 
					<span class="themeC  nowPrice">{{  money | formatPrice | currency}}<b>{{  money | formatPriceX  }}</b></span> 
				</div>
				<div class="discountMoney" v-if="arr.PreferentialAmount != '0.00'">优惠<span>-¥{{ arr.PreferentialAmount}}</span></div>
				<div class="discountMoney"  v-if="arr.BookkeepCurrency != 0">记账币<span>-¥{{ arr.BookkeepCurrency}}</span></div>
		    </div>
		    <div class="actualMoney"><span>实付款：</span>
				<span class="themeC  nowPrice">{{arr.Amount | formatPrice | currency}}<b>{{ arr.Amount| formatPriceX  }}</b></span> 
			
			</div>
	    </div>
	    <div class="finally"><span>————已经到底了————</span></div>
	    <!-- 取消订单 -->
	    <div class="footer">
	    	<!-- <span @click="ConfirmCompleted">确认完成</span> -->
	    	<!-- <span @click="buyAgain(arr)">联系客服</span> -->
	    	<!-- <span class="buyAgain_s" @click="buyAgain(arr)">再次购买</span> -->
			<!-- <span @click="orderSchedule" class="footer_seeP">查看进度</span>  -->
			<div @click="buyAgain(arr)" class="buyAgainS">再次购买</div>
	    </div>
	</div>
</template>
<script>
	import headerTitle from '../components/header-title';
	import util from '../../util/tool';
	import { MessageBox } from 'mint-ui';
	import getData from '../../vuex/getData.js';

	export default {
		data(){
			return {
				telphone:"", //业务员电话
				seen: true,
				cusDeliveryData:{},//收货地址
				local:{},
				id:this.$route.query.id,
				productArr:[],
				processArr:{},
				status:"",
				year:'',
				hours:'',
				step:"",
				name:'',
				workHour:'',

			}
		},
		components:{
			headerTitle,
		},
		computed:{
			arr(){
				var arrTemp = this.$store.state.myorder.productDetail;
				// //console.log("123453333",arrTemp.OrderDetails);
				this.local.isProvideContract = arrTemp.ElectronicContractTemplate;
				this.local.isSignContract = arrTemp.IsSignedElectronicContract;
				this.local.status = arrTemp.Status;
				this.local.orderId = arrTemp.Id;
				this.local.orderstyle = arrTemp.ProcessingState;
				this.local.contractId = arrTemp.ContractID;
				this.local.ContractTemplateID = arrTemp.ContractTemplateID;
				this.local.IsSignedElectronicContract = arrTemp.IsSignedElectronicContract;
				this.local.Id = arrTemp.Id;
				//console.log("办理中",this.local);
				util.saveToLocal("orderDetail123","orderDetail123","orderDetail123",this.local); 
				return arrTemp;
			},
			money(){
				var arrTemp = this.$store.state.myorder.productDetail;
				return arrTemp.OldAmount;
				// var moneyTemp = Number(arrTemp.Amount) + Number(arrTemp.PreferentialAmount);
				// // //console.log("moneyTemp",moneyTemp);
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
				// //console.log("currentTime",currentTime);
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
			}).catch(err=>{
				console.log(err)
			})
			// console.log("created",this.$store.state.myorder.productDetail.Id);
			var data = {
		   		  "params": {
						"id": this.$route.query.id
		   			}
					
				};
			this.$store.dispatch("request_data_orderDetail",data).then((res)=>{
				//获取电话号码
				
				var dataParams111 =  this.$store.state.myorder.productDetail;
				// //console.log( "dataParams111",dataParams111 )
				var dataParams = {
					"params" : {
						id : dataParams111.Id,
					}
				};
				// //console.log("dataParams",dataParams)
				this.$store.dispatch("request_data_telphone",dataParams).then(res=>{
					//push电话号码数据 
					// //console.log("获取电话号码===>",this.$store.state.myorder.telphone.Tel)
					this.telphone = this.$store.state.myorder.telphone.Tel;
					if(!this.telphone){
					 	this.telphone = '400-8822-991';
					 }
				});
			});
			
			// 服务进度
			this.requestProcess();
		},
		methods:{
			// 服务进度
			requestProcess(){
				let params = {
					params : {
						id : this.$route.query.id
					}
				}
				getData.GetProductProcessById(params).then((res) => {
					console.log("GetProductProcessById",res)
					this.productArr = res.data.list;
					this.productArr.forEach((items,val) => {
						if(items.SPCopyListModels.length != 0){
							this.processArr = items.SPCopyListModels[items.SPCopyListModels.length - 1];
							this.step = this.processArr.Sort;
							this.name = this.processArr.Name;
							this.workHour = this.processArr.WorkHour;
							if(this.processArr.TaskState == 0){
								this.status = "未开始"
							}else if(this.processArr.TaskState == 1){
								this.status = "处理中";
								let currentTime1 = this.processArr.HandleTime.replace(/\D/gi, "");
								this.year = util.formatDate(currentTime1,"yyyy-MM-dd");
								this.hours = util.formatDate(currentTime1,"hh:mm:ss");
							}else if(this.processArr.TaskState == 2){
								this.status = "已完成";
								let currentTime2 = this.processArr.EndTime.replace(/\D/gi, "");
								this.year = util.formatDate(currentTime2,"yyyy-MM-dd");
								this.hours = util.formatDate(currentTime2,"hh:mm:ss");
							}
						}
						
					})
				})
			},
			//关闭商家提示完成消息
			closeHint: function () {
		        this.seen=!this.seen;
		    },
		    //订单进度
		    orderSchedule(){
				this.$router.push({path:"/mine/toMyOrder/orderSchedule",query:{orderId:this.$route.query.id}});
			},
			//确认完成
			ConfirmCompleted(){ 
			},
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
			showPropsFn(data){
				console.log("this.local",this.local)
				this.$emit("showProps",this.local);
			},
			buyAgain(value){
			// //console.log("dfdsf0000",value);
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
						};	
						localS.list = this.$store.state.myorder.buyagain.list;
						
						
						
						// //console.log("zaicigoumai112233",this.$store.state.myorder.buyagain);
						// 本地存储
						var  localstorage = util.saveToLocal("_CART",this.getToken(),"data",localS);
						// 跳转到确认订单页面
						this.$router.push({path:'/cart/comfirmOrder',query:{id:value.Id}});
					});
				});

			},
			contact(value){
				 console.log(this.telphone)
			},
			toEvaluation(val){
				// //console.log("valvalval",val);
				var orderD = val.OrderDetails;
				orderD.forEach((item,index) => {
					// //console.log("ProductId",item.ProductId);
					var _ProductId = item.ProductId;
					this.$router.push({path: '/mine/toMyOrder/toEvaluate', query: {ProductId: _ProductId}});
					return _ProductId;
				})
			},
			copy(){
				// var ordNum = this.$refs.orderNumber;  //订单号
				// //console.log(ordNum);
				// this.copyTextToClipboard("复制功能");
				// try {
				// 	var msg = document.execCommand('copy') ? '成功' : '失败'
				// 	 
				// }catch(err) {
				//  
				// }
				this.copyTextToClipboard();
			},
			copyTextToClipboard(){
				// var ordNum = this.$refs.orderNumber;  
				// var ordNum = document.getElementById("orderNumber").innerText;//订单号
				var ordNum = document.getElementById("orderNumber");//订单号
				// //console.log(ordNum);
				var copyBtn = document.getElementById("copy");
				// //console.log("copyBtn",copyBtn);
    			ordNum.select();
    			try {
					var msg = document.execCommand('copy') ? '成功' : '失败'
					alert('复制内容 ' + msg)
				}catch(err) {
					alert('不能使用这种方法复制内容')
				}
			},
			checkInvoice(){
				// alert("已下载到本地，请查看");
				MessageBox('提示', '已下载到本地，请查看');
			},
			customerService(){ //客服聊天页面
				window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0')
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

<style type="text/css" lang="less" scoped>
@import "../../common/index.less";
@import "./order.less";
// 按照最新ui图修改
.header{
	height: 1.6rem !important;
	.headerWord{
		line-height: 1.6rem;
    	left: -2.266667rem;
	}
}
.footer{
	height: 1.306667rem;
	background: rgb(242,242,242);
	.buyAgainS{
		float: right;
		width: 3.36rem;
		height: 1.306667rem;
		background: rgb(255,107,95);
		line-height: 1.306667rem;
		color: #fff;
		text-align: center;
		font-size: .4rem;
	}
}
// 服务进度
.completeInfo{
	height: 2.7027027027027026rem; 
	font-size: 0.373333rem;
	background-color: white;
	margin-top: .32rem;
	.companyNameInfo,.person,.personTel{
		padding: 0.5405405405405406rem 0 0 0.4rem;
		font-weight: 600;
		span{
			padding-left: 0.16216216216216217rem;
    		color: #666666;
		}
	}
	.companyNameInfo{
		width: 90%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.person,.personTel{
		padding: 0.2702702702702703rem 0 0 0.4rem;
	}
	.person{
		letter-spacing: .119333rem;
		span{
			letter-spacing: 0;
		}
	}
}
.swiperWrap{
	width: 100%;
	height: 2.4rem;
	background: #fff;
}
.processWrap{
	width: 100%;
	height: 2.5rem;
	background: #fff;
	.processCompany{
		margin-left: .413333rem;
		font-size: .4rem;
		font-weight: 600;
		.textIndex1(7.6rem);
		padding-top: .373333rem;
		line-height: .533333rem;
	}
	.processDetailWrap1{
		margin: .373333rem 0 0 0;
		.processTime,.processIcon,.processDetail{
			display: inline-block;
		}
		.processTime{
			font-size: .32rem;
			color: rgb(102,102,102);
			vertical-align: top;
			div:nth-child(2){
				text-align: right;
    			margin-top: .133333rem;
			}  
		}
		.processIcon{
			position: relative;
			width: .026667rem;
			height: .88rem;
			background: rgb(216,216,216);
			margin-left: .346667rem;
			vertical-align: top;
			div{
				position: absolute;
				width: .186667rem;
				height: .186667rem;
				background: rgb(255,62,8);
				border-radius: 50%;
				top: .346667rem;
    			left: -0.08rem;
			}
		}
		.processDetail{
			margin-left: .373333rem;
			div:nth-child(1){
				font-size: .346667rem;
				font-weight: 400;
			}
			div:nth-child(2){
				margin-top: .2rem;
			}
		}
		.rightArrow{
			width: .2rem;
			height: .346667rem;
			.bg-image("../../assets/images/myOrder/right_arrow");
			background-size: 100%;
			float: right;
			margin-right: .32rem;
		}
	}
	.processDetailWrap{
		margin: .373333rem 0 0 .386667rem;
		.processTime,.processIcon,.processDetail{
			display: inline-block;
		}
		.processTime{
			font-size: .32rem;
			color: rgb(102,102,102);
			vertical-align: top;
			div:nth-child(2){
				text-align: right;
    			margin-top: .133333rem;
			}  
		}
		.processIcon{
			position: relative;
			width: .026667rem;
			height: .88rem;
			background: rgb(216,216,216);
			margin-left: .346667rem;
			vertical-align: top;
			div{
				position: absolute;
				width: .186667rem;
				height: .186667rem;
				background: rgb(255,62,8);
				border-radius: 50%;
				top: .346667rem;
    			left: -0.08rem;
			}
		}
		.processDetail{
			margin-left: .373333rem;
			div:nth-child(1){
				font-size: .346667rem;
				font-weight: 400;
			}
			div:nth-child(2){
				margin-top: .2rem;
			}
		}
		.rightArrow{
			width: .2rem;
			height: .346667rem;
			.bg-image("../../assets/images/myOrder/right_arrow");
			background-size: 100%;
			float: right;
			margin-right: .32rem;
		}
	}
}
.footer_seeP{
	float: right;
	margin: .266667rem .4rem 0 0;
	border: 1px solid rgb(178,178,178) !important;
	color: rgb(178,178,178) !important;
}
#orderServering ul.server{
	width: 3.2rem;
	margin-right: 0.306667rem;
}
#orderServering ul.server li{
	float: left; 
	margin-top: 0.32rem;
	line-height: 0.4rem;
}
.headerIcon{
     .bg-image("../../assets/images/mine/myorder/servering");
}
 
 
#orderServering   ul.server li:nth-child(1){
     width: 60%; 
	 .bg-image("../../assets/images/mine/myorder/d-connet-phone");
     background-size: .666667rem .666667rem;
     font-size: 0.32432432432432434rem;
     color: white;
     background-position: center   0rem;
     padding-top: 0.6756756756756757rem;
}
#orderServering   ul.server li:nth-child(2){
	 width: 40%; 
	 text-align: center;
     .bg-image("../../assets/images/mine/myorder/d-comnet-custer");
     background-size: .666667rem .666667rem;
     font-size: 0.32432432432432434rem;
     color: rgb(51,51,51);
    background-position: center  0rem;
     padding-top: 0.6756756756756757rem;
}
 .server li a{
     color:rgb(51,51,51) !important;
     text-decoration: none;
     -webkit-tap-highlight-color:transparent;
}
 .footer span:nth-child(1){
     padding: 0.1891891891891892rem 0.1891891891891892rem;
     float: right;
     font-size: 0.40540540540540543rem;
     color: #FA2802;
     margin: 0.2702702702702703rem 0.40540540540540543rem 0 0;
     .border-1px(#FA2802);
     background: white;
}
 .seeInvoice{
     color: black;
     border: 1px solid black;
     padding: 0rem 0.08108108108108109rem;
     border-radius: 0.08108108108108109rem;
     text-decoration:none;
     margin-left: 0.13513513513513514rem;
}
 
</style>