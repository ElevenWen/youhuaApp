<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
@import "../../../node_modules/mint-ui/lib/swipe/style.css";
@import "productDetails.less";

.productDetails /deep/ .mint-tab-item {
  //font-size: 0.32rem;
}
.productDetails /deep/ .mint-tab-item-label {
  font-size: 0.32rem;
}
</style>
<template>
	<div class="productDetails" style="background:white;"> 
		<div class="wrap">
			<!-- 头部 -->
      <div class="wrapS" ref="wrapS">
				<!-- 返回 --> 
				<span class="fanhui" @click="headerBack" v-if="flagShare"></span>		 
        <div class="center">
          <span :class="{active:active1}"     @click="bannerM" v-show="bannerMD &&  evaluateMD  && mtTabItemWrapMD ">商品</span>
          <span  :class="{active:active2}"  @click="evaluateM"  v-show="bannerMD &&  evaluateMD  && mtTabItemWrapMD ">评价</span> 
          <span   :class="{active:active3}"  @click="mtTabItemWrapM" v-show="bannerMD &&  evaluateMD  && mtTabItemWrapMD">详情</span>
        </div>
			  <div class="headerShare"  @click="aaaa" v-if="isAppInside">
					<img   src="../../assets/images/productDetails/share@3x.png" class="share" />
				</div>
			</div> 
	 
 

					<!-- 轮播图  :swipeable="true"-->
					<div class="banner" ref="bannerM">
						<!-- <mt-swipe :auto="4000">
					     	<mt-swipe-item v-if="Array.isArray(product.PosterImgURL)   && product.PosterImgURL.length != 0"><img  :src="product.PosterImgURL" /></mt-swipe-item> 
					     	<mt-swipe-item v-else><img  :src="product.PosterImgURL" /></mt-swipe-item> 
						</mt-swipe> -->
            
				    <img  :src="product.PosterImgURL" alt="">
          
          
          
          
          </div>
					<!-- 标题详情 -->
					<div class="title" v-if="product.Price">
						<div class="firstTitle">{{product.Name}}</div>
						<!-- <div class="secondTitle">{{product.Title}}</div> -->
						<div class="secondTitle">{{ $route.query.type == 1 ? product.Title : product.Intro}}</div>
						<span class="nowPrice" v-if="product.OriginalPrice==undefined">
							<!--{{product.Discount==0?product.Price:(product.Price * (product.Discount/100)).toFixed(2)|currency}}-->
							{{productPrice|currency}}
						</span>
						<span class="nowPrice" v-if="product.OriginalPrice>=0">
							{{product.Price|currency}}
						</span>
						<span class="beforePrice" v-if="product.OriginalPrice==undefined">
							{{productOldPrice|currency}}
						</span>
						<span class="beforePrice" v-if="product.OriginalPrice>=0">
							{{product.OriginalPrice|currency}}
						</span>
						<!-- 2.0限时抢购倒计时 -->
            <!-- <div class="timeWrap">
              <div v-if=true class="plantDes">
                <img src="../../assets/images/productDetails/plantdes@2x.png" />
                <span>预计15日18:00开始</span>
              </div>
              <div class="countTime" v-else="">
                <span>距结束</span>
                <countDown class="time" :timeData="1526266421458"></countDown>
              </div>
            </div> -->
					</div>

					<!-- 促销 -->
					<div class="promotion" v-if="(product.Discount&&((product.Discount/10)!=10))||type ==1">
						<div class="info">促销</div>
						<!-- 右边的促销信息 -->
						<div class="rightInfo">
							<!--<div>
								<span class="reduced">满减</span>
								<span class="reducedDetail">购买满1000元减100元</span>
								<span class="more" @click="moreDiscount">···</span>
							</div>-->
							<div  v-if="type ==1 ?true:false">
								<span class="limit">套装</span>
								<span class="limitDetail">最高省{{product.OriginalPrice-product.Price}}元</span>
								<span class="more" @click="moreDiscount">···</span>
							</div>
							<div   v-if="product.Discount&&((product.Discount/10)!=10)">
								<span class="limit">折扣</span>
								<span class="limitDetail">此商品正在享受{{product.Discount/10}}折优惠，2日后结束</span>
								<span class="more" @click="moreDiscount">···</span>
							</div>
							<!--<div style="margin-top: 0.4rem;">
								<span class="limit">返券</span>
								<span class="limitDetail">购买满1000元送100元优惠券</span>
							</div>-->
						</div>
					</div>
					<!-- 促销隐藏模块 -->
					<mt-popup
					  class="hidden"
					  v-model="showOrHidden"
					  position="bottom">
					  <div class="hiddenDiv">
					  	<div class="headerPromotion">促销</div>
					  		<img src="../../assets/images/tabBar/closeS@3x.png" class="closeBtn" @click="closeBtn" />
					  	<div class="rightInfo">
					  		<div class="hiddenOne">
					  		<img src="../../assets/images/productDetails/limit@3x.png" class="limit" />
								<span class="limitDetail">限制:此价格不与套装优惠同时享受</span>
							</div>
							<!--<div class="hiddenTwo">
								<span class="reduced">满减</span>
								<span class="reducedDetail">购买满1000元减100元</span>
							</div>-->
							<!--<div class="hiddenThree">
								<span class="reduced">满送</span>
								<span class="reducedDetail">购买满1000元送热销服务，送完即止</span>
							</div>-->
							<div class="hiddenFour" v-show="product.Discount&&((product.Discount/10)!=10)">
								<span class="reduced">折扣</span>
								<span class="reducedDetail">此商品正在享受{{product.Discount/10}}折优惠，2日后结束</span>
							</div>
							<div class="hiddenFive" @click="customerServicePackage" v-if="type ==1 ?true:false">
								<span class="reduced">套餐</span>
								<span class="reducedDetail">最高省{{product.OriginalPrice-product.Price}}元</span>
								<span style="color:gray;float:right;">共{{length}}款<img src="../../assets/images/tabBar/right_arrow@3x.png" class="rightMore" /></span>
							</div>
							<!--<div class="hiddenSix">
								<span class="reduced">满额返券</span>
								<span class="reducedDetail">购买满1000元送100元优惠券</span>
							</div>-->
							<!--<div class="hiddenSeven">
								<span class="reduced">秒杀</span>
								<span class="reducedDetail">此商品正在享受秒杀活动，30s后结束</span>
							</div>-->
						</div>
					  </div>
					</mt-popup>
				<!-- 灰色分隔地区 -->
				<div class="grayClass" ></div>
				<!-- 已选 -->
				<div class="selected" v-if="this.$route.query.type!=1">
					<span class="select">已选</span>
					<div class="selectedRight">
						<span class="selectDetail" v-show="selected0||selected1||selected2">{{selected0}}{{!selected1?"":(','+selected1)}}{{!selected2?"":(','+selected2)}}</span>
					<span class="more" @click="shopping">···</span>
					</div>
					
				</div>
				<!-- 灰色分隔地区 -->
				<div  class="grayClass" ></div>
				<!-- 公司自营店铺标识显示 -->
				<div class="ProprietaryStores">
					<div class="storeTitle">深圳微企宝计算机服务有限公司 <span class="colorRed">自营</span></div>
					<ul class="introduce">
						<li class="introduceItems">支付安全</li>
						<li class="introduceItems">差错赔付</li>
						<li class="introduceItems">质量保证</li>
					</ul>
				</div>



				<!-- 灰色分隔地区 -->
				<div  class="grayClass" ></div> 
      			<!--评论-->
				<div class="evaluate" ref="evaluateM">
					<div class="evaluate_top" @click="goReviewList">
						<span>用户评价&nbsp;&nbsp;({{proReview.length}})</span>
						<div>
							<span>{{totalStar.percent}}</span> 
							<span>满意</span>
							<span @click.prevent="active = 'tab-container3'" @click="details"></span>
						</div>
					</div>
					<div class="noCommon" v-if="!proReviewS.length">
						暂无评论~
					</div>
					<div class="evaluate_outer">
						<div class="evaluate_list" v-for="(data,index) in proReviewS"  v-if="index == 0">
							<div class="evaluate_name">
								<div class="evaluate_name_left">
									<span class="evaluate_headPortrait">
										<img src="../../assets/images/tabBar/mine@3x.png" v-if="data.ReviewType||!(data.HeadPicPath)"/>
											<img :src="data.HeadPicPath" v-if="!data.ReviewType&&data.HeadPicPath"/>
									</span>
									<span class="evaluate_nike">{{data.ReviewType?"匿名":data.CustomerName}}</span>
									<span class="evaluate_star">
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<2?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=2?true:false" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<3?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=3?true:false" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<4?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=4?true:false" />
										<img src="../../assets/images/productDetails/evaluateStar@3x.png" v-show="data.Star<5?true:false" />
										<img src="../../assets/images/productDetails/evaluateStarS@3x.png" v-show="data.Star>=5?true:false" />
									</span>
								</div>
								<span class="evaluate_name_right">
									{{data.CreateTime}}
								</span>
							</div>
							<div class="evaluate_content">
								<span>{{data.Content}}</span>
								<!--<span>有限公司注册，加急办理，不刻章</span>-->
							</div>
							<div class="reply">
								<span >官方回复:</span>
								<span>感谢您在我们平台购物，祝您生活愉快！</span>
							</div>
						</div>
						<div class="view_All" v-show="seenAll">
							<mt-button size="small" @click.native.prevent="active = 'tab-container3'" class="details" @click="details">查看所有评价</mt-button>
						</div>
					</div>
				</div>
          <!-- 灰色分隔地区 -->
         
					<!-- 2.0商铺店铺 -->
          <!-- <div class="shop">
            <div class="shopDes">
              <div class="imgT"><img src="" alt=""></div>
              <div>
                <h3>深圳微企宝</h3>
                <div class="desText">工商财税服务，公司注册，代理记账，专业申请白白白白</div>
              </div>
            </div>
            <div class="golist">
              <span>在线咨询</span>
              <span>进入店铺</span>
            </div>
          </div> -->
          <!-- 灰色分隔地区 --> 

			</div>
		  
      	<!-- 灰色分隔地区 -->
			<div  ref="fuwujieshao"  class="bottomGrayClass fuwujieshao">  
      </div>
 

        <!-- <mt-tab-container-item id="tab-container1" >				
		</mt-tab-container-item>  节点是   ref="mtTabItemWrap" -->
			<div class="mtTabItemWrap"   ref="mtTabItemWrapM"  v-show="canshow"> 



				<mt-navbar  v-model="selected"  >
					<mt-tab-item id="1">服务介绍</mt-tab-item>
					<mt-tab-item id="2">服务保障</mt-tab-item>
					<mt-tab-item id="3">常见问题</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected">
					<mt-tab-container-item id="1">
					<h1 id="content" class="contentS" ref="content">
					</h1>
					</mt-tab-container-item>
					<mt-tab-container-item id="2">
					<div class="questionWrap">
						<div class="detailsOne">
							<img src="../../assets/images/productDetails/response@3x.png" class="response" />
							<div class="oneRight">
								<div class="oneRightTop">及时响应</div>
								<div class="oneRightDown">咨询5分钟内立即与您联系</div>
							</div>
						</div>
						<div class="detailsOne">
							<img src="../../assets/images/productDetails/custormer@3x.png" class="response" />
							<div class="oneRight">
								<div class="oneRightTop">专人对接</div>
								<div class="oneRightDown">专职客服人员一对一服务</div>
							</div>
						</div>
						<div class="detailsOne">
							<img src="../../assets/images/productDetails/message@3x.png" class="response" />
							<div class="oneRight">
								<div class="oneRightTop">短信+微信</div>
								<div class="oneRightDown">流程中每个节点我们及时通知</div>
							</div>
						</div>
						<div class="detailsOne">
							<img src="../../assets/images/productDetails/profession@3x.png" class="response" />
							<div class="oneRight">
								<div class="oneRightTop">专业人员</div>
								<div class="oneRightDown">服务人员经验丰富保证服务质量</div>
							</div>
						</div>
					</div>
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
					<div class="questionWrap">
						<div class="question">
							<div class="quesionOne">
								<img src="../../assets/images/productDetails/question@3x.png" />
								<div>记账报税业务，每月需要提供哪些资料给我们？</div>
							</div>
							<div class="answerOne">
								<img src="../../assets/images/productDetails/answer@3x.png" />
								<div>公司需要提供当月实际发生的收入成本类票据，包括：原始票据（收入、费用、成本类）、银行回单、银行对账单、其他账目原始凭证等。新方略会有专人指导公司业务人员提供这些票据。</div>
							</div>
						</div>
						<div class="question">
							<div class="quesionOne">
								<img src="../../assets/images/productDetails/question@3x.png" />
								<div>公司当月票据，如何给你们？</div>
							</div>
							<div class="answerOne">
								<img src="../../assets/images/productDetails/answer@3x.png" />
								<div>每月30日前客户需将当月票据邮寄给我们，我们会整理、归纳并完成做账工作。</div>
							</div>
						</div>
						<div class="question">
							<div class="quesionOne">
								<img src="../../assets/images/productDetails/question@3x.png" />
								<div>为什么一定要记账报税，不报税行不行？</div>
							</div>
							<div class="answerOne">
								<img src="../../assets/images/productDetails/answer@3x.png" />
								<div>稽查部门会稽查企业以往年度的账务，并追究责任。任何企业都需要面临着国税和地税两个税务机关的稽查，如果不记账报税的话，会对企业的征信带来很大影响。</div>
							</div>
						</div>
						<div class="question">
							<div class="quesionOne">
								<img src="../../assets/images/productDetails/question@3x.png" />
								<div>你们的记账报税到底行不行？</div>
							</div>
							<div class="answerOne">
								<img src="../../assets/images/productDetails/answer@3x.png" />
								<div>我们有自己的后台系统，无论是市场客服人员还是会计均有多年相关经验，确保没有中间商的情况下公司自我监督所有账目，保证为您做好每一笔帐，让您无后顾之忧。</div>
							</div>
						</div>
						<div class="question">
							<div class="quesionOne">
								<img src="../../assets/images/productDetails/question@3x.png" />
								<div>我们是新开的公司如何记账报税啊？</div>
							</div>
							<div class="answerOne answerTwo">
								<img src="../../assets/images/productDetails/answer@3x.png" />
								<div>公司的主要税种，国税：主要是增值税和企业所得税。地税主要是营业税以及附加，增值税的附加税和个人所得税。这是最主要的税种。</div>
							</div>
						</div>
					</div>
					</mt-tab-container-item>
				</mt-tab-container> 


			</div> 
			<!-- 点击已选更多 -->
        <mt-popup
          class="hiddenShopping"
          v-model="registered"
          position="bottom">
          <div class="addshopping">
            <div class="addshoppingHeader">
              <img :src="product.ThumbImgURL" class="shoppingImg" />
              <div class="shoppingHeaderRight">
                <div class="shoppingPrice">￥{{productPrice}}</div>
                <div class="shoppingNumber">商品编号：{{product.Code}}</div>

              </div>
              <img src="../../assets/images/tabBar/closeS@3x.png" class="closeBtn" @click="close" />
            </div>
            <div class="addshoppingSeconed">
              <div class="typeWrap"  v-for="(data,index) in productType" v-if="index==0" :key="index">
                <div>{{data.Name}}</div>
                <ul class="shoppingFirst">
                  <li v-for="(item,indexs) in data.ProAttributeListPcModels" @click="reg0(item,indexs)"   id="regType" :class="{active:regTypeNum0==( indexs)}" :key="indexs">{{item.Name}}</li>
                </ul>
              </div>
              <div class="typeWrap"  v-for="(data,index) in productType" v-if="index==1" :key="index">
                <div>{{data.Name}}</div>
                <ul class="shoppingFirst">
                  <li v-for="(item,indexs) in data.ProAttributeListPcModels" @click="reg1(item,indexs)"   id="regType" :class="{active:regTypeNum1==( indexs)}" :key="indexs">{{item.Name}}</li>
                </ul>
              </div>
              <div class="typeWrap"  v-for="(data,index) in productType" v-if="index==2" :key="index">
                <div>{{data.Name}}</div>
                <ul class="shoppingFirst">
                  <li v-for="(item,indexs) in data.ProAttributeListPcModels" @click="reg2(item,indexs)"   id="regType" :class="{active:regTypeNum2==( indexs)}" :key="indexs">{{item.Name}}</li>
                </ul>
              </div>
            </div>
            <div class="shoppingFooter">
			  <ul class="footer">
                <li @click="addshoppingP()" v-if="noAddCart" class="addSP">加入购物车2</li>
                <li @click="goPaying()" :class="!noAddCart?'nowB':'goP'">立即购买2</li>
              </ul>
            </div>
          </div>
        </mt-popup>

			<!-- 底部加入购物车 -->
			<div class="footerShopping">
				<ul class="shoppingCar">
					<li class="customer" @click="customerService"><p>客服</p></li>
					<li class="collection" :class="isCollected?'active':''" @click="collected"><p>{{isCollected?'已收藏':'收藏'}}</p></li>
					<li class="shopping" @click="goShopping"><p>购物车123</p><span class="buyNum" v-if="cartNumQ">{{cartNumQ.cartNum}}</span></li>
					<li class="addShop" @click="shoppingJ()">
						<!--失效产品遮罩层-->
						<div class="noBuy" v-if="isClose"></div>
						<p class="addshoppingP">加入购物车1</p>
					</li>
					<li class="buyNow" @click="shoppingL">
						<!--失效产品遮罩层-->
						<div class="noBuy" v-if="isClose"></div>
						<p class="buyNowP1">立即购买1</p>
					</li>

				</ul>
        <!--失效产品遮罩层-->
        <div class="desText" v-if="isClose">{{closedTexts}}</div>
       <!-- <div class="noBuy" v-if="product.ProductStatus === 1"></div>-->
			</div>
		</div>
	</div>

