<template>
  <div id="helpFriendPay">
	<header-title title="帮TA付款"></header-title>
	 <header> 
      <p >
          好友留言： {{onlogin_data.OrderMessage}}
      </p>
     <div class="imgRelative">
        <div class="headerTitleWrap">
          <p class="headerTitle">
            <span >应付：</span>
            <span class="themeC   ">{{ onlogin_data.Amount| formatPrice |currency}}<b>{{onlogin_data.Amount | formatPriceX}}</b></span>
          </p>
        </div>
        <div class="statusClass"   v-if="true"
        :class="{
          'cancel':onlogin_data.ProcessingState=='已取消',
          'completed':onlogin_data.ProcessingState=='已完成',
          'paid':onlogin_data.ProcessingState=='已关闭' || onlogin_data.ProcessingState=='办理中'
        }">
        </div>

     </div>
		
		 <div>
       <span class="xian"></span>
			 联系人：<span class="nameC">{{onlogin_data.ConsigneeName}} </span><span class="address">（此为收货地址联系人）</span>
		 </div>  
     <!-- {{onlogin_data.ProcessingState}} -->
	
	 </header>
	 <main>
		 <div class="orderTitle">代付订单信息</div> 
     

		 <section class="cart-mianWrap">
			<ul class="cart-itemsWrap ">
        
            <!-- /始终保留第一个 -->
            <li   v-if="index ==0"  class="items-list"  v-for="(items , index ) in onlogin_data.OrderDetails"   :key="index" :class="items.ProductDetails.length == 0 ?'singS':'nSingS'">
              <!-- 单品  -->
                <div v-if="items.ProductDetails.length == 0">
                  <div class="listMain">
                    <div class="infos">
                      <div class="innerWrap">
                        <img :src="items.ThumbImgURL" alt="" class="listImg"> 
                        <div class="brief">
                          <p data-v-261b435c="">{{items.Name}} </p> 
                          <p data-v-261b435c="">
                          类型:{{items.ProductType}}
                          </p>
                        </div> 
                        <div class="purchWrap">
                          <span class="themeC  nowPrice">{{items.Price | formatPrice |currency}}<b data-v-261b435c="">{{items.Price | formatPriceX}} </b> </span> 
                  
                          <span class="oldPrice">  {{items.OldPrice | formatPrice |currency}}<b data-v-261b435c="">{{items.OldPrice | formatPriceX}} </b></span> 
                          <div class="btnWrap">
                            数量:{{items.Num}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <!-- /单品  -->
                
                <!-- 套餐  -->
                <div id="1111111111"  v-if="items.ProductDetails.length != 0"  >
                    <div class="titleWrap" >
                      <h3  class="title"> 
                        <span class="themeC"><strong class="font11">优惠套餐</strong></span>
                          <span class="btnWrap">	数量:{{items.Num}}</span>
                        <!-- <span class="couBtn themeC"  @click="goServe()">去凑单&nbsp;></span> -->
                      </h3>
                    </div>
                    <!-- 套餐价格 -->
                    <div class="listMain" ref="listMain"   v-for="(tempList,indexs ) in items.ProductDetails"  :key="indexs">
                        <div class="infos">
                          <div class="innerWrap">
                              <div class="listImageWrap">
                                <img class="listImg" :src="tempList.ThumbImgURL" alt="" />
                              </div>
                              <div class="brief" >
                                  <p>{{tempList.Name}}</p>
                                  <p data-v-261b435c="">
                                     类型:{{tempList.ProductType}}
                                  </p>
                              </div>
                              <div class="purchWrap">
                                  <span class="themeC nowPrice">{{tempList.Price | formatPrice | currency}}<b>{{tempList.Price | formatPriceX}}</b>
                                  </span>
                                  <span class="oldPrice"><strong>{{tempList.OldPrice|currency}}</strong></span>
                              </div>
                          </div>
                        </div>
                    </div>
                </div> 
                <!-- /套餐 -->
            </li>  
            <!-- /始终保留第一个 -->
          <VerticalToggle >
            <li  v-show="item1Seem"  v-if="index >=1" class="items-list"  v-for="(items , index ) in onlogin_data.OrderDetails"   :key="index" :class="items.ProductDetails.length == 0 ?'singS':'nSingS'">
              <!-- 单品  -->
                <div v-if="items.ProductDetails.length == 0">
                  <div class="listMain">
                    <div class="infos">
                      <div class="innerWrap">
                        <img :src="items.ThumbImgURL" alt="" class="listImg"> 
                        <div class="brief">
                          <p data-v-261b435c="">{{items.Name}} </p> 
                          <p data-v-261b435c="">
                          类型:{{items.ProductType}}
                          </p>
                        </div> 
                        <div class="purchWrap">
                          <span class="themeC  nowPrice">{{items.Price | formatPrice |currency}}<b data-v-261b435c="">{{items.Price | formatPriceX}} </b> </span> 
                  
                          <span class="oldPrice">  {{items.OldPrice | formatPrice |currency}}<b data-v-261b435c="">{{items.OldPrice | formatPriceX}} </b></span> 
                          <div class="btnWrap">
                            数量:{{items.Num}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> 
                <!-- /单品  -->
                
                <!-- 套餐  -->
                <div id="1111111111"  v-if="items.ProductDetails.length != 0"  >
                    <div class="titleWrap" >
                      <h3  class="title">
                        {{items}}
                        <span class="themeC"><strong class="font11">优惠套餐</strong></span>
                          <span class="btnWrap">	数量:{{items.Num}}</span>
                        <!-- <span class="couBtn themeC"  @click="goServe()">去凑单&nbsp;></span> -->
                      </h3>
                    </div>
                    <!-- 套餐价格 -->
                    <div class="listMain" ref="listMain"   v-for="(tempList,indexs ) in items.ProductDetails"  :key="indexs">
                        <div class="infos">
                          <div class="innerWrap">
                              <div class="listImageWrap">
                                <img class="listImg" :src="tempList.ThumbImgURL" alt="" />
                              </div>
                              <div class="brief" >
                                  <p>{{tempList.Name}}</p>
                                  <p data-v-261b435c="">
                                     类型:{{tempList.ProductType}}
                                  </p>
                              </div>
                              <div class="purchWrap">
                                  <span class="themeC nowPrice">{{tempList.Price | formatPrice | currency}}<b>{{tempList.Price | formatPriceX}}</b>
                                  </span>
                                  <span class="oldPrice"><strong>{{[tempList.OldPrice,tempList.Price]|isEquality}}</strong></span>
                              </div>
                          </div>
                        </div>
                    </div>
                </div> 
                <!-- /套餐 -->
            </li>  
        </VerticalToggle >  
          
			</ul>
		</section> 

    <div v-if="onlogin_data.OrderDetails != undefined && onlogin_data.OrderDetails.length>=2 "> 
      <div class="foldOrUnflod"  v-on:click="item1SeemFn()" v-if="item1Seem">
            收起商品信息<span class="shouqi"></span>
        </div>
        <div class="foldOrUnflod"  v-on:click="item1SeemFn()"  v-else>
            查看更多商品信息<span class="xiala"></span>
        </div>
    </div>
	
 		  
		 
		<div class="submitPayWrap" v-if="isPayOK">
			<!-- <div class="submitPayWx"  @click="wxPay"  v-show="weixinPay">微信支付</div> -->
      <a  class="submitPayWx"   :href="abc"   v-show="weixinPay">微信支付</a>
			<div class="submitPay" @click="wqbolPay"  v-show="true">微企宝付款</div>
		</div>

	 </main>

    <footer >
			说明：</br>
			1.付款前请和好友再次确认，避免遇到诈骗行为；</br>
			2.如果发生退款，已支付金额将原路退回付款人；</br>
			3.付款金额以当前页面展示为准。
		</footer>
 
  </div>
</template>

<script>
import headerTitle from "../components/header-title";
import tool from "../../util/tool";
import { mapState, mapActions, mapGetters } from "vuex";
import VerticalToggle from "../../util/verticalToggle.js";
import Vue from "vue";

export default {
  data() {
    return {
      show: true,
      title: "交易详情",
      money: "",
      ab: require("@/assets/images/comfirm-order/defeated@3x.png"),
      weixinPay: false,
      isPayOK: false,
      item1Seem: false, //收起展开 
      abc: `https://api.wqbol.com/Payment/ProductsJson?out_trade_no=${this.$route.query.orderNum.toString()}&actPrice=${this.$route.query.actPrice}&flag=help}`
    };
  },
  components: {
    headerTitle: headerTitle,
    VerticalToggle: VerticalToggle
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 获取订单信息
      let params = {
        orderNum: vm.$route.query.orderNum
      };
      vm.REQUEST_DATA_MYORDER_ONLOGIN(params).then(() => {
        console.log("000000", vm.onlogin_data);
        //微信分享
        vm.handleWX(vm);
      });
    });
  },
  created() {
    //判断是否微信浏览器
    if (tool.is_weixn()) {
      this.isPayOK = true;
      this.weixinPay = true;
    }

    // 获取订单信息
    let params = {
      orderNum: this.$route.query.orderNum
    };

    this.REQUEST_DATA_MYORDER_ONLOGIN(params)
      .then(() => {
        if (this.onlogin_data.ProcessingState == "待付款") {
          this.isPayOK = true;
        } else {
          this.isPayOK = false;
        }
      })
      .catch(error => {
        alert("请退出后重新登陆");
        console.log("dddd", error);
      });
  },
  computed: {
    ...mapState("comfirmOrder", {
      onlogin_data: "REQUEST_DATA_MYORDER_ONLOGIN_DATA"
    })
  },
  methods: {
    ...mapActions("comfirmOrder", {
      //获取记账币金额
      REQUEST_DATA_MYORDER_ONLOGIN: "REQUEST_DATA_MYORDER_ONLOGIN"
    }),
    handleWX(self) {
      console.log("	self.onlogin_data");
      Vue.prototype.WXshare(
        "快来帮我付款",
        self.onlogin_data.OrderMessage ||
          "亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报",
        "https://host.wqbol.com/shareLogo.png",
        `https://host.wqbol.com/helpFriendPay?orderNum=${
          self.$route.query.orderNum
        }&actPrice=${self.$route.query.actPrice}&flag=help`
      );
      Vue.prototype.QQshare(
        "快来帮我付款",
        self.onlogin_data.OrderMessage ||
          "亲，江湖告急，帮忙付个款，滴水之恩，定当涌泉相报",
        "https://host.wqbol.com/shareLogo.png",
        `https://host.wqbol.com/helpFriendPay?orderNum=${
          self.$route.query.orderNum
        }&actPrice=${self.$route.query.actPrice}&flag=help`
      );
    },
    item1SeemFn() {
      this.item1Seem = !this.item1Seem;
      if (this.item1Seem) {
        //展开
        this.$nextTick(() => {
          document
            .getElementsByClassName("cart-itemsWrap")[0]
            .getElementsByTagName("li")[0].style.borderBottom =
            "1px  solid #ccc";
        });
      } else {
        //收起
        this.$nextTick(() => {
          document
            .getElementsByClassName("cart-itemsWrap")[0]
            .getElementsByTagName("li")[0].style.borderBottom =
            "1px  solid transparent";
        });
      }
    },

    //微信支付
    wxPay() {
      // this.$router.replace({name: "webWxPay",query:{"out_trade_no":this.$route.query.orderNum.toString(),actPrice:this.$route.query.actPrice,flag:"help"}})
      // this.$router.replace({"name":"wxpay",query:{"out_trade_no":this.$route.query.orderNum.toString(),actPrice:this.$route.query.actPrice,flag:"help"}})
    },
    //微企宝付款
    wqbolPay() {
      //跳转需带上参数
      //判断是否登陆 没有就跳转登陆页面
     

      // if(sessionStorage.getItem('login_user_id')){//存在
      //   if(JSON.parse(sessionStorage.getItem('login_user_id')).Token){
      //     this.$router.push({path:'/DPayMethod',query:{orderNum:this.onlogin_data.OrderNumber,actPrice:this.$route.query.actPrice}})
      //   }
      // }else{
      //跳转登陆页面
      if (
        tool.loadFromLocal(
          "login_user_id",
          "login_user_id",
          "login_user_id",
          false
        )
      ) {
        this.$router.push({
          path: "/DPayMethod",
          query: {
            orderNum: this.onlogin_data.OrderNumber,
            actPrice: this.$route.query.actPrice,
            flag: "help"
          }
        });
      } else {
        this.$router.push({
          path: "/mine/login",
          query: {
            orderNum: this.onlogin_data.OrderNumber,
            actPrice: this.$route.query.actPrice,
            flag: "help"
          }
        });
      }

      // }
    }
  },
  filters: {
    formatPrice(value) {
      return tool.formatPrice(value);
    },
    formatPriceX: value => {
      return tool.formatPriceX(value);
    },
    currency: value => {
      return tool.currency(value);
    },
    isEquality :value =>   { 
        return tool.isEquality(value);
    },
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";


 #helpFriendPay {
     padding-top:1.1891891891891893rem;
}
 header {
     position: relative;
     background: white;
     line-height: 0.4864864864864865rem;
     // height: 3.918918918918919rem;
     .imgRelative{
         height: 1.4054054054054055rem;
         position: relative;
    }
     .fs13;
     padding: 0.24324324324324326rem 0.35135135135135137rem 0.2972972972972973rem 0.35135135135135137rem;
     > p {
         // margin-top: 0.3783783783783784rem;
         font-size: .346667rem;
    }
     .address {
         .c(#999999);
         font-size: .32rem;
    }
}
 .headerTitleWrap {
     padding-top: 0.43243243243243246rem;
}
 .headerTitle {
     .nowPrice(0.32rem);
     text-align: center;
     margin: 0 auto;
     span:nth-child(1) {
         font-size: .373333rem;
    }
     span:nth-child(2) {
         .themeC;
         font-size: .613333rem;
    }
     b{
         font-size: .506667rem;
         font-weight: bold 
    }
}
 .statusClass{
     //订单状态 
     position: absolute;
     top:0rem;
     right: 0rem;
     background-size: 100%;
     width: 3.081081081081081rem;
     height: 1.4054054054054055rem;
     &.completed{
         //完成 
         .bg-image('../../assets/images/comfirm-order/completed');
    }
     &.paid{
         //已付款 
         .bg-image('../../assets/images/comfirm-order/paid');
    }
     &.cancel{
         //取消 
         .bg-image('../../assets/images/comfirm-order/cancel');
    }
}
 .completed{
     //完成 
     .bg-image('../../assets/images/comfirm-order/completed');
}
 .paid{
     //已付款 
     .bg-image('../../assets/images/comfirm-order/paid');
}
 .cancel{
     //取消 
     .bg-image('../../assets/images/comfirm-order/cancel');
}
 main {
     margin-top: 0.32rem;
     .orderTitle{
         line-height: 1.0810810810810811rem;
         text-indent: 0.32rem;
         background: white;
         font-size: .373333rem;
    }
     section{
         background: #e4e4e4;
    }
     .foldOrUnflod{//展开收起 
         text-align: center;
         line-height: 1.0810810810810811rem;
         background: #ffffff;
         font-size: .373333rem;
    }
}
 .submitPayWrap {
     background: transparent;
     padding-top:0.8108108108108109rem;
}
 .submitPayWx,.submitPay {
     height: 1.0810810810810811rem;
     line-height: 1.0810810810810811rem;
     color: white;
     text-align: center;
     font-size: 0.4864864864864865rem;
     margin-left: 0.32rem ;
     margin-right: 0.32rem;
}
 .submitPayWx{
     display: block;
     margin-bottom:0.5405405405405406rem;
     background: #01a93c;
}
 .submitPay {
     //微企宝支付 
     background: linear-gradient(to bottom, #f95008, #fc7303 98%, #ffffff 100%);
}
 footer {
     padding-left: 0.35135135135135137rem;
     margin-top: 0.6756756756756757rem;
     .cf6;
     line-height: 0.6216216216216216rem;
     font-size: .346667rem;
}
 .cart-itemsWrap {
}
 //单品 
 .singS:nth-last-child(1){
     border-bottom: 0;
 }
 .singS {
     background: #f7f7f7;
     position: relative;
     padding-top: 0.32rem;
     padding-bottom: 0.32rem;
     border-bottom: 1px solid rgb(204, 204, 204);
     .title {
         margin-left: 0.32rem;
         position: relative;
         height: 0.8918918918918919rem;
         line-height: 1.027027027027027rem;
         font-size: 0rem;
         em{
             position: absolute;
             bottom: -1px;
        }
         >span:nth-child(1) {
             display: inline-block;
             height: 0.40540540540540543rem;
             margin-left: 0.32rem;
             line-height: 0.35135135135135137rem;
             text-align: center;
             .border-1px(#FF2A00);
        }
         >span:nth-child(2) {
             margin-left: 0.21621621621621623rem;
             font-size: 0.32rem;
        }
         >span:nth-child(3) {
             margin-left: 0.24324324324324326rem;
             padding-right: 0.3783783783783784rem;
             display: inline-block;
             height: 0.40540540540540543rem;
             line-height: 0.35135135135135137rem;
             text-align: center;
             .border-1px(#FF2A00);
             font-size: 0.32rem;
        }
         span.purchNum{
             float: right;
             .cf8C;
             margin-right: 0.40540540540540543rem;
             font-size: 0.3783783783783784rem;
             b{
                 .fs12;
            }
        }
    }
     //单品 
     .listMain {
         // padding-top:0.2702702702702703rem;
         // padding-bottom: 0.2702702702702703rem;
         flex-wrap: wrap;
         display: flex;
         margin-left: 0.32rem;
         >div {
             display: inline-flex;
             &.checkboxWrap {
                 position: absolute;
                 z-index: 88;
            }
             &.infos {
                 position: relative;
                 flex: 1 1 0.05405405405405406rem;
            }
             .innerWrap {
                 width: 100%;
            }
             .listImg {
                 float: left;
                 width: 2.3783783783783785rem;
                 height: 2.3783783783783785rem;
                 border: 4px;
            }
             .brief {
                 margin-left: 0.32rem;
                 position: relative;
                 p {
                     padding-right: 0.4594594594594595rem;
                     &:nth-child(1) {
                         padding-left: 0.32rem;
                         position: relative;
                         .textIndex2(auto);
                         line-height: 0.4864864864864865rem;
                         margin-bottom: 0.10810810810810811rem;
                         font-size: .373333rem;
                    }
                     &:nth-child(2) {
                         padding-left: 2.3783783783783785rem;
                         .cf8C;
                        //  .fs13;
                         margin-bottom: 0.6486486486486487rem;
                         font-size: .346667rem;
                    }
                }
            }
             //点击按钮 
             .purchWrap {
                 position: absolute;
                 bottom: 0;
                 width: 100%;
                 padding-left: 2.6216216216216215rem;
                 height: 0.7027027027027027rem;
                 line-height: 0.7027027027027027rem;
                
                 .nowPrice {
                     float: left;
                     font-size: .373333rem;
                }
                 b {
                     font-size: 0.32rem;
                     font-weight: normal;
                }
                 .oldPrice {
                     float: left;
                     text-decoration: line-through;
                     .c(#B3B0AD);
                     .fs12;
                     margin-left: 0.16216216216216217rem;
                }
                 .purchNum{
                     float: right;
                     .cf8C;
                     margin-right: 0.40540540540540543rem;
                }
                 .btnWrap {
                     float: right;
                     // width: 2.324324324324324rem;
                     height: 100%;
                     text-align: right;
                     font-size: 0.32rem;
                     padding-right: 0.32rem;
                     color:#666 
                }
                 .btnWrap>span {
                     background-size: 0.6486486486486487rem;
                     float: left;
                     width: 0.6756756756756757rem;
                     height: 0.6756756756756757rem;
                     text-align: center;
                     line-height: 0.6756756756756757rem;
                }
                 .clickNum {
                     width: 0.972972972972973rem;
                     position: relative;
                     .border-1pxT(#B3B0AD);
                     .border-1pxB(#B3B0AD);
                     &:after {
                         bottom: 0.05405405405405406rem;
                    }
                }
            }
        }
    }
     .listfooter {
         padding-left: 0.32rem;
         font-size: 0.32rem;
         flex: 1 1 100%;
         height: 0.7027027027027027rem;
         line-height: 0.7027027027027027rem;
         background: #FFF8F5;
         span:nth-child(1) {
             .cf6;
        }
         span:nth-child(2) {
             .cf8C;
        }
    }
}
 //套餐 
 .nSingS {
     background: #f7f7f7;
     position: relative;
     // margin-bottom: 0.32rem;
     // border-bottom: 1px solid #ccc;
     .checkboxWrap {
         position: absolute;
         z-index: 88;
         left:0.32rem;
    }
     .title {
         //套餐标题 
         padding:0.40540540540540543rem 0rem 0.2702702702702703rem 0rem;
         font-size: 0rem;
         >span:nth-child(1) {
             display: inline-block;
             margin-left:0.32rem;
             height: 0.40540540540540543rem;
             line-height: 0.40540540540540543rem;
             text-align: center;
             .border-1px(#FF2A00);
        }
         >span:nth-child(2) {
             font-size: 0.32rem;
             float: right;
             margin-right: 0.32rem;
             color: #666;
        }
         >span:nth-child(3) {
             position: absolute;
             top: 0.43243243243243246rem;
             right: 0.4594594594594595rem;
             font-size: 0.32rem;
             line-height: 1;
        }
    }
     .mint-cell-value{
         display: block;
         margin-bottom:0.13513513513513514rem;
    }
     //套餐 
     .listMain {
         margin-left: 0.32rem;
         padding-bottom: 0.2702702702702703rem;
         height: 2.810810810810811rem;
         flex-wrap: wrap;
         display: flex;
         position: relative;
         padding-top: 0.13513513513513514rem;
         >div {
             display: inline-flex;
             &.infos {
                 position: relative;
                 flex: 1 1 0.05405405405405406rem;
            }
             //套餐 
             .innerWrap {
                 width: 100%;
                 overflow: hidden;
            }
             .listImageWrap{
                 float: left;
            }
             .listImg {
                 float: left;
                 border-radius: 0.10810810810810811rem;
                 width:2.3783783783783785rem;
                 height: 2.3783783783783785rem;
            }
             .brief {
                 margin-left: 0.32rem;
                 position: relative;
                 p {
                     padding-right: 0.4594594594594595rem;
                     &:nth-child(1) {
                         font-size: .373333rem;
                         color:#38332F;
                         padding-left:0.32rem;
                         position: relative;
                         .textIndex2(auto);
                         line-height: 0.4864864864864865rem;
                         margin-bottom: 0.10810810810810811rem;
                    }
                     &:nth-child(2) {
                         padding-left: 2.3783783783783785rem;
                         .cf8C;
                        //  .fs13;
                         margin-bottom: 0.6486486486486487rem;
                         @media only screen and (min-device-width:8.64864864864865rem ) {
                             // padding-left: 2.2162162162162162rem;
                         font-size: .346667rem;
                        }
                    }
                }
            }
             //价格 
             .purchWrap {
                 position: absolute;
                 bottom: 0;
                 width: 100%;
                 padding-left: 2.7027027027027026rem;
                 height: 0.7027027027027027rem;
                 line-height: 0.7027027027027027rem;
                 @media only screen and (min-device-width:8.64864864864865rem ) {
                     // padding-left: 2.5405405405405403rem;
                }
                 .nowPrice {
                     float: left;
                     font-size: .373333rem;
                }
                 b {
                     font-size: .32rem;
                }
                 .oldPrice {
                     float: left;
                     .c(#B3B0AD);
                     height:0.7027027027027027rem;
                     line-height: 0.7027027027027027rem;
                     strong{
                         .font10;
                         text-decoration: line-through;
                    }
                }
            }
        }
    }
     .listfooter {
         padding-left: 1.135135135135135rem;
         font-size: 0.32rem;
         flex: 1 1 100%;
         height: 0.7027027027027027rem;
         line-height: 0.7027027027027027rem;
         background: #FFF8F5;
         span:nth-child(1) {
             .cf6;
        }
         span:nth-child(2) {
             .cf8C;
        }
    }
     //点击按钮 
     .nSPurchWrap {
         height: 0.9459459459459459rem;
         line-height: 0.9459459459459459rem;
         position: relative;
         padding-left: 1.135135135135135rem;
         .priceTotal {
             float: left;
             >span:nth-child(1) {
                 float: left;
            }
             >span:nth-child(2) {
                 float: left;
            }
             b {
                 font-size: 0.32rem;
            }
        }
         .oldPrice {
             float: left;
             text-decoration: line-through;
             height: 0.972972972972973rem;
             line-height: 0.972972972972973rem;
             .c(#B3B0AD);
             strong{
                 .font10;
                 text-decoration: line-through;
            }
        }
         .btnWrap {
             float: right;
             width: 2.324324324324324rem;
             color:#666 
        }
         .btnWrap>span {
             margin-top: 0.13513513513513514rem;
             width: 0.6756756756756757rem;
             height: 0.6756756756756757rem;
             text-align: center;
             line-height: 0.6756756756756757rem;
             background-size: 100% 100%;
             float: left;
        }
         .clickNum {
             width: 0.972972972972973rem;
             position: relative;
             border-top: 1px solid #ccc;
             border-bottom: 1px solid #ccc;
             &:after {
                 bottom: 0.05405405405405406rem;
            }
        }
    }
     //修改列表样式bug 
     .mint-cell-value{
         width: 100%;
    }
}
 .shouqi{
     .bg-image('../../assets/images/comfirm-order/shouqi');
     background-repeat: no-repeat;
     width: 0.2702702702702703rem;
     height: 0.1891891891891892rem;
     display: inline-block;
     margin-left: 0.13513513513513514rem;
     background-size: 100%;
}
 .xiala{
     .bg-image('../../assets/images/comfirm-order/xiala');
     background-repeat: no-repeat;
     width: 0.2702702702702703rem;
     height: 0.1891891891891892rem;
     display: inline-block;
     margin-left: 0.13513513513513514rem;
     background-size: 100%;
}
 .xian{
     width: 100%;
     display: block;
     border-bottom: 1px dotted #e1e1e1;
     text-align: center;
     margin-bottom: 0.2702702702702703rem;
     font-size: .32rem;
}
.nameC{
    font-size: .32rem;
}
b{
    font-weight: normal
}
 
</style>
