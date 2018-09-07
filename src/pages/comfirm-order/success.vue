<template>
	<!-- 支付完成页面 -->
	<!-- 支付完成页面 -->
	<div id="transition">
		<!-- 不是支付成功统一返回 上一个页面 -->
		<div class="popularity_return">
			<span class="return"  @click="helpgoBack"></span>
			<span class="title_name">确认完成</span>
		</div>
		
		<!-- 成功 1-->
		<!-- Status 订单状态（0=待支付，1=支付成功，2=支付失败，3=退款中，4=已退款） -->
		<div class="mainWrap" v-if="ISPAYOK_DATA.Status == 1">
			<div class="detailWrap">
				<div class="detail">
					<img src="@/assets/images/comfirm-order/success@3x.png" alt="">
					<div class="info">
						<!-- <p>支付方式:微信支付</p> -->
						<!-- <p>支付金额：<span class="themeC">¥2345.00</span></p> -->
						<p class="themeC nowPrice">支付金额：<span>{{ ISPAYOK_DATA.Amount | formatPrice | currency }}</span><b>{{ISPAYOK_DATA.Amount  | formatPriceX  }}</b></p>
					</div>
					<div class="clearFix"></div>
					<div class="buttonWrap">
						<div>
							<span class="lookForOrder" @click="lookForOrder">我的订单</span>
							<span class="goHome" @click="goHome">回首页</span>
						</div>
					</div>
				</div>
			</div>
		</div>
				<!-- /成功 -->
				<!-- 失败 -->
				<div class="mainWrap" v-else-if="ISPAYOK_DATA.Status == 2  || ISPAYOK_DATA.Status == 0">
					<div class="detailWrap">
						<div class="detail">
							<img src="@/assets/images/comfirm-order/failure@3x.png" alt="">
							<div class="infoError">
								<p>糟糕，支付失败！</p>
								<p>最后一步出现了问题，重新支付</p>
							</div>
							<div class="clearFix"></div>
							<div class="buttonWrap">
								<div>
									<span class="lookForOrder" @click="lookForOrderCancel">我的订单</span>
									<span class="goHome" @click.stop.prevent="goChongxin">重新支付</span>
								</div>
							</div>
						</div>
					</div>
				</div>
		
			<!-- /失败 -->

	
		<div class="everyBodyBugWrap">
			<div><span>———</span>&nbsp;大家都在买&nbsp;<span>———</span></div>
			<ul class="itemsWrap">
				<li class="items" v-for="(items,index) in QUEARYHOT_DATA" :key="index" @click="goProductDetail(items)">
					<img :src="items.PosterImgURL1" alt="" />
					<p class="themeC nowPrice">
						<span>{{ items.Price | formatPrice | currency }}</span><b>{{items.Price  | formatPriceX  }}</b>
					</p>
					<p>{{items.Name}}</p>
					<p>{{items.Title}}</p>
				</li>
			</ul>
		</div>

    <!-- 完善信息弹窗 -->
    <div class="sortWrap" @touchmove.stop.prevent v-if="ISPAYOK_DATA.Status == 1">
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
	</div>
</template>

