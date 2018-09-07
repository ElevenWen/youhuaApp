<template>
  <div id="homeWrap"  :key="name" >
    <div class="wrap">
      <div class="theRegistered" id="theRegistered" v-if="isPrompt">
        <div class="close" @click.stop="clise"></div>
        <div class="discounts" id="discounts">
          <span>2888</span>
          <span>优惠券</span>
        </div>
        <div class="hint">亲可以在“我的-优惠券” 中找到优惠券哦！</div>
        <div class="getButton" @touchend="getButton">立即查看</div>
      </div>
      
      <!-- 更新提示 -->
		  <!--版本号弹窗提示-->
		  <update></update>
      <div class="oppenApp" v-if="isShowOppenApp && isOnApp === false">
        <img src="../../assets/images/home/invitePoliteness/oppenApp_banner@2x.png" alt="" class="bgImg">
        <img src="../../assets/images/home/invitePoliteness/close_oppenApp@2x.png" alt="" class="closeIcon" @click="closeOppenAppBanner">
        <a href="https://host.wqbol.com/home/downloadAPP">立即打开</a>
      </div>
    <!--首页-->
      <div id="home">
        <mt-swipe :auto="4000" :prevent='false'>
          <mt-swipe-item v-for="(items,index) in datas" :key='index'>
            <img width="100%" @click="active(items.LinkWebSite,items)" height="100%" :src="items.PosterImgURL" />
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="search_box" id="search_box" ref="search_box">
        <span @click.stop="richscan" class="richscan">
					<img src="../../assets/Images/tabBar/scan@3x.png" class="erweima" v-show="!isTopShow">
					<img src="../../assets/Images/tabBar/scanS@3x.png" alt="" class="erweima" v-show="isTopShow">
				</span>
        <!--扫一扫-->
        <input type="text" @click="sous" value="" placeholder="公司注册" class="search_in" readonly/>
        <label class="search"><img src="../../assets/images/tabBar/search@3x.png" /></label>
         <!-- <span @touchend="richscan" class="richscan richscanRight">
					<img src="../../assets/Images/tabBar/messageNew@3x.png" class="erweima" v-show="!isTopShow">
					<img src="../../assets/Images/tabBar/messageNewS@3x.png" alt="" class="erweima" v-show="isTopShow">
				</span> -->
        <!-- 消息图标 -->
        <messageIcon class="iconMesge" :source='sourceHome'></messageIcon>
      </div>
      <div class="classify">
        <mt-swipe :auto="0" :prevent='false'>
					 <mt-swipe-item v-for="(data,index) in classify1" :key="index">
            <ul>
            	<li v-for="(data1,index) in data" :key="index" @click="serveClassify(data1)">
                <img v-if="data1.Img" :src="data1.Img" />
                <img v-else src="../../assets/images/home/home.png" alt="导航图片">
                <span>{{data1.Name }}</span>
            	</li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>	
      </div>
			<!-- <router-link to="/home/shopStore" style="display: block;padding: 20px;">点击跳转到店铺</router-link> -->

      <div class="broadcast">
        <span class="iconImg" @click="toRouter('/enterpriseNewsCenter');isShowNewPiont = false"><img src="../../assets/Images/tabBar/qyew-Icon3@3x.png"></span>
       <!--2.0 优化版本-->
        <div class="scrollWrap swiper-container" id="newsBanner">
          <!--<ul ref="scrollUl">-->
            <!--<li v-for=" listTtem in prizeList" align=left class="roll"><span >{{listTtem.name}}</span>办理了<span>{{listTtem.des}}</span></li>-->
            <!--<li ref='scrollLi' v-for=" (listTtem,index) in prizeListNews" align=left class="roll" @click="toNewListRouter(index)">{{listTtem.Title}}</li>-->
            <!--<li  align=left class="roll" @click="toNewListRouter(0)">{{prizeListNews[0].Title}}</li>-->
          <!--</ul>-->
          <div class="swiper-wrapper">
		        <div class="swiper-slide" v-for=" (listTtem,index) in prizeListNews" @click="toNewListRouter(index)">{{listTtem.Title}}</div>
			    </div>
        </div>
        <span :class="isShowNewPiont? 'piontRemind': 'closePiontRemind'" ></span>
        <!--<span  class= 'des' style="display: none;"><a href="#">详情</a></span>-->
        <img class="goNews" src='../../assets/images/tabBar/right_arrow@3x.png' alt="" @click="toRouter('/enterpriseNewsCenter');isShowNewPiont = false">
      </div>
      <!--限时抢购 及之前广告栏-->
      <div class="flashSale" v-if="recommendData.code != 404">
        <!-- <div class="flashSale_left" @click="toRouter('/home/popularity?id=限时抢购')" v-if='purchase.length > 0'>
          <h3>限时抢购</h3>
          <p class="des">距限时专享结束仅剩</p>
          <div class="timerWrap">
          	<countDown :timeData="Date.parse(purchaseS.EndTime)"></countDown>
          </div>
          <div class="imgWrap"><img :src="purchase[0].Img" alt=""></div>
					<div class="name">{{purchase[0].Name}}</div>
          <p class="priceNow">￥{{purchase[0].Price}}</p>
        </div> -->
				<div class="flashSale_left" @click='toRouter({path:"/home/productDetails",query:{id:recommendData.oneId,type:recommendData.oneType}})'>
          <h3>热门服务</h3>
					<h4>一站式企业服务平台</h4>
          <p class="des">快速注册 无忧记账</p>          
          <div class="imgWrap"><img :src="recommendData.oneImg" alt=""></div>
					<div class="name">{{recommendData.oneName}}</div>
          <p class="priceNow">￥{{recommendData.onePrice}}</p>
        </div>
        <div class="flashSale_right">
          <div class="rigrt_one" @click='toRouter({path:"/home/productDetails",query:{id:recommendData.twoId,type:recommendData.twoType}})'>
            <h3>{{recommendData.twoName}}</h3>
            <div class="des">{{recommendData.twoTitle}}</div>
            <p class="pirce">￥{{recommendData.twoPrice}}</p>
            <div class="imgWrap"><img :src="recommendData.twoImg" alt=""></div>
          </div>
          <div class="rigrt_tow" @click='toRouter({path:"/home/productDetails",query:{id:recommendData.thirdId,type:recommendData.thirdType}})'>
            <h3>{{recommendData.thirdName}}</h3>
            <div class="des">{{recommendData.thirdTitle}}</div>
            <p class="pirce">￥{{recommendData.thirdPrice}}</p>
            <div class="imgWrap"><img :src="recommendData.thirdImg" alt=""></div>
          </div>
          <div class="rigrt_there" @click='toRouter({path:"/home/productDetails",query:{id:recommendData.forthId,type:recommendData.forthType}})'>
            <h3>{{recommendData.forthName}}</h3>
            <div class="des">{{recommendData.forthTitle}}</div>
            <p class="pirce">￥{{recommendData.forthPrice}}</p>
            <div class="imgWrap"><img :src="recommendData.forthImg" alt=""></div>
          </div>
        </div>
      </div>
			<!--广告栏  2.0需求去掉 已集合到限时抢购-->
      <!-- <div class="advertising">
          <div class="advertising_one" @click="goProduct(recommendData.oneId,recommendData.oneType)">
              <h3>{{recommendData.oneName}}</h3>
              <span>{{recommendData.oneTitle}}</span>
          </div>
          <div class="advertising_two" @click="goProduct(recommendData.twoId,recommendData.twoType)">
              <h3>{{recommendData.twoName}}</h3>
              <span>{{recommendData.twoTitle}}</span>
          </div>
          <div class="advertising_three" @click="goProduct(recommendData.thirdId,recommendData.thirdType)">
              <h3>{{recommendData.thirdName}}</h3>
              <span>{{recommendData.thirdTitle}}</span>
          </div>
          <div class="advertising_four" @click="goProduct(recommendData.forthId,recommendData.forthType)">
              <h3>{{recommendData.forthName}}</h3>
              <span>{{recommendData.forthTitle}}</span>
          </div>
      </div> -->
      <!--套餐 横列表-->
      <div class="drag_advertising" ref="h_tcWrap">
        <div class="mk">
          <div class="mj" v-for="(data ,index) in mealData" @click="goProduct(data.Id,1)">
            <div class="img">
              <div :class="'img'+index">
                <h3>{{data.Name}}</h3>
              </div>
              <span>{{data.Title  }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="promotion">
        <div class="promotion_top">
          <span class="promotion_top_left" >促销专场</span>
          <router-link :to="{path:'/home/promotions?id=促销专场'}" tag="li" exact class="promotion_top_right">全部&nbsp;</router-link>
        </div>
        <div class="promotion_body">
          <div class="promotion_list" v-for="data in activityData" @click="goProduct(data.Id,data.Type)">
            <div class="promotion_img">
              <img :src="data.ThumbImgURL">
            </div>
            <div class="promotion_particulars">
              <div>
                <span class="promotion_name">{{data.Name}}</span>
                <span class="promotion_activity">
  							<label v-if="data.Discount&&((data.Discount/10)!=10)">折扣</label>
  							<label v-if="data.IsSeckill">秒杀</label>
  						</span>
              </div>
              <div>{{data.Title}}</div>
              <div class="promotion_money">
                <span class="discount">¥ {{data.Price}}<label></label></span>
                <del class="abolish">¥{{data.OldPrice}}</del>
                <span class="sales_volume">销量：{{data.SalesVolume}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!--中部广告轮播-->
      <div class="guanggao">
        <div class="swiper-container" id="midBanner">
				  <div class="swiper-wrapper">
				    <div class="swiper-slide" v-for="(data,i) in midBanner">
				    	<img width="100%" height="100%" :src="data.PosterImgURL" />
				    </div>
				  </div>
				  <div class="swiper-pagination"></div>
				</div>
      </div>
      
      <div class="popularity">
        <div class="promotion_top">
          <span class="promotion_top_left hotIcon">人气推荐</span>
          <router-link :to="{path:'/home/popularity?id=人气专场'}" tag="li" exact class="promotion_top_right">全部&nbsp;</router-link>
        </div>
        
        <div class="promotion_body"   
          v-infinite-scroll="loadMore"   infinite-scroll-disabled="busing"  infinite-scroll-distance="60"   infinite-scroll-immediate-check="true" >
          <div class="popularity_list" v-for="(item, index) in populariData" :key="index" track-by="item" @click="goProduct(item.Id,item.Type)">
            <div class="popularity_img">
              <img :src="item.ThumbImgURL"/>
            </div>
            
            <div class="popularity_particulars">
              <div class="popularity_money">
                <span class="discount">¥ {{item.Price}}<label></label></span>
                <span class="popularity_activity">
                  <label v-if="item.Discount&&((item.Discount/10)!=10)">折扣</label>
                  <label v-if="item.IsSeckill">秒杀</label>
                </span>
              </div>
              <div>
                <span class="popularity_name">{{item.Name}}</span>
              </div>
              <div>{{item.Title}}</div>
            </div>
            
          </div>
        </div>
      </div>
        <goTop @onShowTopStyle="onShowTopStyle"></goTop>
        <div class="mint-loadmore-bottom" v-show="isExist">
        <span>
          <span class ="mint-cell-value" style="justify-content: center">
               <mt-spinner type="snake" ></mt-spinner>加载中..
          </span>
        </span>
        </div>
    </div>
    <footer-nav></footer-nav>

    <div class="hongBaoPopupWrap" v-if="isNewCurse">
        <img src="../../assets/images/home/invitePoliteness/hongbaoPop@2x.png" alt="">
        <div class="content">
          <p class="gxText">恭喜你获得大礼包</p>
          <img src="../../assets/images/home/invitePoliteness/2688@2x.png" alt="" class="numImg">
          <div class="btn" @click="$router.push('/serve'); isNewCurse = false">立即使用</div>
          <p class="bottomDes">可在“我的--资产中心”查看</p>
        </div>
        <img src="../../assets/images/home/invitePoliteness/close_2@2x.png" alt="" class="closeImg" @click="isNewCurse = false">
    </div>  
		
		<!--扫一扫弹窗-->
		<scanMessageBox :isShowMessageBox="isShowMessageBox" @closePop="toClose"></scanMessageBox>
  </div>
</template>

<script>
import Vue from "vue";
import * as types from "../../vuex/mutations_types.js";
import store from "../../vuex/home/home.js";
import stored from "../../vuex/mine/mine.js";
import { Indicator, InfiniteScroll, Toast, MessageBox } from "mint-ui";
import tool from "../../util/tool";
import update from "../mine/update";
import messageIcon from "../message/messageIcon";
import footerNav from "../../footer-nav";
import goTop from "../components/goTop.vue";
import countDown from "../components/countDown.vue";
import BScroll from "better-scroll";
import CryptoJS from "crypto-js";
import { setSession, removeSession } from "../../util/base";
import scanMessageBox from "../components/scanMessageBox.vue"
// import origin from "../../util/origin";




// import remote from '../components/ab.vue'
// import  tool from "../../util/tool";
Vue.use(InfiniteScroll);
import getd from "../../vuex/getData.js";
var timer = null;
var timer1 = null;
var timer2 = null;
var mySwiper = null;//顶部轮播图
var midSwiper = null;//中部轮播图
export default {
  name: "home",
  data() {
    return {
      name:"home",
      
      aaaaa:'https://www.runoob.com/tags/tag-iframe.html',
      bbb:'https://api.wqbol.com/Payment/ProductsJson?out_trade_no=1527652401169833',
      sourceHome: "home",
      isNewCurse: false,       //显示红包弹窗  
      isShowOppenApp: true,  //显示打开app
      isOnApp: false,         //是否后在app
      isTopShow: false,       //头部下拉样式切换
      list: [1, 2, 3, 4],
      busing: false,
      mealData: [],
      recommendData: { code: 200 },
      activityData: [],
      populariData: [],
      populariDataTemp: [],
      classify: [], //获取后台动态配置的 导航栏(查股东,查公司,查专利,.....)
      classify1: [],
      isExist: true,
      isPrompt: false,
      count: 0,
      datas: [],//顶部轮播图
      midBanner:[],//中部广告轮播
      isProgress: false, //版本号提示框显示
      nowNewDataOneId:'',   //存储当前新闻第一条 id
      isShowNewPiont: true, //是否显示 最新新闻提示红点
      proValue: dwProgress, //下载进度
      purchase: [], //限时抢购
      purchaseS: [],
      prizeList: [
        { name: "136****9405 ", des: " 股份公司注册" },
        { name: "137****1111 ", des: " 深圳公司注册" },
        { name: "138****5989 ", des: " 新四板挂牌" },
        { name: "139****0904 ", des: " 企业社保开户" },
        { name: "130****2458 ", des: " 前海公司注册" },
        { name: "136****5978 ", des: " 个体工商户注册" },
        { name: "137****6451 ", des: " 高新认定" },
        { name: "138****6751 ", des: " 审计报告" },
        { name: "139****3302 ", des: " 自动记账报税" },
        { name: "130****2405 ", des: " 税审报告" },
        { name: "136****5152 ", des: " 验资报告" },
        { name: "137****8888 ", des: " 香港公司变更" },
        { name: "138****1235 ", des: " 环保批文" },
        { name: "139****2267 ", des: " 发票章" },
        { name: "130****0260 ", des: " 登报服务" },
        { name: "136****1114 ", des: " 自动记账报税" },
        { name: "137****2561 ", des: " 高新认定" },
        { name: "138****5551 ", des: " 个体工商户注册" },
        { name: "139****8876 ", des: " 新四板挂牌" },
        { name: "130****1015 ", des: " 自动记账报税" },
        { name: "131****0411 ", des: " 深圳公司注册" }
      ],
      prizeListNews:[],
      pageIndex: 0, //产品列表 默认分类页码
      pageSize: 6, //每页数量 常量
      newListDatLength: "", //获取最新数据length 用于判断是否加载完成全部数据
      position: { scrollTop: 0, scrollLeft: 0 },
      arr4: [],
      isShowEl:true,//是否显示中部轮播图分页器
      isShowMessageBox:false,//显示扫一扫弹窗
    };
  },
  activated: function() {
    //请求排名前4 新闻列表
    let NewParme = {
      pageIndex: 1,
      pageSize: 4
    };
    
    getd.get_nowNewListDate(NewParme)
	  .then((res)=>{
	    this.prizeListNews = res.data.list;
	    //新闻小红点处理
	    if(this.prizeListNews[0].Id !== this.nowNewDataOneId){
	        this.isShowNewPiont = true
	        this.nowNewDataOneId = this.prizeListNews[0].Id
	        window.localStorage.setItem('home_Page_NewsFristId',this.nowNewDataOneId)
	    }else {
	      this.isShowNewPiont = false
	    }
	    //公告滚动动画
	
	    //交换dom 位置
			this.$nextTick(()=>{
		    mySwiper = new Swiper ('#newsBanner', {
				    direction: 'vertical',
				    loop: true,
		      allowTouchMove: false,
		      autoplay:true
				  })
		  });
	
	
	
	  })
		
		//请求中部广告轮播图
		var param = {
      params: {
        type: 1,
        code: "ZBGGW1"
      }
    };
    getd.getHomeBanner(param)
	  .then(res => {
	    this.midBanner = res.data.list;
	    //若轮播图数量<=1，则不显示分页器
	    if(this.midBanner.length <=1 ){
	    	this.isShowEl = false;
	    }
	    let that = this;
	    //必须在dom渲染好后调用swiper
	    this.$nextTick(()=>{
		    midSwiper = new Swiper ('#midBanner', {
		    	watchOverflow: true,//因为仅有1个slide，swiper无效
			    effect : 'fade',//淡入淡出
			    fade: {
					  crossFade: false,
					},
			    loop: that.isShowEl,//循环播放
		      autoplay:{
				    delay: 3000,
				    stopOnLastSlide: false,
				    disableOnInteraction: false,
			    },//自动轮播
			    pagination: {
				    el: '.swiper-pagination',
				  },//分页
				  on:{
				  	//解决loop下点击事件无效问题
				    tap: function(event){
				      //跳转活动路由
				      function getQueryString(address, name) {
				        var str = address.substring(address.indexOf("?"));
				        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				        var r = str.substr(1).match(reg);
				        if (r != null) {
				          return unescape(r[2]);
				        }
				        return null;
				      }
				      if (that.midBanner[this.realIndex].Type == 0) {
				        //活动
				        that.$router.push(that.midBanner[this.realIndex].Describe);
				      } else {
				        // 产品详情
				        // 					//console.log("产品详情")
				        let id = getQueryString(that.midBanner[this.realIndex].LinkWebSite, "id");
				        let type = getQueryString(that.midBanner[this.realIndex].LinkWebSite, "type");
				        that.$router.push({
				          path: "/home/productDetails",
				          query: { id: id, type: type, style: 0 }
				        });
				      }
				    },
				  }
			  })
		  });
	  })
	  .catch(error => { 
	  });
		
		
    removeSession("_selected_");
    //请求人气专场数据
    this.busing = false;

  },
  deactivated: function() {
    this.busing = true;
    window.onscroll = null;
    clearInterval(this.scrollTextTimer);
    this.scrollTextTimer = null;

    clearInterval(timer2);

    mySwiper.destroy();
    midSwiper.destroy();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // var accessCode = tool.getQueryString('accessCode')
      // console.log('accessCode',accessCode)
      //   //第1位用户ID，第2位手机号码，第3位加密后密码
      // if(accessCode  && accessCode.length!= 0){ //用户是否通过第三方平台介入
      //   //解密
      //   var bytes = CryptoJS.AES.decrypt(accessCode.toString(),'59964e5d540e446cf98bc2af78a2ea58');
      //   var decrytedData = (bytes.toString(CryptoJS.enc.Utf8).split('|')) // //解析对象

      //   console.log(  "解析后台加密的东西",decrytedData )
      //   var params ={
      //         LoginName:decrytedData[1],
      //         Password:decrytedData[2],
      //         rememberMe:true,
      //         isBackLogin:true,
      //         returnUrl:"/home",
      //         datatype:"json"
      //       };
      //       if (vm.getToken()){ //删除原来的token 避免问题
      //         vm.commonTool.removeLocal('login_user_id');
      //       }
      //       getd.getLogin(params)
      //       .then((res)=>{
      //         vm.commonTool.saveToLocal('login_user_id','login_user_id','login_user_id',res.data);
      //         stored.commit(types.LOGIN, res.data.Token);
      //         stored.commit(types.COUNT, 1);
      //       })
      //       return
      //   }

      //获取微信授权信息
      if (vm.getToken() && stored.state.count == 0) {
        var mes = vm.commonTool.loadFromLocal(
          "login_user_id",
          "login_user_id",
          "login_user_id",
          false
        );
        var params = {
          LoginName: mes.Mobile,
          VerifyCode: "",
          Password: mes.Password,
          rememberMe: true,
          isBackLogin: true,
          returnUrl: "/home",
          datatype: "json"
        };
        getd.getLogin(params).then(res => {
          vm.commonTool.saveToLocal(
            "login_user_id",
            "login_user_id",
            "login_user_id",
            res.data
          );
          stored.commit(types.LOGIN, res.data.Token);
          stored.commit(types.COUNT, 1);
        });
      }
    });
  },
  updated() {
    //插入 聊天插件  1 10
    //发起微信jssdk
    //微信分享
    //		  	this.$watch('proValue',(newVal,oldVal)=>{
    //		  		//console.log(newVal)
    //		  	})
  },
  mounted() {
  	
    //横向滑屏初始化
    /* this.$nextTick(()=>{
					let scroll =  new BScroll(this.$refs.h_tcWrap,{
						scrollX: true,
						scrollY:false,
						bounce: true,
						click: true, //配置对象 触发点击
						preventDefault: false //可解决到此向上下拖动没反应 会引起快速刷新点击不对bug
					})
			})	 */
    this.$watch('$route',(n,o)=>{
      this.busing = true;

      clearInterval(timer2);

      mySwiper.destroy();
      midSwiper.destroy();
    })


  },
  created() {
     
    
    //判断是否在app
     if(tool.is_app()){
      this.isOnApp = true
    }
    //清除服务缓存
    window.localStorage.removeItem('sever_index')
    //新闻红点处理
    this.nowNewDataOneId = window.localStorage.getItem('home_Page_NewsFristId')
     //console.log('home-created新闻id', this.nowNewDataOneId)
    //首页分类数据
    this.classifyM();
    // if(window.localStorage.getItem('pageIndex')){  //避免人气专场缓存
    // 	window.localStorage.setItem('pageIndex',window.localStorage.getItem('pageIndex'))  //设置本地的pageIndex
    // }
    //公告滚动动画
    //
    //清楚活动页面的缓存
    if (window.localStorage.getItem("_activity")) {
      window.localStorage.removeItem("_activity");
    }
    this.populariData = store.state.cacheData;
    // 请求顶部bannner图片
    var param = {
      params: {
        type: 1,
        code: "GG00101"
      }
    };
    getd.getHomeBanner(param)
	  .then(res => {
	    //				//console.log(res,"sfhosihfshfsfhsodfsdfho");
	    this.datas = res.data.list;
	  })
	  .catch(error => { 
	  });
		
		
		
		
    //请求首页套餐数据
    var params = {
      type: 1
    };
    getd.getMealData(params).then(res => {
      this.mealData = res.data.list;
    });

    //请求限时抢购数据
    getd.SalesList().then(res => {
      if (res.data.recordCount) {
        if (res.data.list[0].Pro_SalesPromotionListViewModels.length >= 3) {
          this.purchaseS = res.data.list[0];
          this.purchase = res.data.list[0].Pro_SalesPromotionListViewModels;
        }
      }
    });
    //请求首页推荐数据
    getd.getRecommendData().then(res => {
      var obj = {};
      if (res.data.recordCount < 3) {
        this.recommendData.code = "404";
        return;
      }
      obj.oneId = res.data.list[0].Id;
      obj.oneType = res.data.list[0].Type;
      obj.oneName = res.data.list[0].Name;
      obj.oneTitle = res.data.list[0].Title;
      obj.onePrice = res.data.list[0].Price;
      obj.oneImg = res.data.list[0].PosterImgURL1;

      obj.twoId = res.data.list[1].Id;
      obj.twoType = res.data.list[1].Type;
      obj.twoName = res.data.list[1].Name;
      obj.twoTitle = res.data.list[1].Title;
      obj.twoPrice = res.data.list[1].Price;
      obj.twoImg = res.data.list[1].PosterImgURL1;

      obj.thirdId = res.data.list[2].Id;
      obj.thirdType = res.data.list[2].Type;
      obj.thirdName = res.data.list[2].Name;
      obj.thirdTitle = res.data.list[2].Title;
      obj.thirdPrice = res.data.list[2].Price;
      obj.thirdImg = res.data.list[2].PosterImgURL1;

      obj.forthId = res.data.list[3].Id;
      obj.forthType = res.data.list[3].Type;
      obj.forthName = res.data.list[3].Name;
      obj.forthTitle = res.data.list[3].Title;
      obj.forthPrice = res.data.list[3].Price;
      obj.forthImg = res.data.list[3].PosterImgURL1;

      this.recommendData = obj;
    });

    //请求活动推荐数据
    getd.getActivityData().then(res => {
      if (res.data.list.length >= 5) {
        this.activityData = res.data.list.slice(0, 5);
      } else {
        this.activityData = res.data.list;
      }
      Indicator.close();
    });

    //判断优惠卷显示
    if (stored.state.isExpired && stored.state.isFirst) {
      this.isPrompt = true;
      stored.commit(types.JUDGE, false);
      stored.commit(types.FIRST, false);
    }
     //判断新人  红包弹窗是否显示
    if (stored.state.isFirst) {
      this.isNewCurse = true;      
      stored.commit(types.FIRST, false);
    }else {}
  },

  components: {
    footerNav,
    goTop,
    update,
    messageIcon,
    countDown,
    scanMessageBox
  },
  computed: {},
  methods: {
    
  	//获取元素的css样式属性值
		getStyleAttr(obj, attr){
			if (window.getComputedStyle){
				return window.getComputedStyle(obj, null)[attr];
			}
			else {
				return obj.currentStyle[attr];
			}
		},
		//animate(oBox, {left:200, top:400, width:10}, fn)

//		 obj: 需要运动的元素节点对象
//		 json: 需要修改的多个属性和目标值 {left:iTarget, top:iTarget2, width:iTarget3}
//		 fn: 回调函数

		//动画
		animate(obj, json, fn){  //json = {left:200, top:400}

			//先清除原来的定时器
			clearInterval(obj.timer);

			//再开启新定时器
			obj.timer = setInterval(()=>{

				var bStop = true; //是否可以停止, 是否所有属性都到达了目标值

				for (var attr in json) {
					//attr: 属性名称
					//iTarget: 目标值
					var iTarget = json[attr]; //目标值

					//1, current
					var current = 0;
					if (attr == "opacity") { //透明度
						current = parseFloat(this.getStyleAttr(obj, attr)) * 100;
						current = Math.round(current); //四舍五入
					}
					else { //left,top, width, height
						current = parseFloat(this.getStyleAttr(obj, attr));
						current = Math.round(current); //四舍五入
					}

					//2, speed
					var speed = (iTarget-current)/10;
					speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
					//3, 临界值
					if (current != iTarget){ //如果至少有一个属性没有到达目标值
						bStop = false; //bStop就设置为false, 表示不可以停止定时器
					}

					//4,运动
					if (attr == "opacity"){ //透明度
						obj.style[attr] = (current + speed)/100;
						obj.style.filter = "alpha(opacity=" + (current+speed) + ")";
					}
					else { //left, top, width, height
						obj.style[attr] = current + speed + "px";
					}

				}

				//如果所有属性都到达了目标值
				if (bStop){
					clearInterval(obj.timer); //停止定时器, 停止运动
					//console.log("停止运动!");

					//运动结束后的回调
					if (fn){
						fn();
					}
				}

			}, 30);

		},
    //首页分类数据
    classifyM() {
      let dahangPrames1 = {
        params: {
          pageIndex: 1,
          pageSize: 100
        }
      };
      getd.getClassify(dahangPrames1).then(res => {
        for (var i = 0; i < res.data.list.length; i += 10) {
          this.classify1.push(res.data.list.slice(i, i + 10));
        }
      });
    },
    //页面跳转
    toRouter(path) {
      console.log(this)
      // console.log(this.$root.originData  )
      this.$root.originData.choiceReturn(this,path) ;
      // this.$router.push(path);
    },
    //新闻滚动 跳转排序
    toNewListRouter(index){
        this.isShowNewPiont = false
        var data = this.prizeListNews[index]
        this.$router.push({path:'/enterpriseNewsCenter',query:{homeComeDate:data,shiftIndex:index}})
    },
    //扫一扫
    richscan() {
    	
    	//检测相机权限
	    var pp = plus.navigator.checkPermission("CAMERA");
	    console.log(pp);
	    switch (pp) {
	      case "authorized":
	        //plus.nativeUI.alert('已开启相机权限');
	
	        this.$router.push("/home/scan");
	
	        break;
	      case "notdeny":
	        this.$router.push("/home/scan");
	
	        break;
	      case "denied":
	      	//用户禁止了相机权限
	      	this.isShowMessageBox = true;
	        break;
	      case "undetermined":
	        //					plus.nativeUI.alert('未确定相机权限');
	
	        this.$router.push("/home/scan");
	        break;
	      case "unknown":
	        plus.nativeUI.alert("无法查询相机权限");
	        view1.close();
	        break;
	      default:
	        plus.nativeUI.alert("不支持相机权限");
	        view1.close();
	        break;
	    }
    	
      
    },
    onShowTopStyle(data) {
      this.isTopShow = data;
      if (this.isTopShow) {
        this.sourceHome = "home2";
        if(!this.isOnApp && this.isShowOppenApp){
        this.$refs.search_box.style.top = '0'
        }
               
      } else {
        this.sourceHome = "home";
        if(!this.isOnApp && this.isShowOppenApp){
        this.$refs.search_box.style.top = '1.24rem'
        }
        
      }
    },
     //关闭头部app下载 banner
    closeOppenAppBanner(){
      this.isShowOppenApp = false;
      if(!this.isOnApp){
        this.$refs.search_box.style.top = '0'
        }
    },
    //首页活动链接
    active(url, item) {
      //跳转活动路由
      function getQueryString(address, name) {
        var str = address.substring(address.indexOf("?"));
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = str.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      }
      if (item.Type == 0) {
        //活动
        this.$router.push(item.Describe);
//      this.$router.push(item.DataDictionaryName);
      } else {
        // 产品详情
        // 					//console.log("产品详情")
        let id = getQueryString(item.LinkWebSite, "id");
        let type = getQueryString(item.LinkWebSite, "type");
        this.$router.push({
          path: "/home/productDetails",
          query: { id: id, type: type, style: 0 }
        });
      }
    },
    goProduct(id, type) {
      this.$router.push({
        path: "/home/productDetails",
        query: { id: id, type: type, style: 0 }
      });
    },
    sous() {
      this.$router.push("/home/sous");
      setSession("_sous_", 1);
    },
    //服务2级分类
    serveClassify(data) {
      if (data.TypeId == 3) {
        //表示不需用跳转商品详情
        this.$router.push(data.Url);
        return;
      }
      if (data.TypeId == 0 || data.TypeId == 1) {
        //表示不需用跳转商品详情
        this.$router.push({
          path: "/home/productDetails",
          query: { id: data.ProductId, type: data.TypeId }
        });
        return;
      }
      if (data.TypeId == 2) {
        //跳转服务详情页面
        //跳转服务详情页面列表 默认选择 服务详情页面二级里面的所有分类
        this.$router.push({
          path: "/home/serveClassify",
          query: {
            id: data.ClassId,
            name: encodeURI(data.Name),
            index: 0,
            classIndex: 0
          }
        });
        // setSession("_serveQuery_", {
        //   name: data.Name,
        //   classId: data.ClassId
        // });
        tool.saveToLocal('_serveQuery_','_serveQuery_','_serveQuery_',{
          name: data.Name,
          classId: data.ClassId
        })
        return;
      }
    },
    clise() {
      var the = document.getElementById("theRegistered");
      the.style.display = "none";
    },
    newPresent() {
      this.$router.push("/activity/newPresent/12345647824");
    },
    guidePage() {
      //分享 临时测试接口
      //==================================
      // //console.log(this,"调用微信调用微信调用微信调用微信调用微信")
      // this.wxShare()
      //===============================
      // this.$router.push('/home/guidePage');
    },
    getButton() {
      this.$router.push("/mine/coupon");
    },
    selectBrand() {
      this.$router.push("/businessQuery/selectBrand");
    },
    selectCompany() {
      this.$router.push("/businessQuery/selectCompany");
    },
    selectShareholder() {
      this.$router.push("/businessQuery/selectShareholder");
    },
    selectPatent() {
      this.$router.push("/businessQuery/selectPatent");
    },
    //记账报税
    toReport() {
      if (this.getToken()) {
        //获取当前用户信息
        var params = {
          datatype: "json"
        };
        var info = null;
        getd.getCustomerInfo(params).then(res => {
          info = res.data;
          if (info.JZFW || info.DZFW || info.IsStaff) {
            this.$router.push("/reportEntry");
          } else {
            Toast("您未购买此项服务");
          }
        });
      } else {
        this.$router.push("/mine/login");
      }
    },
    //获取产品列表数据
    getProductNewList(index) {
      //请求人气专场数据  分页 下拉刷新效果
      let productAllListParam = {
        params: {
          pageIndex: index,
          pageSize: this.pageSize
        }
      };
      getd.getPopulariData(productAllListParam).then(res => {
        let NewListDate = res.data.list;
        this.newListDatLength = NewListDate.length;
        if (NewListDate.length == 0) {
          //全部数据加载完毕处理
          this.busing = false; //End 显示加载中..
          this.$nextTick(() => {
            if (document.getElementsByClassName("mint-loadmore-bottom")[0]) {
              document.getElementsByClassName(
                "mint-loadmore-bottom"
              )[0].innerHTML =
                "没有更多了";
            }
          });
          return;
        } else {
          NewListDate.forEach(elem => {
            this.populariData.push(elem);
          });

          this.busing = false;
          //console.log('产品列表数据~~~~',this.populariData);
          //console.log('页数~',this.pageIndex);
        }
      });
    },
    //上拉加载更多
    //上拉加载更多
    loadMore() {
      if (this.newListDatLength !== 0) {
        this.pageIndex++;

        //若为真，则无限滚动不会被触发
        this.busing = true;

        this.getProductNewList(this.pageIndex);
      } else {
        this.busing = false;
      }
    },
    my_message() {
      //跳转到消息页面
      this.$router.push("/message");
    },
    //扫一扫弹窗组件
    toClose(){
    	this.isShowMessageBox = false;
    }
  },
  watch: {},
  destroyed() {
    window.onscroll = null;
    this.scrollTextTimer = null;
  }
};
</script>


<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
@import "../../../node_modules/mint-ui/lib/swipe/style.css";
@import "../../../node_modules/mint-ui/lib/infinite-scroll/style.css";
@import "home.less";
[v-cloak] {
  display: none;
}
 
#homeWrap #fixBottomWrap {
  // position: fixed;
  left: 0;
  right: 0;
  font-size: 10px;
  color: #1f1f1f; 
}
#homeWrap{
  height: auto;
}
#homeWrap .wrap{
  width: 100%;
  margin-bottom: 50px
}
</style>
