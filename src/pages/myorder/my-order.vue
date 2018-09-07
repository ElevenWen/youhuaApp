<template>
	<div id="orderDetail">
		<!-- <header-title title="我的订单" source="myOrder"></header-title> -->
		<div class="popularity_return" id="title">
            <span  class="return" @touchend="goBack()"></span>
			<span id="title_name">我的订单</span>
			<!-- <span id="submit" @click="submitEva">发布</span> -->
		</div>
		<router-view @showProps="showPropsFn" v-show="(!toDetail)"></router-view>
		<div class="toDetail" v-show="toDetail">
			<div class="wrap">
				<mt-navbar v-model="selected">
				    <mt-tab-item id="1" >全部</mt-tab-item>
				    <mt-tab-item id="2">待支付</mt-tab-item>
				    <mt-tab-item id="3">办理中</mt-tab-item>
			   		<mt-tab-item id="4" >已完成</mt-tab-item>
				    <mt-tab-item id="5" >已取消</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected">
				  <mt-tab-container-item id="1">
				    <ul class="orderOne" v-for="(item,index) in arr">
              <div class="waitPayWrap">
                <div class="waitPay">
                  <div class="orderNo">订单编号：{{item.OrderNumber}}</div>
                    <!-- <i class="delete" v-if="item.ProcessingState == 'Canceled'" @click="deleteOrder(arr[index],index)"></i> -->
                    <span v-if="item.ProcessingState == 'Canceled'" class="hadCancel">{{statusChange(item.ProcessingState)}}</span>
                    <span v-else>{{statusChange(item.ProcessingState)}}</span>
                </div>
              </div>
					    <div @click="toOrderDetail(arr[index])">
			 				<li v-for="(detail,index) in (arr[index].OrderDetails)">
								<div class="orderDetail">
								<!-- <div>{{detail}}</div> -->
						    		<div  class="orderDetailImg"> 
						    			<img :src="detail.ThumbImgURL" class="orderImg">  
						    		</div>
						    		<div class="orderDetailRight">
						    			<div class="orderTitle">{{ detail.Name }}</div>
						    			<span class="orderSta">{{detail.ProductType}}</span>
                      <span class="noPay" v-if="item.ProcessingState == 'Prepay'">代付款</span>
						    		</div>
						    	</div>
							</li>
							<!-- <div class="numAndMoney" > 
								<div class="finalPay">
					    			<span>共&nbsp;{{ arr[index].Total }}&nbsp;件</span>
					    		
									<span>实付款：</span>
					    			<span>{{ item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
								</div>
              </div> -->
						</div>
							<div class="orderStatusWrap" v-if="item.ProcessingState == 'Prepay'">
                <div class="orderStatus" >
                  <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                  <span class="payNow" @click="toPayMoney(item)">立即支付</span>
                  <span class="findPerson" @click="toHelpedPay(arr[index].OrderNumber,item,arr[index].Amount)">找人代付</span>						
                  <span class="cancelO" @click="cancelOrder(arr,index)">取消订单</span>
                </div>
              </div>
              <div class="orderStatusWrap" v-else-if="item.ProcessingState == 'InProcess'">
                <div class="orderStatus" >
                  <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                  <span class="payNow" @click="buyAgain(arr,index)">再次购买</span>
                </div>
              </div>
              <div class="orderStatusWrap" v-else-if="item.ProcessingState == 'Canceled'">
                <div class="orderStatus" >
                  <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                  <span class="payNow" @click="buyAgain(arr,index)">再次购买</span>
                  <span class="findPerson" @click="deleteOrder(arr[index],index)">删除订单</span>
                </div>
              </div>
              <div class="orderStatusWrap" v-else-if="item.ProcessingState == 'Completed'">
                <div class="orderStatus" >
                  <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                  <span class="payNow" @click="buyAgain(arr,index)">再次购买</span>
                  <span class="findPerson" @click="toEvaluation(item,index)" v-if='item.OrderStatus !=="已完成"'>去评价</span>
                </div>
              </div>
              <div class="orderStatusWrap" v-else-if="item.ProcessingState == 'Evaluate'">
                <div class="orderStatus" >
                  <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                  <span class="payNow" @click="buyAgain(arr,index)">再次购买</span>
                  <span class="findPerson" @click="toEvaluation(item,index)" v-if='item.OrderStatus !=="已完成"'>去评价</span>
                </div>
              </div>
					</ul>
					<!-- 没有订单时  -->
		    		<div v-if="arr.length == 0" >
		    			<div class="empty"></div>
		    			<div class="emptyWord">您还没有相关订单</div>
		    		</div>
				    
				  </mt-tab-container-item>
				  <mt-tab-container-item id="2">
				  	<ul v-for="(item,index) in newArr1" >
				  		<div class="wrap" v-if="newArr1.length > 0">
						    <div class="orderOne">
						    	<div @click="toOrderDetail(newArr1[index])">
                    <div class="waitPayWrap">
							    	  <div class="waitPay">
                        <div class="orderNo">订单编号：{{item.OrderNumber}}</div>
                        <span>待支付</span>
                      </div>
                    </div>
							    	<li v-for="(detail,index) in (newArr1[index].OrderDetails)">
								    	<div class="orderDetail" >
								    		<div class="orderDetailImg">
								    			<img :src="detail.ThumbImgURL" class="orderImg">
								    		</div>
								    		<div class="orderDetailRight">
								    			<div class="orderTitle">{{ detail.Name }}</div>
								    			<span class="orderSta">{{detail.ProductType}}</span>
                          <span class="noPay">代付款</span>
								    			<!-- <span class="orderSta">类型：有限类型；</span>
								    			<span class="orderChapter">刻章：不刻章</span> -->
								    		</div>
								    	</div>
							    	</li>
							    	<!-- <div class="numAndMoney" > 
                      <div class="finalPay">
                        <span>共&nbsp{{ newArr1[index].Total }}&nbsp件</span>
                        <span>实付款：</span>
                        <span>{{ item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      </div>
                    </div> -->
						    	</div>
                  <div class="orderStatusWrap">
						    	  <div class="orderStatus">
                      <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      <span class="payNow" @click="toPayMoney(item)">立即支付</span>
                      <span class="findPerson" @click="toHelpedPay(newArr1[index].OrderNumber,item,newArr1[index].Amount)">找人代付</span>
                      <span class="cancelO" @click.prevent="cancelOrder(newArr1,index)">取消订单</span>
						    	  </div>
                  </div>
						    </div>
			    		</div>
					</ul>
					<!-- 没有订单时  -->
		    		<div v-if="newArr1.length == 0" >
		    			<div class="empty"></div>
		    			<div class="emptyWord">您还没有相关订单</div>
		    		</div>
				  </mt-tab-container-item> 
	
	
				  <mt-tab-container-item id="3">
				  	<ul v-for="(item,index) in newArr2">
					   	<div class="wrap"  v-if="newArr2.length > 0"> 
							<div class="orderOne" >
								<div @click="toOrderDetail(newArr2[index])">
                  <div class="waitPayWrap">
							    	<div class="waitPay">
                      <div class="orderNo">订单编号：{{item.OrderNumber}}</div>
                      <span>办理中</span>
                    </div>
                  </div>
							    	<li v-for="(detail,index) in (newArr2[index].OrderDetails)">
								    	<div class="orderDetail">
								    		<div class="orderDetailImg"> 
								    			<img :src="detail.ThumbImgURL" class="orderImg">
								    		</div>
								    		<div class="orderDetailRight">
								    			<div class="orderTitle">{{ detail.Name }}</div>
								    			<span class="orderSta">{{detail.ProductType}}</span>
								    			<!-- <span class="orderSta">类型：有限类型；</span>
								    			<span class="orderChapter">刻章：不刻章</span> -->
								    		</div>
								    	</div>
							    	</li>
							    	<!-- <div class="numAndMoney" > 
											<div class="finalPay">
                        <span>共&nbsp{{ newArr2[index].Total }}&nbsp件</span>
                        <span>实付款：</span>
                        <span>{{ item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
							    	  </div>
                    </div> -->
							    </div>
                  <div class="orderStatusWrap">
                    <div class="orderStatus">
                      <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      <span class="payNow" @click="buyAgain(newArr2,index)">再次购买</span>
                    </div>
                  </div>
						    </div>
					   	</div>
					</ul>
					<!-- 没有订单时  -->
		    		<div v-if="newArr2.length == 0">
		    			<div class="empty"></div>
		    			<div class="emptyWord">您还没有相关订单</div>
		    		</div>
				  </mt-tab-container-item>
	
				  <mt-tab-container-item id="4">
				  	<ul v-for="(item,index) in newArr4">
				  		<div v-if="newArr4.length > 0">
				  			<div class="orderOne" >
				  				<div @click="toOrderDetail(newArr4[index])">
                    <div class="waitPayWrap">
                      <div class="waitPay">
                        <div class="orderNo">订单编号：{{item.OrderNumber}}</div>
                        <span>已完成</span>
                      </div>
                    </div>
							    	<li v-for="(detail,index) in (newArr4[index].OrderDetails)">
								    	<div class="orderDetail">
								    		<div class="orderDetailImg"> 
								    			<img :src="detail.ThumbImgURL" class="orderImg">
								    		</div>
								    		<div class="orderDetailRight">
								    			<div class="orderTitle">{{ detail.Name }}</div>
								    			<span class="orderSta">{{detail.ProductType}}</span>
								    			<!-- <span class="orderSta">类型：有限类型；</span>
								    			<span class="orderChapter">刻章：不刻章</span> -->
								    		</div>
								    	</div>
							    	</li>
							    	<!-- <div class="numAndMoney" > 
                      <div class="finalPay">
                        <span>共&nbsp;{{ newArr4[index].Total }}&nbsp;件</span>
                        <span>实付款：</span>
                        <span>{{ item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      </div> 
                    </div> -->
						    	</div>
                  <div class="orderStatusWrap">
                    <div class="orderStatus">
                      <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      <span class="payNow" @click="buyAgain(newArr4,index)">再次购买</span>
                      <span class="findPerson" @click="toEvaluation(item,index)" v-if='item.OrderStatus !=="已完成"'>去评价</span>
                    </div>
                  </div>
						    </div>
				  		</div>
				  		
					</ul>
					<div v-if="newArr4.length == 0">
		    			<div  class="empty"></div>
		    			<div  class="emptyWord">您还没有相关订单</div>
			  		</div>
				  </mt-tab-container-item>
	
				  <mt-tab-container-item id="5">
					<ul v-for="(item,index) in newArr3">
						<div  v-if="newArr3.length > 0">
							<div class="orderOne">
                <div class="waitPayWrap">
							    <div class="waitPay">
                    <div class="orderNo">订单编号：{{item.OrderNumber}}</div>
                    <!-- <i class="delete" @click.stop.prevent="deleteOrder(item,index)"></i> -->
                    <span class="hadCancel" @click.stop.prevent="deleteOrder(item,index)">已取消</span>
                  </div>
                </div>
							    <div  @click="toOrderDetail(newArr3[index])">
							    	<li v-for="(detail,index) in (newArr3[index].OrderDetails)">
								    	<div class="orderDetail">
								    		<div class="orderDetailImg"> 
								    			<img :src="detail.ThumbImgURL" class="orderImg">
								    		</div>
								    		<div class="orderDetailRight">
								    			<div class="orderTitle">{{ detail.Name }}</div>
								    			<span class="orderSta">{{detail.ProductType}}</span>
								    			<!-- <span class="orderSta">类型：有限类型；</span>
								    			<span class="orderChapter">刻章：不刻章</span> -->
								    		</div>
								    	</div>
							    	</li>
							    	<!-- <div class="numAndMoney" > 
											<div class="finalPay">
                        <span>共&nbsp{{ newArr3[index].Total }}&nbsp件</span>
                        <span>实付款：</span>
                        <span>{{ item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      </div>
							    	</div> -->
						    	</div>
                  <div class="orderStatusWrap">
                    <div class="orderStatus">
                      <span class="allMoney">应付{{item.Amount | formatPrice | currency}}<b>{{item.Amount | formatPriceX  }}</b></span>
                      <span class="payNow" @click="buyAgain(newArr3,index)">再次购买</span>
                      <span class="findPerson" @click.stop.prevent="deleteOrder(item,index)">删除订单</span>
                    </div>
                  </div>
						    	
						    </div>
						</div>
					</ul>
					<!-- 没有订单时  -->
		    		<div v-if="newArr3.length == 0">
		    			<div class="empty"></div>
		    			<div class="emptyWord">您还没有相关订单</div>
		    		</div>
				  </mt-tab-container-item>
	
				</mt-tab-container>
				<!-- 淘宝支付方式 -->
			  	<form action="https://api.wqbol.com/Payment/SubmitAlipay"  novalidate="novalidate"  class="form-horizontal" id="profile-form" method="post"   enctype="application/x-www-form-urlencoded">     
				        <!--订单号  价格   -->
		           	<input value="" name="out_trade_no" id="out_trade_no" ref="_Aout_trade_no">
		           	<input value="" name="total_fee"    id="total_fee"    ref="_Atotal_fee">
		           	<button class="ordBtn" >立即下单</button>
		       	</form>
		    </div>
		</div>
	</div>
</template>

<script>
import footerNav from "../../footer-nav";
import headerTitle from "../components/header-title";
import { Navbar, TabItem } from "mint-ui";
import axios from "axios";
import util from "../../util/tool";
import { Indicator, Toast } from "mint-ui";
import * as types from "../../vuex/mutations_types.js";
import store from "../../vuex/mine/mine.js";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: "1",
      router: "/home",
      ProcessingState: "", //订单状态（0，待付款；1，办理中；2，已取消；3，已关闭；4，已完成）
      toDetail: true, //跳转到订单详情页时是否隐藏父页面  true显示  false隐藏
      newArr1: [],
      newArr2: [],
      newArr3: [],
      newArr4: [],
      num: []
    };
  },
  components: {
    footerNav,
    headerTitle,
    Navbar,
    TabItem
  },

  created() {
    window.localStorage.setItem("whichPage", this.$route.path);
    var data = {
      type: ""
    };
    // 订单列表请求数据
    this.$store.dispatch("request_data_myorder", data);
    // //console.log("this.$router",this.$router.currentRoute);
    // 在子页面刷新的时候 不让父页面显示
    if (
      this.$router.currentRoute.name == "orderCancel" ||
      this.$router.currentRoute.name == "orderWaitpay" ||
      this.$router.currentRoute.name == "orderCompleted" ||
      this.$router.currentRoute.name == "orderServering"
    ) {
      this.toDetail = false;
    }
  },
  computed: {
    arr() {
      var arrTemp = this.$store.state.myorder.dataValue.list;
      // debugger;
      // //console.log("arrTemp",arrTemp);
      this.newArr1 = [];
      this.newArr2 = [];
      this.newArr3 = [];
      this.newArr4 = [];

      // 如果数据为空，则返回
      if (!arrTemp) {
        return [];
      }
      // 订单列表的总件数
      arrTemp.forEach(val => {
        var total = 0;
        val.OrderDetails.forEach(item => {
          total += item.Num;
        });
        // 在后台返回的数据中添加一个total字段
        val.Total = total;
        this.num.push(total);
      });
      // 把不同状态的数据放入相应的空数组中
      if (arrTemp) {
        for (var i = 0; i < arrTemp.length; i++) {
          if (arrTemp[i].ProcessingState == "Prepay") {
            this.newArr1.push(arrTemp[i]);
          } else if (arrTemp[i].ProcessingState == "InProcess") {
            this.newArr2.push(arrTemp[i]);
          } else if (arrTemp[i].ProcessingState == "Canceled") {
            this.newArr3.push(arrTemp[i]);
          } else if (arrTemp[i].ProcessingState == "Evaluate") {
            this.newArr4.push(arrTemp[i]);
          } else if (arrTemp[i].ProcessingState == "Completed") {
            this.newArr4.push(arrTemp[i]);
          }
        }
      }
      // //console.log("待支付",this.newArr1);
      // //console.log("办理中",this.newArr2);
      // //console.log("已取消",this.newArr3);
      // //console.log("去评价，已完成",this.newArr4,this.newArr5);
      return arrTemp;
    }
  },
  watch: {
    // 监测路由，toMyOrder是一个方法
    $route: "toMyOrder"

    // 'newArr3': {
    //      handler: function (val, oldVal) {
    //      	//console.log('xin',val);
    //      	//console.log('旧的',oldVal);

    //      },
    //      deep: true
    //    },
  },
  methods: {
    toHelpedPay(orderNum, ids, actPrice,a,b) {
      //找人代付 
      var params = {
        id: ids.Id
      };
      console.log(params)
      this.$store
        .dispatch("checkOrder", params)
        .then(res => {
          this.$router.push({
            path: "/findFriendPay",
            query: { orderNum: orderNum, actPrice: actPrice, flag: "help" }
          });
        })
        .catch(err => {
          Indicator.close();
          console.log(err,'报错提示')
          Toast({
            message: err.data.msg,
            duration: 2000
          });
        });
    },
    goBack() {
      this.$router.push("/mine");
    },
    toMyOrder() {
      if (this.$router.currentRoute.name == "toMyOrder") {
        this.toDetail = true;
      }
    },
    statusChange(val) {
      switch (val) {
        case "Prepay":
          return "待支付";
          break;
        case "InProcess":
          return "办理中";
          break;
        case "Canceled":
          return "已取消";
          break;
        case "Closed":
          return "已关闭";
          break;
        case "Evaluate":
          return "已完成";
          break;
        case "Completed":
          return "已完成";
          break;
      }
    },
    toOrderDetail(value) {
      // 跳转到相应的详情页面
      // //console.log( value,"value");
      this.toDetail = false;
      if (value.ProcessingState == "Prepay") {
        //编码
        this.$router.push({
          path: "/mine/toMyOrder/orderWaitpay",
          query: { id: value.Id }
        });
      } else if (value.ProcessingState == "InProcess") {
        store.dispatch("reviseId", value.Id);
        this.$router.push({
          path: "/mine/toMyOrder/orderServering",
          query: { id: value.Id }
        });
      } else if (value.ProcessingState == "Canceled") {
        this.$router.push({
          path: "/mine/toMyOrder/orderCancel",
          query: { id: value.Id }
        });
      } else if (value.ProcessingState == "Evaluate") {
        store.dispatch("reviseId", value.Id);
        this.$router.push({
          path: "/mine/toMyOrder/orderCompleted",
          query: { id: value.Id }
        });
      } else if (value.ProcessingState == "Completed") {
        store.dispatch("reviseId", value.Id);
        this.$router.push({
          path: "/mine/toMyOrder/orderCompleted",
          query: { id: value.Id }
        });
      }
    },
    cancelOrder(value, index) {
      // debugger
      var data = {
        params: {
          ids: value[index].Id
        }
      };
      // 订单列表——取消订单
      this.$store.dispatch("request_data_cancelOrder", data);
      // 刷新当前页面
      // location.reload();
      // 页面上也要删除
      // value.splice(index,1);
    },
    deleteOrder(value, index) {
      // //console.log("我是要被删除的");
      // //console.log(value);
      // //console.log('index',index);
      var dataV = {
        data: {
          params: {
            ids: value.Id
          }
        },
        value: value
      };

      this.newArr3 = [];
      // //console.log( this.newArr3,'llalalalaalalla'  );
      // 订单列表——删除订单
      this.$store.dispatch("request_data_orderDelete", dataV).then(() => {
        // 页面上也要删除
        // //console.log(this);
        // //console.log('页面上也要删除',this.newArr3);
        // Vue.set()
        this.newArr3.splice(index, 1);

        this.newArr3 = [];
      });
    },
    buyAgain(value, index) {
      // //console.log("dfdsf",value);
      //清除购物车的本地记录 防止重复
      util.removeLocal("_CART");
      var data = {
        params: {
          id: value[index].Id
        }
      };

      // 再次购买调接口
      this.$store.dispatch("request_data_bugagain", data).then(res => {
        //数据若为空，阻止跳转
        if (!this.$store.state.myorder.buyagain) {
          return;
        }

        // 再次购买接口成功调起后再调购物车列表接口
        this.$store.dispatch("request_data_cart").then(res => {
          //					 console.log("zaicigoumai",this.$store.state.myorder.buyagain);
          let localS = {
            list: [],
            recordCount: this.$store.state.myorder.buyagain.recordCount
          };

          localS.list = this.$store.state.myorder.buyagain.list;

          //  //console.log(localS,'ddddddddddddd')
          // //console.log("localS .localS",localS);
          var localstorage = util.saveToLocal(
            "_CART",
            this.getToken(),
            "data",
            localS
          );
          // //console.log("this.getToken",util.loadFromLocal("_CART",this.getToken(),'data',false));

          this.$router.push({
            path: "/cart/comfirmOrder",
            query: { id: value[index].Id }
          });
        });
      });
    },
    showPropsFn(data) {
      this.toDetail = true;
    },
    toEvaluation(val, index) {
      //console.log("valvalval",val.OrderDetails);
      var orderD = val.OrderDetails;
      orderD.forEach((item, index) => {
        var _ProductId = item.ProductIdd;
        var _orderNumber = item.OrderId;
        this.$router.push({
          path: "/mine/toMyOrder/toEvaluate",
          query: {
            ProductId: _ProductId,
            OrderId: _orderNumber,
            listDate: val.OrderDetails
          }
        });
        return _ProductId;
      });
    },
    toPayMoney(detail) {
      var params = {
        id: detail.Id
      };
      this.$store
        .dispatch("checkOrder", params)
        .then(res => {
          this.$router.push({
            path: "/cart/comfirmOrder/payMethod",
            query: { orderNum: detail.OrderNumber, actPrice: detail.Amount }
          });
        })
        .catch(err => {
          Indicator.close();
          Toast({
            message: err.data.msg,
            duration: 2000
          });
        });
      //	this.$router.push({"path": '/payMethodCheck'});  支付方式 还得确定
      //获取当前 订单号 以及 价格 根据PayType付款方式，发起接口支付
      // console.log("detail",detail);
      // if(detail.PayType == "Alipay"){
      // 		//发起 阿里支付
      // 		//Amount OrderNumber
      // 		// document.getElementById("total_fee").value =  Number(detail.Amount).toFixed(2);
      // 		// document.getElementById("out_trade_no").value = detail.OrderNumber.toString();

      // 	// if(this.$refs._Aout_trade_no.value !="" &&this.$refs._Atotal_fee.value!="" ){
      // 	// 	this.alibaba();
      // 	// }

      // 	 //跳转支付宝页面
      //     this.$router.push({"name":"alipay","params":{"out_trade_no":detail.OrderNumber.toString(),"total_fee":Number(detail.Amount).toFixed(2)}  })

      // }else if(detail.PayType == "WeChat" ){
      // 	//发起 微信支付
      // 	// toPay(orderNum);  orderNum是订单编号
      // 	// toPay(detail.OrderNumber);
      // 	//跳转微信页面
      //     this.$router.push({"name":"wxpay","params":{"out_trade_no":detail.OrderNumber.toString(),"total_fee":Number(detail.Amount).toFixed(2)}  })
      // };
    },
    alibaba() {
      document.getElementById("profile-form").submit();
    },
    orderData(value) {
      // //console.log("valuevalue",value);
      var data = {
        type: value
      };
      // 订单列表请求数据
      this.$store.dispatch("request_data_myorder", data);
      // //console.log("valuevalue2222",this.$store.state.myorder.dataValue);
    }
  },
  filters: {
    formatPrice(detail) {
      return util.formatPrice(detail);
    },
    formatPriceX(detail) {
      return util.formatPriceX(detail);
    },
    currency(detail) {
      return util.currency(detail);
    }
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
.mint-tab-item-label {
  color: #000;
}
#orderDetail {
  width: 100%;
  height: auto !important;
  /*min-height: 100%;
     */
  background: rgb(239, 239, 244);
}
.mint-navbar .mint-tab-item.is-selected {
  color: #fa482a;
  border-bottom: 0.05405405405405406rem solid #fa482a;
}
.orderOne {
  margin-bottom: 0.5405405405405406rem;
}
.orderOne:nth-child(1) {
  margin-top: 0.08108108108108109rem;
}
.waitPay,
.cancel {
  height: 1.0810810810810811rem;
  background-color: white;
}
//  .waitPay span,.cancel span{
//      line-height: 1.0810810810810811rem;
//      float: right;
//      color: #FB6F59;
//      font-weight: 600;
//      font-size: 0.43243243243243246rem;
//      margin-right: 0.4rem;
// }
.waitPay span {
}
.numAndMoney {
  font-size: 0.373333rem;
  width: 100%;
  height: 1.066667rem;
  line-height: 1.066667rem;
  // float: right;
  background-color: white;
  border-bottom: 1px solid #ebe5e1;
}
.numAndMoney span {
}
// 按照覃ui的样式修改  需修改请重新确认
.numAndMoney .finalPay {
  margin-right: 0.333333rem;
  float: right;
  height: 100%;
  span:nth-child(1) {
    margin-right: 0.32rem;
  }
  span:nth-child(3) {
    color: #fb6f58;
  }
  b {
    font-weight: normal;
    font-size: 0.32rem;
  }
}

.waitPayNum {
  left: 1.3513513513513513rem;
}
.orderStatusWrap{
  height: 1.0810810810810811rem;
  background-color: white;
}
.orderStatus span {
  float: right;
  display: inline-block;
  margin-top: 0.1291891891891892rem;
  // margin-right: 0.32432432432432434rem;
  border-radius: .213333rem;
  width: 1.733333rem;
  height: .8rem;
  font-size: .32rem;
  color: #666;
  line-height: .8rem;
  text-align: center;
  // overflow: hidden;
}
.orderStatus {
  height: 1.0810810810810811rem;
  background-color: white;
  margin-left: .533333rem;
  font-size: 0.32rem;
  border-top: 1px solid rgb(238,238,238);
  .allMoney{
    float: none;
    color: rgb(51,51,51);
    font-size: .32rem;
    line-height: 1.0810810810810811rem;
    margin-top: 0;
    width: 2.666667rem;
    text-align: left;
  }
  .payNow{
    border: 1px solid rgb(255,107,95);
    background: rgb(255,235,233);
    color: rgb(255,107,95);
    margin-right: .28rem;
  }
  .findPerson{
    color: rgb(102,102,102);
    background: rgb(221,221,221);
    margin-right:.28rem;
  }
  .cancelO{
    background: rgb(221,221,221);
    color: rgb(102,102,102);
    margin-right:.28rem;
  }
}

// .orderStatus span:nth-child(1) {
//   border: 1px solid #fa482a;
//   color: #fa482a;
// }
// .orderStatus span:nth-child(2) {
//   margin-right: 0.40540540540540543rem;
// }
.orderImg {
  width: 1.8918918918918919rem;
  height: 1.8918918918918919rem;
  margin: 0.32rem 0 0 .533333rem;
}
.orderDetail {
  height: 2.5405405405405403rem;
  background-color: #fff;
}
.orderDetailRight {
  width: 68%;
  font-size: 0.373333rem;
  // height: 2.5405405405405403rem;
  // display: inline-block;
  float: left;
  margin: 0.4rem 0 0 0.40540540540540543rem;
}

.orderSta,
.orderChapter {
  display: inline-block;
  margin-top: 0.2rem;
  color: #666666;
  font-size: 0.346667rem;
}
.cancel {
  height: 1.0810810810810811rem;
  background-color: white;
}
.cancel span {
  color: #c2c2c2;
}
.empty {
  width: 4.621621621621622rem;
  height: 4.054054054054054rem;
  .bg-image("../../assets/images/tabBar/nullCart");
  background-repeat: no-repeat;
  background-size: 4.621621621621622rem 4.054054054054054rem;
  margin: 0.5405405405405406rem auto;
}
.emptyWord {
  margin: 0rem auto;
  color: #666666;
  text-align: center;
}
.delete {
  width: 0.4rem;
  height: 0.4rem;
  .bg-image("../../assets/images/tabBar/deleteIcon");
  background-size: 0.4rem 0.4rem;
  float: right;
  margin-top: 0.35rem;
  margin-right: 0.346667rem;
  //   position: relative;
  //   top: 0.32432432432432434rem;
  //   left: 20%;
}
.hadCancel {
  color: #8c8c8c !important;
}
.mint-tab-container-item {
  margin-top: 0.32432432432432434rem;
}
.orderDetailImg {
  // display: inline-block;
  float: left;
}
// 支付
#out_trade_no {
  display: none;
}
#total_fee {
  display: none;
}
.ordBtn {
  display: none;
}
/*.mint-navbar{
     margin-top: 1.1891891891891893rem;
}
 */

// 头部样式
#title {
  background: white;
}
.popularity_return {
  position: fixed;
  height: 1.1891891891891893rem;
  width: 100%;
  text-align: center;
  line-height: 1.162162162162162rem;
  font-size: 0.4864864864864865rem;
  color: #1f1f1f;
  border-bottom: 1px solid #ebe5e1;
  top: 0;
  right: 0;
  left: 0;
  background: white;
  z-index: 999;
}
.return {
  /*padding-left: 0.40540540540540543rem;
     */
  height: 1.1891891891891893rem;
  width: 1.1891891891891893rem;
  .bg-image("../../assets/images/tabBar/nav_back");
  background-size: 52%;
  background-position: 0.40540540540540543rem 0.2972972972972973rem;
  position: absolute;
  left: 0;
}
.return a {
  width: 100%;
  height: 100%;
  display: block;
}
#submit {
  float: right;
  font-size: 0.40540540540540543rem;
  color: #fa2802;
  margin-right: 0.40540540540540543rem;
}
#orderDetail .toDetail {
  position: absolute;
  top: 1.1891891891891893rem;
  width: 100%;
  height: min-content;
  bottom: 0;
  overflow: auto;
}
// 订单编号
.waitPayWrap{
  height: 1.0810810810810811rem;
  background:#fff;
  .waitPay{
    margin-left: .533333rem;
    border-bottom: 1px solid rgb(238,238,238);
    .orderNo{
      line-height: 1.0810810810810811rem;
      font-size: .4rem;
      color: rgb(51,51,51);
      display: inline-block;
    }
  }
}
.waitPay span,
.cancel span {
  line-height: 1.0810810810810811rem;
  color: #fb6f59;
  float: right; 
  font-size: 0.373333rem;
  margin-right: 0.4rem;
}
.noPay{
  float: right;
  color: rgb(255,107,95);
  font-size: .32rem;
}
</style>