<script>
import headerTitle from "../components/header-title";
import tool from "../../util/tool";
import { mapState, mapActions, mapGetters } from "vuex";
import getData from "../../vuex/getData"
export default {
  data() {
    return {
      fromPage: true, //true 表示来自于自己支付 false 表示来自于帮TA代付
      title: "交易详情",
      money: "",
      ab: require("@/assets/images/comfirm-order/comPay@3x.png"),
      selectCompany:true,
      isSelected:"",
      customerId:"",
      companyListArr:[],
      personTel:'',
      person:"",
    };
  },
  components: {
    headerTitle
  },
//   beforeRouteEnter(to, from, next) {
// 	console.log(from);
// 	if(from.path == '')
//     next(vm => {});
//   },
  created() {
    console.log("id",tool.loadFromLocal("login_user_id","login_user_id","login_user_id",false))
    tool.getQueryString("Amount");
    this.money = tool.getQueryString("Amount");
    //判断支付情况
    let params = {
      orderNo: this.$route.query.orderNum
      // orderNo: "1527220095464704"
    };
    this.ISPAYOK(params);

    let params2 = {
      params: {
        pageIndex: 1,
        pageSize: 10
      }
    };
    this.QUEARYHOT(params2);

    this.customerId = tool.loadFromLocal("login_user_id","login_user_id","login_user_id",false).Id;
    this.personTel = tool.loadFromLocal("login_user_id","login_user_id","login_user_id",false).Mobile;
    console.log("this.customerId",this.customerId)
    let data = {
      params:{
        // Id : this.customerId,
        OrderNo : this.$route.query.orderNum
      }
    }
    this.requestMyList(data);
    this.recentCompany();
    
  },
  computed: {
    ...mapState("mine_index", {
      ISPAYOK_DATA: "ISPAYOK_DATA", //记账币规则
      QUEARYHOT_DATA: "QUEARYHOT_DATA" //热销棒条数
    })
  },
  methods: {
    ...mapActions("mine_index", {
      ISPAYOK: "ISPAYOK", //记账币规则
      QUEARYHOT: "QUEARYHOT" //热销
    }),
    focusName(){
      // document.getElementById("windowWrap").style.marginTop = "-50px";
      // console.log(document.getElementById("windowWrap").style.position)
      // document.getElementById("windowWrap").style.position = "absolute";
      // console.log(document.getElementById("windowWrap").style.position,"22")
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
      })
    },
    // 获取最近公司信息
    recentCompany(){
      let params = {
        params : {
          // Id : this.customerId
          Id : this.$route.query.orderNum
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
                OrderId : this.$route.query.orderNum
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
    goHome() {
      //点击完成跳转 我的订单
      // window.location.href =
        // "file:///data/user/0/com.rongcan.wqb/files/apps/1106428143/www/index.html#/mine/toMyOrder";
      this.$router.push({"path": '/mine/toMyOrder'});
    },
    lookForOrder() {
        this.$router.push({path: "/mine/toMyOrder"});
    },
    // lookForOrder(){
    // 	this.$router.go(-1);
    // },
    goHome() {
      this.$router.push("/");
    },
    goChongxin() {
      if(this.$route.query.flag == 'help'){
          this.$router.push({
           path: "/DPayMethod",
            query: {
              orderNum: this.$route.query.orderNum,
          actPrice: this.$route.query.actPrice,
          flag:'help'
            }
          });
      }else{
        this.$router.push({
           path: "/cart/comfirmOrder/payMethod",
            query: {
              orderNum: this.$route.query.orderNum,
              actPrice: this.$route.query.actPrice,
              flag:'help'
            }
          });
      }
      
    },
    goProductDetail(value) {
      //商品详情
      this.$router.push({
        path: "/home/productDetails",
        query: {
          id: value.Id,
          type: value.Type
        }
      });
    },
    goBack() {
      //自己支付方式
	  //当成功 返回订单
	  this.$router.push({path: "/mine/toMyOrder"});
      
    },
    helpgoBack() {
      // 从help页面进入 失败的返回/helpFriendPay
	  // 失败的 或者是取消支付的 返回helpFriendPay页面
	  if(this.$route.query.flag == 'help'){
 		this.$router.push({
          path: "/helpFriendPay",
          query: {
            orderNum: this.$route.query.orderNum,
			actPrice: this.$route.query.actPrice,
			flag:'help'
          }
        });
	  }else{ 
		   this.$router.replace({path:"/mine/toMyOrder"});
	  }
      
    },
    lookForOrderCancel() { 
        this.$router.replace({path:"/mine/toMyOrder"});
    }
  },
  filters: {
    formatPrice(value) {
      if (value == undefined) {
        return;
      }
      return tool.formatPrice(Number(value).toFixed(2));
    },
    formatPriceX: value => {
      if (value == undefined) {
        return;
      }
      return tool.formatPriceX(Number(value).toFixed(2));
    },
    currency: value => {
      if (value == undefined) {
        return;
      }
      return tool.currency(value);
    }
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
// 完善信息弹窗
.sortWrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0px;
  bottom:0;
  left:0;
  right:0;
  z-index: 999;
  background-color:rgba(0, 0, 0, 0.4); 
}
.windowWrap{
  position: absolute;
  width: 8.533333rem;
  // height: 11.733333rem;
  // margin: 30% 10%;
  // top: 80px;
    left: 30px;
    bottom: 10%;
  .windowHeader{
    width: 8.533333rem;
    height: 3.333333rem;
    .bg-image("../../assets/images/comfirm-order/header");
    background-size: 100% 100%;
    position: relative;
    div:nth-child(1){
      font-size: .426667rem;
      color: #fff;
      font-weight: 600;
      text-align: center;
      padding-top: 1.933333rem;
    }
    div:nth-child(2){
      font-size: .346667rem;
      margin-top: .32rem;
      color: #fff;
      text-align: center;
    }
  }
  .contentWrap{
    background: #fff;
    border-radius: .266667rem;
    margin-top: -0.266667rem;
    .companyNameWrap{
      margin: 0 .4rem;
      padding: .26667rem 0;
      border-bottom: 1px solid rgb(235,229,225);
      position: relative;
      div:nth-child(1){
        font-size: .4rem;
        color: rgb(102,102,102);
        margin-top: .52rem;
      }
      input:nth-child(2){
        width: 90%;
        // height: .426667rem;
        margin-top: .4rem;
        font-size: .4rem;
      }
      .addCompany,.deleteCompany{
        display: inline-block;
        width: .56rem;
        height: .56rem;
        background-size: 100% 100%;
        float: right;
        margin-top: 0.353333rem;
      }
      .addCompany{
        .bg-image("../../assets/images/comfirm-order/more");
      }
      .deleteCompany{
        .bg-image("../../assets/images/comfirm-order/add2");
      }
      .hiddenWrap{
        width: 8rem;
        height: 6.053333rem;
        background: rgb(247,247,247);
        margin-left: -0.13333rem;
        position: absolute;
        top: 2.44rem;
        border-radius: .133333rem;
        overflow-y: scroll;
        .hiddenCompany{
          height: 0.946667rem;
          font-size: .373333rem;
          padding: 0 .12rem;
          border-bottom: 1px solid #dfdfdf;
          line-height: 0.746667rem; 
          margin: 0.253333rem .133333rem 0 .133333rem;
          color: #000;
        }
        .hiddenCompany:nth-last-child(1){
          border-bottom: none;
        }
      }
    }
    .personWrap,.telWrap{
      margin: 0 .4rem;
      padding: .26667rem 0;
      border-bottom: 1px solid rgb(235,229,225);
      div:nth-child(1){
        font-size: .4rem;
        color: rgb(102,102,102);
      }
      input:nth-child(2){
        width: 80%;
        margin-top: .4rem;
        font-size: .4rem;
      }
    }
    .sureBthWrap{
      margin: 0 0.4rem;
      padding: 0.8rem 0;
    }
    .sureBth{
      width: 7.746667rem;
      height: 1.093333rem;
      background: linear-gradient(to right, rgb(252,115,3), rgb(249,80,8));
      line-height: 1.093333rem;
      text-align: center;
      border-radius: .133333rem;
      color: #fff;
      font-size: .426667rem;
    }
  }
}
#transition {
     padding-top: 1.1891891891891893rem;
     position: absolute;
     height: 100%;
     width: 100%;
     background: white;
     .nowPrice(0.32432432432432434rem);
}
 .popularity_return {
     position: fixed;
     top: -0.1px;
     left: 0;
     height: 1.1891891891891893rem;
     width: 100%;
     text-align: center;
     line-height: 1.162162162162162rem;
     font-size: 0.4864864864864865rem;
     color: #1f1f1f;
     border-bottom: 1px solid #ebe5e1;
     background-color: #fff;
}
 .return {
     position: absolute;
     height: 1.0810810810810811rem;
     width: 0.6486486486486487rem;
     top: 0;
     left: 0.40540540540540543rem;
     .bg-image("../../assets/images/tabBar/nav_back");
     background-repeat: no-repeat;
     background-size: 100%;
     background-position: 0rem 0.24324324324324326rem;
}
 .mainWrap {
     background: white;
}
 .detail {
     margin-top: 0.5405405405405406rem;
}
 .detail > * {
     float: left;
}
 .detail > img {
     width: 1.4594594594594594rem;
     height: 1.5675675675675675rem;
     margin-left: 16%;
     margin-right: 0.3783783783783784rem;
}
 .clearFix {
     clear: both;
}
 .detail .info p {
     font-size: 0.3783783783783784rem;
     line-height: 1;
}
 .detail .info p:nth-child(1) {
     margin-top: 0.2972972972972973rem;
}
 .detail .info p:nth-child(2) {
     margin-top: 0.24324324324324326rem;
     font-weight: bolder;
}
 .detail .info .themeC {
     color: #ff5000;
}
 .detail span {
     line-height: 0.6216216216216216rem;
}
 .buttonWrap {
     float: none;
     width: 100%;
     overflow: hidden;
     padding-top: 0.9459459459459459rem;
     padding-bottom: 0.6756756756756757rem;
}
 .buttonWrap > div {
     margin: 0 auto;
     width: 7.297297297297297rem;
}
 .buttonWrap span {
     text-align: center;
     float: left;
     width: 2.972972972972973rem;
     height: 0.8378378378378378rem;
     line-height: 0.8648648648648649rem;
     border: 1px solid #666666;
     border-radius: 0.10810810810810811rem;
}
 .buttonWrap span.lookForOrder {
     font-size: 0.3783783783783784rem;
}
 .buttonWrap span.goHome {
     font-size: 0.3783783783783784rem;
}
 .buttonWrap span:nth-child(2) {
     margin-left: 1.0810810810810811rem;
}
 .everyBodyBugWrap > div:nth-child(1) {
     text-align: center;
     line-height: 1.1891891891891893rem;
     background-color: #efeff4;
     color: #333333;
     font-size: 0.3783783783783784rem;
}
 .everyBodyBugWrap > div:nth-child(1) span {
     color: #b2b2b2;
}
 .everyBodyBugWrap .itemsWrap {
     background: white;
     overflow: hidden;
     padding: 0 0.32432432432432434rem;
     padding-bottom: 0.2702702702702703rem;
}
 .everyBodyBugWrap .items {
     float: left;
     margin-top: 0.2702702702702703rem;
     width: 47%;
     margin-right: 3%;
}
 .everyBodyBugWrap .items .themeC {
     color: #ff5000;
     font-size: 0.3783783783783784rem;
}
 .everyBodyBugWrap .items .themeC b {
     color: #ff5000;
     font-size: 0.32432432432432434rem;
     font-weight: normal;
}
 .everyBodyBugWrap .items:nth-child(2n) {
     color: black;
     float: right;
     margin-right: 0;
}
 .everyBodyBugWrap .items:nth-child(3) {
     color: #8c8c8c;
}
 .everyBodyBugWrap .items b {
     font-size: 0.3783783783783784rem;
     font-weight: normal;
}
 .everyBodyBugWrap .items img {
     width: 100%;
}
 .everyBodyBugWrap .items p {
     margin-top: 0.2702702702702703rem;
     padding: .066667rem 0;
}
 .everyBodyBugWrap .items p:nth-of-type(2) {
     color: black;
     font-size: 0.3783783783783784rem;
     .textIndex1(100%);
}
 .everyBodyBugWrap .items p:nth-of-type(3) {
     color: #8c8c8c;
     font-size: 0.3783783783783784rem;
     .textIndex1(100%);
}
 //失败 .detail 
 .infoError p {
     font-size: 0.3783783783783784rem;
     line-height: 1;
}
 .detail .infoError p:nth-child(1) {
     margin-top: 0.2972972972972973rem;
     font-weight: bolder;
}
 @media screen and (max-width: 8.64864864864865rem) {
     .detail .infoError p {
         font-size: 0.32432432432432434rem;
    }
}
 .detail .infoError p:nth-child(2) {
     margin-top: 0.24324324324324326rem;
     color: #666;
}
 .detail .infoError .themeC {
     color: #ff5000;
}
 
</style>