
	<!-- 此页面作废 -->
	<!-- 此页面作废 --> 
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
	<!-- 此页面作废 -->
    
<template>
	<!-- 支付完成页面 -->
  <div id="transition">
	<div class="popularity_return"> 
		   <span class="title_name">确认完成</span>
	</div>
	<div class="mainWrap">
		<div class="detailWrap">
			<div class="detail">
				<img :src="ab" alt="">
				<div class="info">
					<p>支付方式:微信支付</p>
					<p>支付金额：<span class="themeC">¥2345.00</span></p>
				</div>
				<div class="clearFix"></div>
				<div class="buttonWrap">
					<div>	
						<span class="lookForOrder" @click="lookForOrder">查看订单</span>
						<span class="goHome" @click="goHome">回首页</span>
					</div>
				</div>
			</div>
		</div>
		<div class="detailWrap">
			<div class="detail">
				<img :src="ab" alt="">
				<div class="infoError">
					<p>糟糕，支付失败！</p>
					<p>最后一步出现了问题，重新支付</p>
				</div>
				<div class="clearFix"></div>
				<div class="buttonWrap">
					<div>	
						<span class="lookForOrder" @click="lookForOrder">查看订单</span>
						<span class="goHome" @click="goHome">回首页</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="everyBodyBugWrap">
		<div><span>———</span>&nbsp;大家都在买&nbsp;<span>———</span></div>
		<ul class="itemsWrap">
			<li class="items">
				<img :src="ab" alt="">
				<p class="themeC">{{'54661.01' | formatPrice |currency}}<b>{{'54661.01' | formatPriceX}}</b></p>
				<p>深圳公司注册</p>
				<p>3天拿照，快捷安全</p>
			</li>
			<li class="items">
				<img :src="ab" alt="">
				<p class="themeC">{{'54661.01' | formatPrice |currency}}<b>{{'54661.01' | formatPriceX}}</b></p>
				<p>深圳公司注册</p>
				<p>3天拿照，快捷安全</p>
			</li>
		</ul>
	</div>
  </div>
</template>

<script>
import headerTitle from "../components/header-title";
import tool from "../../util/tool";

export default {
  data() {
    return {
      title: "交易详情",
      money: "",
      ab: require("@/assets/images/comfirm-order/comPay@3x.png")
    };
  },
  components: {
    headerTitle
  },
  created() {
    tool.getQueryString("Amount");
    this.money = tool.getQueryString("Amount");
  },
  methods: {
    goHome() {
      //点击完成跳转 我的订单
      window.location.href =
        "file:///data/user/0/com.rongcan.wqb/files/apps/1106428143/www/index.html#/mine/toMyOrder";
      // this.$router.push({"path": '/mine/toMyOrder'});
    },
    lookForOrder() {
      this.$router.push("/mine");
    },
    goHome() {
      this.$router.push("/");
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
  }
};
</script>

<style lang="less" type="stylesheet/css" scoped>
@import "../../common/index.less";
#transition {
     padding-top: 1.1891891891891893rem;
     position: absolute;
     height: 100%;
     width: 100%;
     background: white;
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
     background-size: 100%;
     background-position: 0rem 0.24324324324324326rem;
}
 .mainWrap{
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
 .detail {
     .info{
         p:nth-child(1) {
             margin-top: 0.2972972972972973rem;
        }
         p:nth-child(2) {
             margin-top:0.24324324324324326rem;
             font-weight: bolder;
        }
    }
     span {
         line-height: 0.6216216216216216rem;
    }
}
 .detail .infoError{
     p:nth-child(1) {
         margin-top: 0.2972972972972973rem;
    }
     p:nth-child(2){
         margin-top:0.24324324324324326rem;
         .c(#666666);
    }
}
 .buttonWrap {
     float: none;
     width: 100%;
     overflow: hidden;
     padding-top: 0.9459459459459459rem;
     >div{
         margin: 0 auto;
         width:7.027027027027027rem;
    }
     span {
         text-align: center;
         float: left;
         width:2.972972972972973rem;
         height: 0.8918918918918919rem;
         line-height: 0.8918918918918919rem;
         border: 1px solid black;
         border-radius: 0.10810810810810811rem;
         &:nth-child(2){
             margin-left:1.0810810810810811rem 
        }
    }
}
 .everyBodyBugWrap{
		 //大家都在买 
		 >div:nth-child(1){
         text-align: center;
         line-height: 1.1891891891891893rem;
         .c(#b2b2b2);
         background-color: #efeff4;
    }
     .itemsWrap{
         background: white;
         display: flex;
         .items{
             margin-top: 0.2702702702702703rem;
             flex: 1 1 4.594594594594595rem;
        }
         .items:nth-child(2n+1){
             float: left;
             padding-left: 0.2702702702702703rem;
             padding-right: 0.13513513513513514rem;
        }
         .items:nth-child(2n){
             float: left;
             padding-left: 0.13513513513513514rem;
             padding-right: 0.2702702702702703rem;
        }
         img{
             width: 100%;
        }
         p{
             margin-top: 0.2702702702702703rem;
             &:nth-child(2){
                 font-size: 0.40540540540540543rem;
            }
             &:nth-child(3){
                 .c(#8c8c8c);
            }
        }
    }
}
 
</style>