</template>


<script>
var scrollFn = function() {};
var timeId1 = null;
var timeId2 = null;
var timeId3 = null;
import { Popup } from "mint-ui";

import {
  Indicator,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  Toast
} from "mint-ui";
// import { MessageBox } from 'mint-ui';

import Vue from "vue";
import axios from "axios";
import tool from "../../util/tool.js";
import getd from "../../vuex/getData.js";
import util from "../../util/tool";
import origin from "../../util/originPackaging";

import countDown from "../components/countDown.vue";
export default {
  name: "productDetails",
  data() {
    return {
      imgObj: {
        src: "this.product.PosterImgURL",
        error: "http://xx.com/error.png",
        loading:
          "https://afp.alicdn.com/afp-creative/creative/u124884735/004341a2e3d7a98e72d9156f120bad43.png"
      },
      imgUrl:
        "https://afp.alicdn.com/afp-creative/creative/u124884735/004341a2e3d7a98e72d9156f120bad43.png", // String
      seconedRouter: true, //是否显示优惠套餐页面
      showOrHidden: false, //促销点击加载更多
      registered: false, //已选点击加载更多
      active: "tab-container1", //tab切换
      selected: "1", //详情下的tab切换
      price: "", //产品价格
      oldPrice: "", //产品原价
      product: {}, //产品
      regTypeNum: "",
      regTypeNum0: 0,
      regTypeNum1: 0,
      regTypeNum2: 0,
      nowRegTypeId0: "0",
      nowRegTypeId1: "0",
      nowRegTypeId2: "0",
      chapterTypeNum: 0,
      isUrgentNum: 0,
      length: 0,
      saveMoney: 0,
      type: this.$route.query.type,
      productDetails: "",
      recordCount: 0,
      proReview: [], //评价
      proReviewS: [], //评价截取2条
      totalStar: {},
      seenAll: false, //查看全部按钮是否展示  false不展示   true展示
      productArr: [],
      flagShare: this.$root.flagShare, //分享图标
      content: "",
      productType: [], //产品类型
      productPrice: "", //产品类型对应价格现价
      productOldPrice: "", //产品类型对应价格原价
      selected0: "", //选中的内容
      selected1: "", //选中的内容
      selected2: "", //选中的内容
      selectedType: "", //加入购物车传类型
      path: "",
      isCollected: false, //该商品是否已收藏
      ids: "", //收藏的id
      closedTexts: "该商品已经下架啦~",
      isClose: false, //是否失效
      cartNumQ: {}, //购物车的数量

      noAddCart: true, // 点击立即购买  则弹窗不显示加入购物车
      canshow: false, //用户评价数据已经 返回可以显示 tab
      bannerMD: false,
      evaluateMD: false,
      mtTabItemWrapMD: false,
      active1: false,
      active2: false,
      active3: false,
      isAppInside:window.localStorage.getItem('isAppInside') == '1'
    };
  },
  components: {
    Popup,
    TabContainer,
    TabContainerItem,
    Navbar,
    TabItem,
    countDown
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.requesData();
    });
  },
  created() {},
  mounted() {
    //适配不同dpr的手机的标题栏
    // var  dpr = document.documentElement.getAttribute('data-dpr');
    // if(dpr<2){
    // 	this.$refs.nav.style.marginLeft = "27%";
    // 	this.$refs.wrapS.style.borderBottom = "1px solid #ccc";
    // }
    this.getCartNum();
    this.busing = true;

    //监听路由变化
    this.$watch("$route.query.id", (newVal, oldVal) => {
      if (newVal) {
        this.requesData();
        this.type = 0;
      }
    });

    var that = this;
  },

  activated: function() {
    this.busing = true;
  },
  deactivated: function() {
    this.busing = false;
    //重置 tab切换 bug不止这两
    /*this.active = "tab-container1" ;
      this.selected = '1';*/
  },
  methods: {
    aaaa() { 
      
        this.$root.originData.share(this.$route.query.id, location.href);
        
    },

    bannerM() {
      this.$nextTick(() => {
        this.active1 = true;
        this.active2 = false;
        this.active3 = false;
        var x = document.body.scrollTop || document.documentElement.scrollTop;
        var topY =
          this.$refs.bannerM.offsetTop -
          document.getElementsByClassName("wrapS")[0].offsetHeight;
        if (timeId1) {
          clearInterval(timeId1);

          clearInterval(timeId2);
          clearInterval(timeId3);
        }
        if (
          x <
          this.$refs.bannerM.offsetTop -
            document.getElementsByClassName("wrapS")[0].offsetHeight
        ) {
          timeId1 = setInterval(() => {
            document.body.scrollTop += 10;
            document.documentElement.scrollTop += 10;
            x = document.body.scrollTop || document.documentElement.scrollTop;
            if (x >= topY) {
              clearInterval(timeId1);
            }
          }, 1);
        } else {
          timeId1 = setInterval(() => {
            document.body.scrollTop -= 10;
            document.documentElement.scrollTop -= 10;
            x = document.body.scrollTop || document.documentElement.scrollTop;
            if (x <= topY) {
              clearInterval(timeId1);
            }
          }, 1);
        }
      });
    },
    evaluateM() {
      this.active1 = false;
      this.active2 = true;
      this.active3 = false;
      this.$nextTick(() => {
        var x = document.body.scrollTop || document.documentElement.scrollTop;
        var topY =
          this.$refs.evaluateM.offsetTop -
          document.getElementsByClassName("wrapS")[0].offsetHeight;
        if (timeId2) {
          clearInterval(timeId1);

          clearInterval(timeId2);
          clearInterval(timeId3);
        }
        if (
          x <
          this.$refs.evaluateM.offsetTop -
            document.getElementsByClassName("wrapS")[0].offsetHeight
        ) {
          timeId2 = setInterval(() => {
            document.body.scrollTop += 10;
            document.documentElement.scrollTop += 10;
            x = document.body.scrollTop || document.documentElement.scrollTop;
            if (x >= topY) {
              clearInterval(timeId2);
            }
          }, 1);
        } else {
          timeId2 = setInterval(() => {
            document.body.scrollTop -= 10;
            document.documentElement.scrollTop -= 10;
            x = document.body.scrollTop || document.documentElement.scrollTop;
            if (x <= topY) {
              clearInterval(timeId2);
            }
          }, 1);
        }
      });
    },
    mtTabItemWrapM() {
      this.active1 = false;
      this.active2 = false;
      this.active3 = true;
      this.$nextTick(() => {
        var x = document.body.scrollTop || document.documentElement.scrollTop;
        var topY =
          this.$refs.mtTabItemWrapM.offsetTop -
          document.getElementsByClassName("wrapS")[0].offsetHeight;
        if (timeId3) {
          clearInterval(timeId1);

          clearInterval(timeId2);
          clearInterval(timeId3);
        }
        if (
          x <
          this.$refs.mtTabItemWrapM.offsetTop -
            document.getElementsByClassName("wrapS")[0].offsetHeight
        ) {
          timeId3 = setInterval(() => {
            document.body.scrollTop += 10;
            document.documentElement.scrollTop += 10;
            x = document.body.scrollTop || document.documentElement.scrollTop;
            if (x >= topY) {
              clearInterval(timeId3);
            }
          }, 1);
        }
      });
    },
    goReviewList() {
      if (this.proReview.length == 0) {
        return false;
      }

      this.$router.push({
        path: "/productDetails/reviewList",
        query: { id: this.$route.query.id }
      });
    },
    //监听滚动事件
    windowScroll() {
      var _dom = this.$refs.mtTabItemWrapM;

      var domOffsetY = _dom.offsetTop;
      var domHeight = _dom.offsetHeight;

      console.log(domOffsetY, "<<=domOffsetY");
      //获取DOM 节点位置
      console.log(
        "<<=domOffsetY",
        domOffsetY
        // document.getElementsByClassName("wrapS")[0].offsetHeight
      );

      var startDOM_X = null;
      var startDOM_Y = null;

      var moveDOM_X = null;
      var moveDOM_Y = null;
      var scrolltop1 = null;
      function scroll(event) {
        event = event ? event : window.event;

        //   console.log(e.target.scrollTop);
        scrolltop1 = event.target.scrollTop;

        //   console.log(scrolltop1, "<<<<window");
        event.preventDefault();

        event.stopPropagation();
      }

      function touchstart(event) {
        event = event ? event : window.event;
        //获取用户在dom上的点
        startDOM_X = event.changedTouches[0].clientX - event.target.offsetLeft;
        startDOM_Y = event.changedTouches[0].clientY - event.target.offsetTop;
        console.log("touchstart123");
        // console.log(event);
        // console.log(_dom);
        _dom.addEventListener("touchmove", touchmove, false);
        _dom.addEventListener("scroll", scroll, false);
        event.preventDefault();

        event.stopPropagation();
      }

      function touchmove(event) {
        event = event ? event : window.event;
        moveDOM_X = event.changedTouches[0].clientX - startDOM_X;
        moveDOM_Y = event.changedTouches[0].clientY - startDOM_Y;
        console.log("touchmove ", moveDOM_Y, scrolltop1);
        //判断用户上拉, 且拉倒顶部  改变DOM元素style
        if (
          (moveDOM_Y > 10 && scrolltop1 == null) ||
          (moveDOM_Y > 10 && scrolltop1 <= 0)
        ) {
          _dom.style.cssText = "position:static; top:0rem;z-index:auto";
        }
        event.preventDefault();

        event.stopPropagation();
      }
      // 缓慢滚动到顶部

      function ccc(event) {
        console.log("ccccccccc");

        var scrolltop =
          document.documentElement.scrollTop || document.body.scrollTop;
        console.log(scrolltop, domOffsetY, "<<<<");

        if (scrolltop >= domOffsetY - 5) {
          document.body.style = "z-index:-1;position:relative";
          _dom.style.cssText = "position:fixed; top:0rem;z-index:890";

          window.removeEventListener("scroll", ccc, false);

          _dom.addEventListener("touchstart", touchstart, false);
        } else {
          console.log("自使用了");
          // document.body.style.overflow = 'visibility'
          _dom.style.cssText = "position:static; top:0rem;z-index:auto";
        }

        event.preventDefault();

        event.stopPropagation();
      } // ccc函数  END

      window.addEventListener("scroll", ccc, false);
    },
    //购物车的数量
    getCartNum() {
      var _self = this;
      if (this.getToken()) {
        this.$store.dispatch("request_data_cart").then(() => {
          let tempObj = this.$store.state.cart.cartInfos.list;
          let sum = 0;
          if (tempObj == undefined || tempObj.length == 0) {
            _self.$set(_self.cartNumQ, "cartNum", 0);
          } else {
            tempObj.forEach(items => {
              sum += items.Num;
            });
            _self.$set(_self.cartNumQ, "cartNum", sum);
          }
        });
      }
    },
    requesData() {
      //请求首页产品详情
      var params = {
        id: this.$route.query.id
      };

      if (this.getToken()) {
        //商品是否已收藏判断
        getd.getCollection().then(res => {
          res.data.list.forEach(val => {
            if (val.ProductId == this.$route.query.id) {
              this.isCollected = true;
              this.ids = val.Id;
            }
          });
        });
      }
      if (this.$route.query.type == 0) {
        getd.getDetailData("/Product/GetProductInfoById", params).then(res => {
          this.product = res.data;

          console.log("jhahahaha", this.product);

          this.content = this.product.Intro;
          this.bannerMD = true;
          this.active1 = true;
          //类型一id
          this.nowRegTypeId0 = res.data.Temp1;
          //类型二id
          this.nowRegTypeId1 = res.data.Temp2;
          //类型三id
          this.nowRegTypeId2 = res.data.Temp3;

          //请求类型
          getd.getProductTypeByProductId(params).then(result => {
            this.productType = result.data.list;

            console.log("---");
            //判断当前类型默认选中(第一层循环出有几种服务类型)
            for (let i = 0; i < this.productType.length; i++) {
              let len = this.productType[i].ProAttributeListPcModels;
              //第二层循环出每种服务类型里有几种分类
              for (let j = 0; j < len.length; j++) {
                //只有一种服务类型
                if (this.productType.length == 1) {
                  //判断当前服务类型里与Temp1相等的分类
                  if (len[j].Id == res.data.Temp1) {
                    //记录选择类型
                    this.selected0 = len[j].Name;
                    //记录选择类型下标
                    this.regTypeNum0 = j;
                  }
                } else if (this.productType.length == 2) {
                  //有两种服务类型
                  if (len[j].Id == res.data.Temp1) {
                    this.selected0 = len[j].Name;
                    this.regTypeNum0 = j;
                  } else if (len[j].Id == res.data.Temp2) {
                    this.selected1 = len[j].Name;
                    this.regTypeNum1 = j;
                  }
                } else if (this.productType.length == 3) {
                  //有三种服务类型
                  if (len[j].Id == res.data.Temp1) {
                    this.selected0 = len[j].Name;
                    this.regTypeNum0 = j;
                  } else if (len[j].Id == res.data.Temp2) {
                    this.selected1 = len[j].Name;
                    this.regTypeNum1 = j;
                  } else if (len[j].Id == res.data.Temp3) {
                    this.selected2 = len[j].Name;
                    this.regTypeNum2 = j;
                  }
                }
              }
            }
          });

          //请求类型价格
          var params4 = {
            id: this.$route.query.id,
            id1: this.nowRegTypeId0,
            id2: this.nowRegTypeId1,
            id3: this.nowRegTypeId2
          };
          getd.getProductPriceByProductId(params4).then(response => {
            this.productPrice = response.data.price;
            this.productOldPrice = response.data.oldPrice;
          });

          //失效处理
          if (this.product.ProductStatus === 1) {
            this.isClose = true;
          }
          this.$nextTick(() => {
            document.getElementById(
              "content"
            ).innerHTML = this.product.ProductDetails;
          });
          //微信
          // //console.log()
          // product.Title : product.Intro

          // alert(this.product.ThumbImgURL)	;

          // alert("单品")
          //// title,desc,imgUrl,customURL,WXJSSDK=WXJSSDKOBJ
          Vue.prototype.QQshare(
            this.product.Name,
            this.product.Intro,
            this.product.ThumbImgURL,
            window.location.href
          );
          //console.log(this.product,"测试缩略图");
          Vue.prototype.WXshare(
            this.product.Name,
            this.product.Intro,
            this.product.ThumbImgURL,
            window.location.href
          );
          //this.WXshare("我是推2222容~","我是推广页222==========介","https://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg");

          Indicator.close();
        });
      } else if (this.$route.query.type == 1) {
        getd
          .getDetailData("/ProPackage/GetProckageInfoById", params)
          .then(res => {
            console.log("---");

            //console.log('是谁不是',res)
            this.product = res.data;
            this.content = this.product.Title;
            this.length = res.data.ProPackageDetailModels.length;
            this.bannerMD = true;
            this.active1 = true;

            //失效处理
            if (this.product.Status === 1) {
              this.isClose = true;
            }
            //微信
            //console.log( ">>>>",	this.product  );

            // alert(this.product.Name)
            // alert(this.product.Title)
            // alert(this.product.ThumbImgURL)

            //console.log(  this.product )
            Vue.prototype.QQshare(
              this.product.Name,
              this.product.Title,
              this.product.ThumbImgURL,
              window.location.href
            );
            Vue.prototype.WXshare(
              this.product.Name,
              this.product.Title,
              this.product.ThumbImgURL,
              window.location.href
            );
            Indicator.close();
            this.$nextTick(() => {
              document.getElementById(
                "content"
              ).innerHTML = this.product.Details;
            });
          });
      }
      //请求评价信息
      var params1 = {
        productId: this.$route.query.id,
        orderId: "",
        datatype: "json",
        pageIndex:1,
        pageSize:1
      };
      getd
        .getProReview(params1)
        .then(res => {
          this.proReview = res.data.list;
          this.proReviewS = res.data.list.slice(0, 6);
          if (this.proReviewS.length >= 6) {
            this.seenAll = true; //展示全部评价
          } else {
            this.seenAll = false; //不展示全部评价
          }
          //等待评价列表出来 在计算  DOM的offsetTop
          this.canshow = true;
          this.mtTabItemWrapMD = true;
          this.evaluateMD = true;
          this.$nextTick(() => {
            console.log(1);
            this._windowScroll();
          });
        })
        .catch(() => {
          this.canshow = true;
          this.mtTabItemWrapMD = true;
          this.evaluateMD = true;

          this.$nextTick(() => {
            this._windowScroll();
          });
        });
      //请求评论总星级
      var params2 = {
        productId: this.$route.query.id
      };
      getd.getStar(params2).then(res => {
        this.totalStar = res.data;
      });
    },
    _windowScroll() {
      scrollFn = () => {
        //滚动到不同位置变色
        // this.active1=false;this.active2=false;this.active3=false
        var x = document.body.scrollTop || document.documentElement.scrollTop;
        var wrapSHeight = document.getElementsByClassName("wrapS")[0]
          .offsetHeight;
        var bannerMtopY = this.$refs.bannerM.offsetTop;
        var evaluateMtopY = this.$refs.evaluateM.offsetTop;
        var mtTabItemWrapMtopY = this.$refs.mtTabItemWrapM.offsetTop;
        if (x >= mtTabItemWrapMtopY - wrapSHeight) {
          this.active1 = false;
          this.active2 = false;
          this.active3 = true;
        } else if (x >= evaluateMtopY - wrapSHeight) {
          this.active1 = false;
          this.active2 = true;
          this.active3 = false;
        } else {
          this.active1 = true;
          this.active2 = false;
          this.active3 = false;
        }
      };

      window.addEventListener("scroll", scrollFn, false);
    },

    headerBack() {
      //判断是否是在app内部
      if (window.localStorage.getItem("isAppInside") == "1") {
        this.$root.originData.closePage();
      } else {
        var s = this.$route.query.style;
        return this.$router.go(-1);
      }
    },
    servers() {
      var one = document.querySelector(".servers");
      var two = document.querySelector(".comment");
      var three = document.querySelector(".details");
      one.style.cssText =
        "border-bottom:0.05405405405405406rem  solid #ff6b5f;color:#ff6b5f";
      two.style.cssText = "border-bottom:none;color:#656b79";
      three.style.cssText = "border-bottom:none;color:#656b79";
    },
    comment() {
      var one = document.querySelector(".servers");
      var two = document.querySelector(".comment");
      var three = document.querySelector(".details");
      two.style.cssText =
        "border-bottom:0.05405405405405406rem  solid #ff6b5f;color:#ff6b5f";
      one.style.cssText = "border-bottom:none;color:#656b79";
      three.style.cssText = "border-bottom:none;color:#656b79";
    },
    details() {
      var one = document.querySelector(".servers");
      var two = document.querySelector(".comment");
      var three = document.querySelector(".details");
      three.style.cssText =
        "border-bottom:0.05405405405405406rem  solid #ff6b5f;color:#ff6b5f";
      one.style.cssText = "border-bottom:none;color:#656b79";
      two.style.cssText = "border-bottom:none;color:#656b79";
    },
    moreDiscount() {
      //失效处理
      if (this.isClose) {
        this.closedTexts = "暂不销售";
        return;
      } else {
        this.showOrHidden = true;
      }
    },
    //分享
    toShare() {
      //移动端分享
      wrhShare().sendShare(
        "活动", //bussType_param, bussId_param, title_param, content_param, img_param, href_param
        "000000",
        this.product.Name,
        this.content,
        this.product.ThumbImgURL,
        "https://host.wqbol.com/home/productDetails?id=" +
          this.$route.query.id +
          "&type=" +
          this.$route.query.type +
          "&style=" +
          this.$route.query.style
      );
    },

    closeBtn() {
      this.showOrHidden = false;
    },
    shoppingJ() {
      console.log("this", this.noAddCart);
      //失效产品
      if (this.isClose) {
        return;
      }
      this.noAddCart = true;
      if (this.product.Code == "WQBCZ" || this.product.Code == "YDZCZ") {
        Toast({
          message: "请点击立即购买",
          position: "middle",
          duration: 1000
        });
        return;
      }
      //console.log(this.product,"1111111111111")
      var iframeObj = document.getElementById("LRdiv0");
      var ab = document.getElementById("LRdiv1");
      var sa = document.getElementById("LRdiv2");
      var img = document.getElementById("LRdiv3");

      if (this.$route.query.type == 1) {
        this.registered = false;
        if ((this.registered = false)) {
          if (iframeObj && ab && sa && img) {
            iframeObj.style.display = "block";
            ab.style.display = "block";
            sa.style.display = "block";
            img.style.display = "block";
          }
        }
        this.addshoppingP();
      } else {
        this.registered = true;
        if ((this.registered = true)) {
          if (iframeObj && ab && sa && img) {
            iframeObj.style.display = "none";
            ab.style.display = "none";
            sa.style.display = "none";
            img.style.display = "none";
          }
        }
      }
    },
    shoppingL() {
      //失效产品
      if (this.isClose) {
        return;
      }
      // 点击立即购买  则弹窗不显示加入购物车
      this.noAddCart = false;
      //				console.log("this.noAddCart",this.noAddCart)
      var iframeObj = document.getElementById("LRdiv0");
      var ab = document.getElementById("LRdiv1");
      var sa = document.getElementById("LRdiv2");
      var img = document.getElementById("LRdiv3");
      if (this.$route.query.type == 1) {
        this.registered = false;
        if ((this.registered = false)) {
          if (iframeObj && ab && sa && img) {
            iframeObj.style.display = "block";
            ab.style.display = "block";
            sa.style.display = "block";
            img.style.display = "block";
          }
        }
        this.goPaying();
      } else {
        this.registered = true;
        if ((this.registered = true)) {
          if (iframeObj && ab && sa && img) {
            iframeObj.style.display = "none";
            ab.style.display = "none";
            sa.style.display = "none";
            img.style.display = "none";
          }
        }
      }
    },
    shopping() {
      //失效处理
      if (this.isClose) {
        this.closedTexts = "暂不销售";
        return;
      } else {
        this.registered = true;
        var iframeObj = document.getElementById("LRdiv0");
        var ab = document.getElementById("LRdiv1");
        var sa = document.getElementById("LRdiv2");
        var img = document.getElementById("LRdiv3");
        if (iframeObj && ab && sa && img) {
          iframeObj.style.display = "none";
          ab.style.display = "none";
          sa.style.display = "none";
          img.style.display = "none";
        }
      }
    },
    close() {
      this.registered = false;
      var iframeObj = document.getElementById("LRdiv0");
      var ab = document.getElementById("LRdiv1");
      var img = document.getElementById("LRdiv3");
      if (iframeObj && ab && img) {
        iframeObj.style.display = "block";
        ab.style.display = "block";
        img.style.display = "block";
      }
    },
    //注册类型选择
    reg0(item, indexs) {
      //选中第一种
      this.selected0 = item.Name;
      this.regTypeNum0 = indexs;
      //请求数据
      //请求类型价格
      //id 重新赋值
      this.nowRegTypeId0 = item.Id;
      this.getSelectFn();
    },
    reg1(item, indexs) {
      //选中第二种
      this.selected1 = item.Name;
      this.regTypeNum1 = indexs;
      this.nowRegTypeId1 = item.Id;
      this.getSelectFn();
    },
    reg2(item, indexs) {
      //选中第三种
      this.selected2 = item.Name;
      this.regTypeNum2 = indexs;
      this.nowRegTypeId2 = item.Id;
      this.getSelectFn();
    },
    getSelectFn() {
      //修改商品类型 规格 周期等产品参数
      var params4 = {
        id: this.$route.query.id,
        id1: this.nowRegTypeId0,
        id2: this.nowRegTypeId1,
        id3: this.nowRegTypeId2
      };
      getd.getProductPriceByProductId(params4).then(response => {
        this.productPrice = response.data.price;
        this.productOldPrice = response.data.oldPrice;
      });
    },
    //			//刻章类型选择
    //			chapter(index){
    //				this.chapterTypeNum = index;
    //			},
    //			//是否加急
    //			urgent(index){
    //				this.isUrgentNum = index;
    //			},
    customerServicePackage() {
      this.showOrHidden = false;
      this.$router.push({
        path: "/discountPackage",
        query: {
          id: this.product.Id,
          type: this.$route.query.type,
          style: this.$route.query.style
        }
      });
      // this.$router.replace({path:'/home/productDetails/customerServicePackage',query:{id:this.product.Id,type:this.$route.query.type,style:this.$route.query.style}});
    },

    //收藏
    collected() {
      if (this.getToken()) {
        //已收藏
        if (this.isCollected) {
          var params = {
            ids: this.ids
          };
          getd.removeCollection(params).then(res => {
            this.isCollected = false;
            Toast({
              message: "取消收藏",
              position: "middle",
              duration: 2000
            });
          });
        } else {
          //未收藏
          var params = {
            productId: this.$route.query.id,
            num: 1,
            price: 0
          };
          getd
            .createdCollection(params)
            .then(res => {
              this.isCollected = true;
              Toast({
                message: "收藏成功",
                position: "middle",
                duration: 2000
              });
              getd.getCollection().then(res => {
                res.data.list.forEach(val => {
                  if (val.ProductId == this.$route.query.id) {
                    this.ids = val.Id;
                  }
                });
              });
            })
            .catch(error => {
              Toast({
                message: "收藏失败",
                position: "middle",
                duration: 2000
              });
            });
        }
      } else {

          //判断是否app 
        if(!this.$root.originData.newPage){
          this.$root.originData.loginOut()
        }else{
          this.$router.push("/mine/login");
        }
        
      }
    },

    //加入购物车
    addshoppingP() {
      //console.log(this.product.Code,'this.product.Codethis.product.Codethis.product.Code' )
      if (this.product.Code == "WQBCZ" || this.product.Code == "YDZCZ") {
        this.registered = false;
        Toast({
          message: "请点击立即购买",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if (this.getToken()) {
        if (this.$route.query.type == 0) {
          this.price = this.productPrice;
          this.oldPrice = this.productOldPrice;
        } else if (this.$route.query.type == 1) {
          this.price = this.product.Price;
          this.oldPrice = this.product.OriginalPrice;
        }
        //要传的类型
        if (this.selected1) {
          if (this.selected2) {
            this.selectedType =
              this.selected0 + "," + this.selected1 + "," + this.selected2;
          } else {
            this.selectedType = this.selected0 + "," + this.selected1;
          }
        } else {
          this.selectedType = this.selected0;
        }
        var params = {
          productId: this.product.Id,
          price: this.price,
          oldPrice: this.oldPrice,
          productType: this.selectedType,
          num: 1
        };
        getd
          .createdShoppingCart(params)
          .then(res => {
            this.registered = false;
            Toast({
              message: "加入购物车成功",
              position: "middle",
              duration: 1000
            });
            Indicator.close();
            this.getCartNum();
          })
          .catch(error => {
            this.registered = false;
            Toast({
              message: error.data.msg,
              position: "middle",
              duration: 1000
            });
            Indicator.close();
          })
          .catch(err => {
            //console.log('sss',err.data.msg)
            if (err.data.msg == "已经购买过类似服务") {
              this.registered = false;
              Indicator.close();
              Toast({
                message: "已经购买过类似服务",
                position: "middle",
                duration: 2000
              });
            }
          });
        Indicator.close();
      } else { 
        //判断是否app 
        if(!this.$root.originData.newPage){
          this.$root.originData.loginOut()
        }else{
          this.$router.push("/mine/login");
        }
        
      }
    },

    //跳转购物车页面
    goShopping() {
      this.$router.push("/cart");
    },
    //去下单
    goPaying(items) {
      if (this.getToken()) {
        //判断是否微   现金充值特殊产品,若是则提示 立即购买
        //console.log(items,'现金充值特殊产品现金充值特殊产品')
        //0：产品，1：套餐
        if (this.$route.query.type == 0) {
          this.product.Price = this.productPrice;
          this.product.OldPrice = this.productOldPrice;
          this.product.ProductDetails = [];
        } else if (this.$route.query.type == 1) {
          this.product.Price = this.product.Price;
          this.product.OldPrice = this.product.OriginalPrice;
          this.product.ProductDetails = this.product.ProPackageDetailModels;
        }
        this.product.Num = 1;
        this.recordCount = 1;

        this.registered = false;
        var iframeObj = document.getElementById("LRdiv0");
        var ab = document.getElementById("LRdiv1");
        var img = document.getElementById("LRdiv3");
        //============================几处地方需要 同步修改
        if (iframeObj && ab && img) {
          iframeObj.style.display = "block";
          ab.style.display = "block";
          img.style.display = "block";
        } //清除本地数据
        this.commonTool.removeLocal("_CART");
        this.commonTool.removeLocal("_SETBILL");
        //要传的类型
        if (this.selected1) {
          if (this.selected2) {
            this.selectedType =
              this.selected0 + "," + this.selected1 + "," + this.selected2;
          } else {
            this.selectedType = this.selected0 + "," + this.selected1;
          }
        } else {
          this.selectedType = this.selected0;
        }
        var params = {
          id: this.$route.query.id,
          productType: this.selectedType,
          amount: this.product.Price,
          oldAmount: this.product.OldPrice
        };
        getd
          .getOrderListByProductId(params)
          .then(res => {
            this.productArr = res.data[0];
            this.productArr.Code = this.product.Code;
            this.productArr.Id = this.$route.query.id;
            if (this.$route.query.type == 0) {
              this.productArr.Price = this.productPrice;
            }
            //再存入本地
            var pushLocalObj = {
              list: [this.productArr],
              recordCount: this.recordCount
            };
            this.registered = false;
            this.commonTool.saveToLocal(
              "_CART",
              this.getToken(),
              "data",
              pushLocalObj
            );
            this.$router.push({ path: "/cart/comfirmOrder" });
          })
          .catch(error => {
            this.registered = false;
            Toast({
              message: error.data.msg,
              position: "middle",
              duration: 1000
            });
            Indicator.close();
          });
      } else {
        if(!this.$root.originData.newPage){
          this.$root.originData.loginOut()
        }else{
            this.$router.push("/mine/login");
        }
      
      }
    },
    customerService() {
      //window.open('https://html.ecqun.com/kf/sdk/openwin.html?corpid=7331675&cstype=rand&mode=0&cskey=SqGFFE7Glw76x6szdw&scheme=0')
      this.$router.push("/userChatSever");
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
    }
  },
  watch: {
    active: function(val) {
      if (val == "tab-container1") {
        //导航样式同步切换
        this.servers();
      } else if (val == "tab-container2") {
        this.comment();
      } else {
        this.details();
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", scrollFn, false);
  }
};
</script>