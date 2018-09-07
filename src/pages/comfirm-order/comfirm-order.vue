<style lang="less" type="stylesheet/css" scoped>
  @import "../../common/index.less"; 
  @import './comfirm-order.less';
</style>

<template>
  <div id="mine" >
    <div class="model" v-if="modelShow"></div>
    <headerTitle :title="title"    v-show="showHtml" ></headerTitle>
    <div  v-show="showHtml">
        <div class="siteSchedule" @click="shippingAddress" v-if="(cusDeliveryData&& $route.path=='/cart/comfirmOrder')||(cusDeliveryData&& $route.query.AId)">
        <!-- <div class="orderIcon"><img src="../../assets/images/mine/site@3x.png">地址</div> -->
        <div class="imgbox">
          <img src="../../assets/images/mine/myorder/dd-add-t@3x.png" alt="">
        </div>
        <div :class="{orderName:true,orderNameMore:cusDeliveryData.Address.length<15?true:false}">{{cusDeliveryData.ConsigneeName}}    
          <span>{{cusDeliveryData.ConsigneeMobile}}</span>
          <!-- <span class="defaultA" v-if="isDefault">默认</span> -->
        </div>
        <div class="orderDate">{{cusDeliveryData.ProvinceName}}{{cusDeliveryData.CityName}}{{cusDeliveryData.AreaName}} {{cusDeliveryData.Address}}</div>
        <span class="shippingAddress"></span>
      </div>
      <div class="siteSchedule" @click="shippingAddress" v-if="(!cusDeliveryData&&!$route.query.AId&&$route.path=='/cart/comfirmOrder')">
      <div class="imgbox">
          <img src="../../assets/images/mine/myorder/dd-add-t@3x.png" alt="">
        </div>
        <!-- <div class="orderIcon"><img src="../../assets/images/mine/site@3x.png">地址</div> -->
        <div class="noOrderName">
          请填写收货地址（此项为非必填项）
        </div>
        <span class="shippingAddress"></span>
      </div>
    </div>
    <div class="mainWrap" v-show="showHtml">
      <div class="header">
        <div class="swiperWraps"  >
          <div  class="innerWrap">
            <ul class="swiperWrap" v-for=" (items,index) in orderList.list" :key="index">
                <li class="items" v-if="items.Type == 0"> 
                      <div class="imgbox">  
                        <img :src="items.ThumbImgURL"  alt=""/>
                        <!-- <p>{{items.ProductName}}</p>  -->
                      </div>
                      <div class="content">
                        <p>
                          <span>{{items.ProductName}}</span>
                          <span>x{{items.Num}}</span>
                        </p>
                        <p>{{items.ProductType}}</p>
                        <p>￥{{items.Price}}</p>
                      </div>
                    
                    <!-- <div  v-else-if="items.ProductDetails.length !=0">  
                      <img :src="items.ProductDetails[0].ThumbImgURL" alt=""   />
                      <p>{{items.ProductDetails[0].Name}}</p>
                    </div>  -->
                </li>  
                <li class="comboLi" v-if="items.Type == 1"> 
                      <div class="combo">
                        <div class="lineb">
                          <div class="one">
                          <span>套餐</span>
                          <span>￥{{items.Price}}</span>
                          <span>立省￥{{items.OldPrice - items.Price}}</span>
                        </div>
                        <div class="oneNu">x{{items.Num}}</div>
                        <div class="tow">
                          {{items.ProductName}}
                        </div>
                        </div>
                      </div>
                      <div class="detailBox" v-for="(data,index) in items.ProductDetails" :key="index">
                        <div class="imgbox">  
                          <img :src="data.ThumbImgURL"  alt=""/>
                        </div>
                        <div class="content">
                          <p>
                            <span>{{data.Name}}</span>
                            <span>x1</span>
                          </p>
                          <p>{{data.ProductType}}</p>
                          <p>￥{{data.Price}}</p>
                        </div>
                      </div>
                </li>   
           </ul>
          </div> 
        </div>
        <!-- <div class="maskUl"   v-cloak  @click.stop.prevent="swiperWrapsFn( )"><span>共({{orderList.recordCount}})件</span></div> -->

      </div>
      <div class="billWrap">
        <div class="payMethodWrap"  v-cloak >
          <div class="lineBox">
            <span>支付方式</span><span>线上支付</span>
          </div>
        </div>
        <div class="bill"  >
          <span>发票</span>
          <!--  <router-link   @showPropsFn="showPropsFn" :to="{path: '/cart/comfirmOrder/setBill', params:{ plan: 'private'}}" tag="span">请设置<i></i></router-link>
            -->
             <span :class="{lightColor:lightColor}" v-cloak  @click.stop.prevent="setBill()">{{setBillData.Name}}<i></i></span>
        </div>
      </div>
      <div class="discountsWrap">
        <div class="discounts"> 
           <span>优惠券</span>
           <span v-cloak :class="{couponC:couponC}"  @click.stop.prevent="setDiscounts()" v-if="!price">{{couponData}}<i></i></span> 
        </div>
        <div class="discountsB" v-if="coin.isUsed"> 
           <span>可用{{coin.Coin}}记账币抵扣{{coin.RMB}}元<img @click="ruleB_Show" height="0.5135135135135135rem " width="0.5135135135135135rem " src="../../assets/images/comfirm-order/dd-why@3x.png" alt=""></span>
           <span><mt-switch v-model="value" @change="coinChange"></mt-switch></span> 
        </div>
      </div>
      <div class="payMoneyWrap">
         <div class="payMoney"> 
           <span>商品金额</span><span  class="productM">
           {{totalPrice}}</span>
        </div>
        <!-- 优惠不为0  -->
         <div class="tangibleMoney" v-if="couponShow"> 
           <span>优惠券</span><span class="themeC">-{{discountPrice | formatPrice |currency}}<b>{{discountPrice | formatPriceX}}</b></span>
        </div>
          <!-- 记账币 -->
          <div class="tangibleMoney" v-if="value"> 
           <span>记账币抵扣</span><span>-￥{{coin.RMB}}</span>
        </div>
      </div>
    </div>
    <!-- 固定地步bar -->
   

   <!-- 阿里巴巴支付 -->

    <div class="fixBottomWrap"  v-show="showHtml">
      <div >
        <button class="ordBtn" @touchend="imidiateOrder()">
          立即支付
        </button>
        <div class="moneyWrap">
          <span class="actualPayment">实付款:</span>
          <span class="productM"  v-cloak > 
            {{actualPay}}
          </span>
        </div>
         
      </div>
    </div>
 
  <!-- 记账币规则弹窗 -->
    <div class="accountB_M" v-if="ruleB">
      <h3>记账币使用规则</h3>
      <img @click="ruleB_hide" src="../../assets/images/comfirm-order/x@2x.png" width="0.24324324324324326rem " height="0.24324324324324326rem " alt="">
      <!-- <p v-html="ACCOUNTBI_RELUSE_DATA">{{ACCOUNTBI_RELUSE_DATA}}</p> -->
      <p>1、记账币仅限购买“智能云记账”产品，不可用于购买其他产品</p>
      <p>2、记账币也可用于帮他人代付“智能云记账”产品</p>
      <span class="know" @click="ruleB_hide">我知道了</span>
    </div>
    <!-- 支付成功弹窗
	  <div class="successModel" v-if="successShow">
		  <div class="img_div">
			  <img src="../../assets/images/daiFu/payS@2x.png" height="1.2162162162162162rem " width="1.2162162162162162rem " alt="">
		  </div>
		  <p>支付成功，查看我的订单</p>
		  <div class="button_box">
			  <span @click="goOrder">查看订单</span>
			  <span @click="goHome">回首页</span>
		  </div>
	  </div> -->
    <!-- 完善信息弹窗 -->
    <div class="sortWrap" v-if="successShow" @touchmove.stop.prevent>
      <div class="windowWrap" id="windowWrap">
        <div class="windowHeader">
          <div>支付成功！</div>
          <div>为了更好的为您提供服务，请完善公司信息</div>
        </div>
        <div class="contentWrap">
          <div class="companyNameWrap">
            <div>公司名称</div>
            <!-- <div>{{isSelected}}<span :class="selectCompany ? 'addCompany' : 'deleteCompany'" @click="selectC"></span></div> -->
            <input type="text" placeholder="请输入公司名称" v-model="isSelected" @blur="checkName" @focus.stop.prevent="focusName">
            <span :class="selectCompany ? 'addCompany' : 'deleteCompany'" @click="selectC"></span>
            <!-- 隐藏下拉框 -->
            <div class="hiddenWrap" v-if="!selectCompany">
              <div class="hiddenCompany" v-for="(item,index) in companyListArr" :key="index" @click="filingCompany(item)">{{item.CompanyName}}</div>
            </div>
          </div>
          <div class="personWrap">
            <div>联系人</div>
            <input type="text" placeholder="请输入联系人" v-model="person" @blur="checkPerson">
          </div>
          <div class="telWrap">
            <div>联系电话</div>
            <input type="text" placeholder="请输入联系电话" v-model="personTel" @blur="checkTel">
          </div>
          <div class="sureBthWrap">
            <div class="sureBth" @click="submitInfo">完善资料</div>
          </div>
        </div>
      </div>
    </div>
   <router-view v-show="(!showHtml)"   @showProps="showPropsFn" >子路由页面</router-view>
  </div>
</template>


<script>
import Vue from "vue";
import headerTitle from '../components/header-title';
import tool from '../../util/tool';
import getData from '../../vuex/getData.js';
import { mapState,mapActions,mapGetters} from 'vuex';
import { Indicator ,MessageBox ,Toast} from 'mint-ui';

  export default {
    data() {
      return {
        value:'', //记账币开关
        title: "确认订单",
        showHtml:true,
        dataList:[],
        cusDeliveryData:'',
        orderList:[],//页面数据
        totalPrice:"",//商品总价
        discountPrice:"",//优惠价
        productType:'',//产品类型
        num: '',			//数量
        price:"",
        couponData:"", //优惠券
        setBillData:{
          "Name":""
        },
        orderParams:{
          out_trade_no:"",
          total_fee:""
        },
        addressId:'' ,  //收货地址ID
        ruleB:false,  //记账币规则显示隐藏
        couponShow:false,  //优惠券减多少显示隐藏
        successShow:false,  //余额或记账币足够支付成功弹窗
        modelShow:false, //模态框显示隐藏
        actualPay:'',  //实际要付金额
        lightColor:false,  //发票颜色是否高亮
        couponC:false,  //优惠券颜色是否高亮
        isDefault:false, //是否是默认地址
        isSelected:"",
        selectCompany:true,
        companyListArr:[],
        personTel:'',
        person:"",
      }
    },
    components: {
      headerTitle
    },
    mounted(){
      //收货地址
      this.getAddress();
    },
    created:function(){
      console.log('什么说是',this.lightColor)
      //记录哪个页面进收货地址
      window.localStorage.setItem('AddressPage',this.$route.path)
      //----------------------------------------------------------
      // 记账币规则
      var params = {
        key:'jzb'
      }
      this.ACCOUNTBI_RELUSE(params).then(()=>{
      })
      //----------------------------------------------------------
      //注意从 goCompany.vue 返回会触发comfirmOrder.vue 里面的create,因为goCompany 是一级路由
      // activated: function (){
      // //console.log("刷新页面测试优惠",this.couponData)
      //监控路由 解决 子页面显示白屏的问题
      //console.log("进入create==进入create==进入create==进入create")
      if(this.$router.currentRoute.name == "setBill"  || this.$router.currentRoute.name == "cCoupon"  || this.$router.currentRoute.name  =="payMethod"){
        this.showHtml = false;
      }

    let tempObj =  this.commonTool.loadFromLocal("_CART",this.getToken(),'data',false); 

    //判断用户是否有本地数据 若无 则直接返回cart.vue 页面
    if(!tempObj){
        this.$router.go(-1);
    }

    //初始化数据 -- 用户刷新页面

    // 获取余额 
    this.getBalance_comfirmorder().then(()=>{
     // //console.log(this,'===================')
        //  //console.log(this.balanceMoney,"4545454545454545454545454545454545451")
    })
   

      //vuex bug 解决刷新页面 支付方式
      var  initPayMethods = this.commonTool.loadFromLocal("_SETBILL","paymethod","payObj",false);
      /*
      *当 vuex 中pay -99 且本地有数据则从本地获取,否则发起ajax
      *
      */
      if(this.pay == "-99"){
          if(initPayMethods){
             this.$store.state.comfirmOrder.pay= initPayMethods;
             if(initPayMethods == "微信支付"){
                this.$store.state.comfirmOrder.pay= initPayMethods;
                 this.$store.state.comfirmOrder.payMethodsIndex= 1; 
             }else if( initPayMethods == "支付宝支付" ){
                 this.$store.state.comfirmOrder.pay= initPayMethods;
                 this.$store.state.comfirmOrder.payMethodsIndex= 0;
             } 
          }else{
          	//把vuex 里默认 pay -99 ，修改为支付宝支付
          	this.$store.state.comfirmOrder.pay= initPayMethods;
            this.$store.state.comfirmOrder.payMethodsIndex= 1; 
            this.pay = '支付宝支付'
          }
      } 
      //调用本地缓存
      this.orderListFn();
      this.totalPriceFn();
      this.OldPriceFn();

     // this.discountPriceFn();//刷新页面需要充值优惠券， 此代码不在调用
      this.getBuyBum();
      
      //---------------------------------------------------------------
      //获取发票和优惠券总数-初始
      let orderListArr = this.orderList.list
      let orderIdArr = []
      let orderIDD = []
      let numArr = []
      for(var i=0;i<orderListArr.length;i++){
        orderIdArr.push(orderListArr[i].ProductId)
        orderIDD.push(orderListArr[i].ProductIdd)
        numArr.push(orderListArr[i].Num)
      }
      let productid = orderIdArr.join('|')
      let productidd = orderIDD.join('|')
      let Num = numArr.join('|')
      let IC_params = {
        "total" : this.totalPrice, 
        "productid":productidd
      }
      this.GetCusInvoceAndCoupon(IC_params).then(res=>{
         this.couponData  = `你有${this.couponNum}张优惠券可用`;
         this.couponC = false;
          //用户没有选择优惠券重新 存入本地
          var couponObj = {
            "price":"-10.00",
            "index":"-999",
            "CouponId":"undefined"
          }
          this.commonTool.saveToLocal("_SETBILL","cCoupon","couponObj",couponObj);  

        if(this.cusInvoice == null){
          this.setBillData.Name ="";
          this.lightColor = false;
        }else{
           this.setBillData = this.cusInvoice;  
           this.lightColor = true;
           //存入本地保持数据统一性
          this.commonTool.saveToLocal("_SETBILL","setBill","setBillObj",this.cusInvoice );  
        } 
      })

      //记账币
      let coinParams = {
        ids:productidd,
        num:Num
      }
      this.getCoin(coinParams).then(res=>{
        this.value = this.coin.isUsed;
        this.commonTool.saveToLocal("_coin","coin","coin",productidd);  
      })

       // 默认合同
      this.customerId = tool.loadFromLocal("login_user_id","login_user_id","login_user_id",false).Id;
      this.personTel = tool.loadFromLocal("login_user_id","login_user_id","login_user_id",false).Mobile;
      let data = {
        params:{
          Id : this.customerId,
        }
      }
      this.requestMyList(data);
  }, 
  updated(){ 
    //最后应付金额
      let orderListArr = this.orderList.list
      let orderIDD = []
      let numArr = []
      for(var i=0;i<orderListArr.length;i++){
        orderIDD.push(orderListArr[i].ProductIdd)
        numArr.push(orderListArr[i].Num)
      }
      let productidd = orderIDD.join('|')
      let num = numArr.join('|')
      let bookkeepCurrency = 0
      if(this.value){
        bookkeepCurrency = this.coin.RMB
      }
    var params = {
      "couponId" : this.commonTool.loadFromLocal("_SETBILL","cCoupon","couponObj",false).CouponId=='undefined'?'':this.commonTool.loadFromLocal("_SETBILL","cCoupon","couponObj",false).CouponId,
      "bookkeepCurrency": bookkeepCurrency,
      "ids":productidd,
      "num":num
    }
    this.getSettlement(params).then(res=>{
      if(this.actPriceObj.success){
        this.actualPay = this.actPriceObj.data
      }
    },err=>{
      console.log('结算失败',err)
    })
  },
  computed:{
    ...mapState(
      "comfirmOrder", ["couponList","recentBill","checkCouponPrice","orderId",'msg',"pay","payMethodsIndex","checkedMethod","checkCouponPrice","balanceMoney",'couponNum','cusInvoice','coin','actPriceObj'],
    ),
    ...mapState(
      "mine_index",{
        ACCOUNTBI_RELUSE_DATA: "ACCOUNTBI_RELUSE", //记账币规则
      }
    ) 
    // actualPay(){ //实付款
    //     if(this.value){ //使用记账币
    //       var final = this.totalPrice  -this.coin.RMB - this.discountPrice;
    //     }else{
    //       var final = this.totalPrice  - this.discountPrice;
    //     }
    //     if(final<=0){
    //         final = 0;
    //     }else{
    //        final = final;
    //     }
    //   return  Number(final).toFixed(2);
    // },
  },
  watch:{
    "$route": "fetchDate" ,//fetchDate是个方法
    'cusDeliveryData':{
          handler:(val,oldVal)=>{
              //要执行的任务
              //这里不知道怎么才能修改到this.data的数据，有知道的麻烦告知
              //现在知道的就是通过直接修改Store.state的方式来更新数据，当然效果和修改this.data是一样的
              this.cusDeliveryData = val;
          },
          // 深度观察
          deep:true
      }
  },
  methods:{
    //记账币弹框显示
    ruleB_Show(){
      this.ruleB = true;
      this.modelShow = true;
    },
    ruleB_hide(){
      this.ruleB = false;
      this.modelShow = false;
    },
    //记账币开关切换
    coinChange(){
      if(this.value){
        tool.saveToLocal("coinPrice","coinPrice","coinPrice",this.coin.RMB) 
      }else{
        tool.removeLocal('coinPrice')
      }
    },
    //跳查看订单页
		goOrder(){
      this.ruleB = false;
      this.modelShow = false;
			this.successShow = false;
			this.$router.push('/mine/toMyOrder')
		},
		//返回首页
		goHome(){
      this.ruleB = false;
      this.modelShow = false;
			this.successShow = false;
			this.$router.push('/')
		},
    getAddress(){ //获取收货地址
      if(this.$route.query.AId){
          let params = {
          "id" : this.$route.query.AId
        }
        getData.getSingAddress(params).then((res)=>{  //手动选择地址
          this.cusDeliveryData = res.data;
          this.addressId = this.$route.query.AId
          this.isDefault = res.data.IsDefault
        })
      }else{
        getData.getCusDeliveryAddressList().then(res=>{ //第一次进来选择默认地址
          if(res.data.list.length){
             this.cusDeliveryData = res.data.list[0];
            //  this.cusDeliveryData =   Object.assign({},res.data.list[0])
             this.addressId =  res.data.list[0].Id
             this.isDefault = res.data.list[0].IsDefault
          }
        })
      }
    },
    ...mapActions(
      "comfirmOrder",{
        "coupon_comfirmorder":"coupon_comfirmorder" ,
        "recently_billData":"recently_billData",
        "ordBtnPay":"ordBtnPay",
        "imidiateFn":"imidiateFn",
        "payMethods_comfirmorder":"payMethods_comfirmorder",
        "getBalance_comfirmorder":"getBalance_comfirmorder",//余额
        "GetCusInvoceAndCoupon":"GetCusInvoceAndCoupon", //发票和优惠券
        "getCoin":"getCoin", //记账币
        "getSettlement":"getSettlement" //最后结算金额
        },
    ),
    ...mapActions(
      "mine_index",{
        "ACCOUNTBI_RELUSE":"ACCOUNTBI_RELUSE" //记账币规则
      }
    ),
    fetchDate(){
      //解决从子页面过来, 因为父页面带有参数白屏
      //  //console.log("解决从子页面过来",this.$router.currentRoute)
       if(this.$router.currentRoute.name == "setBill"){
             this.showHtml = false;
       }else if(this.$router.currentRoute.name == "comfirmOrder"){ 

              this.showHtml = true;
           //    //console.log("this.$router.currentRoute.name == comfirmOrder",this.$router.currentRoute.name)
               
               // 用户优惠券 返回comfirmOrder页面 push优惠券信息给页面
                //从本地读取优惠券信息
                var initCoupon = tool.loadFromLocal("_SETBILL","cCoupon","couponObj",false);
               // //console.log("s",initCoupon)
                //当 initCoupon 为true 或者price 不为负数,则可判断 用户已经选择了优惠券

              //  //console.log( "初始化优惠",initCoupon.price );
                //从本地读取发票数据信息
               
							
                //当用户选择发票后, go(-1) 重新初始化最近使用发票
                this.recently_billData( ).then((res)=>{
                  //  //console.log("最近一次使用发票返回",this.recentBill);
                    if(this.recentBill == null){
                      this.lightColor = false
                      this.setBillData.Name ="请设置";
                    }else{
                       this.setBillData = this.recentBill;  
                       this.lightColor = true;
                       //存入本地保持数据统一性
                      this.commonTool.saveToLocal("_SETBILL","setBill","setBillObj",this.setBillData );  
                    } 
                })//

 
                if(initCoupon == false | initCoupon.price<0){
                    //  initCoupon 为false 需要重新数据
                    let tempObj =  this.commonTool.loadFromLocal("_CART",this.getToken(),'data',false); 
                    let total  = 0;
                    let _ProductIdd = [];
                    
                    tempObj.list.forEach((items,index)=>{
                      // //console.log("测试购物车优惠券",items)
                        if(items.Type!=1){
                          total+=   (Number(items.Price) * Number(items.Num)  ) ;
                           _ProductIdd.push(items.ProductIdd);
                        }
                       
                    })  


                    //  //console.log("测试购物车222222222222222222222",total)
                    var productIdd = _ProductIdd.join("|"); 
                    var parms = {
                        total :total,
                        productid : productIdd,
                    }
                    this.coupon_comfirmorder(parms).then((res)=>{
                      //  //console.log("<<<<")
                        ////console.log( this.couponList)
                        this.couponData  = `你有${this.couponList.recordCount}张优惠券可用，去选择`;
                        this.couponC = false;
                        this.couponShow = false;
                        //用户没有选择优惠券重新 存入本地
                        var couponObj = {
                          "price":"-10.00",
                          "index":"-999",
                          "CouponId":"undefined"
                        }
                       // this.commonTool.saveToLocal("_SETBILL","cCoupon","couponObj",couponObj);  
                        this.discountPriceFn()

                    })
                }else if(initCoupon.price>0){
                  this.couponData  = `-¥${initCoupon.price}`;
                  this.couponC = true;
                  this.couponShow = true;
                  this.commonTool.saveToLocal("_SETBILL","cCoupon","couponObj",initCoupon);  
                  this.discountPriceFn();  
                }

       }  

       // 用户通过go-1 返回comfirmOrder.vue 获取用户最近使用发票列表 
    },
     orderListFn(){
      //获取订单详情 
      let orderList = tool.loadFromLocal("_CART",this.getToken(),'data',false);
      ////console.log("查看页面购物车本地数据是否初始化",orderList);
     console.log('嗨咯',orderList)
      this.orderList = orderList
     
    },
    totalPriceFn(){
      let orderList = tool.loadFromLocal("_CART",this.getToken(),'data',false);
    //  //console.log( "购物车总价格~~~",orderList  )
      let tempPrice = 0;
      orderList.list.forEach(items=>{ 
              tempPrice += Number(items.Price)  *Number(items.Num);
      })
      this.totalPrice = Number(tempPrice).toFixed(2);
    },
    OldPriceFn(){
      //原价
       let orderList = tool.loadFromLocal("_CART",this.getToken(),'data',false);
      let tempPrice = 0;
      orderList.list.forEach(items=>{ 
              tempPrice += Number(items.OldPrice)  *Number(items.Num);
      })
      this.OldPrice = Number(tempPrice).toFixed(2);
     // return  Number(tempPrice).toFixed(2)

    },
    discountPriceFn(){
      ///===========================问题  需要改动!!!!!
        //服务金额 + 优惠券金额
        let  couponPrice = tool.loadFromLocal("_SETBILL","cCoupon",'couponObj',false); 
        // ////console.log(orderList);
        let tempPrice = 0;
       // //console.log("y优惠价格计算",couponPrice)
        if(couponPrice.price<0 ||couponPrice ==false){
          
          return  this.discountPrice =  "0.00";
        }else{
           var finalPrice =  Math.abs(couponPrice.price * 10000  /10000); 
           this.discountPrice =  Number(finalPrice).toFixed(2);
        }
    },
    getBuyBum(){
    	//数量
      let orderList = tool.loadFromLocal("_CART",this.getToken(),'data',false);
      let num = [];
      orderList.list.forEach(items=>{             
              num.push(items.Num)
              
      })
      this.num = num;
      ////console.log('数量少时诵诗书',this.num)
    },
    
    swiperWrapsFn(data){ 
      //获取下单页面商品详情
      this.showHtml = false; 
      this.$router.push({"path": '/cart/comfirmOrder/comfirmList'});
    },
    setBill(){ 
      //隐藏确认订单首页 
      this.showHtml = false;
      this.$router.push({"path": '/cart/comfirmOrder/setBill'});
    },
      //收货地址
			shippingAddress(){
				this.$router.push('/mine/shippingAddress?isCF=true');
    },
    setDiscounts(){ 
      //隐藏确认订单首页 
      this.showHtml = false  ;
      this.$router.push({name:"cCoupon" });
    },
    setPayMethods(){
      //设置支付方式  
      //隐藏确认订单首页  
      this.showHtml = false;
      this.$router.push({"path": '/cart/comfirmOrder/payMethod'});
    },
    showPropsFn(childProps){ 
      //接受子组件传递的值
      ////console.log("我是h爹",childProps);
      this.showHtml = childProps; 
      //this.price = childProps.price
    },
    imidiateOrder(){
          //立即下单
          //从本地获取 数据
          var  tempObj = this.commonTool.loadFromLocal("_CART","ALL","ALL",false);
          var  tempObj1 = this.commonTool.loadFromLocal("_SETBILL","ALL","ALL",false);
          //通过本地存储获取用户最近使用 发票  记录 
          var billObj  = this.commonTool.loadFromLocal("_SETBILL","setBill","setBillObj",false);
         //获取购物车 主键
         var  paramsOrder = {};
          if(this.value){
            paramsOrder.bookkeepCurrency = this.coin.RMB
          }
        //  收货地址
         paramsOrder.deliveryAddressId = this.addressId
          var tempArr = [];
          for ( var p in tempObj){
            paramsOrder.customerId = p;//用户ID(必填) 
            let id = tempObj[p]; 
            for(let i = 0 ; i < id["data"]["list"].length ;i++){
                  tempArr.push(id["data"]["list"][i].Id)
                  //购物车主键编号（多个就以数组形式返回，一个就按照正常传参）;
                  //判断规则, 从购物车来的一定是true 从立即购买来的一定是false
                  var flag =  id["data"]["list"][i].IsChecked
            } 
          }
       
          paramsOrder.ids= tempArr.join("|");
        
          paramsOrder.amount = this.actualPay;//实付金额
          paramsOrder.oldAmount = this.OldPrice;//原价
          paramsOrder.preferentialAmount =this.discountPrice?this.discountPrice:0;//优惠金额
          paramsOrder.num = this.num.join("|");
					
					
          let orderList = tool.loadFromLocal("_CART",this.getToken(),'data',false);
          // //console.log("产品类型",orderList);
          let type = [];
          orderList.list.forEach((items) => {
              this.ProductType = items.ProductType;
              type.push(this.ProductType);
              // //console.log("typetypetype",type);
              return type;
          })

          paramsOrder.productType = type.join("|");//产品类型  一个就正常穿  多个就以 | 分隔
         
         let couponIdList =  tool.loadFromLocal("_SETBILL","cCoupon","couponObj",false);
            //console.log('优惠券~~~',couponIdList.CouponId)
       
         	paramsOrder.couponId = couponIdList.CouponId ;  
          paramsOrder.cusInvoiceId = billObj.Id; //发票ID

          //判断是从购物车来的还是从商品详情-立即购买来的	
          if( flag  ){
          	  if(paramsOrder.couponId == 'undefined'){
          	  	paramsOrder.couponId = ''
          	  }
              //生成订单 == 从购物车页面下单 
              this.ordBtnPay(paramsOrder).then((res)=>{
              	// //console.log('222222222222',this.msg)
              //true 代表需要生成订单接口为 https://112.74.135.230:3215/Order/CreatedOrEdit
              //false 代表生成订单接口为 https://112.74.135.230:3215/Order/ImmediatelyOrder
              
								if(this.msg.data === null ){//this.msg 来自vuex 用来判断 云记账或者是云代账是否重复购买
                 Toast({
                    message: this.msg.msg,
                    position: 'middle',
                    duration: 20000
                  });
                  return  false
                }
                if(this.orderId){
                      if(this.actualPay=='0.00'){
                        tool.removeLocal("_CART");
                        tool.removeLocal("_SETBILL");
                        this.modelShow = true;
                        this.successShow = true;
                      }else{
                         this.$router.push({'name':'payMethod',query:{orderNum:this.orderId,actPrice:this.actualPay,bookkeepCurrency :this.coin.RMB}}) 

                      }
                    }  
                    return 
              }).catch((error)=>{
                  Toast({
                    message: error.data.msg,
                    position: 'middle',
                    duration: 500
                  });
              })
              return
          }else{ 
              //生成订单 == 从商品详情页面  立即购买下单 
             if(paramsOrder.couponId == 'undefined'){
          	  	paramsOrder.couponId = ''
          	  }
              this.imidiateFn(paramsOrder).then((res)=>{
                    // //console.log("立即购买下单==生成订单000!!!!",this.orderId);
                    //处理订单金额为0情况 跳过三方支付 防止第三方不支持0金额支付报错
                if(this.orderId){ 
                    if(this.actualPay =='0.00'){
                    // //console.log('0.00~~~~ok')
                    tool.removeLocal("_CART");
                    tool.removeLocal("_SETBILL");
                    this.modelShow = true;
                    this.successShow = true;
                  }else{
                    //this.$router.push({'name':'payMethod',query:{orderNum:this.orderId,actPrice:this.actualPay,isOwn:'false'}}) 
                    //isOwn带到支付方式页去，用在支付方式区分是自己付还是代付
                    this.$router.push({'name':'payMethod',query:{orderNum:this.orderId,actPrice:this.actualPay,bookkeepCurrency :this.coin.RMB,isOwn:'false'}}) 
                  }
                }    
                return
              },()=>{
                 console.log('1111111111111111')
              }).catch((error)=>{
                  Toast({
                    message: error.data.msg,
                    position: 'middle',
                    duration: 500
                  });
              })
          };  
    },
    ordBtnPayFn(){
        //表单自动提交
         Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
          });   

         document.getElementById("profile-form").submit();
     }, //生成订单 END
     checkName(){
            if(this.isSelected){
                let status = tool.regularJudgement("companyAddress",this.isSelected);
                if(!status){
                    return false
                }
            }
		},
		checkTel(){
            if(this.personTel){
                let status = tool.regularJudgement("phone",this.personTel);
                if(!status){
                    return false
                }
            }
		},
		checkPerson(){
            if(this.person){
                let status = tool.regularJudgement("person",this.person);
                if(!status){
                    return false
                }
            }
		},
		selectC(){
			this.selectCompany = !this.selectCompany;
        },
        filingCompany(val){
			console.log("val",val)
			this.isSelected = val.CompanyName;
			this.person = val.Name;
			this.selectCompany = !this.selectCompany;
    },
    // 获取我的公司列表
		requestMyList(params){
			getData.GetList(params).then((res) => {
				// console.log("获取我的公司列表",res)
				this.companyListArr = res.data.list;
        if(this.companyListArr.length != 0){
            this.person = this.companyListArr[0].Name;
            this.isSelected = this.companyListArr[0].CompanyName;
        }
			})
    },
    // 获取最近公司信息
    recentCompany(){
       console.log("this.orderId2222222222",this.orderId)
        let params = {
            params : {
              UserId : this.customerId
              // Id : this.orderId
            }
        }
        getData.GetInfo(params).then((res) => {
            // console.log("获取最近公司信息",res)
            if(res.data.CompanyName){
                this.isSelected = res.data.CompanyName;
            }
            if(res.data.Name){
                this.person = res.data.Name;
            }
            if(res.data.Mobile){
                this.personTel = res.data.Mobile;
            }
        })
    },
    // 完善资料提交信息
		submitInfo(){
      console.log("this.orderId",this.orderId)
        if(this.isSelected.length >= 2 && this.personTel.length == 11 && this.person.length >= 2){
            this.requestInfo();
        }
    },
    requestInfo(){
        let params = {
            params:{
                // Id : this.customerId,
                CompanyName : this.isSelected,
                Name : this.person,
                Mobile : this.personTel,
                OrderId : this.orderId
            }
        }
        getData.EditCompanyInfo(params).then((res) => {
            // console.log("完善资料提交信息",res)
            // this.$router.push(`/mine/toMyOrder/orderServering?id=${res.data.Id}`)
            this.$router.push({path:"/mine/toMyOrder/orderServering",query:{id:res.data.Id,name:'defaultContract'}})
        }).catch(err => {
            console.log(err)
        })
    },
    ordBtnPayFn(){
        //表单自动提交
         Indicator.open({
            text: 'Loading...',
            spinnerType: 'fading-circle'
          });   

         document.getElementById("profile-form").submit();
     }, //生成订单 END
     focusName(){
        // console.log("99999",document.documentElement.scrollTop,document.documentElement.clientHeight,document.getElementById("windowWrap").offsetTop)
        // if(tool.is_android){
            window.onresize = () => {
                // alert(document.getElementById("windowWrap").offsetTop)
                if(document.getElementById("windowWrap").offsetTop < 16){
                  document.getElementById("windowWrap").style.bottom = "0px";
                }else{
                  document.getElementById("windowWrap").style.bottom = "10%";
                }
            }
        // }
        
    },
 },
   filters:{
        //;
        formatPrice (value) {   
          var _value = Number(value).toFixed(2);
          return   tool.formatPrice(_value);   
        },
        formatPriceX:value =>{ 
          var _value = Number(value).toFixed(2);
          return tool.formatPriceX(_value);
        },
        currency :value =>   {  
          return tool.currency(value);
        } ,
       
      }
};

</script>
